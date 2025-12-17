# Docker Setup Guide - Modesta Resort

This guide will help you set up and run the Modesta Resort application using Docker.

## Prerequisites

- Docker Desktop installed (includes Docker Compose)
- At least 4GB of RAM allocated to Docker
- Ports 3306, 5000, 6379, and 5173 available

## Quick Start

### 1. Setup Environment Variables

Copy the Docker environment template:

```bash
cp .env.docker .env
```

Edit `.env` and update these critical values:
- `DB_ROOT_PASSWORD` - MySQL root password
- `DB_PASSWORD` - Application database password
- `JWT_SECRET` - JWT secret key (min 32 characters)
- `JWT_REFRESH_SECRET` - JWT refresh secret (min 32 characters)
- Add your API keys (Stripe, SendGrid, etc.)

### 2. Start All Services

```bash
docker-compose up -d
```

This will start:
- MySQL 8.0 (port 3306)
- Redis 7 (port 6379)
- Node.js Backend (port 5000)

### 3. Check Service Status

```bash
docker-compose ps
```

All services should show "healthy" status after 30-40 seconds.

### 4. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f mysql
docker-compose logs -f redis
```

### 5. Access the Application

- Backend API: http://localhost:5000/api/v1
- Health Check: http://localhost:5000/api/v1/health

## Database Initialization

The MySQL database is automatically initialized with the schema from `backend/config/database.sql` when the container first starts.

### Verify Database Setup

```bash
# Connect to MySQL container
docker-compose exec mysql mysql -u root -p

# Enter the DB_ROOT_PASSWORD when prompted
# Then run:
USE modesta_resort;
SHOW TABLES;
EXIT;
```

You should see 40+ tables created.

## Development Workflow

### Hot Reload (Development Mode)

The backend code is mounted as a volume, so changes are reflected immediately if you're using nodemon:

```bash
# Make sure your package.json has a dev script with nodemon
docker-compose restart backend
```

### Running Commands in Containers

```bash
# Execute command in backend container
docker-compose exec backend npm run <command>

# Access backend shell
docker-compose exec backend sh

# Access MySQL shell
docker-compose exec mysql mysql -u modesta -p modesta_resort
```

## Common Operations

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove All Data (Reset)

```bash
docker-compose down -v
```

**WARNING:** This deletes all database data, uploads, and cache!

### Restart a Single Service

```bash
docker-compose restart backend
docker-compose restart mysql
docker-compose restart redis
```

### Rebuild Backend Image

```bash
docker-compose build backend
docker-compose up -d backend
```

### View Resource Usage

```bash
docker stats
```

## Troubleshooting

### Backend Can't Connect to MySQL

**Issue:** Backend shows "Connection refused" or "ECONNREFUSED"

**Solutions:**
1. Check MySQL health: `docker-compose ps`
2. Wait for MySQL to be fully ready (30-40 seconds)
3. Check logs: `docker-compose logs mysql`
4. Verify credentials in `.env` match docker-compose.yml

### MySQL Container Keeps Restarting

**Issue:** MySQL container status shows "restarting"

**Solutions:**
1. Check logs: `docker-compose logs mysql`
2. Ensure enough RAM allocated to Docker (min 2GB for MySQL)
3. Check if port 3306 is already in use
4. Remove volume and restart: `docker-compose down -v && docker-compose up -d`

### Port Already in Use

**Issue:** "port is already allocated" error

**Solutions:**
1. Stop conflicting service on your host machine
2. Or change port in `.env`:
   ```bash
   PORT=5001
   DB_PORT=3307
   REDIS_PORT=6380
   ```
3. Restart: `docker-compose down && docker-compose up -d`

### Database Schema Not Loading

**Issue:** Tables are not created automatically

**Solutions:**
1. Check if `backend/config/database.sql` exists
2. Remove volume and recreate:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```
3. Manually import:
   ```bash
   docker-compose exec -T mysql mysql -u root -p${DB_ROOT_PASSWORD} modesta_resort < backend/config/database.sql
   ```

### Backend Health Check Failing

**Issue:** Backend shows "unhealthy" status

**Solutions:**
1. Check if backend is listening: `docker-compose logs backend`
2. Verify health endpoint exists: `/api/v1/health`
3. Increase health check timeout in docker-compose.yml
4. Check database connection in backend logs

## Production Deployment

### 1. Update Environment

```bash
cp .env.docker .env.production
```

Edit `.env.production`:
- Set `NODE_ENV=production`
- Use strong passwords and secrets
- Configure production database credentials
- Add production API keys
- Set `FRONTEND_URL` to production domain

### 2. Use Production Compose File

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  mysql:
    restart: always
    volumes:
      - /var/lib/mysql-data:/var/lib/mysql

  backend:
    restart: always
    env_file:
      - .env.production
```

### 3. Run Production Stack

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Enable SSL/TLS

Add nginx reverse proxy or use cloud load balancer with SSL termination.

## Data Persistence

### Volumes Created

- `mysql_data` - Database files (persistent)
- `redis_data` - Redis cache (persistent)
- `uploads_data` - Uploaded files (persistent)

### Backup Database

```bash
# Backup
docker-compose exec mysql mysqldump -u root -p${DB_ROOT_PASSWORD} modesta_resort > backup.sql

# Restore
docker-compose exec -T mysql mysql -u root -p${DB_ROOT_PASSWORD} modesta_resort < backup.sql
```

### Backup Volumes

```bash
# Backup all volumes
docker run --rm \
  -v modesta-resort_mysql_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/mysql_data_backup.tar.gz -C /data .
```

## Monitoring

### Health Checks

All services have health checks configured:

```bash
docker-compose ps
```

Look for "healthy" status.

### Resource Monitoring

```bash
# Real-time stats
docker stats

# Disk usage
docker system df
```

## Cleanup

### Remove Stopped Containers

```bash
docker-compose down
```

### Remove All (Including Volumes)

```bash
docker-compose down -v
docker system prune -a
```

## Security Best Practices

1. Never commit `.env` file to version control
2. Use strong passwords for production
3. Regularly update Docker images
4. Limit exposed ports in production
5. Use Docker secrets for sensitive data
6. Enable firewall rules
7. Regular security audits

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [MySQL Docker Hub](https://hub.docker.com/_/mysql)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

## Support

For issues related to:
- Docker setup: Check this guide
- Application code: See main README.md
- Database schema: See backend/config/database.sql
