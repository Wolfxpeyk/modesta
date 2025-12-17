/**
 * Introduction Section - Immersive sensory experience
 */

import { motion } from 'framer-motion';

const IntroSection = () => {
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
          <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl"
            >
              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-px bg-copper mb-5 sm:mb-6 max-w-xs sm:max-w-sm"
              />

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-5 sm:mb-6 leading-tight tracking-wide"
              >
                Escape to Where Time Slows
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl font-playfair italic text-copper mb-5 sm:mb-6 font-light leading-relaxed"
              >
                Where Paradise Meets Perfection
              </motion.p>

              {/* Introduction */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-3 sm:mb-4 font-light"
              >
                Nestled between emerald mountains and crystalline waters, Modesta Resort
                awakens on 150 pristine acres of untouched paradise. Here, the whisper of
                palm fronds dancing in tropical breezes becomes your soundtrack.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-3 sm:mb-4 font-light"
              >
                Breathe in the delicate fragrance of jasmine at dawn. Feel warm sand
                beneath your feet as you stroll private shores. Watch as golden hour
                transforms the horizon into a canvas of amber, rose, and violet—each
                sunset more breathtaking than the last.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-6 sm:mb-8 font-light"
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
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper font-light mb-1 tracking-wide">
                  Your story begins at Modesta.
                </p>
                <p className="text-xs sm:text-sm text-charcoal/50 italic font-light tracking-wide">
                  Where every moment becomes a cherished memory.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
