import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Soft radial glow behind the bottle + two slowly turning thin gold rings.
function radialTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Halo({ colors = null, color = '#d9892b', rings = true, opacity = 0.5 }) {
  const mat = useRef();
  const r1 = useRef();
  const r2 = useRef();
  const tex = useMemo(radialTexture, []);

  useFrame((state, dt) => {
    if (colors?.current && mat.current) mat.current.color.copy(colors.current.glow);
    if (r1.current) r1.current.rotation.z += dt * 0.12;
    if (r2.current) r2.current.rotation.z -= dt * 0.08;
  });

  return (
    <group>
      <mesh position={[0, 0, -1.4]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial ref={mat} map={tex} color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {rings && (
        <>
          <mesh ref={r1} position={[0, 0.2, -0.6]} rotation={[1.15, 0.25, 0]}>
            <torusGeometry args={[2.1, 0.006, 8, 220]} />
            <meshBasicMaterial color="#d4b06a" transparent opacity={0.55} />
          </mesh>
          <mesh ref={r2} position={[0, 0.2, -0.6]} rotation={[1.35, -0.35, 0.6]}>
            <torusGeometry args={[2.5, 0.004, 8, 220]} />
            <meshBasicMaterial color="#f4ede0" transparent opacity={0.25} />
          </mesh>
        </>
      )}
    </group>
  );
}
