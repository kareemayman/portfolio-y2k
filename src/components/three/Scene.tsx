"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store";

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

/* ---------------- camera + lights ---------------- */

function CameraRig() {
  useFrame((state) => {
    const p = useScrollStore.getState().progress; // 0 → 1
    const targetY = 1 - p * 10.5; // descend through the scene as you scroll
    const cam = state.camera;
    cam.position.y = THREE.MathUtils.lerp(
      cam.position.y,
      targetY + state.pointer.y * 0.35,
      0.06,
    );
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, state.pointer.x * 0.6, 0.06);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 7, 0.06);
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
    </Canvas>
  );
}
