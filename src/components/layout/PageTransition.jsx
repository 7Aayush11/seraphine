import { motion } from 'framer-motion';
import Footer from './Footer';

// Wraps every page: a dark curtain wipes across, and the page fades (opacity only,
// so the fixed 3D canvas inside the home page keeps working).
export default function PageTransition({ children }) {
  return (
    <>
      <motion.main className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        {children}
        <Footer />
      </motion.main>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0, originY: 0, transition: { duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] } }}
        exit={{ scaleY: 1, originY: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      >
        <span>SÉRAPHINE</span>
      </motion.div>
    </>
  );
}
