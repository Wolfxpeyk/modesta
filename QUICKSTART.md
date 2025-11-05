# Modesta Resort - Quick Start (2 Minutes)

## Fastest Way to Get Running

### Prerequisites Check
```bash
node --version    # Should be v18+
mysql --version   # Should be 8.0+
redis-cli ping    # Optional, should return PONG
```

---

## Option 1: Automated Setup (Recommended)

### Step 1: One-Command Setup
```bash
cd modesta-resort

# Backend setup
cd backend && npm install && cp .env.example .env && cd ..

# Frontend setup
cd frontend && npm install && cd ..
```

### Step 2: Configure Database
```bash
# Edit backend/.env with your MySQL password
nano backend/.env

# Then create database
mysql -u root -p < backend/config/database.sql
```

### Step 3: Run Everything
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Step 4: Visit
🌐 Open http://localhost:5173

---

## Option 2: Manual Setup

### Backend (2 commands)
```bash
cd modesta-resort/backend
npm install
```

Create `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=modesta_resort
JWT_SECRET=your_secret_key_minimum_32_characters_long
JWT_REFRESH_SECRET=another_secret_key_also_32_chars_min
```

```bash
mysql -u root -p < config/database.sql
npm run dev
```

### Frontend (2 commands)
```bash
cd modesta-resort/frontend
npm install
npm run dev
```

---

## Verify It Works

### Test Backend
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "success": true,
  "message": "Modesta Resort API is running"
}
```

### Test Frontend
Open http://localhost:5173
You should see:
✅ Beautiful hero section
✅ Animated statistics
✅ Featured rooms
✅ Testimonials

---

## First User Registration

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@modestaresort.com",
    "password": "Admin123!@#",
    "firstName": "Resort",
    "lastName": "Admin",
    "phone": "+1234567890"
  }'
```

---

## Common Issues

**Port 5000 in use?**
```bash
lsof -i :5000
kill -9 <PID>
```

**MySQL connection error?**
- Check MySQL is running: `mysql.server status`
- Verify password in `.env`

**Cannot create database?**
```bash
mysql -u root -p
CREATE DATABASE modesta_resort;
exit;
mysql -u root -p modesta_resort < backend/config/database.sql
```

---

## What's Working Now

✅ Backend API (http://localhost:5000)
✅ Frontend Website (http://localhost:5173)
✅ User Authentication
✅ Room Browsing
✅ Database with 40+ tables
✅ Beautiful UI with animations

---

## Next Steps

1. **Browse the site** - See the luxury design
2. **Test the API** - Use the curl commands above
3. **Read README.md** - Learn about all features
4. **Customize** - Make it your own!

---

## Need Help?

📖 **Full Documentation:** README.md
🔧 **Detailed Setup:** SETUP_GUIDE.md
📊 **Project Overview:** PROJECT_SUMMARY.md

---

**You're ready! Enjoy building the ultimate luxury resort experience.** 🏨✨
