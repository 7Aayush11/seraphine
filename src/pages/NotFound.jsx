import SplitText from '../components/ui/SplitText';
import MagneticButton from '../components/ui/MagneticButton';

export default function NotFound() {
  return (
    <div className="inner notfound">
      <p className="eyebrow">404</p>
      <SplitText as="h1" italicWords={['lost']}>This scent has drifted away.</SplitText>
      <MagneticButton to="/">Back to home</MagneticButton>
    </div>
  );
}
