import { useState } from 'react';
import SplitText from '../ui/SplitText';
import Reveal from '../ui/Reveal';
import Marquee from '../ui/Marquee';
import MagneticButton from '../ui/MagneticButton';

export default function CtaSection() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) setSent(true);
  };
  return (
    <section className="sec cta">
      <Reveal><p className="eyebrow">05 — Begin</p></Reveal>
      <SplitText as="h2" className="cta-title" italicWords={['light.']}>Wear the light.</SplitText>
      <Reveal delay={0.2}>
        <div className="cta-actions">
          <MagneticButton to="/collection">Shop the collection</MagneticButton>
        </div>
      </Reveal>
      <Reveal delay={0.3} className="cta-news">
        {sent ? (
          <p className="ok">Thank you — you are on the list (demo).</p>
        ) : (
          <form onSubmit={submit}>
            <input type="email" placeholder="Join the list — your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </Reveal>
      <Marquee items={['Eau de Parfum', 'Small batch', 'Hand-poured glass', 'Refillable', 'Made slowly']} />
    </section>
  );
}
