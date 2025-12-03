# Developer Directory App

A full-stack application to manage and browse developer profiles with search and filter capabilities.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- ✅ Add developers with name, role, tech stack, and experience
- ✅ View all developers in a responsive card layout
- ✅ Search by name or technology
- ✅ Filter by role (Frontend / Backend / Full-Stack)
- ✅ Form validation with error messages
- ✅ Toast notifications for success/error feedback
- ✅ Fully responsive design
- ✅ Clean, modern UI with custom CSS

## Tech Stack

### Frontend
- React 18 (Functional Components + Hooks)
- React Toastify (Toast notifications)
- Axios (HTTP client)
- Custom CSS (No framework - unique styling)

### Backend
- Node.js
- Express.js
- JSON file storage
- UUID for unique IDs

## Project Structure

```
developer-directory/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── DeveloperCard.js
│       │   ├── DeveloperForm.js
│       │   ├── DeveloperList.js
│       │   └── SearchFilter.js
│       ├── services/
│       │   └── api.js
│       ├── styles/
│       │   └── index.css
│       ├── App.js
│       └── index.js
├── server/                 # Express backend
│   ├── data/
│   │   └── developers.json
│   └── index.js
├── package.json
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd developer-directory
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install && cd ..
   ```

3. **Run the application**
   ```bash
   # Run both server and client concurrently
   npm run dev
   
   # Or run separately:
   npm run server    # Backend on http://localhost:5000
   npm run client    # Frontend on http://localhost:3000
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000

## API Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | /developers   | Get all developers       |
| POST   | /developers   | Add a new developer      |

### POST /developers - Request Body
```json
{
  "name": "John Doe",
  "role": "Full-Stack",
  "techStack": "React, Node.js, MongoDB",
  "experience": 5
}
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder

### Backend (Render/Railway)
1. Set the root directory to `server`
2. Start command: `node index.js`
3. Set `PORT` environment variable if needed

### Environment Variables
Create `.env` in client folder for production:
```
REACT_APP_API_URL=https://your-backend-url.com
```

## Author

Built for Talrn.com Full Stack Internship Assessment

## License

MIT
