import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Stars, Grid, Float, PerspectiveCamera } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

/* --- SUB-COMPONENT: ROTATING STARS --- */
const RotatingStars = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Stars radius={100} depth={50} count={18000} factor={9} saturation={0} fade speed={1} />
    </group>
  );
};

/* --- SUB-COMPONENT: GHOST NET (Green Particles) --- */
const GhostNet = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#4ade80" size={0.004} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
      </Points>
    </group>
  );
};

/* --- SUB-COMPONENT: CYBER VOID (Grid + Cubes) --- */
const CyberVoid = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 4 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
    
    // Mouse Parallax
    const { x, y } = state.pointer;
    state.camera.position.x += (x * 0.5 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-y * 0.5 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#15803d" size={0.002} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[1.5, 0.5, 0]} scale={0.2}>
           <icosahedronGeometry />
           <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-1.5, -0.8, 0.5]} scale={0.15}>
           <boxGeometry />
           <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

/* --- MAIN EXPORTED COMPONENT --- */
const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <Grid 
            position={[0, -2, 0]} args={[10, 10]} cellSize={0.5} cellThickness={0.5} 
            cellColor="#15803d" sectionSize={3} sectionThickness={1} sectionColor="#22c55e" 
            fadeDistance={15} fadeStrength={1}
        />
        <RotatingStars />
        <fog attach="fog" args={['#000000', 3, 15]} /> 
        <GhostNet />
        <CyberVoid />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4ade80" />
      </Canvas>
    </div>
  );
};

export default Background3D;