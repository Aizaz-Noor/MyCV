import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ParticleTunnel from './ParticleTunnel';

function CameraRig() {
  const maxScroll = useRef(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      maxScroll.current = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    updateMaxScroll();

    const resizeObserver = new ResizeObserver(updateMaxScroll);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  useFrame((state) => {
    const scrollProgress = maxScroll.current > 0 ? window.scrollY / maxScroll.current : 0;
    const startZ = 150;
    const endZ = -100;
    const targetZ = startZ + scrollProgress * (endZ - startZ);
    // Smooth dampening
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;

  });
  return null;
}

export default function Background3D() {
  return (
    <div
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 150], fov: 70, near: 0.1, far: 1000 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <color attach="background" args={['#050507']} />
        <ambientLight intensity={0.15} color="#ffffff" />
        <Suspense fallback={null}>
          <Stars radius={200} depth={60} count={900} factor={3} saturation={0} fade speed={0.2} />
          <ParticleTunnel count={600} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
