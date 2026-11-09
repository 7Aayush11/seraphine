import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import Bottle from './Bottle';
import Halo from './Halo';
import Effects from './Effects';
import StudioEnvironment from './StudioEnvironment';

function Intro({ children }) {
  const ref = useRef();
  useFrame((_, dt) => {
    const s = THREE.MathUtils.damp(ref.current.scale.x, 1, 3, dt);
    ref.current.scale.setScalar(s);
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, 0, 2.2, dt);
  });
  return (
    <group ref={ref} scale={0.5} rotation={[0, 2.5, 0]}>
      {children}
    </group>
  );
}

// Interactive viewer: drag to rotate. Used on the product page.
export default function ProductViewer({ perfume }) {
  return (
    <div className="viewer">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.3, 7], fov: 32 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={60} color="#fff1dc" />
          <StudioEnvironment />
          <Halo color={perfume.liquid} opacity={0.45} />
          <Intro>
            <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.35}>
              <Bottle key={perfume.slug} name={perfume.name} liquid={perfume.liquid} glass={perfume.glass} cap={perfume.cap} />
            </Float>
          </Intro>
          <ContactShadows position={[0, -1.75, 0]} opacity={0.5} scale={9} blur={2.6} far={3.5} color="#000000" />
          <Sparkles count={50} scale={[8, 6, 5]} size={2.6} speed={0.25} opacity={0.6} color="#ffd9a0" />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.4} minPolarAngle={Math.PI / 2.7} maxPolarAngle={Math.PI / 1.8} />
          <Effects bloom={0.6} />
        </Suspense>
      </Canvas>
      <span className="viewer-hint">Drag to rotate</span>
    </div>
  );
}
