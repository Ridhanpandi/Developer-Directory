# Setup Guide - Developer Directory App Round 2

## Quick Start (Local Development)

### Step 1: Prerequisites
- Node.js v14+ installed
- PostgreSQL v12+ installed and running
- Git installed

### Step 2: Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd developer-directory

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Step 3: Database Setup

```bash
# Create database
createdb developer_directory

# Run schema to create tables
psql developer_directory < server/config/schema.sql
```

### Step 4: Environment Configuration

**Root .env file:**
```
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_change_in_production
DATABASE_URL=postgresql://postgres:password@localhost:5432/developer_directory
FRONTEND_URL=http://localhost:3000
```

**client/.env file:**
```
REACT_APP_API_URL=http://localhost:5000
```

### Step 5: Run Application

**Terminal 1 - Backend:**
```bash
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Runs on http://localhost:3000
```

### Step 6: Test the App

1. Open http://localhost:3000
2. Click "Sign up" to create account
3. Fill in name, email, password
4. Add developers using the form
5. Search, filter, and sort developers
6. Click "View Profile" to see details
7. Edit or delete developers

---

## Production Deployment

### Option 1: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend Deployment (Render)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Round 2 implementation"
   git push origin main
   ```

2. **Create PostgreSQL Database on Render**
   - Go to render.com
   - Create new PostgreSQL database
   - Copy connection string

3. **Create Web Service on Render**
   - New → Web Service
   - Connect GitHub repository
   - Select branch (main)
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=<generate-strong-secret>
     DATABASE_URL=<your-render-postgres-url>
     FRONTEND_URL=https://your-frontend-domain.com
     ```
   - Deploy

4. **Setup Database**
   - Connect to Render PostgreSQL
   - Run schema.sql to create tables
   - Or use Render's PostgreSQL dashboard

#### Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   - Go to vercel.com
   - Import GitHub repository
   - Select client folder as root
   - Add environment variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```
   - Deploy

2. **Update Backend CORS**
   - Update FRONTEND_URL in Render environment
   - Redeploy backend

### Option 2: Deploy to Railway (Both Frontend & Backend)

1. **Create Railway Project**
   - Go to railway.app
   - Create new project
   - Add PostgreSQL plugin
   - Add GitHub repository

2. **Configure Services**
   - Backend service:
     - Root directory: server
     - Start command: `npm start`
   - Frontend service:
     - Root directory: client
     - Build command: `npm run build`
     - Start command: `npm start`

3. **Set Environment Variables**
   - Backend:
     ```
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=<strong-secret>
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     FRONTEND_URL=https://your-frontend-url
     ```
   - Frontend:
     ```
     REACT_APP_API_URL=https://your-backend-url
     ```

### Option 3: Deploy to Cyclic (Backend)

1. **Connect GitHub**
   - Go to cyclic.sh
   - Connect GitHub account
   - Select repository

2. **Configure**
   - Root directory: server
   - Environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=<strong-secret>
     DATABASE_URL=<postgresql-url>
     FRONTEND_URL=https://your-frontend-url
     ```

3. **Deploy**
   - Cyclic auto-deploys on push

---

## Database Setup for Production

### Using Render PostgreSQL

1. Create PostgreSQL database on Render
2. Get connection string
3. Connect via psql:
   ```bash
   psql <connection-string> < server/config/schema.sql
   ```

### Using Railway PostgreSQL

1. Add PostgreSQL plugin to Railway project
2. Get DATABASE_URL from environment
3. Connect and run schema:
   ```bash
   psql $DATABASE_URL < server/config/schema.sql
   ```

### Using Supabase

1. Create Supabase project
2. Go to SQL Editor
3. Create new query
4. Copy-paste contents of server/config/schema.sql
5. Run query

---

## Verification Checklist

### Local Development
- [ ] Backend starts without errors
- [ ] Frontend loads on localhost:3000
- [ ] Can signup with new email
- [ ] Can login with credentials
- [ ] Can add developer
- [ ] Can search developers
- [ ] Can filter by role
- [ ] Can sort by experience
- [ ] Can view profile
- [ ] Can edit developer
- [ ] Can delete developer
- [ ] Pagination works
- [ ] Logout works

### Production
- [ ] Frontend URL accessible
- [ ] Backend API URL accessible
- [ ] Can signup on production
- [ ] Can login on production
- [ ] All CRUD operations work
- [ ] Search/filter/sort work
- [ ] Profile pages load
- [ ] Logout works
- [ ] No CORS errors
- [ ] No database errors

---

## Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify DATABASE_URL format
# Should be: postgresql://user:password@host:port/database
```

### "CORS error in browser"
- Check FRONTEND_URL in backend .env
- Ensure it matches exactly (including protocol)
- Redeploy backend after changing

### "Token expired"
- Tokens expire after 7 days
- User must login again
- Check JWT_SECRET is same on all deployments

### "Port already in use"
```bash
# Change PORT in .env
# Or kill process:
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For client
cd client
rm -rf node_modules package-lock.json
npm install
```

---

## Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| JWT_SECRET | JWT signing key | your-secret-key |
| DATABASE_URL | PostgreSQL connection | postgresql://... |
| FRONTEND_URL | Frontend domain | http://localhost:3000 |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000 |

---

## Security Checklist

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] DATABASE_URL uses SSL in production
- [ ] FRONTEND_URL is correct domain
- [ ] No sensitive data in git
- [ ] .env files in .gitignore
- [ ] CORS only allows frontend domain
- [ ] Passwords hashed with bcryptjs
- [ ] Input validation on backend
- [ ] Error messages don't leak info

---

## Performance Tips

1. **Database Indexes**
   - Already created in schema.sql
   - Speeds up searches and filters

2. **Pagination**
   - Default 12 items per page
   - Reduces data transfer

3. **Caching**
   - Consider Redis for session storage
   - Cache frequently accessed data

4. **CDN**
   - Use Vercel/Netlify CDN for frontend
   - Faster asset delivery

---

## Next Steps

1. Deploy backend first
2. Test backend API with Postman
3. Deploy frontend
4. Test end-to-end flow
5. Monitor logs for errors
6. Set up error tracking (Sentry)
7. Configure backups for database

---

## Support

For issues:
1. Check logs: `npm start` output
2. Check browser console (F12)
3. Check network tab for API errors
4. Verify environment variables
5. Check database connection

---

## Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
