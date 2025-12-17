/**
 * Room Details Modal Component
 * Comprehensive modal showing all room information with image carousel
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight, FaUsers, FaRulerCombined, FaBed } from 'react-icons/fa';

const RoomDetailsModal = ({ room, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when modal opens or room changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, room]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex, room]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNextImage = () => {
    if (room?.images && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const handlePrevImage = () => {
    if (room?.images && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  if (!room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-50 p-1.5 sm:p-2 bg-white/90 hover:bg-copper text-charcoal hover:text-white rounded-full shadow-lg transition-all duration-300"
              aria-label="Close"
            >
              <FaTimes className="text-base sm:text-lg" />
            </button>

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row overflow-y-auto">
              {/* Left Side - Image Carousel */}
              <div className="lg:w-1/2 relative bg-charcoal/5 flex-shrink-0">
                <div className="sticky top-0">
                  {/* Main Image with Elegant Navigation */}
                  <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px] xl:h-[600px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut'
                        }}
                        src={room.images?.[currentImageIndex]?.image_url || '/images/cabin-1-main.jpg'}
                        alt={`${room.category_name} - ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Image Counter */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-charcoal/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-light">
                      {currentImageIndex + 1} / {room.images?.length || 1}
                    </div>

                    {/* Navigation Arrows */}
                    {room.images && room.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 backdrop-blur-md hover:bg-white text-charcoal rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft className="text-base" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 backdrop-blur-md hover:bg-white text-charcoal rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                          aria-label="Next image"
                        >
                          <FaChevronRight className="text-base" />
                        </button>
                      </>
                    )}

                    {/* Elegant Navigation Dots */}
                    {room.images && room.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-charcoal/40 backdrop-blur-md px-3 py-2 rounded-full">
                        {room.images.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`transition-all duration-300 rounded-full ${
                              index === currentImageIndex
                                ? 'w-8 h-2 bg-white shadow-md'
                                : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Room Details */}
              <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
                {/* Category Badge */}
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase text-copper font-semibold border border-copper/30 px-3 sm:px-4 py-1 sm:py-1.5">
                    {room.category_badge || 'Luxury Suite'}
                  </span>
                </div>

                {/* Room Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-forest mb-2.5 sm:mb-3 leading-tight">
                  {room.category_name}
                </h2>

                {/* Short Description */}
                <p className="text-base sm:text-lg md:text-xl font-playfair italic text-copper mb-4 sm:mb-5 font-light leading-relaxed">
                  {room.short_description}
                </p>

                {/* Full Description */}
                <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed mb-5 sm:mb-6 font-light">
                  {room.description}
                </p>

                {/* Room Details */}
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-copper/15">
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <FaRulerCombined className="text-copper text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm">{room.size_sqm} m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <FaUsers className="text-copper text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm">
                      Up to {room.max_occupancy} {room.max_occupancy === 1 ? 'guest' : 'guests'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <FaBed className="text-copper text-sm sm:text-base" />
                    <span className="text-xs sm:text-sm">
                      {room.max_adults} {room.max_adults === 1 ? 'Adult' : 'Adults'}
                    </span>
                  </div>
                </div>

                {/* All Amenities */}
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h4 className="text-[10px] sm:text-xs font-semibold text-forest uppercase tracking-widest">
                        All Amenities
                      </h4>
                      <span className="text-[10px] sm:text-xs text-copper/70 font-medium">
                        {room.amenities.length} Available
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3">
                      {room.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2.5 text-charcoal/70 text-xs sm:text-sm"
                        >
                          <span className="w-1.5 h-1.5 bg-copper rounded-full flex-shrink-0"></span>
                          <span className="leading-relaxed">{amenity.amenity_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA - No Price (Manami Style) */}
                <div className="pt-5 sm:pt-6 border-t border-copper/15">
                  <p className="text-[10px] sm:text-xs text-charcoal/60 mb-3 text-center font-light">
                    View rates for your selected dates
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(`/rooms/${room.id}/book`);
                      onClose();
                    }}
                    className="w-full bg-copper text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-xs sm:text-sm tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Check Availability & Rates
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailsModal;
