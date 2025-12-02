# Admin Login Credentials

## Default Admin Account

After running the setup script, use these credentials to login:

```
Email: admin@namanhospital.com
Password: admin123
```

## How to Create Admin User

### Method 1: Using Setup Script (Recommended)

1. **Make sure MongoDB is running**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

2. **Configure environment**
   ```bash
   cd api
   cp .env.example .env
   # Edit .env and add your MONGODB_URI
   ```

3. **Run the admin creation script**
   ```bash
   cd api
   node scripts/createAdmin.js
   ```

4. **Login at** `http://localhost:3000/login`

### Method 2: Using MongoDB Shell

```javascript
use naman-hospital

db.users.insertOne({
  name: "Admin User",
  email: "admin@namanhospital.com",
  password: "$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq",
  role: "ADMIN",
  isEmailVerified: true,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Note:** The password hash above is for "admin123". You'll need to generate a proper bcrypt hash.

### Method 3: Using API Registration

1. **Start the backend server**
   ```bash
   cd api
   npm run dev
   ```

2. **Register a user via API**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@namanhospital.com",
       "password": "admin123",
       "role": "ADMIN"
     }'
   ```

3. **Then manually update in MongoDB** to set `isEmailVerified: true`

## Security Notes

⚠️ **IMPORTANT:**
- Change the default password immediately after first login
- Use a strong password in production
- Never commit credentials to version control
- Consider using environment variables for admin credentials

## After Login

Once logged in as admin:
1. Navigate to `/admin` to access the admin dashboard
2. You'll see:
   - Dashboard with statistics
   - User Management
   - Appointment Management
   - Blog Management
   - Contact Management

## Troubleshooting

### "User not found" error
- Make sure you ran the admin creation script
- Check MongoDB connection
- Verify email is correct

### "Invalid credentials" error
- Verify password is correct (default: `admin123`)
- Check if user exists in database
- Ensure password hasn't been changed

### "Not authorized" error
- Verify user role is set to "ADMIN" in database
- Check JWT token is valid
- Ensure backend is running

## Reset Admin Password

If you need to reset the admin password:

1. **Using MongoDB Shell:**
   ```javascript
   use naman-hospital
   db.users.updateOne(
     { email: "admin@namanhospital.com" },
     { $set: { password: "$2a$10$NEW_HASH_HERE" } }
   )
   ```

2. **Or delete and recreate:**
   ```javascript
   db.users.deleteOne({ email: "admin@namanhospital.com" })
   ```
   Then run the setup script again.

