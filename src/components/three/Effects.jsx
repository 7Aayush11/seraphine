import { EffectComposer, Bloom, Vignette, Noise, SMAA } from '@react-three/postprocessing';

// Post-processing: soft glow on bright highlights, film grain, subtle vignette.
// multisampling={0} + SMAA avoids a black-bottle glitch that MSAA can cause with glass materials.
export default function Effects({ bloom = 0.5 }) {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom mipmapBlur intensity={bloom} luminanceThreshold={0.9} luminanceSmoothing={0.25} />
      <Noise opacity={0.035} />
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
      <SMAA />
    </EffectComposer>
  );
}
