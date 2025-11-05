# Modesta Resort - Quick Setup Guide

## Initial Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd modesta-resort/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Set Up Database

1. **Start MySQL:**
   ```bash
   # macOS (with Homebrew)
   brew services start mysql

   # Or start manually
   mysql.server start
   ```

2. **Create the database:**
   ```bash
   cd modesta-resort/backend
   mysql -u root -p < config/database.sql
   ```

   This creates:
   - ✅ Database: `modesta_resort`
   - ✅ 40+ tables with relationships
   - ✅ Indexes for performance
   - ✅ Stored procedures
   - ✅ Sample data (loyalty tiers, amenities, etc.)

### Step 3: Configure Environment

```bash
cd backend
cp .env.example .env
```

**Edit `.env` with your settings:**

```env
# Minimum required configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=modesta_resort

JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here

# Optional (for full functionality)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
SENDGRID_API_KEY=your_sendgrid_key
```

### Step 4: Start Redis (Optional but Recommended)

```bash
# macOS
brew services start redis

# Or Docker
docker run -d -p 6379:6379 redis:latest
```

### Step 5: Launch the Application

**Terminal 1 - Backend:**
```bash
cd modesta-resort/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd modesta-resort/frontend
npm run dev
```

### Step 6: Access the Application

- 🌐 **Frontend:** http://localhost:5173
- 🔌 **Backend API:** http://localhost:5000
- 💚 **Health Check:** http://localhost:5000/health

---

## Testing the Application

### 1. View the Homepage
Navigate to http://localhost:5173 to see:
- ✨ Stunning hero section with animations
- 📊 Dynamic statistics
- 🏨 Featured luxury rooms
- 💬 Guest testimonials
- 🎯 Smooth scroll animations

### 2. Test API Endpoints

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
```

**Get room categories:**
```bash
curl http://localhost:5000/api/v1/rooms/categories
```

---

## Troubleshooting

### Database Connection Error

**Problem:** `ER_ACCESS_DENIED_ERROR` or `ECONNREFUSED`

**Solution:**
1. Check MySQL is running: `mysql.server status`
2. Verify credentials in `.env`
3. Test connection: `mysql -u root -p`

### Port Already in Use

**Problem:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Redis Connection Error

**Problem:** Redis connection refused

**Solution:**
1. Redis is optional for development
2. Start Redis: `redis-server`
3. Or comment out Redis code temporarily

### Frontend Build Errors

**Problem:** Module not found errors

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Adding Sample Data

### Create Sample Rooms

```sql
-- Connect to MySQL
mysql -u root -p modesta_resort

-- Add room categories
INSERT INTO room_categories (category_name, category_slug, description, size_sqm, max_occupancy, max_adults, max_children, base_price) VALUES
('Standard Ocean View', 'standard-ocean-view', 'Comfortable room with ocean views', 35, 2, 2, 1, 299.00),
('Deluxe Suite', 'deluxe-suite', 'Spacious suite with luxury amenities', 55, 3, 2, 2, 499.00),
('Presidential Villa', 'presidential-villa', 'Ultimate luxury accommodation', 120, 6, 4, 2, 1299.00);

-- Add rooms
INSERT INTO rooms (room_number, category_id, floor_number, view_type, status) VALUES
('101', 1, 1, 'ocean', 'available'),
('102', 1, 1, 'ocean', 'available'),
('201', 2, 2, 'ocean', 'available'),
('301', 3, 3, 'ocean', 'available');
```

---

## Next Steps

### 1. Customize Branding
- Update logo in `frontend/src/assets/`
- Modify colors in `tailwind.config.js`
- Edit content in components

### 2. Add Real Images
Replace placeholder images in:
- `HeroSection.jsx`
- `FeaturedRooms.jsx`
- Room category images in database

### 3. Configure Payment
1. Get Stripe API keys from https://stripe.com
2. Add to `.env`: `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
3. Test in development mode

### 4. Set Up Email
1. Create SendGrid account
2. Verify sender email
3. Add API key to `.env`
4. Test email notifications

### 5. Deploy to Production
- Backend: Deploy to DigitalOcean, AWS, or Heroku
- Frontend: Deploy to Vercel or Netlify
- Database: Use managed MySQL (AWS RDS, DigitalOcean Managed Database)
- Redis: Use Redis Cloud or managed service

---

## Development Tips

### Hot Reload
Both frontend and backend have hot reload enabled:
- Backend: Uses `nodemon` (npm run dev)
- Frontend: Uses Vite HMR

### API Testing
Use the included Postman collection:
```bash
# Import modesta-resort-api.postman_collection.json
```

### Database Management
Recommended tools:
- **MySQL Workbench** - Visual database design
- **TablePlus** - Modern database client
- **phpMyAdmin** - Web-based admin

### Code Quality
```bash
# Lint frontend code
cd frontend
npm run lint

# Format code (if prettier configured)
npm run format
```

---

## Production Checklist

Before deploying to production:

- [ ] Change all default secrets in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Configure Redis for production
- [ ] Add error monitoring (Sentry, etc.)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test payment flow end-to-end
- [ ] Verify email delivery
- [ ] Load test the API
- [ ] Run security audit
- [ ] Set up CI/CD pipeline

---

## Support

Need help? Check:
- 📖 Main README.md for detailed documentation
- 🐛 GitHub Issues for known problems
- 💬 Contact: dev@modestaresort.com

---

**Ready to experience luxury? Start the servers and visit http://localhost:5173** 🏨✨
