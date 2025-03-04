import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BackgroundGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, #808080 1px, transparent 1px),
          linear-gradient(to bottom, #808080 1px, transparent 1px)
        `,
        backgroundSize: '25px 25px',
        backgroundPosition: 'center center',
        maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.8) 100%)'
      }}
    >
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.03) 100%)'
        }}
      />
    </motion.div>
  );
};

export default BackgroundGrid;