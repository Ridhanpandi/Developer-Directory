# Troubleshooting Guide

## Common Issues & Solutions

---

## Backend Issues

### 1. Database Connection Error

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Causes:**
- PostgreSQL not running
- Wrong DATABASE_URL
- Database doesn't exist

**Solutions:**
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT 1"

# If not running, start PostgreSQL
# Windows: net start postgresql-x64-15
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Verify DATABASE_URL format
# Should be: postgresql://user:password@localhost:5432/database

# Create database if missing
createdb developer_directory

# Run schema
psql developer_directory < server/config/schema.sql
```

---

### 2. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Option 1: Change PORT in .env
PORT=5001

# Option 2: Kill process using port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

### 3. JWT Secret Not Set

**Error:** `TypeError: Cannot read property 'sign' of undefined`

**Solution:**
```bash
# Add JWT_SECRET to .env
JWT_SECRET=your_super_secret_key_min_32_chars
```

---

### 4. CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Causes:**
- FRONTEND_URL not set correctly
- Frontend URL doesn't match exactly

**Solutions:**
```bash
# Check FRONTEND_URL in .env
FRONTEND_URL=http://localhost:3000

# Must match exactly (including protocol and port)
# http://localhost:3000 ≠ http://localhost:3001
# http://localhost:3000 ≠ https://localhost:3000

# Redeploy after changing
npm start
```

---

### 5. Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### 6. Invalid Token Error

**Error:** `JsonWebTokenError: invalid token`

**Causes:**
- Token expired (7 days)
- JWT_SECRET changed
- Token corrupted

**Solutions:**
```bash
# User needs to login again
# Token will be refreshed

# Ensure JWT_SECRET is same on all deployments
# Check .env file
JWT_SECRET=your_secret_key
```

---

### 7. Database Schema Error

**Error:** `relation "users" does not exist`

**Solution:**
```bash
# Run schema to create tables
psql developer_directory < server/config/schema.sql

# Or manually create tables
psql developer_directory
# Then paste contents of server/config/schema.sql
```

---

## Frontend Issues

### 1. Blank Page / Nothing Loads

**Causes:**
- React not compiled
- API URL wrong
- JavaScript error

**Solutions:**
```bash
# Check browser console (F12)
# Look for error messages

# Verify REACT_APP_API_URL
# client/.env should have:
REACT_APP_API_URL=http://localhost:5000

# Restart frontend
cd client
npm start
```

---

### 2. API Calls Failing

**Error:** `Network Error` or `404 Not Found`

**Causes:**
- Backend not running
- Wrong API URL
- Endpoint doesn't exist

**Solutions:**
```bash
# Check backend is running
# Terminal should show: Server running on port 5000

# Verify API URL in client/.env
REACT_APP_API_URL=http://localhost:5000

# Test API with curl
curl http://localhost:5000/health

# Check network tab in browser (F12)
# Look for failed requests
```

---

### 3. Login/Signup Not Working

**Error:** `Failed to create user` or `Invalid email or password`

**Causes:**
- Backend not running
- Database not connected
- Invalid input

**Solutions:**
```bash
# Check backend logs
# Should show: Server running on port 5000

# Verify database connection
psql developer_directory -c "SELECT COUNT(*) FROM users"

# Check form validation
# Email must be valid format
# Password must be 6+ characters
# Name must be 2+ characters
```

---

### 4. Token Not Persisting

**Error:** `Logged out after page refresh`

**Causes:**
- localStorage disabled
- Token not saved
- Browser privacy mode

**Solutions:**
```bash
# Check browser console
# localStorage should have 'token' and 'user'

# Check if browser allows localStorage
# Some privacy modes disable it

# Try different browser
# Try incognito/private mode
```

---

### 5. Protected Routes Not Working

**Error:** `Redirected to login unexpectedly`

**Causes:**
- Token expired
- Token not in localStorage
- Auth context not initialized

**Solutions:**
```bash
# Login again
# Token will be refreshed

# Check localStorage in browser console
localStorage.getItem('token')

# Should return token string, not null
```

---

### 6. Search/Filter Not Working

**Error:** `No results` or `Results not updating`

**Causes:**
- Backend not filtering correctly
- Frontend not sending parameters
- No developers in database

**Solutions:**
```bash
# Add some developers first
# Use the form to add test data

# Check network tab (F12)
# Verify query parameters are sent

# Check backend logs
# Should show SQL query with filters
```

---

### 7. Module Not Found (Frontend)

**Error:** `Module not found: Can't resolve 'react-router-dom'`

**Solution:**
```bash
# Reinstall dependencies
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## Deployment Issues

### 1. Vercel Deployment Failed

**Error:** `Build failed` or `Deployment error`

**Solutions:**
```bash
# Check build logs in Vercel dashboard
# Look for error messages

# Verify environment variables
# REACT_APP_API_URL must be set

# Check package.json
# Must have "build" script

# Test build locally
cd client
npm run build
```

---

### 2. Render Deployment Failed

**Error:** `Build failed` or `Service crashed`

**Solutions:**
```bash
# Check Render logs
# Look for error messages

# Verify environment variables
# All required variables must be set

