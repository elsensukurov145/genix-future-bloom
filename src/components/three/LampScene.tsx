import { Suspense, useRef, useState, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

type LampProps = { on: boolean; onToggle: () => void };

function Lamp({ on, onToggle }: LampProps) {
  const group = useRef<THREE.Group>(null);
  const bulb = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    }
    if (bulb.current && on) {
      const m = bulb.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 2.5 + Math.sin(state.clock.elapsedTime * 6) * 0.15;
    }
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "none";
      }}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.04 : 1}
    >
      {/* Base */}
      <mesh position={[0, -1.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.12, 48]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Lower arm */}
      <mesh position={[0, -0.7, 0]} rotation={[0, 0, 0.35]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.4, 16]} />
        <meshStandardMaterial color="#2a2a35" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Joint */}
      <mesh position={[0.24, -0.05, 0]} castShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#3a3a45" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Upper arm */}
      <mesh position={[0.55, 0.45, 0]} rotation={[0, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#2a2a35" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Joint 2 */}
      <mesh position={[0.85, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#3a3a45" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Shade */}
      <group position={[0.85, 0.95, 0]} rotation={[0, 0, -1.1]}>
        <mesh castShadow>
          <coneGeometry args={[0.55, 0.7, 32, 1, true]} />
          <meshStandardMaterial
            color={on ? "#3a2e1a" : "#1f1f28"}
            metalness={0.6}
            roughness={0.4}
            side={THREE.DoubleSide}
            emissive={on ? "#ffb648" : "#000000"}
            emissiveIntensity={on ? 0.25 : 0}
          />
        </mesh>
        {/* Bulb */}
        <mesh ref={bulb} position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={on ? "#fff1c0" : "#222"}
            emissive={on ? "#ffb648" : "#000000"}
            emissiveIntensity={on ? 2.5 : 0}
            toneMapped={false}
          />
        </mesh>
        {/* Light from bulb */}
        {on && (
          <pointLight
            position={[0, -0.3, 0]}
            color="#ffb648"
            intensity={6}
            distance={14}
            decay={2}
            castShadow
          />
        )}
      </group>

      {/* Hint ring when off */}
      {!on && (
        <mesh position={[0.85, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.78, 48]} />
          <meshBasicMaterial color="#1D9E75" transparent opacity={hovered ? 0.6 : 0.25} />
        </mesh>
      )}
    </group>
  );
}

function FloorPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.46, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#0a0a0f" roughness={1} metalness={0} />
    </mesh>
  );
}

export const LampScene = ({ on, onToggle }: LampProps) => {
  return (
    <Canvas
      shadows
      camera={{ position: [2.2, 0.6, 3.4], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 5, 12]} />

      {/* Ambient base */}
      <ambientLight intensity={on ? 0.35 : 0.08} />
      <directionalLight position={[-3, 4, 2]} intensity={on ? 0.3 : 0.05} />
      {/* subtle red/green ambient */}
      <pointLight position={[-3, 1, -2]} color="#1D9E75" intensity={0.6} distance={8} />
      <pointLight position={[3, -1, -2]} color="#7a1f2f" intensity={0.4} distance={8} />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <Lamp on={on} onToggle={onToggle} />
        </Float>
        <FloorPlane />
        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.6}
          scale={6}
          blur={2.4}
          far={3}
          color="#000000"
        />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

export default LampScene;
