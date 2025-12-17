/**
 * Modesta Resort - Booking Page
 * Shows room details with date selector and rate options (Manami-style)
 */

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdBalcony, MdKingBed, MdLocalBar } from 'react-icons/md';
import { BsEye } from 'react-icons/bs';

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Mock room data - Replace with API call
  const room = {
    id: 1,
    category_name: 'Oceanview Suite',
    short_description: 'Wake to sunrise over endless ocean horizons',
    description: 'Immerse yourself in unparalleled luxury with panoramic ocean views. Each suite features floor-to-ceiling windows, a private balcony, and bespoke furnishings that blend modern elegance with tropical charm.',
    size_sqm: 85,
    max_occupancy: 3,
    max_adults: 2,
    max_children: 1,
    images: [
      { image_url: '/images/cabin-1-main.jpg', image_type: 'main' },
      { image_url: '/images/cabin-2-main.jpg', image_type: 'gallery' },
      { image_url: '/images/cabin-3-main.jpg', image_type: 'gallery' },
      { image_url: '/images/cabin-1-small-1.jpg', image_type: 'gallery' },
      { image_url: '/images/cabin-2-small-1.jpg', image_type: 'gallery' },
    ],
    amenities: [
      { amenity_name: 'Ocean View' },
      { amenity_name: 'King Bed' },
      { amenity_name: 'Private Balcony' },
      { amenity_name: 'Minibar' },
    ],
  };

  // Booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [openRateDetails, setOpenRateDetails] = useState({});

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Amenities icon mapping
  const amenityIcons = {
    'Ocean View': BsEye,
    'King Bed': MdKingBed,
    'Private Balcony': MdBalcony,
    'Minibar': MdLocalBar,
  };

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  // Rate options with dynamic pricing
  const rateOptions = [
    {
      id: 1,
      name: 'Standard Rate',
      description: 'Best available rate with flexible cancellation',
      pricePerNight: 450,
      features: [
        'Free cancellation up to 24 hours before check-in',
        'Complimentary WiFi',
        'Daily housekeeping',
      ],
    },
    {
      id: 2,
      name: 'Early Bird Special',
      description: 'Book 30 days in advance and save',
      pricePerNight: 380,
      savings: 70,
      badge: 'Save $70',
      features: [
        'Non-refundable',
        'Book 30+ days in advance',
        'Complimentary WiFi',
        'Daily housekeeping',
      ],
    },
    {
      id: 3,
      name: 'Breakfast Included',
      description: 'Rate includes daily breakfast for 2',
      pricePerNight: 520,
      badge: 'Best Value',
      features: [
        'Daily breakfast for 2 guests',
        'Free cancellation up to 48 hours',
        'Complimentary WiFi',
        'Daily housekeeping',
        'Late checkout (subject to availability)',
      ],
    },
  ];

  const handleSelectRate = (rate) => {
    // Navigate to checkout or handle booking
    console.log('Selected rate:', rate);
    // TODO: Implement checkout flow
  };

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <>
      <Helmet>
        <title>Book {room.category_name} - Modesta Resort</title>
        <meta name="description" content={`Book your ${room.category_name} at Modesta Resort`} />
      </Helmet>

      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Room Header */}
          <div className="mb-12">
            {/* Hero Image - Elegant Size */}
            <div className="relative h-[50vh] md:h-[55vh] max-h-[600px] overflow-hidden mb-8">
              <img
                src={room.images[0]?.image_url}
                alt={room.category_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>

            {/* Room Info - Centered and Elegant */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-5xl lg:text-6xl font-playfair text-forest mb-4 leading-tight tracking-wide">
                {room.category_name}
              </h1>
              <p className="text-lg lg:text-xl font-playfair italic text-copper/80 mb-10 font-light leading-relaxed">
                {room.short_description}
              </p>

              {/* Room Details - Elegant Stats Grid */}
              <div className="border-t border-b border-charcoal/[0.06] py-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
                  {/* Size */}
                  <div>
                    <div className="text-3xl sm:text-4xl font-light text-forest mb-4" style={{ letterSpacing: '1px' }}>
                      {room.size_sqm} M²
                    </div>
                    <div className="w-12 h-px bg-copper mx-auto mb-4" />
                    <div className="text-xs uppercase tracking-[2px] text-charcoal/60 font-medium">
                      Suite Size
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <div className="text-3xl sm:text-4xl font-light text-forest mb-4" style={{ letterSpacing: '1px' }}>
                      {room.max_occupancy}
                    </div>
                    <div className="w-12 h-px bg-copper mx-auto mb-4" />
                    <div className="text-xs uppercase tracking-[2px] text-charcoal/60 font-medium">
                      Max Guests
                    </div>
                  </div>

                  {/* Adults */}
                  <div>
                    <div className="text-3xl sm:text-4xl font-light text-forest mb-4" style={{ letterSpacing: '1px' }}>
                      {room.max_adults}
                    </div>
                    <div className="w-12 h-px bg-copper mx-auto mb-4" />
                    <div className="text-xs uppercase tracking-[2px] text-charcoal/60 font-medium">
                      Max Adults
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery - Elegant Row */}
            {room.images.length > 1 && (
              <div className="relative mb-12">
                <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                  <div className="flex gap-4 pb-2">
                    {room.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 group cursor-pointer"
                        onClick={() => openLightbox(index)}
                      >
                        <div className="relative w-72 h-48 overflow-hidden border border-charcoal/10 bg-white transition-all duration-300 hover:shadow-luxury hover:border-copper/20">
                          <img
                            src={image.image_url}
                            alt={`${room.category_name} - Image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 p-3 rounded-full">
                                <BsEye className="text-charcoal text-xl" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Subtle gradient fade on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cream to-transparent pointer-events-none" />
              </div>
            )}

            {/* Room Description */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h3 className="text-center text-sm font-playfair text-forest tracking-widest uppercase mb-7">
                About This Suite
              </h3>
              <p className="text-base text-charcoal/60 leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-center text-sm font-playfair text-forest tracking-widest uppercase mb-7">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {room.amenities.map((amenity, idx) => {
                  const IconComponent = amenityIcons[amenity.amenity_name] || BsEye;
                  return (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-copper/10 text-copper mb-3">
                        <IconComponent className="text-2xl" />
                      </div>
                      <span className="text-sm text-charcoal/60">{amenity.amenity_name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Date and Guest Selector - Elegant & Minimal */}
          <div className="mb-12 pb-10 border-b border-charcoal/5">
            <h2 className="text-center text-sm font-playfair text-forest tracking-widest uppercase mb-7">
              Select Your Dates
            </h2>

            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Check-in */}
              <div className="text-center">
                <label className="block text-xs text-charcoal/40 uppercase tracking-widest mb-3 font-light">
                  Check-In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-0 py-2 border-b border-charcoal/15 bg-transparent focus:border-copper focus:outline-none transition-all text-sm text-forest hover:border-charcoal/25 font-light text-center"
                />
              </div>

              {/* Check-out */}
              <div className="text-center">
                <label className="block text-xs text-charcoal/40 uppercase tracking-widest mb-3 font-light">
                  Check-Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-0 py-2 border-b border-charcoal/15 bg-transparent focus:border-copper focus:outline-none transition-all text-sm text-forest hover:border-charcoal/25 font-light text-center"
                />
              </div>

              {/* Guests */}
              <div className="text-center">
                <label className="block text-xs text-charcoal/40 uppercase tracking-widest mb-3 font-light">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-0 py-2 border-b border-charcoal/15 bg-transparent focus:border-copper focus:outline-none transition-all text-sm text-forest appearance-none cursor-pointer hover:border-charcoal/25 font-light text-center"
                >
                  {[1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary - Refined */}
            <p className="text-center text-xs text-charcoal/40 font-light tracking-wide uppercase">
              {nights} {nights === 1 ? 'Night' : 'Nights'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}
            </p>
          </div>

          {/* Available Rates */}
          <div>
            {/* Section Header */}
            <div className="mb-10">
              <h2 className="text-center text-sm font-playfair text-forest tracking-widest uppercase mb-7">
                Available Rates
              </h2>
            </div>

            {/* Rate Cards */}
            <div className="space-y-6">
              {rateOptions.map((rate) => {
                const totalPrice = rate.pricePerNight * nights;
                const taxAmount = Math.round(totalPrice * 0.12);
                const finalTotal = totalPrice + taxAmount;
                const isDetailsOpen = openRateDetails[rate.id] || false;
                const isBestValue = rate.badge === 'Best Value';

                return (
                  <div
                    key={rate.id}
                    className={`bg-white border transition-all hover:shadow-luxury ${
                      isBestValue
                        ? 'border-copper/20 shadow-luxury'
                        : 'border-charcoal/5 hover:border-copper/15'
                    }`}
                  >
                    <div className="p-7">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left: Rate Info */}
                        <div className="flex-1">
                          <div className="mb-4">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl font-playfair text-forest tracking-tight">
                                {rate.name}
                              </h3>
                              {rate.badge && (
                                <span className={`px-3 py-1 text-[10px] font-semibold tracking-widest uppercase border ${
                                  isBestValue ? 'text-copper border-copper/50 bg-copper/10' : 'text-copper border-copper/50 bg-copper/10'
                                }`}>
                                  {rate.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-base text-charcoal/70 leading-relaxed">
                              {rate.description}
                            </p>
                          </div>

                          {rate.savings && (
                            <p className="text-sm text-copper font-medium mb-4">
                              You Save ${rate.savings} Per Night
                            </p>
                          )}

                          {/* More Info */}
                          <button
                            type="button"
                            onClick={() => setOpenRateDetails(prev => ({ ...prev, [rate.id]: !prev[rate.id] }))}
                            className="text-sm text-copper hover:text-copper/80 transition-colors font-medium border-b border-copper/30 hover:border-copper/60"
                          >
                            {isDetailsOpen ? 'Hide Details' : 'View Details'}
                          </button>

                          {/* Expandable Details */}
                          {isDetailsOpen && (
                            <div className="mt-5 pt-5 border-t border-charcoal/10">
                              <h4 className="text-sm font-semibold text-forest uppercase tracking-wider mb-4">
                                What's Included
                              </h4>
                              <ul className="space-y-3 mb-5">
                                {rate.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-sm text-charcoal/70">
                                    <svg className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Price Breakdown */}
                              <div className="bg-cream/50 p-5 rounded space-y-3 text-base">
                                <div className="flex justify-between">
                                  <span className="text-charcoal/70">${rate.pricePerNight} × {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                                  <span className="text-forest font-semibold">${totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-charcoal/70">Taxes & Fees</span>
                                  <span className="text-forest font-semibold">${taxAmount}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right: Price & CTA */}
                        <div className="lg:text-right lg:min-w-[200px] flex flex-col items-end gap-5 pt-2">
                          <div>
                            <p className="text-xs text-charcoal/50 mb-2 uppercase tracking-wide">
                              {nights} {nights === 1 ? 'Night' : 'Nights'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}
                            </p>
                            <p className="text-4xl font-playfair text-forest font-semibold tracking-tight">
                              ${finalTotal.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSelectRate(rate)}
                            className="bg-copper hover:bg-copper/90 text-white px-8 py-3.5 text-sm font-semibold transition-all uppercase tracking-widest hover:shadow-luxury active:scale-98 w-full lg:w-auto"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-playfair text-forest mb-3 text-lg font-medium">Payment</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  No payment required today. Pay at the property or secure your booking with a deposit.
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-forest mb-3 text-lg font-medium">Flexibility</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Free cancellation options available. Review cancellation policy for each rate before booking.
                </p>
              </div>

              <div>
                <h3 className="font-playfair text-forest mb-3 text-lg font-medium">Support</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  24/7 customer support ready to assist with your reservation and stay.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-8 pt-8 border-t border-charcoal/10 text-center">
              <p className="text-charcoal/60 mb-3 text-base">Need assistance choosing the right rate?</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center text-base">
                <a href="tel:+12345678890" className="text-copper hover:text-copper/80 transition-colors font-medium">
                  Call us: +1 (234) 567-890
                </a>
                <span className="hidden sm:block text-charcoal/30">•</span>
                <a href="mailto:reservations@modestaresort.com" className="text-copper hover:text-copper/80 transition-colors font-medium">
                  reservations@modestaresort.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-copper transition-colors z-10"
            aria-label="Close lightbox"
          >
            <FaTimes className="text-3xl" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={room.images[lightboxIndex]?.image_url}
              alt={`${room.category_name} - Image ${lightboxIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Navigation Arrows */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-4 transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal p-4 transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 text-charcoal px-4 py-2 text-sm font-light tracking-wide">
                  {lightboxIndex + 1} / {room.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPage;
