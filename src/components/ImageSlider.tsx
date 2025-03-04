import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the image data structure
interface SlideImage {
  id: number;
  url: string;
  alt: string;
  caption?: string;
}

interface ImageSliderProps {
  autoplaySpeed?: number;
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const slides: SlideImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    alt: "Marketing team collaboration meeting",
    caption: "Strategic Planning & Collaboration"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    alt: "Data analytics dashboard",
    caption: "Data-Driven Campaign Performance"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    alt: "Creative brainstorming session",
    caption: "Creative Ideation & Innovation"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    alt: "Digital marketing tools",
    caption: "Integrated Digital Marketing Solutions"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    alt: "Client success presentation",
    caption: "Delivering Client Success"
  }
];

const ImageSlider: React.FC<ImageSliderProps> = ({
  autoplaySpeed = 4000,
  showArrows = true,
  showDots = true,
  pauseOnHover = true,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, []);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  }, []);
  
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);
  
  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [nextSlide, autoplaySpeed, isPaused]);
  
  // Variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  
  // Track the direction of slide change for animation
  const [[page, direction], setPage] = useState([0, 0]);
  
  const paginate = useCallback((newDirection: number) => {
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    setPage([page + newDirection, newDirection]);
  }, [nextSlide, prevSlide, page]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Main slider container with 16:9 aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <img
                src={slides[currentIndex].url}
                alt={slides[currentIndex].alt}
                className="w-full h-full object-cover"
                loading={currentIndex === 0 ? "eager" : "lazy"}
              />
              
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="container mx-auto">
                  <h3 className="text-white text-2xl font-bold">
                    {slides[currentIndex].caption}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Pagination dots */}
      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;