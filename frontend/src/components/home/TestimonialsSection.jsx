/**
 * Testimonials Section
 */

import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'Absolutely breathtaking! Modesta Resort exceeded all our expectations. The service was impeccable, and the views were stunning. We cannot wait to return!',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      text: 'The most luxurious resort experience we have ever had. Every detail was perfect, from the elegant rooms to the exceptional dining. Truly world-class!',
      image: 'https://i.pravatar.cc/150?img=13',
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 5,
      text: 'Our honeymoon at Modesta was pure magic. The staff went above and beyond to make our stay unforgettable. This is luxury redefined.',
      image: 'https://i.pravatar.cc/150?img=5',
    },
  ];

  return (
    <section className="section bg-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-cream mb-3 md:mb-4">
            What Our Guests Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-cream-300 max-w-2xl mx-auto px-4">
            Hear from those who have experienced the Modesta difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20"
            >
              <FaQuoteLeft className="text-2xl sm:text-3xl text-copper mb-3 md:mb-4" />
              <div className="flex mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-copper text-sm sm:text-base" />
                ))}
              </div>
              <p className="text-cream-200 mb-4 md:mb-6 italic text-sm sm:text-base leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 md:mr-4"
                />
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-cream-400 text-xs sm:text-sm">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
