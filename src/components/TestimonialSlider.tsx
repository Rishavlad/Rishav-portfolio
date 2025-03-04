import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "His editing skills transformed my content completely. Very professional work!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Mike Chen",
    text: "Thanks to his creative videos, my social media following grew by 300%",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Emma Davis",
    text: "Best video editor I've worked with. Quick turnaround and amazing quality!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Alex Thompson",
    text: "He understands exactly what creators need. Highly recommended!",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Rachel Kim",
    text: "My YouTube channel took off after working with him. Outstanding editing!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "David Martinez",
    text: "Creative transitions and perfect timing. He's a editing genius!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  }
];

// Duplicate testimonials for infinite scroll effect
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialSlider: React.FC = () => {
  return (
    <section className="testimonial-container bg-gray-50 py-10">
      <div className="container mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">What Our Clients Say</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Don't just take our word for it - hear from some of our satisfied clients
        </p>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="testimonial-wrapper flex">
          {/* First set of testimonials */}
          <div className="testimonial-track flex gap-6 animate-scroll">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          {/* Duplicated set for seamless looping */}
          <div className="testimonial-track flex gap-6 animate-scroll">
            {testimonials.map((testimonial) => (
              <TestimonialCard 
                key={`dup-${testimonial.id}`} 
                testimonial={testimonial} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div 
      className="review-box bg-white rounded-xl shadow-md p-6 w-[300px] flex-shrink-0"
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)" 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-[60px] h-[60px] rounded-full object-cover mr-4"
          loading="lazy"
        />
        <div>
          <h3 className="font-bold text-lg">{testimonial.name}</h3>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 line-clamp-2">{testimonial.text}</p>
    </motion.div>
  );
};

export default TestimonialSlider;