/**
 * Hero Section - Jaw-dropping introduction to Modesta Resort
 */

import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen overflow-hidden" data-hero-section>
      {/* Background Video with Portrait Mode Handling */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          style={{
            // For portrait videos, ensure it covers the entire viewport
            // The video will be centered and scaled to cover
            maxWidth: 'none',
          }}
        >
          <source src="/videos/compressed-SrIbUFSI.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
            alt="Modesta Resort"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-2 sm:space-y-3"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-light text-white tracking-widest">
              MODESTA
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight tracking-widest">
              RESORT
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-cream tracking-wide pt-2 sm:pt-3">
              Where Luxury Meets Paradise
            </p>
          </motion.div>

          {/* ORIGINAL BUTTONS - Commented out for now, can be restored if needed
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <button className="bg-copper text-white px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-copper/50 transform hover:-translate-y-0.5">
              Book Your Stay
            </button>
            <button className="bg-transparent text-white px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-xs tracking-widest uppercase border border-white/50 hover:bg-white/10 hover:border-white transition-all duration-300">
              Discover More
            </button>
          </motion.div>
          */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-0 right-0 flex justify-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={scrollToContent}
          className="text-white animate-bounce flex items-center justify-center"
          aria-label="Scroll to content"
        >
          <FaChevronDown className="text-2xl sm:text-3xl" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
