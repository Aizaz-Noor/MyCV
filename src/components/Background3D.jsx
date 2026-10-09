import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { usePortfolioMotion } from "../hooks/usePortfolioMotion";
function Sculpture() {
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
          <torusKnotGeometry args={[1.28, 0.36, 180, 28, 2, 3]} />
          <meshStandardMaterial
            color="#b7a3ff"
            metalness={0.75}
            roughness={0.23}
            emissive="#6950b8"
            emissiveIntensity={0.23}
          />
        </mesh>
        <mesh scale={1.015}>
          <torusKnotGeometry args={[1.28, 0.36, 100, 12, 2, 3]} />
          <meshBasicMaterial
            color="#c4b2ff"
            wireframe
            transparent
            opacity={0.14}
          />
        </mesh>
      </group>
      <group ref={orbit} rotation={[0.7, 0.25, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.35, 0.012, 8, 100]} />
          <meshBasicMaterial color="#75e0f6" transparent opacity={0.65} />
        </mesh>
        <mesh position={[2.35, 0, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#b4eeff" />
        </mesh>
        <mesh position={[-2.35, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ac9aff" />
        </mesh>
      </group>
      <Stars
        radius={35}
        depth={20}
        count={180}
        factor={1.3}
        saturation={0}
        fade
        speed={0.25}
      />
    </>
  );
}
export default function Background3D({ onReady }) {
  const ref = useRef(null);
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
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.7], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        frameloop={visible && enabled ? "always" : "demand"}
        onCreated={onReady}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={4} color="#dbd0ff" />
        <pointLight position={[-3, 1, 2]} intensity={35} color="#61dafa" />
        <pointLight position={[1, -3, 1]} intensity={20} color="#a182ff" />
        <Sculpture />
      </Canvas>
    </div>
  );
}
