# Admin Panel Setup Guide

## Overview
Complete admin panel for Naman Hospital with MongoDB backend and React frontend.

## Backend Setup

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update:
```bash
cp .env.example .env
```

Update these values:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string
- `EMAIL_USER` and `EMAIL_PASS` - Gmail credentials
- `CLOUDINARY_*` - Cloudinary credentials for image uploads

### 3. Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Run Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Database Models

### Collections Created:
1. **users** - All users (patients, doctors, admins)
2. **doctors** - Doctor profiles
3. **appointments** - Appointment records
4. **prescriptions** - Prescription data
5. **invoices** - Billing information
6. **blogs** - Blog posts
7. **contacts** - Contact form submissions

## Create First Admin User

### Option 1: Using MongoDB Compass/Shell
```javascript
use naman-hospital

db.users.insertOne({
  name: "Admin User",
  email: "admin@namanhospital.com",
  password: "$2a$10$...", // Use bcrypt to hash password
  role: "ADMIN",
  isEmailVerified: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Option 2: Using API (after creating user manually)
```bash
# Register a user first
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@namanhospital.com",
  "password": "securepassword",
  "role": "ADMIN"
}

# Then update role in database to ADMIN
```

### Option 3: Create Admin Script
Create `api/scripts/createAdmin.js`:
```javascript
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@namanhospital.com',
    password: 'admin123', // Will be hashed automatically
    role: 'ADMIN',
    isEmailVerified: true
  });
  
  console.log('Admin created:', admin);
  process.exit();
};

createAdmin();
```

Run: `node api/scripts/createAdmin.js`

## Frontend Setup

### 1. Update API URL
In `src/api/axiosClient.js`, ensure:
```javascript
baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
```

### 2. Create `.env` in root (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend
```bash
npm start
```

## Admin Panel Features

### Dashboard (`/admin`)
- Overview statistics
- Quick action cards
- Recent activity

### User Management (`/admin/users`)
- View all users
- Filter by role (Patient/Doctor/Admin)
- Edit/Delete users
- Activate/Deactivate accounts

### Appointment Management (`/admin/appointments`)
- View all appointments
- Filter by status
- Edit appointment details
- Cancel appointments

### Blog Management (`/admin/blog`)
- Create/Edit/Delete blog posts
- Upload cover images
- Publish/Unpublish posts
- View analytics

### Contact Management (`/admin/contacts`)
- View contact form submissions
- Mark as read/replied
- Reply to inquiries

## API Endpoints

### Admin Endpoints (Require ADMIN role)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/revenue` - Revenue statistics
- `GET /api/admin/analytics` - Analytics data

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Appointments
- `GET /api/appointments` - Get all (admin)
- `GET /api/appointments/doctor` - Doctor's appointments
- `GET /api/appointments/patient` - Patient's appointments
- `POST /api/appointments` - Create appointment
- `PATCH /api/appointments/:id` - Update appointment

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/featured` - Featured doctors
- `POST /api/doctors` - Create doctor (admin)

### Blog
- `GET /api/blog` - Get all posts
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/:id` - Update post (admin)

## Testing

### Test Admin Login
1. Create admin user (see above)
2. Login at `/login` with admin credentials
3. Navigate to `/admin` - should see dashboard
4. Test all admin features

### Test API
```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@namanhospital.com","password":"admin123"}'

# Get stats (with token)
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running
- Verify connection string in `.env`
- Check network/firewall settings

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure user role is ADMIN

### CORS Errors
- Backend CORS is configured for `http://localhost:3000`
- Update CORS settings in `api/server.js` if needed

## Next Steps

1. ✅ Backend API created
2. ✅ MongoDB models defined
3. ✅ Admin panel frontend created
4. ⏳ Connect frontend to backend
5. ⏳ Add image upload functionality
6. ⏳ Implement email notifications
7. ⏳ Add analytics charts
8. ⏳ Deploy to production

## Production Deployment

### Backend
- Use environment variables
- Set secure JWT_SECRET
- Use MongoDB Atlas or secure MongoDB instance
- Enable HTTPS
- Set up proper CORS

### Frontend
- Build: `npm run build`
- Deploy to Netlify/Vercel
- Update API URL to production backend

