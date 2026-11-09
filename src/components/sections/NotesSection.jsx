import SplitText from '../ui/SplitText';
import Reveal from '../ui/Reveal';
import NotesPyramid from '../ui/NotesPyramid';
import { perfumes } from '../../data/perfumes';

export default function NotesSection() {
  return (
    <section className="sec side-right">
      <div className="sec-text">
        <Reveal><p className="eyebrow">02 — The composition</p></Reveal>
        <SplitText as="h2" italicWords={['unfolds']}>Every note unfolds in its own time.</SplitText>
        <Reveal delay={0.2}>
          <p className="lead">Top notes arrive first, bright and fleeting. The heart blooms within the hour. The base remains long after you have left the room.</p>
        </Reveal>
        <NotesPyramid notes={perfumes[0].notes} />
      </div>
    </section>
  );
}
