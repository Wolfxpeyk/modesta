# Modesta Resort - Complete Setup Guide

This guide will walk you through setting up and running the Modesta Resort application using Docker.

## Prerequisites

Before you begin, ensure you have:

- ✅ **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop))
- ✅ At least **4GB RAM** allocated to Docker
- ✅ Ports available: **3306** (MySQL), **5000** (Backend), **6379** (Redis), **5173** (Frontend)

## Step-by-Step Setup

### Step 1: Configure Environment Variables

1. Copy the Docker environment template to create your `.env` file:

```bash
cp .env.docker .env
```

2. Open `.env` in your editor and update these **REQUIRED** values:

```bash
# Database Passwords (CHANGE THESE!)
DB_ROOT_PASSWORD=your_secure_root_password_here
DB_PASSWORD=your_secure_app_password_here

# JWT Secrets (MUST be at least 32 characters)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_REFRESH_SECRET=your_super_secret_refresh_key_minimum_32_characters_long
```

3. **Optional**: Add your API keys if you have them:
   - Stripe keys (for payments)
   - SendGrid API key (for emails)
   - Weather/Maps API keys

### Step 2: Start Docker Services

Open your terminal in the project root directory and run:

```bash
docker-compose up -d
```

This command will:
- Download MySQL 8.0, Redis 7, and Node.js images
- Create and start all containers
- Initialize the database with your schema
- Set up networking between services

**First time setup takes 2-3 minutes** to download images and initialize.

### Step 3: Monitor Startup

Watch the logs to ensure everything starts correctly:

```bash
docker-compose logs -f
```

Press `Ctrl+C` to stop watching logs (containers keep running).

### Step 4: Verify Services are Healthy

Wait 30-40 seconds, then check service status:

```bash
docker-compose ps
```

You should see:

```
NAME                STATUS                    PORTS
modesta_backend     Up (healthy)             0.0.0.0:5000->5000/tcp
modesta_mysql       Up (healthy)             0.0.0.0:3306->3306/tcp
modesta_redis       Up (healthy)             0.0.0.0:6379->6379/tcp
```

All should show `(healthy)` status.

### Step 5: Verify Database Initialization

Check that the database tables were created:

```bash
docker-compose exec mysql mysql -u modesta -p
```

When prompted, enter your `DB_PASSWORD` from the `.env` file.

Then run these SQL commands:

```sql
USE modesta_resort;
SHOW TABLES;
SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'modesta_resort';
EXIT;
```

You should see **40+ tables** listed.

### Step 6: Test Backend API

Open your browser or use curl:

```bash
# Health check endpoint
curl http://localhost:5000/api/v1/health

# Should return: {"status":"ok","timestamp":"..."}
```

### Step 7: Start Frontend (Optional)

If you want to run the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: **http://localhost:5173**

## Quick Reference Commands

### Managing Services

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart backend

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend
docker-compose logs -f mysql
docker-compose logs -f redis

# Check service status
docker-compose ps

# View resource usage
docker stats
```

### Database Operations

```bash
# Connect to MySQL
docker-compose exec mysql mysql -u modesta -p

# Backup database
docker-compose exec mysql mysqldump -u root -p modesta_resort > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p modesta_resort < backup.sql

# View MySQL logs
docker-compose logs mysql
```

### Backend Operations

```bash
# Access backend container shell
docker-compose exec backend sh

# Run npm commands in backend
docker-compose exec backend npm run <command>

# View backend logs
docker-compose logs -f backend

# Restart backend
docker-compose restart backend
```

### Redis Operations

```bash
# Connect to Redis CLI
docker-compose exec redis redis-cli

# Then you can run Redis commands:
# PING
# KEYS *
# FLUSHALL (clear all cache)
# EXIT
```

## Testing the Application

### 1. Test Database Connection

Check backend logs for successful connection:

```bash
docker-compose logs backend | grep -i "database\|mysql"
```

Should show: "Database connected successfully" or similar.

### 2. Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/v1/health

# Get room categories (if endpoint exists)
curl http://localhost:5000/api/v1/rooms/categories

# Register a test user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }'
```

### 3. Test Redis Cache

```bash
# Connect to Redis
docker-compose exec redis redis-cli

# Check if keys exist
KEYS *

# Should show cached data from backend
```

## Stopping the Application

### Stop Services (Keep Data)

```bash
docker-compose down
```

This stops containers but **keeps your data** (database, uploads, cache).

### Stop and Remove All Data (Reset Everything)

```bash
docker-compose down -v
```

⚠️ **WARNING**: This deletes ALL data including database, uploads, and cache!

