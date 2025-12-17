/**
 * Modesta Resort - Dining Page
 * Featuring Lola Maam's Restaurant - Authentic Filipino Cuisine
 */

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaClock, FaPhone, FaUtensils, FaMapMarkerAlt } from 'react-icons/fa';

const DiningPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Menu data organized by categories
  const menuCategories = [
    {
      id: 'breakfast',
      name: 'Silog Breakfast',
      description: 'Traditional Filipino breakfast plates with rice and egg',
      icon: '🍳',
      items: [
        { name: 'Tapsilog', description: 'Marinated beef tapa with garlic fried rice and egg', price: null },
        { name: 'Tocilog', description: 'Sweet cured pork with garlic fried rice and egg', price: null },
        { name: 'Longsilog', description: 'Filipino sausage with garlic fried rice and egg', price: null },
        { name: 'Porksilog', description: 'Grilled pork chop with garlic fried rice and egg', price: null },
        { name: 'Spamsilog', description: 'Fried spam with garlic fried rice and egg', price: null },
        { name: 'Cornsilog', description: 'Corned beef with garlic fried rice and egg', price: null },
      ]
    },
    {
      id: 'soups',
      name: 'Soups & Noodles',
      description: 'Hearty Filipino soups and comfort bowls',
      icon: '🍜',
      items: [
        { name: 'Beef Bulalo', description: 'Rich beef bone marrow soup with vegetables', price: null },
        { name: 'Batchoy Soup', description: 'Savory pork noodle soup with liver and crispy garlic', price: null },
        { name: 'Beef Mami', description: 'Beef noodle soup with bok choy', price: null },
        { name: 'Beef Pares', description: 'Sweet braised beef with garlic fried rice', price: null },
        { name: 'Lomi', description: 'Thick egg noodle soup with mixed seafood', price: null },
        { name: 'Chicken Noodle Soup', description: 'Classic chicken soup with egg noodles', price: null },
      ]
    },
    {
      id: 'signature',
      name: 'Signature Dishes',
      description: 'Lola Maam\'s specialties and Filipino favorites',
      icon: '⭐',
      featured: true,
      items: [
        { name: 'Kare-Kare', description: 'Oxtail and tripe in rich peanut sauce with vegetables', price: null, signature: true },
        { name: 'Crispy Pata', description: 'Deep-fried pork leg until golden and crispy', price: null, signature: true },
        { name: 'Lechon Kawali', description: 'Crispy deep-fried pork belly, served with liver sauce', price: 400, signature: true },
        { name: 'Sinigang na Hipon', description: 'Tamarind-based shrimp soup with vegetables', price: null, signature: true },
        { name: 'Adobong Hito', description: 'Catfish braised in vinegar, soy sauce, and garlic', price: null },
        { name: 'Kaldereta', description: 'Goat or beef stew in tomato sauce with liver spread', price: null },
      ]
    },
    {
      id: 'seafood',
      name: 'Seafood & Fish',
      description: 'Fresh catches prepared Filipino-style',
      icon: '🐟',
      items: [
        { name: 'Grilled Bangus', description: 'Grilled milkfish stuffed with tomatoes and onions', price: null },
        { name: 'Fried Tilapia', description: 'Whole tilapia fried to perfection', price: null },
        { name: 'Ginataang Hipon', description: 'Shrimp cooked in coconut milk with vegetables', price: null },
        { name: 'Buttered Shrimp', description: 'Shrimp sautéed in butter and garlic', price: null },
        { name: 'Sweet & Sour Fish', description: 'Crispy fish fillet in sweet and sour sauce', price: null },
        { name: 'Sinigang na Hito', description: 'Catfish in tamarind soup with vegetables', price: null },
      ]
    },
    {
      id: 'mains',
      name: 'Main Dishes',
      description: 'Filipino home-style favorites',
      icon: '🍖',
      items: [
        { name: 'Menudo', description: 'Pork and liver stew in tomato sauce', price: null },
        { name: 'Ginataang Manok', description: 'Chicken cooked in coconut milk with vegetables', price: null },
        { name: 'Pork Sinigang', description: 'Pork in tamarind soup with vegetables', price: null },
        { name: 'Chop Suey', description: 'Stir-fried mixed vegetables with meat', price: null },
        { name: 'Grilled Pork', description: 'Marinated pork belly grilled to perfection', price: null },
        { name: 'Fried Chicken', description: 'Crispy fried chicken Filipino-style', price: null },
      ]
    },
    {
      id: 'noodles',
      name: 'Pancit & Noodles',
      description: 'Traditional Filipino noodle dishes',
      icon: '🍝',
      items: [
        { name: 'Pansit Canton', description: 'Stir-fried wheat noodles with vegetables and meat', price: null },
        { name: 'Pansit Guisado', description: 'Mixed rice and wheat noodles sautéed with vegetables', price: null },
        { name: 'Bihon Guisado', description: 'Rice noodles stir-fried with vegetables and chicken', price: null },
        { name: 'Sotanghon Guisado', description: 'Glass noodles with vegetables and seafood', price: null },
        { name: 'Spaghetti', description: 'Filipino-style sweet spaghetti', price: null },
        { name: 'Lumpiang Shanghai', description: 'Filipino spring rolls filled with pork and vegetables', price: null },
      ]
    },
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Perfect starters to share',
      icon: '🥘',
      items: [
        { name: 'Pork Sisig', description: 'Sizzling chopped pork with onions and chili', price: 250 },
        { name: 'Calamares', description: 'Crispy fried squid rings', price: 300 },
        { name: 'Dinakdakan', description: 'Grilled pork with creamy dressing', price: 300 },
      ]
    },
    {
      id: 'drinks',
      name: 'Beverages',
      description: 'Refreshing drinks to complement your meal',
      icon: '🥤',
      items: [
        { name: 'Local Beer', description: 'San Miguel, Pilsen, Red Horse', price: '65-160' },
        { name: 'Soft Drinks', description: 'Coke, Sprite, and other refreshments', price: '30-110' },
        { name: 'Iced Tea', description: 'Freshly brewed iced tea', price: 23 },
        { name: 'Fresh Juices', description: 'Seasonal fruit juices', price: null },
      ]
    }
  ];

  // Signature dishes for hero showcase
  const signatureDishes = [
    {
      name: 'Crispy Pata',
      tagline: 'Golden perfection in every bite',
      description: 'Our most beloved dish - a whole pork leg deep-fried until the skin is incredibly crispy, while the meat remains tender and juicy. Served with a special liver sauce.',
      image: '/images/dining/crispy-pata.jpg'
    },
    {
      name: 'Kare-Kare',
      tagline: 'A taste of Filipino heritage',
      description: 'Tender oxtail and tripe slow-cooked in a rich, creamy peanut sauce with eggplant, string beans, and banana blossoms. Served with bagoong (fermented shrimp paste).',
      image: '/images/dining/kare-kare.jpg'
    },
    {
      name: 'Sinigang na Hipon',
      tagline: 'Comfort in a bowl',
      description: 'Fresh shrimp swimming in a tangy tamarind broth with tomatoes, radish, and kangkong. The perfect balance of sour and savory flavors.',
      image: '/images/dining/sinigang.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dining - Lola Maam's Restaurant | Modesta Resort</title>
        <meta
          name="description"
          content="Experience authentic Filipino cuisine at Lola Maam's Restaurant. Traditional dishes, fresh seafood, and Filipino favorites in a beautiful resort setting."
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
                src="/images/dining/restaurant-hero.jpg"
                alt="Lola Maam's Restaurant"
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
                  className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 sm:mb-4 leading-tight tracking-wide"
                >
                  Lola Maam's Restaurant
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-2xl font-playfair italic text-copper mb-5 sm:mb-6"
                >
                  Authentic Filipino Cuisine
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-4 font-light"
                >
                  Welcome to Lola Maam's, where every dish tells a story of Filipino heritage and
                  home-cooked goodness. Our partner restaurant brings you authentic flavors passed
                  down through generations, prepared with love and the finest local ingredients.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-6 sm:mb-8 font-light"
                >
                  From hearty breakfast silog meals to our signature crispy pata and traditional
                  sinigang, each dish is a celebration of Filipino culinary traditions.
                </motion.p>

                {/* Quick Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="space-y-2 text-xs sm:text-sm text-charcoal/70"
                >
                  <div className="flex items-center gap-2">
                    <FaClock className="text-copper" />
                    <span>Open Daily: 6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-copper" />
                    <span>Located at Modesta Resort</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Showcase */}
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
              Signature Dishes
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light px-4">
              Discover the flavors that have made Lola Maam's a beloved dining destination
            </p>
          </motion.div>

          {/* Signature Dishes */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
            {signatureDishes.map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden shadow-xl hover:shadow-2xl h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-sm"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="bg-copper text-white px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase rounded-sm">
                        Chef's Special
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-forest mb-4 sm:mb-5 leading-tight">
                    {dish.name}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper/90 mb-6 sm:mb-7 font-light leading-relaxed">
                    {dish.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="bg-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 sm:mb-4">
              Our Menu
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto font-light px-4">
              A delicious journey through Filipino culinary traditions
            </p>
          </motion.div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-cream p-6 sm:p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-copper/20"
              >
                {/* Category Header */}
                <div className="mb-5 sm:mb-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-playfair font-bold text-forest mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/60 font-light">
                    {category.description}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="space-y-3">
                  {category.items.slice(0, 4).map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-copper/10 pb-3 last:border-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-sm sm:text-base font-medium text-forest">
                          {item.name}
                          {item.signature && <span className="ml-2 text-copper">⭐</span>}
                        </h4>
                        {item.price && (
                          <span className="text-sm font-semibold text-copper whitespace-nowrap">
                            ₱{item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-charcoal/60 font-light leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}

                  {category.items.length > 4 && (
                    <p className="text-xs text-copper/70 mt-3 flex items-center gap-1.5 italic">
                      <span className="w-1 h-1 bg-copper/50 rounded-full"></span>
                      <span>+ {category.items.length - 4} more dishes available</span>
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations CTA */}
      <section className="bg-cream py-14 sm:py-20 md:py-24">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Decorative Top Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-copper/30 max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10"
            />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-forest mb-3 sm:mb-4">
              Ready to Dine?
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 mb-6 sm:mb-8 font-light leading-relaxed max-w-2xl mx-auto">
              Reserve your table at Lola Maam's Restaurant and experience the warmth of Filipino
              hospitality paired with authentic flavors. Walk-ins are welcome, but reservations
              are recommended for larger groups.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-sm text-charcoal/70">
                <FaPhone className="text-copper" />
                <span>Call for Reservations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/70">
                <FaClock className="text-copper" />
                <span>Open Daily: 6:00 AM - 10:00 PM</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-copper text-white px-8 py-3.5 font-semibold text-xs tracking-widest uppercase hover:bg-copper/90 transition-all duration-300 shadow-lg"
              >
                Reserve a Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-copper/40 text-copper px-8 py-3.5 font-semibold text-xs tracking-widest uppercase hover:border-copper hover:bg-copper/5 transition-all duration-300"
              >
                View Full Menu
              </motion.button>
            </div>

            {/* Decorative Bottom Line */}
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

export default DiningPage;
