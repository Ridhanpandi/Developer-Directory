# Developer Directory App - Round 2

A production-ready full-stack application for managing and browsing developer profiles with authentication, advanced filtering, sorting, and pagination.

## Features

### Authentication
- ✅ Secure JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Signup and login flows
- ✅ Protected routes

### Developer Management
- ✅ Create, read, update, delete developers
- ✅ Dedicated profile pages for each developer
- ✅ Tech stack display as tags
- ✅ Experience tracking
- ✅ About/Description section
- ✅ Joining date tracking

### Search & Filtering
- ✅ Search by name or tech stack
- ✅ Filter by developer role
- ✅ Sort by experience, name, or joining date
- ✅ Ascending/descending sort order
- ✅ Pagination with configurable page size

### UI/UX
- ✅ Toast notifications for all actions
- ✅ Loading indicators
- ✅ Responsive design
- ✅ Modern dark theme with Tailwind CSS
- ✅ Error handling and fallback states
- ✅ Delete confirmation prompts

## Tech Stack

### Frontend
- React 18 with Hooks
- React Router v6 for navigation
- Axios for HTTP requests
- React Toastify for notifications
- Tailwind CSS for styling

### Backend
- Node.js with Express.js
- PostgreSQL for database
- JWT for authentication
- bcryptjs for password hashing
- Joi for input validation

## Project Structure

```
developer-directory/
├── client/                          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeveloperCard.js
│   │   │   ├── DeveloperForm.js
│   │   │   ├── DeveloperList.js
│   │   │   ├── SearchFilter.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── SignupPage.js
│   │   │   ├── DirectoryPage.js
│   │   │   └── DeveloperProfilePage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── server/                          # Express backend
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
│   ├── package.json
│   └── .env.example
│
├── package.json
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd developer-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Setup PostgreSQL Database**
   ```bash
   # Create a new database
   createdb developer_directory
   
   # Run the schema
   psql developer_directory < server/config/schema.sql
   ```

4. **Configure environment variables**
   
   Create `.env` in the root directory:
   ```
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   DATABASE_URL=postgresql://user:password@localhost:5432/developer_directory
   FRONTEND_URL=http://localhost:3000
   ```

   Create `client/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Run the application**
   
   Terminal 1 - Backend:
   ```bash
   npm start
   # Server runs on http://localhost:5000
   ```

   Terminal 2 - Frontend:
   ```bash
   cd client && npm start
   # Frontend runs on http://localhost:3000
   ```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create new user account |
| POST | `/auth/login` | Login user |

### Developers (All require JWT token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/developers` | Get all developers with filters |
| GET | `/developers/:id` | Get single developer profile |
| POST | `/developers` | Create new developer |
| PUT | `/developers/:id` | Update developer |
| DELETE | `/developers/:id` | Delete developer |

### Query Parameters for GET /developers
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `role` - Filter by role (Frontend/Backend/Full-Stack)
- `search` - Search by name or tech stack
- `sortBy` - Sort field (experience/name/joining_date)
- `sortOrder` - Sort order (asc/desc)

## Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
4. Deploy

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your_production_secret
   DATABASE_URL=your_postgresql_url
   FRONTEND_URL=https://your-frontend-url.com
   ```
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Deploy

### Database Setup (PostgreSQL)

Use PostgreSQL managed service like:
- Render PostgreSQL
- AWS RDS
- Railway
- Supabase

Run the schema file on your hosted database to create tables.

## Architecture Overview

### Authentication Flow
1. User signs up/logs in
2. Backend validates credentials and generates JWT token
3. Token stored in localStorage on client
4. Token sent with every API request in Authorization header
5. Backend middleware verifies token before processing requests

### Data Flow
1. Frontend makes API request with JWT token
2. Backend validates token and user ownership
3. Database query executed
4. Response sent back to frontend
5. Frontend updates state and shows toast notification

### Security Features
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 7-day expiration
- User ownership validation on update/delete
- Input validation with Joi
- CORS configured for frontend domain only
- SQL injection prevention via parameterized queries

## Key Implementation Details

### Validation
- Backend: Joi schema validation for all inputs
- Frontend: Client-side validation before submission
- Database constraints for data integrity

### Error Handling
- Try-catch blocks on all async operations
- Meaningful error messages to users
- Fallback states for failed operations
- 404 handling for not found resources
- 403 handling for unauthorized access

### Performance
- Pagination to limit data transfer
- Indexed database queries
- Efficient filtering on backend
- Lazy loading of developer profiles

## Testing

### Manual Testing Checklist
- [ ] Signup with new email
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Add developer with all fields
- [ ] Search developers by name
- [ ] Search developers by tech
- [ ] Filter by role
- [ ] Sort by experience ascending/descending
- [ ] View developer profile
- [ ] Edit developer details
- [ ] Delete developer with confirmation
- [ ] Pagination works correctly
- [ ] Logout clears session
- [ ] Protected routes redirect to login

## Future Enhancements

- Light/dark theme toggle
- Admin role with analytics
- Developer analytics dashboard
- Photo upload to cloud storage
- Email verification
- Password reset functionality
- Developer ratings/reviews
- Advanced search with multiple filters
- Export developer list to CSV
- Unit tests with Jest/Supertest

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists
- Run schema.sql to create tables

### CORS Error
- Check FRONTEND_URL in backend .env
- Verify frontend URL matches exactly
- Clear browser cache

### Token Expired
- Token expires after 7 days
- User needs to login again
- Token refreshed on each login

### Port Already in Use
- Change PORT in .env
- Or kill process using the port

## Author

Built for Talrn.com Full Stack Internship Assessment - Round 2

## License

MIT