## Development Workflow

### Making Code Changes

The backend code is mounted as a volume, so changes are reflected in the container.

**For development with hot reload:**

1. Update `backend/package.json` to use nodemon:

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

2. Update `docker-compose.yml` backend service:

```yaml
backend:
  command: npm run dev
```

3. Restart backend:

```bash
docker-compose restart backend
```

Now code changes will auto-reload!

### Running Migrations or Seed Data

```bash
# If you have migration scripts
docker-compose exec backend npm run migrate

# If you have seed data scripts
docker-compose exec backend npm run seed
```

## Common Issues & Solutions

### Issue: "Port already in use"

**Solution 1:** Stop the conflicting service on your machine

**Solution 2:** Change ports in `.env`:

```bash
PORT=5001
DB_PORT=3307
REDIS_PORT=6380
```

Then restart:

```bash
docker-compose down && docker-compose up -d
```

### Issue: Backend can't connect to database

**Symptoms:** Backend logs show "ECONNREFUSED" or "Connection refused"

**Solutions:**

1. Wait longer (MySQL takes 30-40 seconds to initialize)
2. Check MySQL is healthy: `docker-compose ps`
3. Verify credentials in `.env` match
4. Check MySQL logs: `docker-compose logs mysql`

### Issue: Database tables not created

**Solution 1:** Remove volume and recreate:

```bash
docker-compose down -v
docker-compose up -d
```

**Solution 2:** Manually import schema:

```bash
docker-compose exec -T mysql mysql -u root -p modesta_resort < backend/config/database.sql
```

### Issue: "Cannot find module" errors in backend

**Solution:** Rebuild backend image:

```bash
docker-compose build backend
docker-compose up -d backend
```

### Issue: Out of disk space

**Check disk usage:**

```bash
docker system df
```

**Clean up:**

```bash
# Remove unused images and containers
docker system prune -a

# Remove unused volumes (⚠️ deletes data!)
docker volume prune
```

## Accessing Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Backend API | http://localhost:5000/api/v1 | - |
| Health Check | http://localhost:5000/api/v1/health | - |
| Frontend | http://localhost:5173 | - |
| MySQL | localhost:3306 | User: `modesta`<br>Pass: from `.env` |
| Redis | localhost:6379 | No password (dev) |

## Project Structure

```
modesta-resort/
├── backend/
│   ├── config/
│   │   ├── database.js       # MySQL connection
│   │   ├── database.sql      # Database schema
│   │   └── redis.js          # Redis connection
│   ├── controllers/          # API logic
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── utils/               # Helper functions
│   ├── server.js            # Entry point
│   ├── package.json
│   ├── Dockerfile           # Backend Docker image
│   └── .dockerignore
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── ...
├── docker-compose.yml       # Docker orchestration
├── .env                     # Environment variables (YOU CREATE THIS)
├── .env.docker              # Template
├── README.DOCKER.md         # Docker documentation
└── SETUP.md                 # This file
```

## Next Steps

1. ✅ **Start services**: `docker-compose up -d`
2. ✅ **Verify health**: `docker-compose ps`
3. ✅ **Test API**: `curl http://localhost:5000/api/v1/health`
4. ✅ **Start frontend**: `cd frontend && npm install && npm run dev`
5. ✅ **Create admin user** (via API or SQL)
6. ✅ **Test booking flow**
7. ✅ **Configure payment gateway** (Stripe)
8. ✅ **Configure email service** (SendGrid)

## Production Deployment

For production deployment:

1. Use strong passwords and secrets
2. Set `NODE_ENV=production`
3. Enable SSL/TLS
4. Use environment-specific `.env.production`
5. Set up backups
6. Configure monitoring
7. Use a reverse proxy (Nginx)

See [README.DOCKER.md](README.DOCKER.md) for production deployment details.

## Getting Help

- **Docker issues**: See [README.DOCKER.md](README.DOCKER.md)
- **Backend issues**: Check `docker-compose logs backend`
- **Database issues**: Check `docker-compose logs mysql`
- **API documentation**: See backend/routes/ for available endpoints

## Summary: Fastest Way to Get Running

```bash
# 1. Copy environment file
cp .env.docker .env

# 2. Edit .env and set passwords & JWT secrets
nano .env  # or use your favorite editor

# 3. Start everything
docker-compose up -d

# 4. Wait 30 seconds, then check
docker-compose ps

# 5. Test API
curl http://localhost:5000/api/v1/health

# 6. Start frontend (separate terminal)
cd frontend && npm install && npm run dev

# 7. Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:5000/api/v1
```

Done! 🎉
