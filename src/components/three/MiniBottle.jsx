import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
import Bottle from './Bottle';
import StudioEnvironment from './StudioEnvironment';

function Spinner({ hovered, children }) {
  const ref = useRef();
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * (hovered.current ? 1.6 : 0.35);
    const target = hovered.current ? 0.82 : 0.72;
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, target, 5, dt));
  });
  return (
    <group ref={ref} scale={0.72}>
      {children}
    </group>
  );
}

// Small bottle used on collection cards. Only renders while on screen (saves GPU).
export default function MiniBottle({ perfume, hovered }) {
  const wrap = useRef();
  const inView = useInView(wrap, { margin: '120px' });
  return (
    <div ref={wrap} className="mini-canvas">
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 7], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight position={[4, 6, 5]} angle={0.5} penumbra={1} intensity={55} color="#fff1dc" />
          <StudioEnvironment />
          <Spinner hovered={hovered}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
              <Bottle name={perfume.name} liquid={perfume.liquid} glass={perfume.glass} cap={perfume.cap} quality="low" />
            </Float>
          </Spinner>
        </Suspense>
      </Canvas>
    </div>
  );
}
