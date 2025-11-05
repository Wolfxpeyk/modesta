/**
 * Experiences Section
 */

import { motion } from 'framer-motion';
import { FaSpa, FaUtensils, FaSwimmer, FaHiking } from 'react-icons/fa';

const ExperiencesSection = () => {
  const experiences = [
    {
      icon: FaSpa,
      title: 'World-Class Spa',
      description: 'Rejuvenate your body and mind with our luxurious spa treatments and wellness programs.',
    },
    {
      icon: FaUtensils,
      title: 'Fine Dining',
      description: 'Savor exquisite culinary creations prepared by our award-winning chefs.',
    },
    {
      icon: FaSwimmer,
      title: 'Infinity Pools',
      description: 'Relax in our stunning infinity pools with breathtaking ocean views.',
    },
    {
      icon: FaHiking,
      title: 'Adventures',
      description: 'Explore the natural beauty with guided tours and exciting outdoor activities.',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 md:mb-4">
            Unforgettable Experiences
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto px-4">
            Discover a world of exceptional amenities and activities designed to create lasting memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group px-4"
            >
              <div className="mb-4 md:mb-6 relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-copper-100 rounded-full flex items-center justify-center group-hover:bg-copper transition-colors duration-300">
                  <exp.icon className="text-2xl sm:text-3xl text-copper group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-playfair font-bold text-forest mb-2 md:mb-3">
                {exp.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-600">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
