/**
 * Modesta Resort - About Page
 * Our story, values, and the people behind the experience
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaLeaf, FaStar, FaHeart, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const AboutPage = () => {
  // Core values
  const values = [
    {
      icon: <FaLeaf />,
      title: 'Sustainability',
      description: 'We honor the earth that sustains us through eco-conscious practices and renewable initiatives.',
    },
    {
      icon: <FaStar />,
      title: 'Excellence',
      description: 'Every detail matters. From sunrise to sunset, we pursue perfection in service and experience.',
    },
    {
      icon: <FaHeart />,
      title: 'Authenticity',
      description: 'We celebrate genuine connections, local culture, and the beauty of being truly present.',
    },
    {
      icon: <FaUsers />,
      title: 'Hospitality',
      description: 'Warm hearts and open doors. We welcome you not as guests, but as cherished members of our family.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Modesta Resort</title>
        <meta
          name="description"
          content="Discover the story behind Modesta Resort. Learn about our heritage, values, and the passionate team dedicated to creating unforgettable experiences."
        />
      </Helmet>

      {/* Hero Section - Split Screen */}
      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-0">
        <div className="flex flex-col lg:flex-row min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:w-1/2 relative overflow-hidden min-h-[45vh] sm:min-h-[50vh] lg:min-h-full"
          >
            <div className="absolute inset-0">
              <img
                src="/images/intro-main.jpg"
                alt="Modesta Resort"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex items-center bg-white">
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="max-w-xl"
              >
                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="h-px bg-copper mb-5 sm:mb-6 max-w-xs sm:max-w-sm"
                />

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-5 sm:mb-6 leading-tight tracking-wide"
                >
                  Our Story
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="text-base sm:text-lg md:text-xl font-playfair italic text-copper mb-5 sm:mb-6 font-light leading-relaxed"
                >
                  Where Vision Became Paradise
                </motion.p>

                {/* Introduction */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-3 sm:mb-4 font-light"
                >
                  Modesta Resort was born from a simple yet profound vision: to create a sanctuary where
                  the world's weary souls could rediscover wonder. What began as a dream in 1998 has
                  blossomed into a destination that redefines luxury hospitality.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-6 sm:mb-8 font-light"
                >
                  Nestled on 150 pristine acres of tropical paradise, we've cultivated more than a resort—
                  we've created a living tapestry where nature, culture, and exceptional service interweave
                  to craft experiences that transcend the ordinary.
                </motion.p>

                {/* Closing Line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                >
                  <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper font-light mb-1 tracking-wide">
                    Welcome to Modesta.
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal/50 italic font-light tracking-wide">
                    Where every guest becomes part of our story.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="relative py-14 sm:py-20 md:py-24 lg:py-28 bg-cream">
        <div className="flex flex-col lg:flex-row-reverse min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:w-1/2 relative overflow-hidden min-h-[45vh] sm:min-h-[50vh] lg:min-h-full"
          >
            <div className="absolute inset-0">
              <img
                src="/images/intro-detail-1.jpg"
                alt="Modesta Heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-charcoal/20 to-transparent" />
            </div>
          </motion.div>

          {/* Left Side - Content */}
          <div className="lg:w-1/2 flex items-center bg-cream">
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="max-w-xl lg:ml-auto"
              >
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-forest mb-5 sm:mb-6 leading-tight"
                >
                  A Dream Born from Passion
                </motion.h2>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* 1998 */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl sm:text-3xl font-playfair font-bold text-copper">1998</span>
                      <div className="flex-1 h-px bg-copper/30" />
                    </div>
                    <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-light">
                      A visionary architect discovered this untouched coastline and saw not what it was,
                      but what it could become—a haven where luxury and nature exist in perfect harmony.
                    </p>
                  </div>

                  {/* 2001 */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl sm:text-3xl font-playfair font-bold text-copper">2001</span>
                      <div className="flex-1 h-px bg-copper/30" />
                    </div>
                    <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-light">
                      Modesta Resort opened its doors with just 15 suites, each handcrafted with materials
                      sourced from the surrounding landscape. Our commitment to sustainability was born here.
                    </p>
                  </div>

                  {/* 2010 */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl sm:text-3xl font-playfair font-bold text-copper">2010</span>
                      <div className="flex-1 h-px bg-copper/30" />
                    </div>
                    <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-light">
                      Recognized by World Travel Awards as a leading luxury resort. Our expansion brought
                      new villas, an award-winning spa, and enhanced dining experiences.
                    </p>
                  </div>

                  {/* Today */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl sm:text-3xl font-playfair font-bold text-copper">Today</span>
                      <div className="flex-1 h-px bg-copper/30" />
                    </div>
                    <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-light">
                      Modesta has evolved into a 150-acre sanctuary, yet our essence remains unchanged:
                      creating transformative experiences while honoring the land and communities that sustain us.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative bg-cream py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
        <div className="container-custom relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-forest mb-3 tracking-tight">
              The Modesta Way
            </h2>
            <p className="text-base text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
              Our philosophy is woven into every experience we create—a commitment to excellence,
              authenticity, and the belief that true luxury nurtures both people and planet.
            </p>
          </motion.div>

          {/* Vertical Timeline Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical Center Line - Hidden on mobile */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-charcoal/10 hidden lg:block" />

            <div className="space-y-16 sm:space-y-20 md:space-y-24">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Side */}
                  <div className="flex-1 text-center lg:text-left flex items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      className={`w-full ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                    >
                      <h3 className="text-xl sm:text-2xl font-playfair font-bold text-forest mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-light max-w-md mx-auto lg:mx-0">
                        {value.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Icon Circle - Center */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    className="relative flex-shrink-0"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-cream rounded-full flex items-center justify-center border border-charcoal/10">
                      {/* Sequential Pulsing Animation */}
                      <motion.div
                        className="absolute inset-0 bg-copper/60 rounded-full"
                        animate={{
                          scale: [1, 1.8],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatDelay: 3.8,
                          delay: index * 1,
                          ease: "easeOut",
                        }}
                      />
                      <div className="text-copper text-xl sm:text-2xl md:text-3xl relative z-10">
                        {value.icon}
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty Space for Balance */}
                  <div className="flex-1 hidden lg:flex items-center" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA Section */}
      <section data-hero-section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="/images/pre-footer-hero.jpg"
            alt="Experience Modesta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/25 to-charcoal/50" />
        </motion.div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
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
              ease: 'easeInOut',
            }}
          >
            <img src="/images/intro-detail-1.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

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
              ease: 'easeInOut',
            }}
          >
            <img src="/images/intro-detail-2.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
          </motion.div>

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
              ease: 'easeInOut',
            }}
          >
            <img src="/images/intro-detail-3.jpg" alt="" className="w-full h-full object-cover shadow-2xl rounded" />
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
              Experience Modesta
            </h2>

            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed mb-6 font-light">
              Your story awaits in paradise. Let us craft an unforgettable journey tailored just for you.
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
              href="#"
              className="bg-copper text-white px-7 py-2.5 font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2 group"
            >
              <svg className="w-3 h-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Your Stay
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
