import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Talking Head Videos",
    description: "Videos of you specking with high quality edits",
    category: "Talking Video",
    videoUrl: "images/Videos/website video (2).mp4",
    thumbnailUrl: "/images/dance-thumbnail.jpg"
  },
  {
    id: 2,
    title: "3D Social Media Video",
    description: "Videos with 3D elements and feature for a professional looking Video",
    category: "3D Video",
    videoUrl: "images/Videos/website video (3).mp4",
    thumbnailUrl: "/images/fashion-thumbnail.jpg"
  },
  {
    id: 3,
    title: "Music Video Edit",
    description: "Attention grabbing musical video edits",
    category: "Music Video",
    videoUrl: "images/Videos/website video (4).mp4",
    thumbnailUrl: "/images/urban-thumbnail.jpg"
  },
  {
    id: 4,
    title: "Long into Short Form",
    description: "Convert your one long form video into multiple amazing short form videos",
    category: "Content Management",
    videoUrl: "images/Videos/website video (5).mp4",
    thumbnailUrl: "/images/yoga-thumbnail.jpg"
  },
  {
    id: 5,
    title: "Long Form Content",
    description: "One of our expertise is my our professional looking and High Quality long form content",
    category: "Long Form Content",
    videoUrl: "images/Videos/website video (6).mp4",
    thumbnailUrl: "/images/city-thumbnail.jpg"
  },
  {
    id: 6,
    title: "Hooks and Transitions",
    description: "Make your video stand out with creative hooks and transition",
    category: "Hooks",
    videoUrl: "https://github.com/user-attachments/assets/8a16ea18-f8d2-4326-8bd6-7f0f4e963d5b",
    thumbnailUrl: "/images/morning-thumbnail.jpg"
  }
];

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Our Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest video projects showcasing creative storytelling
            and professional production quality.
          </p>
        </motion.div>

        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && !isError) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setIsError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && !isError) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="video-card transform hover:scale-105 transition-all duration-300"
      style={{
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="relative" style={{ paddingBottom: '177.77%' }}> {/* 16:9 aspect ratio */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          poster={item.thumbnailUrl}
          src={item.videoUrl}
          muted
          playsInline
          loop
          autoPlay
          onError={() => setIsError(true)}
          loading="lazy"
        />
        
        <div className="video-overlay">
          <div className="video-controls">
            <button
              onClick={handlePlayPause}
              className="video-button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black" />
              )}
            </button>
            <button
              onClick={handleMuteToggle}
              className="video-button"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-black" />
              ) : (
                <Volume2 className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-b-xl">
        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
};

export default Portfolio;
