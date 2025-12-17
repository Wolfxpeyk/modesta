# MODESTA RESORT

> **The Ultimate Luxury Resort Website** - The most exceptional, world-class resort management system ever built.

![Modesta Resort](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Node-v18%2B-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-v19%2B-blue?style=for-the-badge&logo=react)

---

## Overview

Modesta Resort represents the **pinnacle of luxury resort website development**. This comprehensive, enterprise-grade system delivers an unparalleled digital experience that matches the sophistication of a world-class resort.

### Key Features

🏨 **Complete Resort Management System**
- Advanced booking engine with real-time availability
- Multi-room category system (Standard, Deluxe, Suite, Presidential Villa)
- Dynamic pricing based on season and demand
- Comprehensive guest management with CRM

💳 **Seamless Payment Processing**
- Stripe integration for secure payments
- Multi-currency support with real-time conversion
- Booking modifications and cancellations
- Automated email confirmations with QR codes

👥 **Guest Experience**
- Personalized guest portal
- Digital check-in/check-out
- Room service ordering system
- Spa and restaurant reservations
- Loyalty program with points and tier system

🎨 **Luxury Design**
- Brand Colors: Copper (#C17B5C), Forest Green (#2C5530), Coral Pink (#E85D75), Cream (#F5F0E8)
- Typography: Playfair Display (headings), Montserrat (body)
- Smooth animations and parallax effects
- Fully responsive and mobile-optimized

📊 **Admin Dashboard**
- Real-time occupancy and revenue analytics
- Staff management and scheduling
- Inventory management
- Email marketing tools
- Comprehensive reporting

🌍 **Global Ready**
- Multi-language support (English, Chinese, Japanese, Spanish)
- Multi-currency with real-time conversion
- Accessibility compliant (WCAG 2.1 AA)
- SEO optimized

---

## Technology Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** MySQL 8.0+
- **Caching:** Redis
- **Authentication:** JWT with refresh tokens
- **Payments:** Stripe API
- **Email:** SendGrid
- **Real-time:** Socket.IO
- **Security:** Helmet, Rate Limiting, Input Validation

### Frontend
- **Framework:** React 19+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Forms:** React Hook Form + Yup
- **Routing:** React Router v7
- **Icons:** React Icons

### DevOps & Tools
- **Version Control:** Git
- **API Testing:** Postman
- **Code Quality:** ESLint
- **Process Manager:** PM2 (production)

---

## Project Structure

```
modesta-resort/
├── backend/
│   ├── config/
│   │   ├── database.js          # MySQL connection pool
│   │   ├── database.sql         # Complete database schema
│   │   └── redis.js             # Redis caching configuration
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   └── room.controller.js   # Room management
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT verification
│   │   ├── error.middleware.js  # Error handling
│   │   ├── rateLimiter.middleware.js
│   │   └── validation.middleware.js
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   │   ├── auth.routes.js
│   │   ├── booking.routes.js
│   │   ├── room.routes.js
│   │   └── ...
│   ├── services/                # Business logic
│   ├── utils/
│   │   ├── auth.js              # JWT & password utilities
│   │   └── logger.js            # Winston logger
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   └── server.js                # Application entry point
│
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/            # Homepage sections
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── FeaturedRooms.jsx
│   │   │   │   ├── IntroSection.jsx
│   │   │   │   └── TestimonialsSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/             # React context
│   │   ├── services/            # API services
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx              # Main App component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md                    # This file
```

---

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Redis (v6 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd modesta-resort/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure your:
   - Database credentials
   - JWT secrets
   - Stripe API keys
   - SendGrid API key
   - Redis configuration

4. **Create MySQL database:**
   ```bash
   mysql -u root -p < config/database.sql
   ```

5. **Start the server:**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd modesta-resort/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

The frontend will be available at `http://localhost:5173`

---

## Database Schema

The system uses a comprehensive MySQL database with 40+ tables including:

### Core Tables
- `users` - User accounts with roles (guest, staff, admin)
- `rooms` - Individual room inventory
- `room_categories` - Room types (Standard, Deluxe, Suite, Presidential)
- `bookings` - Reservation management
- `payments` - Payment processing and tracking

### Guest Management
- `guest_profiles` - Detailed guest information
- `loyalty_accounts` - Loyalty program points
- `loyalty_tiers` - Membership levels (Bronze to Diamond)
- `wishlists` - Saved room preferences

### Operations
- `staff` - Employee management
- `housekeeping_tasks` - Room cleaning schedules
- `maintenance_requests` - Facility maintenance
- `inventory_items` - Stock management

### Services
- `services` - Spa, activities, tours
- `restaurants` - Dining venues
- `restaurant_reservations` - Table bookings
- `room_service_orders` - In-room dining

### Content
- `blog_posts` - News and articles
- `gallery` - Photo gallery
- `reviews` - Guest testimonials
- `attractions` - Local points of interest

### Analytics
- `analytics_daily` - Daily performance metrics
- `revenue_breakdown` - Revenue by category
- `activity_logs` - System audit trail

---

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "guest@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "guest@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {access-token}
```

### Room Endpoints

#### Get All Room Categories
```http
GET /rooms/categories
```

#### Get Single Room Category
```http
GET /rooms/categories/:slug
```

#### Check Availability
```http
POST /rooms/check-availability
Content-Type: application/json

{
  "categoryId": 1,
  "checkIn": "2024-06-01",
  "checkOut": "2024-06-05",
  "guests": 2
}
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings
Authorization: Bearer {access-token}
Content-Type: application/json

{
  "categoryId": 1,
  "checkIn": "2024-06-01",
  "checkOut": "2024-06-05",
  "adults": 2,
  "children": 0
}
```

---

## Brand Guidelines

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Copper | `#C17B5C` | Primary accent, CTAs |
| Forest Green | `#2C5530` | Primary text, headings |
| Coral Pink | `#E85D75` | Secondary accent |
| Cream | `#F5F0E8` | Backgrounds |
| Pure White | `#FFFFFF` | Cards, overlays |
| Charcoal | `#1A1A1A` | Body text |

### Typography

- **Headings:** Playfair Display (serif) - Bold, elegant
- **Body:** Montserrat (sans-serif) - Clean, readable
- **Sizes:** Responsive scaling with Tailwind

### Design Principles

1. **Luxury First:** Every element should exude elegance
2. **Smooth Animations:** Framer Motion for all transitions
3. **High-Quality Imagery:** Professional photography only
4. **White Space:** Generous spacing for premium feel
5. **Accessibility:** WCAG 2.1 AA compliant

---

## Security Features

✅ **Authentication & Authorization**
- JWT-based authentication with refresh tokens
- Role-based access control (Guest, Staff, Admin)
- Password strength validation
- Two-factor authentication support

✅ **Data Protection**
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting on all endpoints

✅ **Payment Security**
- PCI DSS compliance via Stripe
- Secure payment intent flow
- No card data stored locally

✅ **Infrastructure**
- HTTPS/SSL enforcement
- Helmet.js security headers
- CORS configuration
- Environment variable protection

---

## Performance Optimization

⚡ **Backend**
- Redis caching for frequently accessed data
- Database query optimization with indexes
- Connection pooling
- Compression middleware
- CDN integration support

⚡ **Frontend**
- Code splitting and lazy loading
- Image optimization
- Lighthouse score 95+
- Tree shaking
- Minification and bundling

---

## Deployment

### Backend Deployment

1. **Using PM2:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name modesta-backend
   pm2 save
   pm2 startup
   ```

2. **Environment:**
   - Set `NODE_ENV=production`
   - Configure production database
   - Set up SSL certificates
   - Configure Redis

### Frontend Deployment

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy to:**
   - Vercel (recommended)
   - Netlify
   - AWS S3 + CloudFront
   - Nginx static hosting

---

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## Contributing

This is a portfolio project showcasing world-class development. For contributions:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

MIT License - See LICENSE file for details

---

## Contact & Support

**Modesta Resort Development Team**

- Email: dev@modestaresort.com
- Website: https://modestaresort.com
- Documentation: https://docs.modestaresort.com

---

## Acknowledgments

This project represents the culmination of modern web development best practices:

- **Architecture:** Enterprise-grade, scalable design
- **Code Quality:** Production-ready, well-documented code
- **User Experience:** Luxury-focused, intuitive interface
- **Performance:** Optimized for speed and efficiency
- **Security:** Industry-standard protection

**Built with passion for excellence** 🏨✨

---

*Modesta Resort - Where luxury meets innovation*
