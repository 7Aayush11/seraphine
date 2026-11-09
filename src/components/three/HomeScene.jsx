import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import Bottle from './Bottle';
import Halo from './Halo';
import Effects from './Effects';
import StudioEnvironment from './StudioEnvironment';
import { perfumes } from '../../data/perfumes';
import { scrollState } from '../../lib/scrollState';
import { sampleKeyframes, sampleStops } from '../../lib/keyframes';

// Where the bottle sits at each screen of the home page. `at` = screens scrolled.
// pos[0] is a fraction of the viewport width, pos[1] world units.
const FRAMES = [
  { at: 0, pos: [0.2, -0.05, 0], rot: [0.05, 0.5, 0], scale: 1.02 },
  { at: 1, pos: [0.25, -0.05, 0], rot: [0.1, 2.4, 0.08], scale: 0.95 },
  { at: 2, pos: [-0.24, 0, 0], rot: [-0.08, 4.4, -0.1], scale: 1.05 },
  { at: 3, pos: [0.24, 0.1, 0], rot: [0.05, 6.4, 0], scale: 0.95 },
  { at: 4, pos: [0.26, -0.05, 0], rot: [0.1, 8.2, 0.05], scale: 0.95 },
  { at: 5, pos: [0, 0.95, 0], rot: [0.05, 10.6, 0], scale: 0.72 },
];
// Liquid colour follows the scroll: amber → rose → green → amber.
const STOPS = [
  { at: 0, p: 0 },
  { at: 1.2, p: 0 },
  { at: 2, p: 1 },
  { at: 3.2, p: 2 },
  { at: 4.2, p: 2 },
  { at: 5, p: 0 },
];

function SceneContent() {
  const group = useRef();
  const colors = useRef({ liquid: new THREE.Color(), glass: new THREE.Color(), glow: new THREE.Color() });
  const { size, viewport } = useThree();
  const palette = useMemo(
    () => perfumes.map((p) => ({ liquid: new THREE.Color(p.liquid), glass: new THREE.Color(p.glass) })),
    []
  );
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state, dt) => {
    const g = group.current;
    const t = state.clock.elapsedTime;
    const s = Math.min(scrollState.y / window.innerHeight, 5);
    const f = sampleKeyframes(FRAMES, s);
    const mobile = size.width < 820;

    const tx = mobile ? 0 : f.pos[0] * viewport.width;
    const ty = f.pos[1] + (mobile ? 0.5 : 0);
    const sc = f.scale * (mobile ? 0.7 : 1);
    const tilt = THREE.MathUtils.clamp(scrollState.velocity * 0.012, -0.35, 0.35);

    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 3.5, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 3.5, dt);
    g.position.z = THREE.MathUtils.damp(g.position.z, f.pos[2], 3.5, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, f.rot[1] + state.pointer.x * 0.35 + Math.sin(t * 0.4) * 0.08, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, f.rot[0] - state.pointer.y * 0.15 + tilt, 3, dt);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, f.rot[2], 3, dt);
    const ns = THREE.MathUtils.damp(g.scale.x, sc, 3.5, dt);
    g.scale.setScalar(ns);

    // colour blend
    const [i, j, k] = sampleStops(STOPS, s);
    const a = palette[STOPS[i].p];
    const b = palette[STOPS[j].p];
    colors.current.liquid.copy(a.liquid).lerp(b.liquid, k);
    colors.current.glass.copy(a.glass).lerp(b.glass, k);
    colors.current.glow.copy(colors.current.liquid);
    tmp.copy(colors.current.liquid);
    document.documentElement.style.setProperty(
      '--glow',
      `${Math.round(tmp.r * 255)}, ${Math.round(tmp.g * 255)}, ${Math.round(tmp.b * 255)}`
    );
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={60} color="#fff1dc" />
      <pointLight position={[-4, -1, 3]} intensity={12} color="#ffb067" />
      <StudioEnvironment />
      <group ref={group}>
        <Halo colors={colors} />
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.55}>
          <Bottle name="Nuit d'Ambre" colors={colors} cap="#c9a25a" />
        </Float>
      </group>
      <Sparkles count={90} scale={[12, 7, 6]} size={3.2} speed={0.3} opacity={0.7} color="#ffd9a0" />
      <Effects />
    </>
  );
}

// One fixed canvas sits behind the whole home page; the bottle travels as you scroll.
export default function HomeScene() {
  return (
    <div className="scene-fixed" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
