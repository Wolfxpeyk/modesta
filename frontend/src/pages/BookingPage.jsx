/**
 * Modesta Resort - Booking Page
 * Redesigned booking experience with Manami-style logic
 */

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCalendar, FaUsers, FaTag } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Booking state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [expandedRate, setExpandedRate] = useState(null);
  const [expandedRoomInfo, setExpandedRoomInfo] = useState({});
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  // Get today's date
  const getTodayDate = () => {
    return new Date();
  };

  // Get minimum checkout date (day after check-in)
  const getMinCheckoutDate = () => {
    if (!checkIn) return getTodayDate();
    const checkinDate = new Date(checkIn);
    checkinDate.setDate(checkinDate.getDate() + 1);
    return checkinDate;
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format date for short display
  const formatDateShort = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // All available rooms
  const availableRooms = [
    {
      id: 1,
      name: 'Cabin 1',
      images: [
        '/images/cabin-1-main.jpg',
        '/images/cabin-1-small-1.jpg',
        '/images/cabin-1-small-2.jpg',
        '/images/cabin-1-small-3.jpg',
      ],
      capacity: 3,
      bedType: '1 King Bed',
      bathrooms: 1,
      size: '85m²',
      amenities: [
        'Ocean view',
        'Private balcony',
        'Air conditioning',
        'Minibar',
        'Coffee maker',
        'Room safe',
        'Premium toiletries',
        'Daily housekeeping',
      ],
      description: 'Iconic A-frame cabin overlooking a stunning turquoise infinity pool. Surrounded by lush tropical jungle with mountain views, this retreat features a private poolside deck and direct access to the pristine communal pool. Traditional thatched roof meets modern luxury.',
      available: true,
    },
    {
      id: 2,
      name: 'Cabin 2',
      images: [
        '/images/cabin-2-main.jpg',
        '/images/cabin-2-small-1.jpg',
        '/images/cabin-2-small-2.jpg',
        '/images/cabin-2-small-3.jpg',
      ],
      capacity: 4,
      bedType: '1 King Bed',
      bathrooms: 2,
      size: '120m²',
      amenities: [
        'Private infinity pool',
        'Ocean view',
        'Outdoor shower',
        'Private terrace',
        'Air conditioning',
        'Minibar',
        'Butler service',
        'Premium toiletries',
        'Daily housekeeping',
      ],
      description: 'Exclusive A-frame villa with your own private infinity pool featuring in-pool lounge seating. Elegant stone chimney and deck create a sophisticated outdoor living space. Surrounded by swaying palms and tropical gardens under open skies—the ultimate private paradise.',
      available: true,
    },
    {
      id: 3,
      name: 'Cabin 3',
      images: [
        '/images/cabin-3-main.jpg',
        '/images/cabin-3-small-1.jpg',
        '/images/cabin-3-small-2.jpg',
        '/images/cabin-3-small-3.jpg',
      ],
      capacity: 2,
      bedType: '1 Queen Bed',
      bathrooms: 1,
      size: '75m²',
      amenities: [
        'Garden view',
        'Private terrace',
        'Outdoor bathtub',
        'Air conditioning',
        'Minibar',
        'Coffee maker',
        'Room safe',
        'Premium toiletries',
        'Daily housekeeping',
      ],
      description: 'Charming A-frame cabin with authentic thatched roof and striking stone accent wall. Your private wooden deck overlooks a serene garden with stepping stone pathways through manicured lawns. Surrounded by towering palms and vibrant tropical plants—a peaceful garden sanctuary.',
      available: true,
    },
  ];

  // Rate options
  const rates = [
    {
      id: 1,
      name: 'Standard Rate',
      paymentTerm: 'Pay at property',
      price: 25000,
      features: [
        'Free cancellation up to 24 hours before check-in',
        'Complimentary WiFi',
        'Daily housekeeping',
        'Access to resort facilities',
      ],
    },
    {
      id: 2,
      name: 'Early Bird Special',
      paymentTerm: 'Pay today',
      price: 21000,
      savings: 4000,
      features: [
        'Non-refundable',
        'Book 30+ days in advance',
        'Complimentary WiFi',
        'Daily housekeeping',
        'Access to resort facilities',
      ],
    },
    {
      id: 3,
      name: 'Breakfast Included',
      paymentTerm: 'Pay at property',
      price: 29000,
      features: [
        'Daily breakfast for 2 guests',
        'Free cancellation up to 48 hours',
        'Complimentary WiFi',
        'Daily housekeeping',
        'Late checkout (subject to availability)',
        'Access to resort facilities',
      ],
    },
  ];

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();

  // Image navigation for each room
  const nextImage = (roomId, imagesLength) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % imagesLength,
    }));
  };

  const prevImage = (roomId, imagesLength) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + imagesLength) % imagesLength,
    }));
  };

  // Handle booking
  const handleBook = () => {
    if (!selectedRate) return;
    console.log('Booking:', { checkIn, checkOut, rooms, guests, selectedRate });
    // TODO: Implement checkout flow
  };

  return (
    <>
      <Helmet>
        <title>Book Your Stay - Modesta Resort</title>
        <meta name="description" content="Book your perfect room at Modesta Resort" />
      </Helmet>

      {/* Hero Section with Booking Form */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden" data-hero-section>
        <div className="absolute inset-0">
          <img
            src="/images/booking-page-hero.jpg"
            alt="Modesta Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/60" />
        </div>

        {/* Booking Form Overlay */}
        <div className="relative h-full flex items-end justify-center pb-8 md:pb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-luxury-lg max-w-5xl w-full rounded-md md:rounded-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_200px] gap-0 divide-y md:divide-y-0 md:divide-x divide-charcoal/5">
              {/* Date Selection */}
              <div className="p-4 md:p-6 group hover:bg-cream/20 transition-colors">
                <label className="flex items-center gap-2 text-[10px] font-bold text-charcoal/60 md:text-charcoal/50 uppercase tracking-[0.12em] md:tracking-[0.15em] mb-3">
                  <FaCalendar className="text-copper/70 text-xs" />
                  Select Dates
                </label>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex-1">
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => {
                        setCheckIn(date);
                        if (checkOut && date >= checkOut) {
                          setCheckOut(null);
                        }
                      }}
                      minDate={getTodayDate()}
                      placeholderText="mm/dd/yyyy"
                      dateFormat="MM/dd/yyyy"
                      className="w-full h-[44px] px-3 md:px-4 border border-charcoal/20 focus:border-copper focus:outline-none text-charcoal bg-white hover:bg-cream/30 focus:bg-white transition-all font-medium rounded-md input-no-zoom"
                    />
                  </div>
                  <div className="flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-charcoal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <DatePicker
                      selected={checkOut}
                      onChange={(date) => setCheckOut(date)}
                      minDate={getMinCheckoutDate()}
                      placeholderText="mm/dd/yyyy"
                      dateFormat="MM/dd/yyyy"
                      disabled={!checkIn}
                      className="w-full h-[44px] px-3 md:px-4 border border-charcoal/20 focus:border-copper focus:outline-none text-charcoal bg-white hover:bg-cream/30 focus:bg-white transition-all font-medium rounded-md disabled:opacity-40 disabled:cursor-not-allowed input-no-zoom"
                    />
                  </div>
                </div>
                {nights > 0 && (
                  <p className="text-[11px] text-copper/70 font-semibold mt-2">
                    {nights} {nights === 1 ? 'night' : 'nights'}
                  </p>
                )}
              </div>

              {/* Rooms & Guests */}
              <div className="p-4 md:p-6 group hover:bg-cream/20 transition-colors">
                <label className="flex items-center gap-2 text-[10px] font-bold text-charcoal/60 md:text-charcoal/50 uppercase tracking-[0.12em] md:tracking-[0.15em] mb-3">
                  <FaUsers className="text-copper/70 text-xs" />
                  Rooms & Guests
                </label>
                <div className="relative">
                  <select
                    value={`${rooms}-${guests}`}
                    onChange={(e) => {
                      const [r, g] = e.target.value.split('-');
                      setRooms(Number(r));
                      setGuests(Number(g));
                    }}
                    className="w-full h-[44px] px-3 md:px-4 border border-charcoal/20 focus:border-copper focus:outline-none text-charcoal bg-white hover:bg-cream/30 focus:bg-white transition-all appearance-none cursor-pointer font-medium pr-10 rounded-md input-no-zoom"
                    style={{ WebkitAppearance: 'none' }}
                  >
                    <option value="1-1">1 Room, 1 Guest</option>
                    <option value="1-2">1 Room, 2 Guests</option>
                    <option value="1-3">1 Room, 3 Guests</option>
                    <option value="2-2">2 Rooms, 2 Guests</option>
                    <option value="2-4">2 Rooms, 4 Guests</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-copper/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="p-4 md:p-6 group hover:bg-cream/20 transition-colors md:min-w-[200px]">
                <label className="flex items-center gap-2 text-[10px] font-bold text-charcoal/60 md:text-charcoal/50 uppercase tracking-[0.12em] md:tracking-[0.15em] mb-3">
                  <FaTag className="text-copper/70 text-xs" />
                  Promo Code
                </label>
                {showPromoInput ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      autoFocus
                      className="w-full h-[44px] px-3 md:px-4 border border-charcoal/20 focus:border-copper focus:outline-none text-charcoal bg-white hover:bg-cream/30 focus:bg-white transition-all placeholder:text-charcoal/30 font-semibold uppercase tracking-wide rounded-md input-no-zoom"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowPromoInput(true)}
                    className="w-full h-[44px] text-xs text-copper font-semibold hover:text-copper/80 transition-all flex items-center justify-center gap-1.5 border-b-2 border-transparent hover:border-copper/20"
                  >
                    <span className="tracking-wide">Add code</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - All Available Rooms */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10">
            {/* Left Column - All Room Options */}
            <div className="space-y-6 pb-32 lg:pb-0">
              {availableRooms.map((room) => {
                const currentIndex = currentImageIndexes[room.id] || 0;
                const isInfoExpanded = expandedRoomInfo[room.id] || false;
                const isSelected = selectedRoom?.id === room.id;

                return (
                  <div key={room.id} className="group">
                    {/* Room Card */}
                    <div
                      className={`bg-white border rounded-sm shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                        isSelected ? 'border-copper/50 ring-2 ring-copper/20 shadow-lg' : 'border-charcoal/10 hover:border-charcoal/15'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
                        {/* Room Image Carousel */}
                        <div className="relative h-[240px] md:h-[280px] overflow-hidden group/image bg-charcoal/5">
                          <img
                            src={room.images[currentIndex]}
                            alt={`${room.name} - Image ${currentIndex + 1}`}
                            className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700"
                          />

                          {/* Navigation Arrows */}
                          {room.images.length > 1 && (
                            <>
                              <button
                                onClick={() => prevImage(room.id, room.images.length)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-charcoal p-2.5 rounded-full shadow-xl opacity-0 group-hover/image:opacity-100 transition-all hover:scale-110 backdrop-blur-sm"
                                aria-label="Previous image"
                              >
                                <FaChevronLeft className="text-sm" />
                              </button>
                              <button
                                onClick={() => nextImage(room.id, room.images.length)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-charcoal p-2.5 rounded-full shadow-xl opacity-0 group-hover/image:opacity-100 transition-all hover:scale-110 backdrop-blur-sm"
                                aria-label="Next image"
                              >
                                <FaChevronRight className="text-sm" />
                              </button>

                              {/* Image Counter */}
                              <div className="absolute bottom-3 right-3 bg-charcoal/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                                {currentIndex + 1} / {room.images.length}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Room Info */}
                        <div className="p-5 md:px-5 md:py-3">
                          <h2 className="text-xl md:text-2xl font-playfair font-bold text-forest mb-3 leading-tight">{room.name}</h2>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-charcoal/60 mb-3">
                            <div className="flex items-center gap-1.5 bg-copper/5 px-2.5 py-1 rounded-full">
                              <FaUsers className="text-copper text-xs" />
                              <span className="font-medium">Sleeps {room.capacity}</span>
                            </div>
                            <span className="text-charcoal/30">•</span>
                            <span className="font-medium">{room.bedType}</span>
                            <span className="text-charcoal/30">•</span>
                            <span className="font-medium">{room.bathrooms} {room.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                          </div>

                          {/* Amenities - Truncated */}
                          <div className="mb-3">
                            <p className="text-xs text-charcoal/60 leading-relaxed">
                              <span className="font-semibold text-forest">{room.size}</span>
                              <span className="text-charcoal/40 mx-1.5">|</span>
                              {room.amenities.slice(0, 4).join(' • ')}
                              {room.amenities.length > 4 && '...'}
                            </p>
                          </div>

                          {/* Description - Truncated */}
                          {!isInfoExpanded && (
                            <p className="text-xs text-charcoal/60 leading-relaxed mb-3 line-clamp-2">
                              {room.description}
                            </p>
                          )}

                          {/* Expandable Details */}
                          {isInfoExpanded && (
                            <div className="mb-3 bg-cream/30 -mx-5 md:mx-0 px-5 md:px-4 py-4 md:rounded-sm border-l-2 md:border-l-0 md:border border-copper/20">
                              <p className="text-xs text-charcoal/70 leading-relaxed mb-3">
                                {room.description}
                              </p>
                              <div className="text-xs">
                                <p className="font-semibold text-forest mb-2 text-xs uppercase tracking-wider">All Amenities</p>
                                <p className="text-charcoal/60">{room.amenities.join(' • ')}</p>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => setExpandedRoomInfo(prev => ({ ...prev, [room.id]: !prev[room.id] }))}
                            className="text-xs font-medium text-forest hover:text-copper transition-colors inline-flex items-center gap-1 group/info mb-4"
                          >
                            <span>{isInfoExpanded ? 'Less details' : 'More details'}</span>
                            <svg
                              className={`w-3 h-3 transition-transform ${isInfoExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Availability Status */}
                          {room.available && checkIn && checkOut ? (
                            <button
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedRoom(null);
                                  setSelectedRate(null);
                                } else {
                                  setSelectedRoom(room);
                                  setSelectedRate(null);
                                }
                              }}
                              className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm shadow-md hover:shadow-lg ${
                                isSelected
                                  ? 'bg-forest text-white hover:bg-forest/90'
                                  : 'bg-copper text-white hover:bg-copper/90'
                              }`}
                            >
                              {isSelected ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Selected
                                </span>
                              ) : (
                                'Select This Room'
                              )}
                            </button>
                          ) : !checkIn || !checkOut ? (
                            <div className="bg-cream/50 border border-charcoal/10 rounded-sm py-3 px-4 text-center flex items-center justify-center gap-2">
                              <svg className="w-4 h-4 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-xs font-medium text-charcoal/60">Select dates to check availability</p>
                            </div>
                          ) : (
                            <div className="bg-charcoal/5 border border-charcoal/10 rounded-sm p-4 text-center">
                              <p className="text-xs font-medium text-charcoal/70 mb-2">
                                Unavailable: {formatDateShort(checkIn)} - {formatDateShort(checkOut)}
                              </p>
                              <button className="text-xs font-semibold text-copper hover:text-copper/80 transition-colors inline-flex items-center gap-1 group">
                                <span>Find available dates</span>
                                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rate Options - Show immediately below selected room */}
                    {isSelected && checkIn && checkOut && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 space-y-4 pl-0 md:pl-4"
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div className="h-px flex-1 bg-gradient-to-r from-copper/20 to-transparent"></div>
                          <h3 className="text-xl md:text-2xl font-playfair font-bold text-forest">
                            Available Rates
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-l from-copper/20 to-transparent"></div>
                        </div>

                        {rates.map((rate) => {
                          const totalPrice = rate.price * nights * rooms;
                          const isExpanded = expandedRate === rate.id;
                          const isRateSelected = selectedRate?.id === rate.id;

                          return (
                            <div
                              key={rate.id}
                              className={`bg-white border rounded-sm transition-all duration-300 overflow-hidden ${
                                isRateSelected
                                  ? 'border-copper/50 ring-2 ring-copper/20 shadow-lg'
                                  : 'border-charcoal/10 hover:border-charcoal/20 shadow-md hover:shadow-lg'
                              }`}
                            >
                              <div className="p-5">
                                <div className="flex justify-between items-start mb-4 gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                      <h3 className="text-lg md:text-xl font-playfair font-bold text-forest">
                                        {rate.name}
                                      </h3>
                                      {rate.savings && (
                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-copper border border-copper/30 bg-copper/5 px-2 py-0.5 rounded-full">
                                          Save ₱{rate.savings.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-charcoal/60 flex items-center gap-1.5 font-medium">
                                      <span className="w-1 h-1 rounded-full bg-copper"></span>
                                      {rate.paymentTerm}
                                    </p>
                                  </div>

                                  <div className="text-right flex-shrink-0">
                                    {nights > 0 ? (
                                      <>
                                        <p className="text-2xl md:text-3xl font-playfair font-bold text-forest leading-none">
                                          ₱{totalPrice.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-charcoal/50 mt-1 font-medium">
                                          {nights} {nights === 1 ? 'night' : 'nights'}
                                        </p>
                                      </>
                                    ) : (
                                      <p className="text-xl font-playfair font-bold text-forest">
                                        ₱{rate.price.toLocaleString()}<span className="text-sm font-normal text-charcoal/60">/night</span>
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                  <button
                                    onClick={() => setExpandedRate(isExpanded ? null : rate.id)}
                                    className="text-xs font-medium text-forest hover:text-copper transition-colors inline-flex items-center gap-1 group"
                                  >
                                    <span>{isExpanded ? 'Less' : 'More'} details</span>
                                    <svg
                                      className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>

                                  <button
                                    onClick={() => setSelectedRate(rate)}
                                    className={`ml-auto px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm shadow-md hover:shadow-lg ${
                                      isRateSelected
                                        ? 'bg-forest text-white hover:bg-forest/90'
                                        : 'bg-copper text-white hover:bg-copper/90'
                                    }`}
                                  >
                                    {isRateSelected ? (
                                      <span className="inline-flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Selected
                                      </span>
                                    ) : (
                                      'Select Rate'
                                    )}
                                  </button>
                                </div>

                                {/* Expandable Features */}
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 pt-4 border-t border-charcoal/10"
                                  >
                                    <p className="text-xs font-semibold text-forest uppercase tracking-wider mb-3">Included Benefits</p>
                                    <ul className="space-y-2">
                                      {rate.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-charcoal/70">
                                          <svg className="w-4 h-4 text-copper flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                          </svg>
                                          <span className="leading-relaxed">{feature}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column - Booking Summary (Sticky) - Desktop Only */}
            <div className="hidden lg:block">
              <div className="bg-white border border-charcoal/10 rounded-sm shadow-lg p-5 lg:sticky lg:top-32 lg:z-10">

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-copper/10">
                  <h3 className="text-lg font-playfair font-bold text-forest">Booking Summary</h3>
                  <svg className="w-5 h-5 text-copper/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>

                {checkIn && checkOut && nights > 0 ? (
                  <>
                    <div className="space-y-3 mb-5 pb-5 border-b border-charcoal/10">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-charcoal/60 font-medium">Check-in</span>
                        <span className="text-charcoal font-semibold">{formatDate(checkIn)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-charcoal/60 font-medium">Check-out</span>
                        <span className="text-charcoal font-semibold">{formatDate(checkOut)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs bg-copper/5 -mx-5 px-5 py-2.5">
                        <span className="text-charcoal/70 font-semibold">Duration</span>
                        <span className="text-forest font-bold">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-charcoal/60 font-medium">Guests</span>
                        <span className="text-charcoal font-semibold">{rooms} {rooms === 1 ? 'room' : 'rooms'}, {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                    </div>

                    {selectedRoom && (
                      <div className="mb-4 pb-4 border-b border-charcoal/10 bg-cream/30 -mx-5 px-5 py-4">
                        <p className="text-xs text-charcoal/60 font-bold uppercase tracking-widest mb-2">Selected Room</p>
                        <p className="text-base font-playfair font-bold text-forest leading-tight">{selectedRoom.name}</p>
                      </div>
                    )}

                    {selectedRoom && selectedRate ? (
                      <>
                        <div className="mb-5">
                          <p className="text-xs text-charcoal/60 font-bold uppercase tracking-widest mb-2.5">Selected Rate</p>
                          <p className="text-sm font-semibold text-forest mb-1">{selectedRate.name}</p>
                          <p className="text-xs text-charcoal/50 mb-3.5">₱{selectedRate.price.toLocaleString()} per night</p>
                          <div className="bg-forest/5 -mx-5 px-5 py-4 border-t border-b border-forest/10">
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-charcoal/60">₱{selectedRate.price.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'} × {rooms} {rooms === 1 ? 'room' : 'rooms'}</span>
                              </div>
                            </div>
                            <div className="h-px bg-charcoal/10 my-3"></div>
                            <p className="text-xs text-charcoal/60 uppercase tracking-wider mb-1">Total Amount</p>
                            <p className="text-3xl font-playfair font-bold text-forest leading-none">
                              ₱{(selectedRate.price * nights * rooms).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleBook}
                          className="w-full bg-copper text-white py-3 font-bold text-xs uppercase tracking-widest hover:bg-copper/90 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-sm transform hover:-translate-y-0.5"
                        >
                          Complete Booking
                        </button>
                      </>
                    ) : selectedRoom && !selectedRate ? (
                      <div className="text-center py-5">
                        <svg className="w-10 h-10 text-charcoal/20 mx-auto mb-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xs font-medium text-charcoal/60 mb-4">Select a rate plan to continue</p>
                        <button
                          disabled
                          className="w-full bg-charcoal/10 text-charcoal/30 py-3 font-bold text-xs uppercase tracking-widest cursor-not-allowed rounded-sm"
                        >
                          Complete Booking
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <svg className="w-10 h-10 text-charcoal/20 mx-auto mb-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p className="text-xs font-medium text-charcoal/60 mb-4">Select a room to see available rates</p>
                        <button
                          disabled
                          className="w-full bg-charcoal/10 text-charcoal/30 py-3 font-bold text-xs uppercase tracking-widest cursor-not-allowed rounded-sm"
                        >
                          Complete Booking
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-10">
                    <svg className="w-12 h-12 text-charcoal/15 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs font-medium text-charcoal/60">Select your dates above to begin</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== MOBILE STICKY BOTTOM BAR - TO UNDO: DELETE THIS ENTIRE SECTION ===== */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-copper/20 shadow-2xl z-50">
          <div className="px-4 py-3">
            {checkIn && checkOut && nights > 0 ? (
              <div className="space-y-2">
                {/* Dates and nights */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal/60 font-medium">
                    {formatDateShort(checkIn)} - {formatDateShort(checkOut)}
                  </span>
                  <span className="text-copper/70 font-semibold">
                    {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>

                {/* Selected room and rate */}
                {selectedRoom && selectedRate ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-forest">{selectedRoom.name}</p>
                        <p className="text-[10px] text-charcoal/60">{selectedRate.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-playfair font-bold text-forest leading-none">
                          ₱{(selectedRate.price * nights * rooms).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-charcoal/50">Total</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBook}
                      className="w-full bg-copper text-white py-2.5 font-bold text-xs uppercase tracking-widest hover:bg-copper/90 transition-all duration-300 rounded-sm"
                    >
                      Complete Booking
                    </button>
                  </>
                ) : selectedRoom ? (
                  <p className="text-xs text-center text-charcoal/60 py-2">Select a rate to continue</p>
                ) : (
                  <p className="text-xs text-center text-charcoal/60 py-2">Select a room to continue</p>
                )}
              </div>
            ) : (
              <p className="text-xs text-center text-charcoal/60 py-2">Select your dates above to begin</p>
            )}
          </div>
        </div>
        {/* ===== END MOBILE STICKY BOTTOM BAR ===== */}
      </section>
    </>
  );
};

export default BookingPage;
