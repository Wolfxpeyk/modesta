/**
 * Modesta Resort - Rooms & Suites Page
 * Luxurious accommodation showcase
 */

import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaRulerCombined,
  FaBed,
  FaWifi,
  FaTv,
  FaCoffee,
  FaSnowflake,
  FaShower,
  FaExpandAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCamera,
} from 'react-icons/fa';
import ImageLightbox from '../components/ImageLightbox';
import RoomDetailsModal from '../components/RoomDetailsModal';

// Elegant Room Carousel Component
const RoomCarousel = ({ room, roomIndex, currentImageIndex, setCurrentImageIndex, openLightbox }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const images = room.images || [];
  const currentIndex = currentImageIndex[room.id] || 0;
  const [dragDirection, setDragDirection] = useState(0);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Auto-advance carousel every 8 seconds (more luxurious pacing)
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [room.id]: ((prev[room.id] || 0) + 1) % images.length,
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, [room.id, images.length, isHovered, setCurrentImageIndex]);

  const goToImage = (index) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [room.id]: index,
    }));
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [room.id]: ((prev[room.id] || 0) - 1 + images.length) % images.length,
    }));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [room.id]: ((prev[room.id] || 0) + 1) % images.length,
    }));
  };

  // Handle swipe gesture
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const swipeVelocity = 500; // Minimum swipe velocity

    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocity) {
      if (info.offset.x > 0) {
        // Swiped right - go to previous
        goToPrevious();
      } else {
        // Swiped left - go to next
        goToNext();
      }
    }
  };

  if (images.length === 0) {
    return (
      <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-cream flex items-center justify-center">
        <p className="text-charcoal/40 text-sm">No images available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden shadow-2xl group rounded-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Stack with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1] // Custom easing for buttery smooth transitions
          }}
          className="absolute inset-0 cursor-pointer"
          onClick={(e) => {
            // Only open lightbox if not dragging
            if (!e.defaultPrevented) {
              openLightbox(images, currentIndex);
            }
          }}
          // Enable drag only on touch devices
          drag={isTouchDevice && images.length > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onDragStart={(e) => e.preventDefault()} // Prevent lightbox from opening during drag
        >
          <img
            src={images[currentIndex]?.image_url}
            alt={`${room.category_name} - View ${currentIndex + 1}`}
            className="w-full h-full object-cover pointer-events-none"
          />
          {/* Subtle gradient overlay - only on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Counter - Top Left - Subtle, appears on hover (desktop only) */}
      {!isTouchDevice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 z-20"
        >
          <div className="bg-charcoal/60 backdrop-blur-md px-3 py-1 rounded-full">
            <p className="text-xs font-light text-white tracking-wide">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      )}

      {/* View All Photos Button - Top Right - Appears on hover (desktop only) */}
      {!isTouchDevice && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openLightbox(images, currentIndex)}
          className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md hover:bg-white text-charcoal px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group/button"
        >
          <FaCamera className="text-copper text-xs group-hover/button:scale-110 transition-transform" />
          <span className="text-xs font-medium tracking-wide">View Gallery</span>
        </motion.button>
      )}

      {/* Navigation Arrows - Show on hover only (desktop only) */}
      {!isTouchDevice && images.length > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md hover:bg-white text-charcoal p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-base" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md hover:bg-white text-charcoal p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            aria-label="Next image"
          >
            <FaChevronRight className="text-base" />
          </motion.button>
        </>
      )}

      {/* Navigation Dots - Bottom Center - Clean & Minimal */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToImage(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/60 hover:bg-white/90'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const RoomsPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Fetch room categories from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/v1/rooms/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        // Fallback to mock data if API fails
        setCategories(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Mock data fallback
  const getMockData = () => [
    {
      id: 1,
      category_name: 'Cabin 1',
      category_slug: 'cabin-1',
      short_description: 'Poolside jungle paradise',
      description:
        'Iconic A-frame cabin overlooking a stunning turquoise infinity pool. Surrounded by lush tropical jungle with mountain views, this retreat features a private poolside deck and direct access to the pristine communal pool. Traditional thatched roof meets modern luxury.',
      size_sqm: 85,
      max_occupancy: 3,
      max_adults: 2,
      max_children: 1,
      base_price: 450,
      images: [
        { image_url: '/images/cabin-1-main.jpg', image_type: 'main' },
        { image_url: '/images/cabin-1-small-1.jpg', image_type: 'gallery' },
        { image_url: '/images/cabin-1-small-2.jpg', image_type: 'gallery' },
      ],
      amenities: [
        { amenity_name: 'Ocean View', amenity_icon: 'view', category: 'view' },
        { amenity_name: 'King Bed', amenity_icon: 'bed', category: 'bed' },
        { amenity_name: 'Private Balcony', amenity_icon: 'balcony', category: 'feature' },
        { amenity_name: 'Minibar', amenity_icon: 'minibar', category: 'feature' },
      ],
    },
    {
      id: 2,
      category_name: 'Cabin 2',
      category_slug: 'cabin-2',
      short_description: 'Private pool villa',
      description:
        'Exclusive A-frame villa with your own private infinity pool featuring in-pool lounge seating. Elegant stone chimney and deck create a sophisticated outdoor living space. Surrounded by swaying palms and tropical gardens under open skies—the ultimate private paradise.',
      size_sqm: 120,
      max_occupancy: 4,
      max_adults: 2,
      max_children: 2,
      base_price: 850,
      images: [
        { image_url: '/images/cabin-2-main.jpg', image_type: 'main' },
        { image_url: '/images/cabin-2-small-1.jpg', image_type: 'gallery' },
        { image_url: '/images/cabin-2-small-2.jpg', image_type: 'gallery' },
      ],
      amenities: [
        { amenity_name: 'Private Pool', amenity_icon: 'pool', category: 'feature' },
        { amenity_name: 'King Bed', amenity_icon: 'bed', category: 'bed' },
        { amenity_name: 'Ocean View', amenity_icon: 'view', category: 'view' },
        { amenity_name: 'Butler Service', amenity_icon: 'service', category: 'service' },
      ],
    },
    {
      id: 3,
      category_name: 'Cabin 3',
      category_slug: 'cabin-3',
      short_description: 'Garden terrace retreat',
      description:
        'Charming A-frame cabin with authentic thatched roof and striking stone accent wall. Your private wooden deck overlooks a serene garden with stepping stone pathways through manicured lawns. Surrounded by towering palms and vibrant tropical plants—a peaceful garden sanctuary.',
      size_sqm: 75,
      max_occupancy: 2,
      max_adults: 2,
      max_children: 0,
      base_price: 380,
      images: [
        { image_url: '/images/cabin-3-main.jpg', image_type: 'main' },
        { image_url: '/images/cabin-3-small-1.jpg', image_type: 'gallery' },
        { image_url: '/images/cabin-3-small-2.jpg', image_type: 'gallery' },
      ],
      amenities: [
        { amenity_name: 'Garden View', amenity_icon: 'garden', category: 'view' },
        { amenity_name: 'Queen Bed', amenity_icon: 'bed', category: 'bed' },
        { amenity_name: 'Outdoor Bathtub', amenity_icon: 'bath', category: 'feature' },
        { amenity_name: 'Private Terrace', amenity_icon: 'terrace', category: 'feature' },
      ],
    },
  ];

  // Icon mapping
  const getAmenityIcon = (amenityName) => {
    const iconMap = {
      wifi: <FaWifi />,
      tv: <FaTv />,
      coffee: <FaCoffee />,
      ac: <FaSnowflake />,
      shower: <FaShower />,
    };
    return iconMap[amenityName.toLowerCase()] || <FaBed />;
  };

  // Determine unique badge for each room type
  const getRoomBadge = (room) => {
    const name = room.category_name?.toLowerCase() || '';
    if (name.includes('cabin 1')) return 'Sky Dreams Suite';
    if (name.includes('cabin 2')) return 'Horizon Villa';
    if (name.includes('cabin 3')) return 'Nature Symphony';
    if (room.base_price >= 700) return 'Luxury Suite';
    if (room.base_price >= 500) return 'Premium Suite';
    return 'Deluxe Room';
  };

  // Open lightbox with room images
  const openLightbox = (images, initialIndex = 0) => {
    setLightboxImages(images);
    setLightboxInitialIndex(initialIndex);
    setLightboxOpen(true);
  };

  // Open room details modal
  const openRoomDetails = (room) => {
    // Add category badge to room object
    const roomWithBadge = {
      ...room,
      category_badge: getRoomBadge(room),
    };
    setSelectedRoom(roomWithBadge);
    setDetailsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-playfair text-forest"
        >
          Loading our finest accommodations...
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Rooms & Suites - Modesta Resort</title>
        <meta
          name="description"
          content="Discover our collection of luxurious rooms and suites. From oceanview retreats to private pool villas, find your perfect sanctuary at Modesta Resort."
        />
      </Helmet>

      {/* Hero Section - Split Screen (Matching DiningPage/EventsPage pattern) */}
      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-0">
        <div className="flex flex-col lg:flex-row min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:w-1/2 relative overflow-hidden min-h-[45vh] sm:min-h-[50vh] lg:min-h-full"
          >
            <div className="absolute inset-0">
              <img
                src="/images/cabin-1-main.jpg"
                alt="Luxury Rooms and Suites"
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
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="max-w-xl"
              >
                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                  className="h-px bg-copper mb-5 sm:mb-6 max-w-xs sm:max-w-sm"
                />

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3 sm:mb-4"
                >
                  Rooms & Suites
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  className="text-lg sm:text-xl md:text-2xl font-playfair italic text-copper mb-5 sm:mb-6"
                >
                  Discover Your Perfect Sanctuary
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                  className="text-base text-charcoal/60 font-light leading-relaxed mb-4"
                >
                  Experience unparalleled luxury in our thoughtfully designed accommodations. Each room and suite offers a unique blend of comfort, elegance, and breathtaking views.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                  className="text-base text-charcoal/60 font-light leading-relaxed"
                >
                  From intimate oceanview suites to spacious villas with private pools, find your perfect retreat at Modesta Resort.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Categories - Alternating Layout */}
      <section className="bg-cream py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="container-custom">
          {categories.map((room, index) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="mb-16 sm:mb-20 lg:mb-24 last:mb-0"
            >
              {/* Alternating Layout */}
              <div className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 sm:gap-10 lg:gap-14 items-center`}>

                {/* Image Side - Carousel */}
                <div className="w-full lg:w-1/2">
                  <RoomCarousel
                    room={room}
                    roomIndex={index}
                    currentImageIndex={currentImageIndex}
                    setCurrentImageIndex={setCurrentImageIndex}
                    openLightbox={(images, initialIndex) => {
                      setLightboxImages(images);
                      setLightboxInitialIndex(initialIndex);
                      setLightboxOpen(true);
                    }}
                  />
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  {/* Room Badge */}
                  <span className="inline-block text-[10px] tracking-widest uppercase text-copper font-semibold border border-copper/40 bg-copper/5 px-4 py-1.5 mb-4">
                    {getRoomBadge(room)}
                  </span>

                  {/* Room Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-forest mb-3">
                    {room.category_name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-lg sm:text-xl md:text-2xl font-playfair italic text-copper mb-5">
                    {room.short_description}
                  </p>

                  {/* Decorative Line */}
                  <div className="h-px bg-copper/30 w-20 mb-6"></div>

                  {/* Room Stats - Single Line */}
                  <div className="text-sm text-charcoal/70 mb-5">
                    <span className="font-medium text-forest">{room.size_sqm} M²</span> · Suite Size ·
                    <span className="font-medium text-forest"> {room.max_occupancy}</span> Max Guests
                  </div>

                  {/* Description */}
                  {room.description && (
                    <p className="text-base text-charcoal/60 font-light leading-relaxed mb-8">
                      {room.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const roomWithBadge = {
                          ...room,
                          category_badge: getRoomBadge(room)
                        };
                        setSelectedRoom(roomWithBadge);
                        setDetailsModalOpen(true);
                      }}
                      className="border-2 border-copper text-copper px-6 py-3 font-semibold text-xs tracking-widest uppercase hover:bg-copper hover:text-white transition-all duration-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/rooms/${room.id}/book`)}
                      className="bg-copper text-white px-6 py-3 font-semibold text-xs tracking-widest uppercase hover:bg-copper/90 transition-all duration-300 shadow-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Reservations CTA - Simple Text Section */}
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
              Ready to Book Your Stay?
            </h2>
            <p className="text-base text-charcoal/60 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Our reservations team is ready to help you find your perfect sanctuary. Contact us to discuss your preferences, special requests, or to learn more about our exclusive suites and villas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-copper text-white px-8 py-3.5 font-semibold text-xs tracking-widest uppercase hover:bg-copper/90 transition-all duration-300 shadow-lg text-center"
              >
                Call +1 (234) 567-890
              </motion.a>
              <motion.a
                href="mailto:reservations@modestaresort.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-copper/40 text-copper px-8 py-3.5 font-semibold text-xs tracking-widest uppercase hover:border-copper hover:bg-copper/5 transition-all duration-300 text-center"
              >
                Email Us
              </motion.a>
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

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxInitialIndex}
      />

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={selectedRoom}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />
    </>
  );
};

export default RoomsPage;