# Check start command
# Should be: npm start

# Verify database connection
# DATABASE_URL must be correct
```

---

### 3. Frontend Can't Reach Backend

**Error:** `Network Error` or `CORS error`

**Causes:**
- Backend not deployed
- API URL wrong
- CORS not configured

**Solutions:**
```bash
# Verify backend is running
# Check backend URL in browser

# Update REACT_APP_API_URL
# Must be production backend URL

# Check CORS in backend
# FRONTEND_URL must match frontend domain

# Redeploy frontend after updating URL
```

---

### 4. Database Connection on Production

**Error:** `Error: connect ECONNREFUSED`

**Causes:**
- DATABASE_URL wrong
- Database not accessible
- Network issue

**Solutions:**
```bash
# Verify DATABASE_URL format
# postgresql://user:password@host:port/database

# Test connection locally
psql <DATABASE_URL>

# Check database is running
# Use provider's dashboard

# Verify network access
# Check firewall rules
```

---

## Performance Issues

### 1. Slow API Responses

**Causes:**
- Large dataset
- Missing database indexes
- Slow network

**Solutions:**
```bash
# Check database indexes
# Schema already has indexes

# Use pagination
# Limit results per page

# Monitor database performance
# Check query execution time
```

---

### 2. Slow Frontend

**Causes:**
- Large bundle size
- Inefficient rendering
- Slow network

**Solutions:**
```bash
# Check bundle size
npm run build

# Use React DevTools
# Check for unnecessary re-renders

# Check network tab
# Look for slow requests
```

---

## Security Issues

### 1. Password Not Hashing

**Error:** `Passwords stored in plain text`

**Solution:**
```bash
# Verify bcryptjs is installed
npm list bcryptjs

# Check password hashing in auth.js
# Should use: bcrypt.hash(password, 10)

# Verify in database
# Passwords should be long hashes
```

---

### 2. Token Exposed

**Error:** `Token visible in network requests`

**Solution:**
```bash
# Verify Authorization header is used
# Should be: Authorization: Bearer <token>

# Check HTTPS is used in production
# Never send tokens over HTTP
```

---

### 3. SQL Injection Vulnerability

**Error:** `Malicious SQL in requests`

**Solution:**
```bash
# Verify parameterized queries are used
# Should use: $1, $2 placeholders

# Never concatenate user input
# Always use parameterized queries
```

---

## Testing Issues

### 1. Can't Test Locally

**Error:** `Frontend/Backend not connecting`

**Solutions:**
```bash
# Verify both are running
# Backend: http://localhost:5000
# Frontend: http://localhost:3000

# Check REACT_APP_API_URL
# Should be: http://localhost:5000

# Check browser console
# Look for error messages
```

---

### 2. Test Data Not Persisting

**Error:** `Data disappears after refresh`

**Causes:**
- Database not connected
- Data not saved

**Solutions:**
```bash
# Check database connection
psql developer_directory -c "SELECT COUNT(*) FROM developers"

# Verify data is in database
# Check with psql directly
```

---

## Getting Help

### Debug Steps
1. **Check Error Message**
   - Read error carefully
   - Note exact error text

2. **Check Logs**
   - Backend: Terminal output
   - Frontend: Browser console (F12)
   - Database: PostgreSQL logs

3. **Verify Setup**
   - Environment variables set
   - Dependencies installed
   - Database created
   - Services running

4. **Test Components**
   - Test backend API with curl
   - Test frontend with simple page
   - Test database connection

5. **Search Documentation**
   - Check README.md
   - Check SETUP_GUIDE.md
   - Check this file

### Useful Commands

```bash
# Check backend is running
curl http://localhost:5000/health

# Check database connection
psql developer_directory -c "SELECT 1"

# Check environment variables
cat .env

# Check installed packages
npm list

# Check running processes
# Windows: tasklist
# Mac/Linux: ps aux

# Check port usage
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Contact Support

If issue persists:
1. Document the error
2. Note steps to reproduce
3. Check all logs
4. Review documentation
5. Try different approach

---

## Quick Fixes

### "It's not working"
1. Restart backend: `npm start`
2. Restart frontend: `cd client && npm start`
3. Clear browser cache: Ctrl+Shift+Delete
4. Check console: F12

### "I see an error"
1. Read error message carefully
2. Check logs
3. Verify environment variables
4. Reinstall dependencies

### "Nothing changed"
1. Restart services
2. Clear cache
3. Rebuild frontend: `npm run build`
4. Check file was saved

---

## Prevention Tips

1. **Always check logs first**
2. **Verify environment variables**
3. **Test locally before deploying**
4. **Keep dependencies updated**
5. **Use version control**
6. **Document changes**
7. **Test after changes**
8. **Monitor production**

---

## Resources

- [Express.js Troubleshooting](https://expressjs.com/en/guide/error-handling.html)
- [React Debugging](https://react.dev/learn/react-developer-tools)
- [PostgreSQL Troubleshooting](https://www.postgresql.org/docs/current/runtime.html)
- [JWT Debugging](https://jwt.io/)
- [CORS Issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Last Updated:** December 2024  
**Version:** 1.0
