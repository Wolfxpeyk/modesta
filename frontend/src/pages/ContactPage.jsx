/**
 * Modesta Resort - Contact & Location Page
 * Comprehensive contact information, location details, and inquiry form
 */

import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPlane,
  FaCar,
  FaShip,
  FaWhatsapp,
  FaFacebookMessenger,
  FaMountain,
  FaUmbrellaBeach,
  FaWater,
  FaTree,
  FaPaperPlane,
  FaUser,
  FaCommentDots,
  FaExternalLinkAlt,
  FaChevronDown,
} from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general',
  });

  // Slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);

  const heroImages = [
    '/images/intro-main.jpg',
    '/images/intro-detail-2.jpg',
    '/images/intro-detail-3.jpg',
  ];

  // Shared zoom animation - ONE timeline for BOTH layers
  const scale = useMotionValue(1.03);
  const maskX = useMotionValue(0); // 0 = visible, 100 = hidden

  // Transform maskX to CSS mask-position value
  const maskPosition = useTransform(maskX, (x) => `${x}% 0`);

  useEffect(() => {
    // Mirror zoom - smoothly reverses direction (no snap/reset)
    const zoomAnimation = animate(scale, 1.08, {
      duration: 10,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'mirror' // ← Smoothly reverses: 1.03→1.08→1.03 (no snap!)
    });

    return () => zoomAnimation.stop();
  }, [scale]);

  // Auto-advance slideshow - transition at 2s, lasts 3s
  useEffect(() => {
    const triggerTransition = () => {
      // Update image indices
      setCurrentImageIndex((current) => {
        setPrevImageIndex(current);
        return (current + 1) % heroImages.length;
      });

      // Instantly reset mask position to hide new image
      maskX.set(100);

      // Animate mask from right (100) to left (0) over 3 seconds
      setTimeout(() => {
        animate(maskX, 0, {
          duration: 3,
          ease: 'linear'
        });
      }, 50);
    };

    // First transition at 2 seconds
    const firstTimeout = setTimeout(() => {
      triggerTransition();

      // Then repeat every 5 seconds
      const interval = setInterval(triggerTransition, 5000);
      firstTimeout.intervalId = interval;
    }, 2000);

    return () => {
      clearTimeout(firstTimeout);
      if (firstTimeout.intervalId) {
        clearInterval(firstTimeout.intervalId);
      }
    };
  }, [heroImages.length, maskX]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Nearby attractions data
  const attractions = [
    {
      name: 'Bulusan Lake',
      distance: '15 mins',
      description: 'Serene crater lake surrounded by lush forests',
      icon: <FaWater />,
    },
    {
      name: 'Mt. Bulusan',
      distance: '25 mins',
      description: 'Active volcano with stunning hiking trails',
      icon: <FaMountain />,
    },
    {
      name: 'Irosin Hot Springs',
      distance: '10 mins',
      description: 'Natural thermal springs for relaxation',
      icon: <FaUmbrellaBeach />,
    },
    {
      name: 'Rizal Beach',
      distance: '20 mins',
      description: 'Pristine white sand beach with crystal waters',
      icon: <FaTree />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Modesta Resort</title>
        <meta
          name="description"
          content="Get in touch with Modesta Resort. Find our location, contact information, and reach out for reservations or inquiries."
        />
      </Helmet>

      {/* Hero Section - Full Screen with Gradient Mask Reveal */}
      <section data-hero-section className="relative h-screen w-full overflow-hidden">
        {/* Slideshow Background - Shared Zoom Container */}
        <motion.div className="absolute inset-0" style={{ scale }}>
          {/* Base Layer - Previous Image (NO KEY - never remounts) */}
          <div className="absolute inset-0">
            <img
              src={heroImages[prevImageIndex]}
              alt="Modesta Resort"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Revealing Layer - Current Image with Gradient Mask (NO KEY - never remounts) */}
          <motion.div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: 'linear-gradient(110deg, black 0%, black 45%, transparent 75%, transparent 100%)',
              maskImage: 'linear-gradient(110deg, black 0%, black 45%, transparent 75%, transparent 100%)',
              WebkitMaskSize: '350% 100%',
              maskSize: '350% 100%',
              WebkitMaskPosition: maskPosition,
              maskPosition: maskPosition,
            }}
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Modesta Resort"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay - Applied on top of both images */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/25 to-charcoal/35 pointer-events-none" />
        </motion.div>

        {/* Hero Content - Static (no re-render) */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 z-10">
          <div className="text-center text-white max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-2 sm:space-y-3"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-light text-white tracking-widest">
                FIND YOUR WAY TO
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight tracking-widest">
                PARADISE
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-cream tracking-wide pt-2 sm:pt-3">
                Sitio Calian, Brgy. Bagsangan, Irosin, Sorsogon
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-0 right-0 flex justify-center z-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="text-white animate-bounce flex items-center justify-center"
            aria-label="Scroll to content"
          >
            <FaChevronDown className="text-2xl sm:text-3xl" />
          </motion.button>
        </div>
      </section>

      {/* Contact Grid Section - Modern Redesign */}
      <section className="relative py-20 sm:py-24 md:py-28 bg-cream">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-forest mb-3 tracking-tight">
              Contact Information
            </h2>
            <p className="text-base text-charcoal/60 max-w-2xl font-light leading-relaxed">
              For assistance, reservations, or inquiries, please reach out through any of the following channels.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-cream/30 p-8 h-full border border-charcoal/10">
                {/* Title */}
                <h3 className="text-base font-semibold text-charcoal uppercase tracking-widest mb-6">
                  Location
                </h3>

                {/* Content */}
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Address</p>
                    <p className="text-sm text-charcoal/80 leading-relaxed">
                      Sitio Calian, Brgy. Bagsangan<br />
                      Irosin, Sorsogon<br />
                      Philippines
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Coordinates</p>
                    <p className="text-xs font-mono text-charcoal/70">12.7264° N, 124.0292° E</p>
                  </div>

                  <div className="pt-4 border-t border-charcoal/10">
                    <a
                      href="https://www.google.com/maps/place/Modesta+Resort/@12.726354433192167,124.02916842699848,20z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-charcoal hover:text-forest transition-colors inline-flex items-center gap-2"
                    >
                      <FaMapMarkerAlt className="text-copper" />
                      <span>View on Map</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reservations Card - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-charcoal p-8 h-full flex flex-col">
                {/* Title */}
                <h3 className="text-base font-semibold text-white uppercase tracking-widest mb-6">
                  Reservations
                </h3>

                {/* Content */}
                <div className="space-y-5 flex-grow">
                  <div>
                    <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">Phone</p>
                    <a href="tel:+639123456789" className="text-sm text-white hover:text-copper transition-colors">
                      +63 912 345 6789
                    </a>
                    <p className="text-xs text-white/40 mt-1">Available 24/7</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">WhatsApp</p>
                    <a
                      href="https://wa.me/639123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-copper transition-colors inline-flex items-center gap-2"
                    >
                      <FaWhatsapp />
                      <span>+63 912 345 6789</span>
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">Messenger</p>
                    <a
                      href="https://m.me/modestaresort"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-copper transition-colors inline-flex items-center gap-2"
                    >
                      <FaFacebookMessenger />
                      <span>@modestaresort</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Concierge Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-cream/30 p-8 h-full border border-charcoal/10">
                {/* Title */}
                <h3 className="text-base font-semibold text-charcoal uppercase tracking-widest mb-6">
                  Concierge
                </h3>

                {/* Content */}
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Reservations Email</p>
                    <a
                      href="mailto:reservations@modestaresort.com"
                      className="text-sm text-charcoal hover:text-forest transition-colors break-all"
                    >
                      reservations@modestaresort.com
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">General Inquiries</p>
                    <a
                      href="mailto:info@modestaresort.com"
                      className="text-sm text-charcoal hover:text-forest transition-colors"
                    >
                      info@modestaresort.com
                    </a>
                  </div>

                  <div className="pt-5 border-t border-charcoal/10">
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-4">Property Hours</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-charcoal/70">Check-in</span>
                        <span className="text-sm text-charcoal font-medium">2:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-charcoal/70">Check-out</span>
                        <span className="text-sm text-charcoal font-medium">12:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <p className="text-xs text-charcoal/50 flex items-center gap-2">
                      <FaClock className="text-copper" />
                      <span>Response within 2 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section - Professional Design */}
      <section className="relative py-20 sm:py-24 md:py-28 bg-cream">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left - Location Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-forest mb-3 tracking-tight">
                  Location & Directions
                </h2>
                <p className="text-base text-charcoal/60 max-w-2xl font-light leading-relaxed mb-12">
                  Find your way to our tranquil retreat in Sorsogon, Philippines.
                </p>

                <div className="bg-cream/30 p-8 border border-charcoal/10 space-y-6">
                  {/* Address */}
                  <div>
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Address</p>
                    <p className="text-sm text-charcoal/80 leading-relaxed">
                      Sitio Calian, Brgy. Bagsangan
                      <br />
                      Irosin, Sorsogon
                      <br />
                      Philippines
                    </p>
                  </div>

                  {/* Coordinates */}
                  <div className="pt-4 border-t border-charcoal/10">
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Coordinates</p>
                    <p className="text-sm font-mono text-charcoal/80">12.7264° N, 124.0292° E</p>
                  </div>

                  {/* Travel Time */}
                  <div className="pt-4 border-t border-charcoal/10">
                    <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Travel Time</p>
                    <p className="text-sm text-charcoal/80">1.5 hours from Bicol International Airport</p>
                  </div>

                  {/* Directions Link */}
                  <div className="pt-6 border-t border-charcoal/10">
                    <a
                      href="https://www.google.com/maps/place/Modesta+Resort/@12.726354433192167,124.02916842699848,20z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-charcoal text-sm hover:text-forest transition-colors group"
                    >
                      <FaMapMarkerAlt className="text-copper" />
                      <span className="font-medium">View on Google Maps</span>
                      <FaExternalLinkAlt className="text-xs opacity-50 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right - Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] lg:h-[500px]"
              >
                <div className="w-full h-full overflow-hidden border border-charcoal/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d645.7084022671936!2d124.02916842699848!3d12.726354433192167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0c579b1bac969%3A0xeb057795ef57b5b9!2sModesta%20Resort!5e1!3m2!1sen!2sph!4v1762500441280!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Modesta Resort Location"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach Us - Professional Design */}
      <section className="relative py-20 sm:py-24 md:py-28 bg-cream">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-forest mb-3 tracking-tight">
                Getting Here
              </h2>
              <p className="text-base text-charcoal/60 max-w-2xl font-light leading-relaxed">
                Choose your preferred method of transportation to reach our resort.
              </p>
            </motion.div>

            {/* Travel Options - Clean Rows */}
            <div className="space-y-0 border-t border-charcoal/10">
              {/* By Air */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-b border-charcoal/10 py-10 sm:py-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Icon & Title */}
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <FaPlane className="text-copper text-xl" />
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-forest">By Air</h3>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Airport</p>
                      <p className="text-sm text-charcoal/80">Bicol International Airport</p>
                      <p className="text-xs text-charcoal/60 mt-1">1.5 hours via private transfer</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Special Offer</p>
                      <p className="text-sm text-charcoal/80">Complimentary airport pickup for stays of 3+ nights</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* By Land */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-b border-charcoal/10 py-10 sm:py-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Icon & Title */}
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <FaCar className="text-copper text-xl" />
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-forest">By Land</h3>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Drive Time</p>
                      <p className="text-sm text-charcoal/80">From Manila: 10-12 hours</p>
                      <p className="text-sm text-charcoal/80 mt-1">From Legazpi: 2 hours</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Route</p>
                      <p className="text-sm text-charcoal/80">Scenic coastal route via Maharlika Highway</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* By Sea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-b border-charcoal/10 py-10 sm:py-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Icon & Title */}
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <FaShip className="text-copper text-xl" />
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-forest">By Sea</h3>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Service</p>
                      <p className="text-sm text-charcoal/80">Private Yacht Charter</p>
                      <p className="text-xs text-charcoal/60 mt-1">Available from neighboring islands</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Arrangements</p>
                      <p className="text-sm text-charcoal/80">Contact our concierge team for yacht bookings and island tours</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section - Professional & Formal */}
      <section className="relative py-20 sm:py-24 md:py-28 bg-cream">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-forest mb-3 tracking-tight">
                Contact Our Team
              </h2>
              <p className="text-base text-charcoal/60 max-w-2xl font-light leading-relaxed">
                For reservations, inquiries, or assistance, please complete the form below or reach out through our direct channels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-cream/30 p-10 border border-charcoal/10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaCommentDots className="text-copper" />
                        <span>Inquiry Type</span>
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#fffbf2] border border-charcoal/15 focus:border-forest focus:outline-none transition-colors text-sm text-charcoal"
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="reservation">Reservation</option>
                        <option value="event">Event Planning</option>
                        <option value="corporate">Corporate Booking</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaUser className="text-copper" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#fffbf2] border border-charcoal/15 focus:border-forest focus:outline-none transition-colors text-sm text-charcoal"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaEnvelope className="text-copper" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#fffbf2] border border-charcoal/15 focus:border-forest focus:outline-none transition-colors text-sm text-charcoal"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaPhone className="text-copper" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#fffbf2] border border-charcoal/15 focus:border-forest focus:outline-none transition-colors text-sm text-charcoal"
                        placeholder="+63 912 345 6789"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaCommentDots className="text-copper" />
                        <span>Message</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3.5 bg-[#fffbf2] border border-charcoal/15 focus:border-forest focus:outline-none transition-colors text-sm text-charcoal resize-none"
                        placeholder="Please provide details about your inquiry"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-forest text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-charcoal transition-all duration-300 mt-8"
                    >
                      Submit Inquiry
                    </button>

                    {/* Response Time */}
                    <p className="text-center text-xs text-charcoal/50 pt-4 border-t border-charcoal/10">
                      Response time: Within 2 business hours
                    </p>
                  </form>
                </div>
              </motion.div>

              {/* Information Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Operating Hours Card */}
                <div className="bg-cream/30 p-8 border border-charcoal/10">
                  <h4 className="text-base font-semibold text-charcoal uppercase tracking-widest mb-6">
                    Operating Hours
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-charcoal/10">
                      <span className="text-xs font-medium text-charcoal/60 uppercase tracking-wider">Front Desk</span>
                      <span className="text-sm text-charcoal font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-charcoal/10">
                      <span className="text-xs font-medium text-charcoal/60 uppercase tracking-wider">Concierge</span>
                      <span className="text-sm text-charcoal font-medium">6 AM - 10 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-charcoal/10">
                      <span className="text-xs font-medium text-charcoal/60 uppercase tracking-wider">Check-in</span>
                      <span className="text-sm text-charcoal font-medium">2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs font-medium text-charcoal/60 uppercase tracking-wider">Check-out</span>
                      <span className="text-sm text-charcoal font-medium">12:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="bg-cream/30 p-8 border border-charcoal/10">
                  <h4 className="text-base font-semibold text-charcoal uppercase tracking-widest mb-6">
                    Direct Contact
                  </h4>
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Phone</p>
                      <a href="tel:+639123456789" className="text-sm text-charcoal hover:text-forest transition-colors">
                        +63 912 345 6789
                      </a>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">WhatsApp</p>
                      <a
                        href="https://wa.me/639123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-charcoal hover:text-forest transition-colors"
                      >
                        +63 912 345 6789
                      </a>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-2">Email</p>
                      <a href="mailto:info@modestaresort.com" className="text-sm text-charcoal hover:text-forest transition-colors break-all">
                        info@modestaresort.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Concierge Services Card */}
                <div className="bg-cream/30 p-8 border border-charcoal/10">
                  <h4 className="text-base font-semibold text-charcoal uppercase tracking-widest mb-6">
                    Concierge Services
                  </h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
                    Our concierge team is available to assist with bespoke experiences, event planning, and personalized arrangements.
                  </p>
                  <div className="pt-5 border-t border-charcoal/10">
                    <p className="text-xs text-charcoal/60 uppercase tracking-wider">Available Services</p>
                    <ul className="mt-3 space-y-2 text-sm text-charcoal/70">
                      <li>• Event Planning</li>
                      <li>• Transportation Arrangements</li>
                      <li>• Custom Experiences</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="relative py-20 sm:py-24 md:py-28 bg-cream">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-forest mb-3 tracking-tight">
              Explore the Surroundings
            </h2>
            <p className="text-base text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
              Discover natural wonders and local attractions near Modesta Resort.
            </p>
          </motion.div>

          {/* Attractions Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-cream/30 p-8 text-center transition-all duration-300 border border-charcoal/10"
              >
                <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                  <div className="text-copper text-2xl">{attraction.icon}</div>
                </div>
                <h3 className="text-lg font-playfair font-bold text-forest mb-2">{attraction.name}</h3>
                <p className="text-xs font-medium text-charcoal/60 uppercase tracking-wider mb-4">{attraction.distance}</p>
                <p className="text-sm text-charcoal/80 font-light leading-relaxed">{attraction.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
