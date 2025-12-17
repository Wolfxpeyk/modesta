/**
 * Luxury Footer Component for Modesta Resort
 */

import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-forest text-white">
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl sm:text-2xl font-playfair mb-3 md:mb-4 text-cream">MODESTA RESORT</h3>
            <p className="text-cream-400 mb-4 md:mb-6 text-sm sm:text-base">
              Experience the epitome of luxury and sophistication at the world's most exclusive resort destination.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-copper rounded-full flex items-center justify-center hover:bg-copper-600 transition-colors text-sm sm:text-base">
                <FaFacebookF />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-copper rounded-full flex items-center justify-center hover:bg-copper-600 transition-colors text-sm sm:text-base">
                <FaInstagram />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-copper rounded-full flex items-center justify-center hover:bg-copper-600 transition-colors text-sm sm:text-base">
                <FaTwitter />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-copper rounded-full flex items-center justify-center hover:bg-copper-600 transition-colors text-sm sm:text-base">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-copper">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/rooms" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Accommodations</Link></li>
              <li><Link to="/dining" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Dining</Link></li>
              <li><Link to="/spa" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Spa & Wellness</Link></li>
              <li><Link to="/events" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Events & Weddings</Link></li>
              <li><Link to="/gallery" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Gallery</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-copper">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">About Us</Link></li>
              <li><Link to="/contact" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Contact</Link></li>
              <li><Link to="/careers" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Careers</Link></li>
              <li><Link to="/privacy" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-cream-300 hover:text-copper transition-colors text-sm sm:text-base">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-copper">Contact Us</h4>
            <div className="space-y-3 md:space-y-4 text-cream-300 text-sm sm:text-base">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 md:mr-3 text-copper flex-shrink-0" />
                <p>123 Paradise Island<br />Luxury Bay, MB 12345</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 md:mr-3 text-copper flex-shrink-0" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 md:mr-3 text-copper flex-shrink-0" />
                <p className="break-all">info@modestaresort.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-400">
        <div className="container-custom py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-cream-300 text-xs sm:text-sm gap-2 md:gap-0">
            <p>&copy; 2024 Modesta Resort. All rights reserved.</p>
            <p className="hidden sm:block">Designed for excellence and luxury</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
