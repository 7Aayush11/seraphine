import { Environment, Lightformer } from '@react-three/drei';

// Reflections for glass + gold come from light panels built in code (no HDR download needed).
export default function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={5} color="#fff2e0" position={[0, 5, -6]} scale={[12, 4, 1]} />
      <Lightformer form="rect" intensity={3.5} color="#ffb067" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[9, 3, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#ff9fbd" position={[6, 0, 2]} rotation-y={-Math.PI / 2} scale={[9, 3, 1]} />
      <Lightformer form="ring" intensity={2.5} color="#ffffff" position={[0, 0.5, -7]} scale={7} />
      <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, -4, 3]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
    </Environment>
  );
}
