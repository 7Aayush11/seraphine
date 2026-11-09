import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { makeLabelTexture } from './labelTexture';

// A fully procedural perfume bottle (no model files). Glass = transmission material,
// liquid = glossy emissive box, cap = lathed metal.
// `colors` (optional ref with THREE.Color liquid/glass) lets the scroll scene recolour it live.
const H = 2.1; // body height
const W = 1.5;
const D = 0.78;

export default function Bottle({
  name = "Nuit d'Ambre",
  liquid = '#d9892b',
  glass = '#fff1dc',
  cap = '#c9a25a',
  quality = 'high',
  colors = null,
  ...props
}) {
  const liquidMat = useRef();
  const glassMat = useRef();
  const label = useMemo(() => makeLabelTexture(name), [name]);
  useEffect(() => () => label.dispose(), [label]);

  const lathe = useMemo(() => {
    const pts = [];
    const r = 0.34;
    const h = 0.72;
    pts.push(new THREE.Vector2(0.0001, 0));
    pts.push(new THREE.Vector2(r, 0));
    pts.push(new THREE.Vector2(r, h - 0.1));
    for (let i = 0; i <= 8; i++) {
      const a = (i / 8) * (Math.PI / 2);
      pts.push(new THREE.Vector2(r - 0.1 + Math.cos(a) * 0.1, h - 0.1 + Math.sin(a) * 0.1));
    }
    pts.push(new THREE.Vector2(0.0001, h));
    return pts;
  }, []);

  useEffect(() => {
    if (colors) return;
    liquidMat.current?.color.set(liquid);
    liquidMat.current?.emissive.set(liquid);
    glassMat.current?.color.set(glass);
  }, [liquid, glass, colors]);

  useFrame(() => {
    if (!colors?.current) return;
    liquidMat.current.color.copy(colors.current.liquid);
    liquidMat.current.emissive.copy(colors.current.liquid);
    glassMat.current.color.copy(colors.current.glass);
  });

  const hi = quality === 'high';
  const liquidH = 1.5;

  return (
    <group {...props}>
      <group position={[0, -0.42, 0]}>
        {/* glass body */}
        <RoundedBox args={[W, H, D]} radius={0.12} smoothness={hi ? 6 : 3} castShadow>
          <MeshTransmissionMaterial
            ref={glassMat}
            color={glass}
            transmission={1}
            thickness={0.8}
            roughness={0.03}
            ior={1.5}
            chromaticAberration={hi ? 0.06 : 0.02}
            anisotropicBlur={0.1}
            distortion={hi ? 0.12 : 0}
            distortionScale={0.4}
            temporalDistortion={hi ? 0.08 : 0}
            samples={hi ? 8 : 3}
            resolution={hi ? 1024 : 256}
            backside={false}
            envMapIntensity={1.4}
          />
        </RoundedBox>

        {/* liquid */}
        <RoundedBox args={[W - 0.2, liquidH, D - 0.2]} radius={0.07} smoothness={4} position={[0, -H / 2 + 0.3 + liquidH / 2, 0]}>
          <meshPhysicalMaterial
            ref={liquidMat}
            color={liquid}
            emissive={liquid}
            emissiveIntensity={0.22}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </RoundedBox>

        {/* atomiser tube */}
        <mesh position={[0.28, -0.05, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 1.75, 12]} />
          <meshStandardMaterial color="#efe7d6" roughness={0.3} transparent opacity={0.85} />
        </mesh>

        {/* label (on the front face, just inside the glass) */}
        <mesh position={[0, -0.12, D / 2 - 0.095]}>
          <planeGeometry args={[0.98, 0.612]} />
          <meshStandardMaterial map={label} roughness={0.6} metalness={0} />
        </mesh>

        {/* neck + collar */}
        <mesh position={[0, H / 2 + 0.06, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.14, 48]} />
          <meshStandardMaterial color={cap} metalness={1} roughness={0.25} envMapIntensity={1.8} />
        </mesh>
        <mesh position={[0, H / 2 + 0.16, 0]}>
          <torusGeometry args={[0.27, 0.035, 24, 64]} />
          <meshStandardMaterial color={cap} metalness={1} roughness={0.2} envMapIntensity={2} />
        </mesh>
        {/* cap */}
        <mesh position={[0, H / 2 + 0.17, 0]}>
          <latheGeometry args={[lathe, 64]} />
          <meshStandardMaterial color={cap} metalness={1} roughness={0.22} envMapIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}
