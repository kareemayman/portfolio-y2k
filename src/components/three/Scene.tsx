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

type PropDef = {
  type: "floppy" | "cd" | "gem" | "ring";
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
};

const PROPS: PropDef[] = [
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
];

function FloatingProps() {
  return (
    <>
      {PROPS.map((p, i) => (
        <Float
          key={i}
          speed={p.speed ?? 1.4}
          rotationIntensity={0.8}
          floatIntensity={0.9}
          position={p.position}
        >
          <group scale={p.scale ?? 1} rotation={[0.2 * i, 0.5 * i, 0.1 * i]}>
            {p.type === "floppy" && <Floppy color={p.color} />}
            {p.type === "cd" && <Cd color={p.color} />}
            {p.type === "gem" && <Gem color={p.color} />}
            {p.type === "ring" && <Ring color={p.color} />}
          </group>
        </Float>
      ))}
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
