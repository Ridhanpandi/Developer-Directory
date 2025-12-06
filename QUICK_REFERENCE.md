# Quick Reference Guide

## Project Overview

**Developer Directory App - Round 2**
- Full-stack application with authentication
- PostgreSQL database
- JWT-based security
- Production-ready deployment

---

## Quick Commands

### Local Development

```bash
# Install all dependencies
npm install && cd client && npm install && cd ..

# Setup database
createdb developer_directory
psql developer_directory < server/config/schema.sql

# Create .env files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start backend (Terminal 1)
npm start

# Start frontend (Terminal 2)
cd client && npm start
```

### Deployment

```bash
# Build frontend
cd client && npm run build

# Push to GitHub
git add .
git commit -m "Round 2 implementation"
git push origin main

# Deploy to Vercel (frontend)
# Deploy to Render (backend)
```

---

## API Quick Reference

### Auth Endpoints
```
POST /auth/signup
POST /auth/login
```

### Developer Endpoints (All require JWT token)
```
GET    /developers?page=1&limit=12&role=Frontend&search=react&sortBy=experience&sortOrder=asc
GET    /developers/:id
POST   /developers
PUT    /developers/:id
DELETE /developers/:id
```

---

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql://user:pass@localhost:5432/developer_directory
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## File Structure

```
developer-directory/
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── schema.sql
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── developers.js
│   ├── index.js
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── .env
├── README.md
├── SETUP_GUIDE.md
└── SUBMISSION_CHECKLIST.md
```

---

## Key Features

### Authentication
- Signup with name, email, password
- Login with email, password
- JWT tokens (7-day expiration)
- Password hashing with bcryptjs
- Protected routes

### Developer Management
- Create, read, update, delete
- Profile pages
- Tech stack tags
- Experience tracking
- About section
- Joining date

### Search & Filter
- Search by name or tech
- Filter by role
- Sort by experience/name/date
- Pagination (12 per page)

### UI/UX
- Toast notifications
- Loading indicators
- Responsive design
- Dark theme
- Error handling

---

## Common Issues & Solutions

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify DATABASE_URL format
# postgresql://user:password@localhost:5432/database
```

### CORS Error
```
Update FRONTEND_URL in backend .env
Redeploy backend
Clear browser cache
```

### Port Already in Use
```bash
# Change PORT in .env
# Or kill process using port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Testing Workflow

1. **Signup**
   - Create new account
   - Verify email unique
   - Check token stored

2. **Login**
   - Login with credentials
   - Verify redirect to directory
   - Check token in localStorage

3. **Add Developer**
   - Fill form with valid data
   - Verify success toast
   - Check developer appears in list

4. **Search & Filter**
   - Search by name
   - Search by tech
   - Filter by role
   - Verify results

5. **Sort & Pagination**
   - Sort by experience
   - Sort ascending/descending
   - Check pagination works

6. **Profile & Edit**
   - Click view profile
   - Verify all details show
   - Click edit
   - Update and save
   - Verify changes

7. **Delete**
   - Click delete
   - Confirm deletion
   - Verify removed from list

8. **Logout**
   - Click logout
   - Verify redirect to login
   - Verify token cleared

---

## Deployment Checklist

### Before Deploying
- [ ] All features tested locally
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database schema created
- [ ] Code committed to GitHub

### Deployment Steps
1. Deploy backend first
2. Test backend API
3. Deploy frontend
4. Update frontend API URL
5. Test end-to-end
6. Monitor logs

### After Deployment
- [ ] Frontend loads
- [ ] Backend API responds
- [ ] Signup works
- [ ] Login works
- [ ] CRUD works
- [ ] Search/filter works
- [ ] No errors in console

---

## Performance Tips

1. **Database**
   - Indexes already created
   - Parameterized queries used
   - Pagination implemented

2. **Frontend**
   - Lazy loading components
   - Efficient state management
   - Optimized re-renders

3. **Deployment**
   - Use CDN for frontend
   - Enable caching
   - Monitor performance

---

## Security Checklist

- [x] Passwords hashed (bcryptjs)
- [x] JWT tokens used
- [x] CORS configured
- [x] Input validation
- [x] SQL injection prevention
- [x] User ownership validation
- [x] Environment variables secure
- [x] No sensitive data in git

---

## Useful Links

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## Support Resources

### Documentation
- README.md - Project overview
- SETUP_GUIDE.md - Detailed setup
- SUBMISSION_CHECKLIST.md - Requirements checklist

### Debugging
1. Check console for errors
2. Check network tab for API errors
3. Check server logs
4. Verify environment variables
5. Check database connection

### Getting Help
- Check error messages carefully
- Review logs
- Test API with Postman
- Verify environment setup
- Check GitHub issues

---

## Next Steps After Submission

1. Deploy to production
2. Monitor for errors
3. Gather feedback
4. Implement improvements
5. Add optional features
6. Prepare for interview

---

## Important Dates

- **Submission Deadline:** [Your Date]
- **Interview Date:** [To be scheduled]
- **Start Date:** Immediate (if selected)

---

## Contact Information

**Submission Email:**
- To: k12345@talrn.com
- CC: intern@talrn.com

**Include:**
- Frontend URL
- Backend URL
- GitHub links
- README with setup steps
- Availability confirmation

---

## Final Notes

- Keep code clean and well-organized
- Write meaningful commit messages
- Document your implementation
- Test thoroughly before submitting
- Be ready to discuss your code
- Confirm availability for 9:30 AM - 6:30 PM IST schedule

Good luck with your submission!
