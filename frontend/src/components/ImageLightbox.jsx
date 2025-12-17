/**
 * Image Lightbox Component
 * Full-screen image gallery modal for room photos
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageLightbox = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when initial index changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when lightbox is open
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[110] p-2 sm:p-3 text-white hover:text-copper transition-colors bg-charcoal/50 hover:bg-charcoal/70 rounded-full"
            aria-label="Close gallery"
          >
            <FaTimes className="text-xl sm:text-2xl" />
          </motion.button>

          {/* Image Counter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 z-[110] px-3 sm:px-4 py-1.5 sm:py-2 bg-charcoal/50 text-white rounded-full text-xs sm:text-sm font-light"
          >
            {currentIndex + 1} / {images.length}
          </motion.div>

          {/* Main Image Container */}
          <div
            className="flex items-center justify-center h-full w-full px-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              >
                <img
                  src={images[currentIndex].image_url || images[currentIndex]}
                  alt={`Room view ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-[110] p-2 sm:p-3 md:p-4 text-white hover:text-copper transition-colors bg-charcoal/50 hover:bg-charcoal/70 rounded-full"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
              </motion.button>

              {/* Next Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-[110] p-2 sm:p-3 md:p-4 text-white hover:text-copper transition-colors bg-charcoal/50 hover:bg-charcoal/70 rounded-full"
                aria-label="Next image"
              >
                <FaChevronRight className="text-base sm:text-lg md:text-xl" />
              </motion.button>
            </>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-[110] max-w-full overflow-x-auto px-3 sm:px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-1.5 sm:gap-2 bg-charcoal/50 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-2 ring-copper scale-110'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.image_url || image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
