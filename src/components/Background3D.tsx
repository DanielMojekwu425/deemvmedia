import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Dynamic orbiting point lights casting moving reflections and highlights on the 3D model
function OrbitingLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 1.5) * 4;
      light1Ref.current.position.y = Math.cos(t * 1.0) * 2;
      light1Ref.current.position.z = Math.cos(t * 1.5) * 4;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(t * 1.2) * 4;
      light2Ref.current.position.y = Math.sin(t * 1.8) * 2;
      light2Ref.current.position.z = Math.sin(t * 1.2) * 4;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} intensity={3.5} distance={10} color="#38bdf8" />
      <pointLight ref={light2Ref} intensity={2.8} distance={10} color="#f43f5e" />
    </>
  );
}

// 3D Circuit Model with smooth floating, multi-axis spin, interactive parallax, and emissive pulse
function CircuitModel() {
  const modelRef = useRef<THREE.Group>(null);
  const wrapperRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const { scene } = useGLTF('/tech circuit logo 3d model.glb');

  // Track mouse target position for interactive 3D tilt & parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (scene) {
      const mats: THREE.MeshStandardMaterial[] = [];
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.emissive = new THREE.Color(0x38bdf8);
          material.emissiveIntensity = 0.35;
          material.roughness = 0.15;
          material.metalness = 0.85;
          mats.push(material);
        }
      });
      materialsRef.current = mats;

      // Center the model pivot
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;
    }
  }, [scene]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Dynamic emissive pulse glow effect
    materialsRef.current.forEach((mat) => {
      mat.emissiveIntensity = 0.35 + Math.sin(time * 2.2) * 0.2;
    });

    // 1. Base continuous smooth 3D rotation with pitch & roll wobble
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.35 * delta;
      modelRef.current.rotation.x = Math.sin(time * 0.8) * 0.12;
      modelRef.current.rotation.z = Math.cos(time * 0.6) * 0.08;
    }

    // 2. Interactive mouse tracking 3D tilt & parallax position shift
    if (wrapperRef.current) {
      const targetRotX = -mousePosition.y * 0.45;
      const targetRotY = mousePosition.x * 0.45;
      const targetRotZ = mousePosition.x * -0.2;

      const targetPosX = mousePosition.x * 0.35;
      const targetPosY = mousePosition.y * 0.35;

      wrapperRef.current.rotation.x = THREE.MathUtils.lerp(wrapperRef.current.rotation.x, targetRotX, 0.06);
      wrapperRef.current.rotation.y = THREE.MathUtils.lerp(wrapperRef.current.rotation.y, targetRotY, 0.06);
      wrapperRef.current.rotation.z = THREE.MathUtils.lerp(wrapperRef.current.rotation.z, targetRotZ, 0.06);

      wrapperRef.current.position.x = THREE.MathUtils.lerp(wrapperRef.current.position.x, targetPosX, 0.06);
      wrapperRef.current.position.y = THREE.MathUtils.lerp(wrapperRef.current.position.y, targetPosY, 0.06);
    }
  });

  return (
    <group ref={wrapperRef}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.9} floatingRange={[-0.15, 0.15]}>
        <group ref={modelRef} scale={1.85}>
          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}

// Preload GLTF model
useGLTF.preload('/tech circuit logo 3d model.glb');

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none transition-opacity duration-700">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#38bdf8" />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#6366f1" />
        <directionalLight position={[0, -10, 10]} intensity={0.6} color="#fb7185" />

        {/* Dynamic Orbiting Neon Lights */}
        <OrbitingLights />

        {/* Ambient Holographic Tech Sparkles Field */}
        <Sparkles count={65} scale={[8, 8, 4]} size={3.5} speed={0.6} opacity={0.6} color="#38bdf8" />
        <Sparkles count={35} scale={[6, 6, 3]} size={2.5} speed={0.8} opacity={0.4} color="#818cf8" />

        <CircuitModel />
      </Canvas>
    </div>
  );
}

