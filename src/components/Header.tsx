import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed w-full z-40 px-4 sm:px-6 lg:px-8 py-4">
      <header
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white bg-opacity-60 backdrop-blur-md shadow-custom py-3' 
            : 'bg-white bg-opacity-30 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">
            RISHAV
          </a>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Home', 'Portfolio', 'Team', 'Clients', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-800 hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full mt-2 left-0 right-0 bg-white bg-opacity-60 backdrop-blur-md shadow-custom md:hidden rounded-xl mx-4"
              >
                <nav className="container py-4">
                  <ul className="space-y-4">
                    {['Home', 'Portfolio', 'Team', 'Clients', 'Contact'].map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="block text-gray-800 hover:text-black transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
};

export default Header;