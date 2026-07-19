import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Create a component that holds and animates the GLTF model
function CircuitModel() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/tech circuit logo 3d model.glb');
  
  // Track mouse target position for smooth interpolation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { size, viewport } = useThree();

  // Mouse move listener
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Modify materials to have a glowing circuit wireframe or emission effect
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Adjust material properties for a "tech vibe"
          // If the model has standard materials, we can make them emissive or wireframe
          const material = child.material as THREE.MeshStandardMaterial;
          if (material) {
            // Optional: apply wireframe to give that purely digital circuit feel
            // material.wireframe = true;
            // material.color.setHex(0x38bdf8); // Tailwind Sky 400
            
            // Or apply a subtle emissive glow
            material.emissive = new THREE.Color(0x38bdf8); // Sky 400
            material.emissiveIntensity = 0.3;
            material.roughness = 0.2;
            material.metalness = 0.8;
          }
        }
      });
      
      // Center the model in its local group (just in case the original pivot is off)
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;
    }
  }, [scene]);

  // Animate every frame
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Base slow constant rotation on the Y axis
      modelRef.current.rotation.y += 0.15 * delta;

      // Calculate target rotation based on mouse movement (max 15 degrees tilt = ~0.26 radians)
      const targetRotationX = mousePosition.y * 0.25;
      const targetRotationY = mousePosition.x * 0.25;

      // Smoothly interpolate current rotation towards target rotation
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX, 0.05);
      
      // We add the base Y rotation to the mouse target Y rotation 
      // modelRef.current.rotation.y (base) + mouse offset, but for simplicity, we just tilt it.
      // Wait, since we are doing constant rotation on Y, we shouldn't overwrite it with lerp unless we structure it hierarchically.
    }
  });

  // Wrapper group to separate base rotation and mouse tilt
  const wrapperRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (wrapperRef.current) {
      const targetRotationX = -mousePosition.y * 0.3;
      const targetRotationY = mousePosition.x * 0.3;
      
      wrapperRef.current.rotation.x = THREE.MathUtils.lerp(wrapperRef.current.rotation.x, targetRotationX, 0.05);
      wrapperRef.current.rotation.y = THREE.MathUtils.lerp(wrapperRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <group ref={wrapperRef}>
      <group ref={modelRef} scale={1.8}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// Preload to avoid pop-in
useGLTF.preload('/tech circuit logo 3d model.glb');

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        {/* Key light: cool cyan/blue */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#38bdf8" />
        {/* Fill light: deep indigo/purple */}
        <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#6366f1" />
        {/* Rim light: subtle rose */}
        <directionalLight position={[0, -10, 10]} intensity={0.5} color="#fb7185" />
        
        <CircuitModel />
      </Canvas>
    </div>
  );
}
