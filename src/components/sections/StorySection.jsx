import SplitText from '../ui/SplitText';
import Reveal from '../ui/Reveal';

export default function StorySection() {
  return (
    <section className="sec side-left">
      <div className="sec-text">
        <Reveal><p className="eyebrow">01 — The idea</p></Reveal>
        <SplitText as="h2" italicWords={['memory']}>A fragrance is a memory you wear.</SplitText>
        <Reveal delay={0.2}>
          <p className="lead">
            We compose each scent the way a sculptor works with light — removing everything that does not belong until only the essential remains. Slow, deliberate, and made to be noticed quietly.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="points">
            <li><b>Small batch</b><span>Blended in limited runs</span></li>
            <li><b>Refillable</b><span>Glass made to be kept</span></li>
            <li><b>Considered</b><span>Sourced with care</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
