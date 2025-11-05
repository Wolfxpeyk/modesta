/**
 * Modesta Resort - Homepage
 * Jaw-dropping luxury resort homepage
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaStar, FaAward, FaUsers, FaHotel } from 'react-icons/fa';

// Import components
import HeroSection from '../components/home/HeroSection';
import FeaturedRooms from '../components/home/FeaturedRooms';
import ExperiencesSection from '../components/home/ExperiencesSection';
import StatsSection from '../components/home/StatsSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Modesta Resort - Ultimate Luxury Resort Experience</title>
        <meta
          name="description"
          content="Experience unparalleled luxury at Modesta Resort. World-class accommodations, fine dining, spa services, and exceptional hospitality."
        />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Rooms */}
      <FeaturedRooms />

      {/* Experiences */}

      {/* Pre-Footer Experience Highlight */}
      <section className="relative h-screen w-full overflow-hidden" data-hero-section>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="/images/pre-footer-hero.jpg"
            alt="Modesta Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </motion.div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Image 1 */}
          <motion.div
            className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
            style={{ left: '5%', top: '80%' }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.4, 0.95, 0.95, 0.4, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut",
            }}
          >
            <img src="/images/intro-detail-1.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

          {/* Image 2 */}
          <motion.div
            className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
            style={{ left: '75%', top: '85%' }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.4, 0.95, 0.95, 0.4, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 3.5,
              ease: "easeInOut",
            }}
          >
            <img src="/images/intro-detail-2.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

          {/* Image 3 */}
          <motion.div
            className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
            style={{ left: '40%', top: '75%' }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.4, 0.95, 0.95, 0.4, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 7,
              ease: "easeInOut",
            }}
          >
            <img src="/images/intro-detail-3.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

          {/* Image 4 - Hidden on mobile for less clutter */}
          <motion.div
            className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 hidden sm:block"
            style={{ left: '85%', top: '70%' }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.4, 0.95, 0.95, 0.4, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 2,
              ease: "easeInOut",
            }}
          >
            <img src="/images/cabin-1-small-1.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

          {/* Image 5 - Hidden on mobile for less clutter */}
          <motion.div
            className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 hidden sm:block"
            style={{ left: '15%', top: '65%' }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.4, 0.95, 0.95, 0.4, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 5.5,
              ease: "easeInOut",
            }}
          >
            <img src="/images/cabin-2-small-1.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

          {/* Image 6 */}
          <motion.div
            className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
            style={{ left: '60%', top: '90%' }}
            animate={{
              y: [0, -500],
              opacity: [0, 0.4, 0.95, 0.95, 0.4, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 9,
              ease: "easeInOut",
            }}
          >
            <img src="/images/cabin-3-small-1.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>
        </div>

        {/* CTA Card */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative bg-white/95 backdrop-blur-sm shadow-2xl max-w-[280px] sm:max-w-xs w-full p-6 md:p-8 text-center overflow-visible"
          >
            {/* Decorative Corner Ornaments */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-copper/40 -translate-x-2 -translate-y-2" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-copper/40 translate-x-2 -translate-y-2" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-copper/40 -translate-x-2 translate-y-2" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-copper/40 translate-x-2 translate-y-2" />

            {/* Decorative Line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '60%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-px bg-gradient-to-r from-transparent via-copper to-transparent mb-5 mx-auto"
            />

            <h2 className="text-xl md:text-2xl font-playfair font-bold text-forest mb-3 leading-tight tracking-wide">
              Find Your Way to Paradise
            </h2>

            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed mb-6 font-light">
              Every journey leads somewhere special. Discover where your next escape begins.
            </p>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-px bg-copper/30" />
              <svg className="w-2 h-2 text-copper" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="w-8 h-px bg-copper/30" />
            </div>

            <a
              href="#about"
              className="bg-copper text-white px-7 py-2.5 font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2 group"
            >
              <svg className="w-3 h-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View on the Map
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
