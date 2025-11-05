/**
 * Luxury Navbar Component for Modesta Resort
 */

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if navbar is over a hero section
      const navbarHeight = 100; // approximate navbar height
      const heroSections = document.querySelectorAll('[data-hero-section]');
      let overHero = false;

      heroSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if navbar overlaps with this hero section
        if (rect.top < navbarHeight && rect.bottom > 0) {
          overHero = true;
        }
      });

      setIsOverHero(overHero);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Rooms & Suites' },
    { path: '/dining', label: 'Dining' },
    { path: '/spa', label: 'Spa & Wellness' },
    { path: '/experiences', label: 'Experiences' },
    { path: '/about', label: 'About' },
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      // Small delay to ensure page has loaded
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isOverHero
          ? 'bg-transparent py-4 sm:py-6'
          : 'bg-white shadow-lg py-3 sm:py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={handleHomeClick}
          >
            <img
              src="/images/modesta-logo.svg"
              alt="Modesta Resort"
              className={`h-10 sm:h-12 md:h-16 w-auto transition-all duration-300 ${
                isOverHero ? 'brightness-0 invert' : 'brightness-100'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.path === '/') {
                    handleHomeClick(e);
                  }
                }}
                className={`font-medium transition-colors hover:text-copper ${
                  isOverHero ? 'text-white' : 'text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-copper text-white px-7 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${isOverHero ? 'text-white' : 'text-charcoal'}`}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-b-lg shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-medium text-charcoal hover:text-copper transition-colors"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (link.path === '/') {
                      handleHomeClick(e);
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <button className="bg-copper text-white px-6 py-3 font-semibold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
