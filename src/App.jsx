import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useSmoothScroll from './hooks/useSmoothScroll';
import { lenisRef, scrollState } from './lib/scrollState';
import Preloader from './components/ui/Preloader';
import Cursor from './components/ui/Cursor';
import Navbar from './components/layout/Navbar';
import CartDrawer from './components/layout/CartDrawer';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Story from './pages/Story';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const resetScroll = () => {
  window.scrollTo(0, 0);
  scrollState.y = 0;
  lenisRef.current?.scrollTo(0, { immediate: true });
};

export default function App() {
  const location = useLocation();
  useSmoothScroll();

  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <CartDrawer />
      <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
          <Route path="/product/:slug" element={<PageTransition><Product /></PageTransition>} />
          <Route path="/story" element={<PageTransition><Story /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
