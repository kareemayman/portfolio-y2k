"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store";
import { cameraYForProgress } from "@/lib/camera";

/* palette (kept in sync with the design tokens) */
const INK = "#1c1530";
const SURFACE = "#ffffff";
const LILAC = "#d7c8ff";
const PINK = "#ff8fc7";
const MINT = "#8fe8c4";
const BUTTER = "#ffe08a";
const SKY = "#8fb8ff";
const METAL = "#c9c6d6";

/* ---------------- props ---------------- */

function Floppy({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[1, 1, 0.12]} radius={0.05} smoothness={2}>
        <meshStandardMaterial color={color} roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, -0.15, 0.07]}>
        <boxGeometry args={[0.7, 0.5, 0.02]} />
        <meshStandardMaterial color={SURFACE} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.38, 0.07]}>
        <boxGeometry args={[0.5, 0.22, 0.04]} />
        <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Cd({ color }: { color: string }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.04, 48]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.06, 32]} />
        <meshStandardMaterial color={SURFACE} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Gem({ color }: { color: string }) {
  return (
    <mesh>
      <icosahedronGeometry args={[0.42, 0]} />
      <meshStandardMaterial color={color} flatShading metalness={0.2} roughness={0.45} />
    </mesh>
  );
}

function Ring({ color }: { color: string }) {
  return (
    <mesh>
      <torusGeometry args={[0.4, 0.15, 14, 28]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

/* a beige flat-panel monitor on a little stand */
function Monitor({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[1.25, 0.9, 0.1]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color={color} roughness={0.7} />
      </RoundedBox>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1, 0.62]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={0.5} roughness={1} />
      </mesh>
      {/* neck + foot */}
      <mesh position={[0, -0.62, -0.02]}>
        <boxGeometry args={[0.14, 0.34, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.8, 0.05]}>
        <boxGeometry args={[0.55, 0.06, 0.34]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </group>
  );
}

/* a chunky two-button mouse with a cord */
function Mouse({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[0.5, 0.26, 0.78]} radius={0.13} smoothness={3}>
        <meshStandardMaterial color={color} roughness={0.55} />
      </RoundedBox>
      {/* button split */}
      <mesh position={[0, 0.14, 0.18]}>
        <boxGeometry args={[0.03, 0.02, 0.3]} />
        <meshStandardMaterial color={INK} roughness={0.7} />
      </mesh>
      {/* scroll wheel */}
      <mesh position={[0, 0.16, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.05, 12]} />
        <meshStandardMaterial color={PINK} roughness={0.5} />
      </mesh>
      {/* cord */}
      <mesh position={[0, 0.02, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.35, 8]} />
        <meshStandardMaterial color={SURFACE} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* a flat keyboard with a few rows of keys */
function Keyboard({ color }: { color: string }) {
  const keys: [number, number][] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      keys.push([-0.6 + c * 0.2, -0.18 + r * 0.16]);
    }
  }
  return (
    <group rotation={[-0.12, 0, 0]}>
      <RoundedBox args={[1.6, 0.12, 0.6]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color={color} roughness={0.7} />
      </RoundedBox>
      {keys.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.08, z]}>
          <boxGeometry args={[0.14, 0.05, 0.12]} />
          <meshStandardMaterial color={SURFACE} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* an open clamshell laptop with a glowing screen */
function Laptop({ color }: { color: string }) {
  return (
    <group>
      {/* base */}
      <RoundedBox args={[1.3, 0.08, 0.9]} radius={0.04} smoothness={3} position={[0, 0, 0.1]}>
        <meshStandardMaterial color={color} roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0.05, 0.15]}>
        <boxGeometry args={[1.05, 0.01, 0.55]} />
        <meshStandardMaterial color={INK} roughness={0.85} />
      </mesh>
      {/* lid, hinged at the back */}
      <group position={[0, 0, -0.35]} rotation={[-1.15, 0, 0]}>
        <RoundedBox args={[1.3, 0.85, 0.05]} radius={0.04} smoothness={3} position={[0, 0.42, 0]}>
          <meshStandardMaterial color={color} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.42, 0.04]}>
          <planeGeometry args={[1.08, 0.62]} />
          <meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.55} roughness={1} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------------- CRT (low-poly, from primitives) ---------------- */

function Crt() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
    ref.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });
  return (
    <group ref={ref} position={[-0.2, 1.2, -0.4]} rotation={[0.04, 0.3, 0]}>
      {/* body */}
      <RoundedBox args={[2.3, 1.9, 1.8]} radius={0.16} smoothness={3}>
        <meshStandardMaterial color={LILAC} roughness={0.75} />
      </RoundedBox>
      {/* bezel */}
      <mesh position={[0, 0.12, 0.92]}>
        <boxGeometry args={[1.8, 1.4, 0.06]} />
        <meshStandardMaterial color={INK} roughness={0.6} />
      </mesh>
      {/* glowing screen */}
      <mesh position={[0, 0.12, 0.96]}>
        <planeGeometry args={[1.55, 1.15]} />
        <meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.6} roughness={1} />
      </mesh>
      {/* base */}
      <mesh position={[0, -1.2, -0.05]}>
        <boxGeometry args={[1.5, 0.5, 1.3]} />
        <meshStandardMaterial color={LILAC} roughness={0.8} />
      </mesh>
      {/* knobs */}
      <mesh position={[0.72, -0.62, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
        <meshStandardMaterial color={PINK} roughness={0.5} />
      </mesh>
      <mesh position={[0.72, -0.28, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color={MINT} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ---------------- floating props ---------------- */

type PropType =
  | "floppy"
  | "cd"
  | "gem"
  | "ring"
  | "monitor"
  | "mouse"
  | "keyboard"
  | "laptop";

type PropDef = {
  type: PropType;
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  /** override Float intensities — big hardware bobs gently. */
  float?: number;
  rot?: number;
};

const PROPS: PropDef[] = [
  // small trinkets — original spread
  { type: "floppy", position: [-3, 0.2, 0.4], color: PINK, scale: 0.9, speed: 1.2 },
  { type: "cd", position: [3.1, -0.6, -0.6], color: MINT, scale: 1, speed: 1.5 },
  { type: "gem", position: [2.6, 1.4, 0.6], color: BUTTER, scale: 0.8, speed: 2 },
  { type: "ring", position: [-2.7, -2.2, -0.4], color: SKY, scale: 1, speed: 1.4 },
  { type: "floppy", position: [3.2, -3.1, 0.3], color: SKY, scale: 0.8, speed: 1.1 },
  { type: "gem", position: [-3.1, -3.6, 0.2], color: PINK, scale: 0.7, speed: 2.2 },
  { type: "cd", position: [-2.4, -5, -0.5], color: BUTTER, scale: 0.9, speed: 1.6 },
  { type: "ring", position: [2.9, -5.6, 0.4], color: MINT, scale: 0.85, speed: 1.3 },
  { type: "gem", position: [3, -7.1, -0.2], color: SKY, scale: 0.75, speed: 2 },
  { type: "floppy", position: [-3.2, -7.6, 0.3], color: MINT, scale: 0.85, speed: 1.2 },
  { type: "cd", position: [2.5, -8.8, -0.4], color: PINK, scale: 0.9, speed: 1.5 },
  { type: "gem", position: [-2.6, -9.2, 0.4], color: BUTTER, scale: 0.7, speed: 2.1 },

  // nostalgic hardware — bigger, gentler float, spread down the gutters
  { type: "monitor", position: [3.7, 1.1, -1.1], color: LILAC, scale: 0.9, speed: 0.8, float: 0.4, rot: 0.25 },
  { type: "mouse", position: [-3.6, -1.6, 0.4], color: PINK, scale: 1, speed: 1, float: 0.7, rot: 0.6 },
  { type: "keyboard", position: [-3.9, -4, -0.7], color: LILAC, scale: 0.95, speed: 0.9, float: 0.4, rot: 0.25 },
  { type: "laptop", position: [3.9, -5.4, -0.9], color: MINT, scale: 1, speed: 0.8, float: 0.4, rot: 0.3 },
  { type: "mouse", position: [3.6, -7.6, 0.3], color: SKY, scale: 1, speed: 1, float: 0.7, rot: 0.6 },
  { type: "monitor", position: [-3.8, -9.6, -1.1], color: BUTTER, scale: 0.9, speed: 0.8, float: 0.4, rot: 0.25 },
];

function FloatingProps() {
  return (
    <>
      {PROPS.map((p, i) => {
        // hardware rests near-upright at a 3/4 angle; trinkets tumble freely
        const hardware =
          p.type === "monitor" ||
          p.type === "keyboard" ||
          p.type === "laptop" ||
          p.type === "mouse";
        const rotation: [number, number, number] = hardware
          ? [0.06, 0.5 + 0.15 * i, 0]
          : [0.2 * i, 0.5 * i, 0.1 * i];
        return (
        <Float
          key={i}
          speed={p.speed ?? 1.4}
          rotationIntensity={p.rot ?? 0.8}
          floatIntensity={p.float ?? 0.9}
          position={p.position}
        >
          <group scale={p.scale ?? 1} rotation={rotation}>
            {p.type === "floppy" && <Floppy color={p.color} />}
            {p.type === "cd" && <Cd color={p.color} />}
            {p.type === "gem" && <Gem color={p.color} />}
            {p.type === "ring" && <Ring color={p.color} />}
            {p.type === "monitor" && <Monitor color={p.color} />}
            {p.type === "mouse" && <Mouse color={p.color} />}
            {p.type === "keyboard" && <Keyboard color={p.color} />}
            {p.type === "laptop" && <Laptop color={p.color} />}
          </group>
        </Float>
        );
      })}
    </>
  );
}

/* ---------------- set-piece helpers ---------------- */

/**
 * Fades a set-piece group in/out by its section's own visibility value (driven
 * by that section's scroll progress), so each one only shows while its section
 * is on screen and never bleeds into the neighbours. Returns a ref for the group
 * whose children should fade.
 */
function useFade(key: "workspace" | "room") {
  const ref = useRef<THREE.Group>(null!);
  useFrame(() => {
    const o = useScrollStore.getState().vis[key];
    const g = ref.current;
    if (!g) return;
    g.visible = o > 0.02;
    g.traverse((obj) => {
      const mat = (obj as THREE.Mesh).material as
        | (THREE.Material & { opacity?: number })
        | (THREE.Material & { opacity?: number })[]
        | undefined;
      if (!mat) return;
      (Array.isArray(mat) ? mat : [mat]).forEach((m) => {
        if (m.opacity !== undefined) {
          m.transparent = true;
          m.opacity = o;
        }
      });
    });
  });
  return ref;
}

/* ---------------- set-piece: coding workstation ---------------- */

/* rows of syntax-colored "code" that slowly scroll, with a blinking caret */
function CodeLines() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.position.y = ((state.clock.elapsedTime * 0.06) % 0.08) - 0.04;
  });
  const rows = useMemo(() => {
    const palette = [MINT, BUTTER, PINK, SKY, "#ffffff"];
    const out: { y: number; segs: { x: number; w: number; c: string }[] }[] = [];
    for (let r = 0; r < 12; r++) {
      const indent = r % 4 === 0 ? 0 : r % 3 === 0 ? 0.18 : 0.09;
      const segs: { x: number; w: number; c: string }[] = [];
      let x = -0.55 + indent;
      const n = 1 + ((r * 7) % 3) + 1;
      for (let s = 0; s < n; s++) {
        const w = 0.08 + (((r + s) * 13) % 5) * 0.05;
        if (x + w > 0.55) break;
        segs.push({ x: x + w / 2, w, c: palette[(r + s) % palette.length] });
        x += w + 0.06;
      }
      out.push({ y: 0.4 - r * 0.072, segs });
    }
    return out;
  }, []);
  return (
    <group ref={ref}>
      {rows.map((row, i) => (
        <group key={i} position={[0, row.y, 0]}>
          {row.segs.map((s, j) => (
            <mesh key={j} position={[s.x, 0, 0]}>
              <planeGeometry args={[s.w, 0.032]} />
              <meshBasicMaterial color={s.c} toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Caret() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.visible = Math.floor(state.clock.elapsedTime * 1.6) % 2 === 0;
  });
  return (
    <mesh ref={ref} position={[0.12, -0.34, 0.001]}>
      <planeGeometry args={[0.018, 0.04]} />
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </mesh>
  );
}

/* a few wisps of steam rising + fading from the mug */
function Steam() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((c, i) => {
      const p = ((t * 0.4 + i * 0.34) % 1);
      c.position.y = 0.16 + p * 0.4;
      const s = 1 - p;
      c.scale.setScalar(0.4 + s * 0.7);
    });
  });
  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.16, 0]}>
          <planeGeometry args={[0.07, 0.07]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** A desk with a glowing editor — the "where it's made" beat before Work. */
function Workstation({ y }: { y: number }) {
  const ref = useFade("workspace");
  return (
    <group position={[0, y, 0.3]}>
      <group ref={ref}>
      {/* desk surface */}
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[4.2, 0.18, 1.7]} />
        <meshStandardMaterial color={LILAC} roughness={0.85} />
      </mesh>

      {/* monitor */}
      <group position={[0, 0.1, -0.25]}>
        <RoundedBox args={[2.15, 1.4, 0.14]} radius={0.07} smoothness={3}>
          <meshStandardMaterial color={INK} roughness={0.6} />
        </RoundedBox>
        {/* glowing screen */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.92, 1.2]} />
          <meshStandardMaterial color="#161130" emissive="#241c52" emissiveIntensity={0.65} roughness={1} />
        </mesh>
        {/* editor title bar */}
        <mesh position={[0, 0.52, 0.085]}>
          <planeGeometry args={[1.92, 0.16]} />
          <meshBasicMaterial color="#0e0a20" toneMapped={false} />
        </mesh>
        {[-0.86, -0.78, -0.7].map((x, i) => (
          <mesh key={i} position={[x, 0.52, 0.09]}>
            <circleGeometry args={[0.022, 12]} />
            <meshBasicMaterial color={[PINK, BUTTER, MINT][i]} toneMapped={false} />
          </mesh>
        ))}
        {/* code + caret, below the title bar, filling the screen width */}
        <group position={[0, -0.08, 0.09]} scale={[1.5, 1, 1]}>
          <CodeLines />
          <Caret />
        </group>
        {/* stand */}
        <mesh position={[0, -0.9, -0.05]}>
          <boxGeometry args={[0.2, 0.45, 0.14]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
        <mesh position={[0, -1.12, 0]}>
          <boxGeometry args={[0.75, 0.07, 0.45]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
      </group>

      {/* keyboard + mouse on the desk */}
      <group position={[-0.3, -0.83, 0.55]} scale={0.82}>
        <Keyboard color={SURFACE} />
      </group>
      <group position={[0.95, -0.84, 0.6]} scale={0.7}>
        <Mouse color={PINK} />
      </group>

      {/* coffee mug + steam */}
      <group position={[1.55, -0.74, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.17, 0.14, 0.3, 18]} />
          <meshStandardMaterial color={MINT} roughness={0.45} />
        </mesh>
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} />
          <meshStandardMaterial color={MINT} roughness={0.45} />
        </mesh>
        <Steam />
      </group>

      {/* warm desk-lamp glow */}
      <pointLight position={[1.1, 1.3, 1.2]} intensity={0.7} color={BUTTER} distance={7} />
      </group>
    </group>
  );
}

/* ---------------- set-piece: cozy room ---------------- */

/* thin streaks of rain falling across the window pane */
function Rain() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((c, i) => {
      const p = (t * 0.85 + i * 0.137) % 1;
      c.position.y = 0.85 - p * 1.7;
    });
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[-0.78 + (i % 7) * 0.26, 0, 0.01]}>
          <planeGeometry args={[0.012, 0.2]} />
          <meshBasicMaterial color={SKY} transparent opacity={0.45} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** The pull-back reveal: a lo-fi room — the breath after Work. */
function Room({ y }: { y: number }) {
  const ref = useFade("room");
  return (
    <group position={[0, y, -1.4]}>
      <group ref={ref}>
      {/* back wall + floor */}
      <mesh position={[0, 0, -1.3]}>
        <planeGeometry args={[9, 6.5]} />
        <meshStandardMaterial color={LILAC} roughness={1} />
      </mesh>
      <mesh position={[0, -2.4, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 4]} />
        <meshStandardMaterial color="#b3a0ea" roughness={1} />
      </mesh>

      {/* rainy window */}
      <group position={[0, 0.5, -1.25]}>
        <mesh>
          <planeGeometry args={[2.1, 1.6]} />
          <meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.55} roughness={1} />
        </mesh>
        <Rain />
        <mesh>
          <boxGeometry args={[2.2, 0.09, 0.1]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.7, 0.09, 0.1]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.82, 0]}>
          <boxGeometry args={[2.35, 0.12, 0.12]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.82, 0]}>
          <boxGeometry args={[2.35, 0.12, 0.12]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
        <mesh position={[-1.13, 0, 0]}>
          <boxGeometry args={[0.12, 1.75, 0.12]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
        <mesh position={[1.13, 0, 0]}>
          <boxGeometry args={[0.12, 1.75, 0.12]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
      </group>

      {/* a little monitor on a side desk */}
      <group position={[-2.2, -1.5, -0.5]} scale={0.8}>
        <Monitor color={BUTTER} />
      </group>

      {/* potted plant */}
      <group position={[2.3, -1.6, -0.3]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.4, 14]} />
          <meshStandardMaterial color={PINK} roughness={0.6} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[Math.sin(i * 1.5) * 0.13, 0.05 + (i % 3) * 0.08, Math.cos(i * 1.5) * 0.13]}
            rotation={[0.4, i * 1.5, 0.35]}
          >
            <coneGeometry args={[0.07, 0.45, 5]} />
            <meshStandardMaterial color={MINT} roughness={0.7} flatShading />
          </mesh>
        ))}
      </group>

      {/* framed poster on the wall */}
      <group position={[1.9, 0.7, -1.22]} rotation={[0, 0, 0.02]}>
        <mesh>
          <planeGeometry args={[1, 1.3]} />
          <meshStandardMaterial color="#ffffff" roughness={1} />
        </mesh>
        <mesh position={[0, 0.05, 0.01]}>
          <circleGeometry args={[0.3, 24]} />
          <meshBasicMaterial color={PINK} toneMapped={false} />
        </mesh>
      </group>

      <pointLight position={[0, 1.2, 1.8]} intensity={0.55} color={SKY} distance={9} />
      </group>
    </group>
  );
}

/* ---------------- camera + lights ---------------- */

function CameraRig() {
  useFrame((state) => {
    const { progress, dolly } = useScrollStore.getState();
    const targetY = cameraYForProgress(progress); // descend as you scroll
    const cam = state.camera;
    cam.position.y = THREE.MathUtils.lerp(
      cam.position.y,
      targetY + state.pointer.y * 0.35,
      0.06,
    );
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, state.pointer.x * 0.6, 0.06);
    // dolly: set-piece sections push the camera in (−) or pull it back (+)
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 7 + dolly, 0.06);
    cam.lookAt(0, targetY, -0.4);
  });
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} />
      <directionalLight position={[-5, -2, 3]} intensity={0.35} color={PINK} />
    </>
  );
}

/* ---------------- scene ---------------- */

function SetPieces() {
  const workspaceY = useScrollStore((s) => s.anchors.workspace);
  const roomY = useScrollStore((s) => s.anchors.room);
  return (
    <>
      <Workstation y={workspaceY} />
      <Room y={roomY} />
    </>
  );
}

export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      frameloop="always"
    >
      <Lights />
      <CameraRig />
      <Crt />
      <FloatingProps />
      <SetPieces />
    </Canvas>
  );
}
