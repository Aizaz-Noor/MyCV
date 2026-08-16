import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute float aDepth;
  varying float vDepth;
  varying float vAlpha;

  void main() {
    vDepth = aDepth;

    // Pulse each particle size using time and its Z position
    float pulse = 1.0 + 0.4 * sin(uTime * 2.0 + position.z * 0.04 + aDepth * 6.28);
    float finalSize = aSize * pulse;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = finalSize * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = 0.5 + 0.5 * sin(uTime * 1.5 + position.z * 0.08);
  }
`;

const fragmentShader = `
  varying float vDepth;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);

    // Mix between white and the --accent color (#818cf8 -> RGB: 129, 140, 248)
    vec3 colorNear = vec3(1.0, 1.0, 1.0); // pure white
    vec3 colorFar  = vec3(0.506, 0.549, 0.973); // #818cf8
    vec3 color  = mix(colorNear, colorFar, vDepth);

    gl_FragColor = vec4(color, alpha * vAlpha * 0.8);
  }
`;

export default function ParticleTunnel({ count = 1500 }) {
  const meshRef  = useRef();
  const matRef   = useRef();
  const depth    = 280;

  const { positions, sizes, depths } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);
    const depths    = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 16;
      const angle  = Math.random() * Math.PI * 2;
      const z      = (Math.random() - 0.5) * depth;

      positions[i * 3]     = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;

      sizes[i]  = 0.6 + Math.random() * 1.8;
      depths[i] = (z + depth / 2) / depth; // normalise 0→1
    }
    return { positions, sizes, depths };
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current)  meshRef.current.rotation.z += delta * 0.04;
    if (matRef.current)   matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize"    count={count} array={sizes}     itemSize={1} />
        <bufferAttribute attach="attributes-aDepth"   count={count} array={depths}    itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
