/**
 * Modesta Resort - Events & Celebrations Page
 * Weddings, Celebrations, Corporate Events, and Special Occasions
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaHeart, FaBirthdayCake, FaBriefcase, FaGlassCheers, FaUsers, FaCamera, FaMusic, FaMapMarkerAlt } from 'react-icons/fa';

const EventsPage = () => {
  // Event categories
  const eventTypes = [
    {
      id: 'weddings',
      name: 'Dream Weddings',
      icon: <FaHeart />,
      tagline: 'Your fairytale begins here',
      description: 'Exchange vows in paradise with breathtaking ocean views as your backdrop. Our wedding specialists will craft your perfect day, from intimate ceremonies to grand celebrations.',
      image: '/images/events/wedding.jpg',
      features: [
        'Beachfront ceremony venues',
        'Garden wedding settings',
        'Infinity pool backdrop',
        'Customized decoration packages',
        'Professional wedding coordinator',
        'Bridal suite with ocean view',
        'Guest accommodation packages',
        'Honeymoon suite upgrade'
      ],
      packages: [
        {
          name: 'Intimate Garden Wedding',
          description: 'Perfect for up to 50 guests in our tropical garden',
          includes: ['Ceremony setup', 'Floral arrangements', 'Sound system', 'Seats for guests']
        },
        {
          name: 'Beachfront Celebration',
          description: 'Sunset ceremony for up to 100 guests',
          includes: ['Beach setup', 'Wedding arch', 'Aisle decoration', 'Cocktail hour setup']
        },
        {
          name: 'Grand Infinity Pool Wedding',
          description: 'Luxury celebration for up to 200 guests',
          includes: ['Full venue decoration', 'Lighting design', 'Stage setup', 'VIP lounge area']
        }
      ]
    },
    {
      id: 'birthdays',
      name: 'Birthday Celebrations',
      icon: <FaBirthdayCake />,
      tagline: 'Make your special day unforgettable',
      description: 'From milestone birthdays to intimate gatherings, celebrate your special day in tropical paradise. Custom themes, gourmet catering, and entertainment to create lasting memories.',
      image: '/images/events/birthday.jpg',
      features: [
        'Custom themed decorations',
        'Poolside party setups',
        'Beach bonfire celebrations',
        'Catering from Lola Maam\'s',
        'DJ and entertainment options',
        'Photo booth services',
        'Birthday cake customization',
        'Party favors and gifts'
      ],
      packages: [
        {
          name: 'Kids Paradise Party',
          description: 'Fun-filled celebration for children (up to 30 kids)',
          includes: ['Themed decorations', 'Games & activities', 'Balloon arrangements', 'Party host']
        },
        {
          name: 'Milestone Celebration',
          description: 'Elegant party for significant birthdays (up to 80 guests)',
          includes: ['Premium setup', 'Live entertainment', 'Cocktail service', 'Photography']
        },
        {
          name: 'Beach Sunset Party',
          description: 'Relaxed beachfront celebration (up to 50 guests)',
          includes: ['Beach setup', 'Bonfire', 'BBQ catering', 'Acoustic music']
        }
      ]
    },
    {
      id: 'corporate',
      name: 'Corporate Events',
      icon: <FaBriefcase />,
      tagline: 'Where business meets paradise',
      description: 'Host productive meetings, team building activities, and corporate retreats in our inspiring tropical setting. Modern facilities combined with exceptional service ensure your event\'s success.',
      image: '/images/events/corporate.jpg',
      features: [
        'Conference rooms with AV equipment',
        'High-speed WiFi throughout',
        'Outdoor team building venues',
        'Professional event coordination',
        'Coffee break & meal services',
        'Accommodation packages',
        'Transportation arrangements',
        'Customized activity programs'
      ],
      packages: [
        {
          name: 'Half-Day Meeting',
          description: 'Professional meeting space for up to 40 attendees',
          includes: ['Meeting room', 'AV equipment', 'Coffee breaks', 'Note pads & pens']
        },
        {
          name: 'Full-Day Conference',
          description: 'Complete conference package for up to 100 attendees',
          includes: ['Conference hall', 'Lunch & refreshments', 'Technical support', 'Event coordinator']
        },
        {
          name: 'Corporate Retreat',
          description: 'Multi-day team building experience (20-50 participants)',
          includes: ['Accommodation', 'All meals', 'Team activities', 'Dedicated facilitator']
        }
      ]
    },
    {
      id: 'celebrations',
      name: 'Special Celebrations',
      icon: <FaGlassCheers />,
      tagline: 'Every occasion deserves to be celebrated',
      description: 'Anniversaries, graduations, reunions, and more. Whatever your celebration, we\'ll help you create an extraordinary experience that your guests will remember forever.',
      image: '/images/events/celebration.jpg',
      features: [
        'Flexible venue options',
        'Custom menu planning',
        'Themed decoration services',
        'Entertainment coordination',
        'Guest accommodation assistance',
        'Photography packages',
        'Special dietary accommodations',
        'Event timeline planning'
      ],
      packages: [
        {
          name: 'Garden Party',
          description: 'Elegant outdoor celebration (up to 60 guests)',
          includes: ['Garden venue', 'Tables & chairs', 'Basic decoration', 'Service staff']
        },
        {
          name: 'Poolside Celebration',
          description: 'Luxury poolside event (up to 100 guests)',
          includes: ['Poolside setup', 'Premium catering', 'Bar service', 'DJ/Live music']
        },
        {
          name: 'Grand Celebration',
          description: 'All-inclusive event (up to 200 guests)',
          includes: ['Full venue rental', 'Premium package', 'Entertainment', 'Photography/Video']
        }
      ]
    }
  ];

  // Additional services
  const additionalServices = [
    {
      icon: <FaCamera />,
      name: 'Photography & Videography',
      description: 'Professional photo and video coverage to capture every precious moment'
    },
    {
      icon: <FaMusic />,
      name: 'Entertainment',
      description: 'Live bands, DJs, acoustic musicians, and cultural performances'
    },
    {
      icon: <FaUsers />,
      name: 'Event Coordination',
      description: 'Dedicated event planners to handle every detail from start to finish'
    },
    {
      icon: <FaGlassCheers />,
      name: 'Catering Excellence',
      description: 'Custom menus from Lola Maam\'s Restaurant with international and Filipino cuisine'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Events & Celebrations - Modesta Resort</title>
        <meta
          name="description"
          content="Host unforgettable weddings, birthdays, corporate events, and celebrations at Modesta Resort. Stunning venues, exceptional service, and tropical paradise setting."
        />
      </Helmet>

      {/* Hero Section */}
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
                src="/images/events/events-hero.jpg"
                alt="Events at Modesta Resort"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />
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
                  className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 sm:mb-4 leading-tight tracking-wide"
                >
                  Events & Celebrations
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-2xl font-playfair italic text-copper mb-5 sm:mb-6"
                >
                  Celebrate life's precious moments in paradise
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-4 font-light"
                >
                  From intimate gatherings to grand celebrations, Modesta Resort provides the
                  perfect canvas for your most cherished moments. Our stunning tropical setting,
                  world-class facilities, and dedicated event team ensure every detail exceeds
                  your expectations.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-6 sm:mb-8 font-light"
                >
                  Whether you're planning a dream wedding, milestone birthday, corporate retreat,
                  or special celebration, we'll transform your vision into an unforgettable
                  reality.
                </motion.p>

                {/* Stats - Column Layout */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="space-y-2 mt-6 text-xs sm:text-sm text-charcoal/70"
                >
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-copper" />
                    <span>Capacity up to 200+ guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-copper" />
                    <span>5 unique venue options available</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="bg-cream py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-14 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 sm:mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light px-4">
              Discover our specialized event packages designed to make your celebration extraordinary
            </p>
          </motion.div>

          {/* Event Type Cards */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-start`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden shadow-xl hover:shadow-2xl h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-sm"
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-copper text-white p-3 rounded-full">
                      <div className="text-xl">{event.icon}</div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-forest mb-4 sm:mb-5 leading-tight">
                    {event.name}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper/90 mb-6 sm:mb-7 font-light leading-relaxed">
                    {event.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-6 sm:mb-7 font-light">
                    {event.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 sm:mb-7">
                    <h4 className="text-xs sm:text-sm font-medium text-forest/80 mb-3 sm:mb-4">
                      Features & Services
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {event.features.slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-charcoal/70 text-xs sm:text-sm">
                          <span className="w-1.5 h-1.5 bg-copper rounded-full flex-shrink-0"></span>
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {event.features.length > 6 && (
                      <p className="text-xs text-copper/70 mt-3 flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-copper/50 rounded-full"></span>
                        <span className="font-medium">+ {event.features.length - 6} more services available</span>
                      </p>
                    )}
                  </div>

                  {/* Packages */}
                  <div className="border-t border-copper/20 pt-6">
                    <h4 className="text-xs sm:text-sm font-medium text-forest/80 mb-4">
                      Popular Packages
                    </h4>
                    <div className="space-y-3">
                      {event.packages.map((pkg, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-sm border border-copper/10">
                          <h5 className="text-sm sm:text-base font-semibold text-forest mb-1">
                            {pkg.name}
                          </h5>
                          <p className="text-xs sm:text-sm text-charcoal/60 mb-2">
                            {pkg.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.includes.slice(0, 3).map((item, i) => (
                              <span key={i} className="text-[10px] sm:text-xs bg-cream text-copper px-2 py-1 rounded-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-white py-14 sm:py-20 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 sm:mb-4">
              Enhanced Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light px-4">
              Elevate your event with our premium add-on services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-cream p-6 sm:p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-copper/20 text-center"
              >
                <div className="text-4xl text-copper mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-playfair font-bold text-forest mb-3">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream py-14 sm:py-20 md:py-24">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-copper/30 max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10"
            />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-forest mb-3 sm:mb-4">
              Start Planning Your Event
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 mb-8 sm:mb-10 font-light leading-relaxed max-w-2xl mx-auto">
              Our event specialists are ready to help you create an extraordinary celebration.
              Contact us today for a personalized consultation and quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-copper text-white px-8 py-3.5 font-semibold text-xs tracking-widest uppercase hover:bg-copper/90 transition-all duration-300 shadow-lg"
              >
                Request a Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-copper/40 text-copper px-8 py-3.5 font-semibold text-xs tracking-widest uppercase hover:border-copper hover:bg-copper/5 transition-all duration-300"
              >
                Schedule a Tour
              </motion.button>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/60 italic">
              Available for events of all sizes • Customizable packages • Dedicated event coordinator
            </p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px bg-copper/30 max-w-xs sm:max-w-md mx-auto mt-8 sm:mt-10"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
