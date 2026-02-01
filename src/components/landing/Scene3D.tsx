import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GlassShape({ 
  geometry, 
  position, 
  color, 
  speed = 1,
  floatIntensity = 1 
}: { 
  geometry: 'torus' | 'icosahedron' | 'octahedron' | 'sphere';
  position: [number, number, number];
  color: string;
  speed?: number;
  floatIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  const geometryComponent = () => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'sphere':
        return <sphereGeometry args={[0.8, 32, 32]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position}>
        {geometryComponent()}
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff5e6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1a5490" />
      <spotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#C4704F"
      />
      
      <GlassShape 
        geometry="torus" 
        position={[-2, 0.5, 0]} 
        color="#1a5490"
        speed={0.8}
        floatIntensity={1.2}
      />
      <GlassShape 
        geometry="icosahedron" 
        position={[2, -0.5, 1]} 
        color="#C4704F"
        speed={1.2}
        floatIntensity={0.8}
      />
      <GlassShape 
        geometry="octahedron" 
        position={[0, 1, -1]} 
        color="#2d7bc4"
        speed={1}
        floatIntensity={1}
      />
      <GlassShape 
        geometry="sphere" 
        position={[1.5, -1.5, 0.5]} 
        color="#d88a6c"
        speed={0.6}
        floatIntensity={1.5}
      />

      <Environment preset="studio" />
    </>
  );
}

export function Scene3D() {
  return (
    <div className="w-full h-[400px] lg:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
