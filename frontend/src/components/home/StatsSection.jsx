/**
 * Introduction Section - Immersive sensory experience
 */

import { motion } from 'framer-motion';

const StatsSection = () => {
  return (
    <section className="relative py-0">
      {/* Split Screen Layout */}
      <div className="flex flex-col lg:flex-row min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
        {/* Left Side - Ambient Image */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="lg:w-1/2 relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] lg:min-h-full"
        >
          <div className="absolute inset-0">
            <img
              src="/images/intro-main.jpg" // left main image
              alt="Modesta Resort Paradise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent" />
          </div>
        </motion.div>

        {/* Right Side - Poetic Prose */}
        <div className="lg:w-1/2 flex items-center bg-white">
          <div className="container-custom py-12 sm:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              {/* Decorative Line */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-copper mb-4 sm:mb-6 max-w-lg"
              />

              {/* Opening Line */}
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-forest mb-4 sm:mb-5 md:mb-6 leading-tight tracking-wide"
              >
                Escape to Where Time Slows
              </motion.h2>

              {/* First Paragraph - Setting the Scene */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-sm sm:text-base md:text-lg text-charcoal/70 leading-relaxed mb-4 sm:mb-5 font-light"
              >
                Nestled between emerald mountains and crystalline waters, Modesta Resort
                awakens on 150 pristine acres of untouched paradise. Here, the whisper of
                palm fronds dancing in tropical breezes becomes your soundtrack.
              </motion.p>

              {/* Second Paragraph - Sensory Details */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-sm sm:text-base md:text-lg text-charcoal/70 leading-relaxed mb-4 sm:mb-5 font-light"
              >
                Breathe in the delicate fragrance of jasmine at dawn. Feel warm sand
                beneath your feet as you stroll private shores. Watch as golden hour
                transforms the horizon into a canvas of amber, rose, and violet—each
                sunset more breathtaking than the last.
              </motion.p>

              {/* Third Paragraph - The Experience */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.1 }}
                className="text-sm sm:text-base md:text-lg text-charcoal/70 leading-relaxed mb-6 sm:mb-8 font-light"
              >
                This is more than a destination. It's a sanctuary where nature and luxury
                converge in perfect harmony. Where every detail—from hand-selected linens
                to personalized service—honors your journey to absolute tranquility.
              </motion.p>

              {/* Closing Line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.3 }}
              >
                <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper font-light mb-1 tracking-wide">
                  Your story begins at Modesta.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-charcoal/50 italic font-light tracking-wide">
                  Where every moment becomes a cherished memory.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Accent - Subtle detail images */}
      <div className="bg-cream py-8 sm:py-10 md:py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8"
          >
            <div className="overflow-hidden shadow-lg">
              <img
                src="/images/intro-detail-1.jpg"
                alt="Tropical Paradise"
                className="w-full h-24 sm:h-32 md:h-48 object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden shadow-lg">
              <img
                src="/images/intro-detail-2.jpg"
                alt="Ocean Serenity"
                className="w-full h-24 sm:h-32 md:h-48 object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden shadow-lg">
              <img
                src="/images/intro-detail-3.jpg"
                alt="Sunset Beauty"
                className="w-full h-24 sm:h-32 md:h-48 object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
