import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BackgroundVideoProps {
  videoUrl: string;
  fallbackImageUrl: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoUrl, fallbackImageUrl }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-[2px] z-10" />
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={fallbackImageUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url(${fallbackImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </video>
      
      {/* Gradient overlay for bottom fade effect */}
      <div 
        className="absolute inset-x-0 bottom-0 z-20 h-1/3" 
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Radial gradient for vignette effect */}
      <div 
        className="absolute inset-0 z-20" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />
    </motion.div>
  );
};

export default BackgroundVideo;