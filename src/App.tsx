import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Clients from './components/Clients';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import BackgroundGrid from './components/BackgroundGrid';
import BackgroundVideo from './components/BackgroundVideo';
import TestimonialSlider from './components/TestimonialSlider';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  // Video URLs properly formatted as string variables
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4";
  const fallbackImageUrl = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";

  return (
    <>
      <CustomCursor />
      {/* <BackgroundGrid /> */}
      <BackgroundVideo videoUrl={videoUrl} fallbackImageUrl={fallbackImageUrl} />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX }}
      />
      <Header />
      <main className="relative z-10">
        <Hero />
        <TestimonialSlider />
        <Portfolio />
        <Team />
        <Clients />
        <Contact />
      </main>
    </>
  );
}

export default App;