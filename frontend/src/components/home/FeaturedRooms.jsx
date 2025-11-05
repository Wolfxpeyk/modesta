/**
 * Featured Rooms Section - Storytelling Layout
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FeaturedRooms = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const accommodations = [
    {
      id: 1,
      name: 'Cabin 1',
      tagline: 'Where Dreams Touch the Sky',
      heroImage: '/images/cabin-1-main.jpg',
      details: [
        {
          image: '/images/cabin-1-small-1.jpg',
          text: 'Wake to sunrise over endless ocean horizons, where each morning brings renewed wonder.'
        },
        {
          image: '/images/cabin-1-small-2.jpg',
          text: 'Surrender to unparalleled luxury in 1,200 square feet of pure elegance and sophistication.'
        },
        {
          image: '/images/cabin-1-small-3.jpg',
          text: 'Your private sanctuary awaits, where every detail whispers perfection.'
        }
      ]
    },
    {
      id: 2,
      name: 'Cabin 2',
      tagline: 'Merge with the Horizon',
      heroImage: '/images/cabin-2-main.jpg',
      details: [
        {
          image: '/images/cabin-2-small-1.jpg',
          text: 'Float between sky and sea, where water meets infinity and time stands still.'
        },
        {
          image: '/images/cabin-2-small-2.jpg',
          text: 'Bask in golden hour glow as the sun paints the water in shades of amber and rose.'
        },
        {
          image: '/images/cabin-2-small-3.jpg',
          text: 'Experience serenity redefined in our award-winning aquatic retreat.'
        }
      ]
    },
    {
      id: 3,
      name: 'Cabin 3',
      tagline: 'A Symphony of Nature',
      heroImage: '/images/cabin-3-main.jpg',
      details: [
        {
          image: '/images/cabin-3-small-1.jpg',
          text: 'Nestled in lush tropical gardens, where birdsong is your morning alarm.'
        },
        {
          image: '/images/cabin-3-small-2.jpg',
          text: 'Find tranquility in your private oasis, surrounded by exotic flora and fragrant blooms.'
        },
        {
          image: '/images/cabin-3-small-3.jpg',
          text: 'Nature and luxury intertwine in perfect harmony, creating your personal Eden.'
        }
      ]
    }
  ];

  return (
    <>
      {isMounted && createPortal(
        <AnimatePresence mode="wait">
          {activeSection && (
            <div
              className="fixed inset-0 z-50 pointer-events-none"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <motion.h2
                key={activeSection}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  exit: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-light text-copper tracking-widest text-center px-4"
                style={{
                  textShadow: '0 2px 30px rgba(0, 0, 0, 0.3)',
                  willChange: 'transform, opacity',
                  position: 'relative'
                }}
              >
                {accommodations.find(a => a.id === activeSection)?.name}
              </motion.h2>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
      <section className="bg-cream">
        <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-copper mb-4 md:mb-6 max-w-xs mx-auto"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-forest mb-2 md:mb-3 tracking-wide px-4">
            Discover Your Sanctuary
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Each space tells a story. Each moment becomes a memory.
          </p>
        </motion.div>

        {/* Accommodation Stories */}
        {accommodations.map((accommodation, index) => (
          <motion.div
            key={accommodation.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => {
              // Clear any existing timeout first
              if (timeoutId) {
                clearTimeout(timeoutId);
              }

              // Set new active section
              setActiveSection(accommodation.id);

              // Store the new timeout ID
              const newTimeoutId = setTimeout(() => setActiveSection(null), 2000);
              setTimeoutId(newTimeoutId);
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-40 md:mb-48 lg:mb-56 last:mb-0 pb-16 md:pb-20 lg:pb-24 border-b-2 border-copper/20 last:border-b-0 relative"
          >
            {/* Section Title */}
            <div className="text-center mb-10 md:mb-14 lg:mb-16 pt-8 md:pt-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-forest mb-2 md:mb-3 tracking-wide px-4">
                {accommodation.name}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper font-light tracking-wide px-4">
                {accommodation.tagline}
              </p>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-12 md:mb-16 overflow-hidden shadow-2xl h-[40vh] sm:h-[50vh] md:h-[60vh]"
            >
              <img
                src={accommodation.heroImage}
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Alternating Details */}
            <div className="space-y-12 md:space-y-16">
              {accommodation.details.map((detail, detailIndex) => (
                <motion.div
                  key={detailIndex}
                  initial={{ opacity: 0, x: detailIndex % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: detailIndex * 0.2 }}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 ${
                    detailIndex % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Small Image */}
                  <div className="w-full md:w-1/2 overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
                    <img
                      src={detail.image}
                      alt={`${accommodation.name} detail ${detailIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description */}
                  <div className="w-full md:w-1/2 px-4 md:px-0">
                    <p className="text-sm sm:text-base md:text-lg text-charcoal/70 font-light leading-relaxed italic">
                      {detail.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link to="/rooms" className="bg-copper text-white px-6 sm:px-10 py-2.5 sm:py-4 font-semibold text-xs sm:text-sm tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
            Explore All Accommodations
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default FeaturedRooms;
