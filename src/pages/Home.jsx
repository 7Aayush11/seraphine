import HomeScene from '../components/three/HomeScene';
import Hero from '../components/sections/Hero';
import StorySection from '../components/sections/StorySection';
import NotesSection from '../components/sections/NotesSection';
import CraftSection from '../components/sections/CraftSection';
import CollectionList from '../components/sections/CollectionList';
import CtaSection from '../components/sections/CtaSection';

// The whole page is 6 "screens". The 3D bottle (fixed canvas) moves between them as you scroll.
export default function Home() {
  return (
    <div className="home">
      <HomeScene />
      <div className="home-content">
        <Hero />
        <StorySection />
        <NotesSection />
        <CraftSection />
        <CollectionList />
        <CtaSection />
      </div>
    </div>
  );
}
