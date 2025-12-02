# Admin Login Credentials

## Default Admin Account

**Email:** `admin@namanhospital.com`  
**Password:** `admin123`

## How to Create Admin User

### Option 1: Using Registration API (Easiest)

Since the register endpoint allows ADMIN role, you can create the admin user via API:

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@namanhospital.com",
    "password": "admin123",
    "role": "ADMIN",
    "phone": "+91 6272 245 911"
  }'
```

### Option 2: Using Admin Creation Script

```bash
cd api
node scripts/createAdmin.js
```

**Note:** This requires MongoDB connection to be working (IP whitelist configured).

### Option 3: Direct Database Insert (If you have MongoDB access)

If you have direct access to MongoDB, you can insert the admin user directly:

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@namanhospital.com",
  password: "$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq", // This is bcrypt hash for "admin123"
  role: "ADMIN",
  phone: "+91 6272 245 911",
  isEmailVerified: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Current Status

⚠️ **MongoDB Connection Issue:** The server is running on port 5001, but MongoDB connection is timing out. This is likely due to:
- IP address not whitelisted in MongoDB Atlas
- Network connectivity issues

## Fix MongoDB Connection

1. **Go to MongoDB Atlas Dashboard**
2. **Network Access** → **Add IP Address**
3. **Add your current IP** or use `0.0.0.0/0` for development (not recommended for production)
4. **Restart the backend server**

## After Creating Admin

1. **Login at:** `http://localhost:3000/login`
2. **Use credentials:**
   - Email: `admin@namanhospital.com`
   - Password: `admin123`
3. **You'll be redirected to:** `/admin` dashboard

## Security Reminder

⚠️ **IMPORTANT:** Change the default password after first login!

## Backend Server Info

- **Port:** 5001
- **Base URL:** `http://localhost:5001/api`
- **Health Check:** `http://localhost:5001/api/health`

