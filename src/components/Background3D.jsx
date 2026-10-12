import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// Static points replace a general-purpose starfield dependency.
const starPositions = new Float32Array(Array.from({ length: 180 }, (_, i) => {
  const angle = i * 2.3999632297;
  const radius = 10 + (i % 13);
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, -12 - (i % 17)];
}).flat());
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
function Sculpture({ lowPower }) {
  const sculpture = useRef(null);
  const orbit = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (event) => {
      pointer.current = {
        x: event.clientX / innerWidth - 0.5,
        y: event.clientY / innerHeight - 0.5,
      };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    sculpture.current.rotation.y += step * 0.24;
    sculpture.current.rotation.x += step * 0.12;
    orbit.current.rotation.z -= step * 0.1;
    const damping = 1 - Math.exp(-3 * step);
    state.camera.position.x +=
      (pointer.current.x * 1.2 - state.camera.position.x) * damping;
    state.camera.position.y +=
      (-pointer.current.y * 0.9 - state.camera.position.y) * damping;
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <group ref={sculpture} rotation={[0.4, 0.2, 0.3]}>
        <mesh>
          <torusKnotGeometry args={[1.28, 0.36, lowPower ? 96 : 128, lowPower ? 16 : 20, 2, 3]} />
          <meshStandardMaterial
            color="#818cf8"
            metalness={0.75}
            roughness={0.23}
            emissive="#4f46e5"
            emissiveIntensity={0.23}
          />
        </mesh>
        <mesh scale={1.015}>
          <torusKnotGeometry args={[1.28, 0.36, 80, 8, 2, 3]} />
          <meshBasicMaterial
            color="#f1f5f9"
            wireframe
            transparent
            opacity={0.14}
          />
        </mesh>
      </group>
      <group ref={orbit} rotation={[0.7, 0.25, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.35, 0.012, 8, 100]} />
          <meshBasicMaterial color="#cbd5e1" transparent opacity={0.65} />
        </mesh>
        <mesh position={[2.35, 0, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#f1f5f9" />
        </mesh>
        <mesh position={[-2.35, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#818cf8" />
        </mesh>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#cbd5e1" size={0.055} transparent opacity={0.4} depthWrite={false} />
      </points>
    </>
  );
}
export default function Background3D({ onReady }) {
  const ref = useRef(null);
  const lowPower = (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory > 0 && navigator.deviceMemory <= 4);
  const [visible, setVisible] = useState(false);
  const { enabled } = usePortfolioMotion();
  useEffect(() => {
    let inView = false;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={ref} className="sculpture-canvas">
      <Canvas
        dpr={lowPower ? 1 : [1, 1.25]}
        camera={{ position: [0, 0, 6.7], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        frameloop={visible && enabled ? "always" : "demand"}
        onCreated={onReady}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={4} color="#f1f5f9" />
        <pointLight position={[-3, 1, 2]} intensity={35} color="#cbd5e1" />
        <pointLight position={[1, -3, 1]} intensity={20} color="#818cf8" />
        <Sculpture lowPower={lowPower} />
      </Canvas>
    </div>
  );
}
