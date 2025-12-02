# Naman Hospital - Complete Feature Analysis

## Overview
Naman Hospital is a multi-speciality hospital management system with appointment booking, doctor management, patient dashboards, and content management capabilities.

---

## Core Features

### 1. User Authentication & Authorization
- **Registration**: Patient and Doctor signup with email verification
- **Login/Logout**: JWT-based authentication
- **Password Reset**: Email-based password recovery
- **Email Verification**: Required for doctors
- **Roles**: 
  - `PATIENT` - Can book appointments, view prescriptions
  - `DOCTOR` - Can manage appointments, write prescriptions
  - `ADMIN` - Full system access (to be implemented)

### 2. Appointment Management
- **Create Appointment**: Patients book with doctor, date, time, notes
- **Appointment Status**: PENDING → CONFIRMED → COMPLETED / CANCELLED
- **Tracking**: Public tracking by unique tracking ID (e.g., NAM-2415)
- **Doctor View**: See all appointments assigned to them
- **Patient View**: See all their appointments (upcoming/past)
- **Status Updates**: Doctors can confirm/complete/cancel appointments

### 3. Doctor Management
- **Doctor Profiles**: Name, specialty, hospital, photo, rating, reviews
- **Featured Doctors**: Highlighted on homepage
- **Specialties**: Medicine, Chest Disease, Skin Disease, Gynaecology, Pediatrics, Surgery, Orthopedics, Plastic Surgery
- **Doctor Dashboard**: Appointment management interface

### 4. Blog/Content Management
- **Blog Posts**: Title, slug, category, excerpt, content, cover image, author
- **Categories**: Hospital News, Health Tips, Women & Child Care
- **Public Listing**: All posts visible on /blog
- **Individual Posts**: Detailed view by slug

### 5. Patient Dashboard
- **Appointment History**: Upcoming and past appointments
- **Prescription Access**: View medications and prescriptions
- **Invoice Management**: View and download invoices
- **Profile Management**: Update personal information

### 6. Doctor Dashboard
- **Appointment Queue**: View and manage patient appointments
- **Status Actions**: Confirm, complete, or cancel appointments
- **Patient Information**: Access patient medical history
- **Prescription Writing**: Create and manage prescriptions

### 7. Public Pages
- **Homepage**: Hero, services, featured doctors, testimonials, blog preview
- **About**: Hospital information, mission, founder details
- **Services**: Detailed department descriptions
- **Doctors**: Full doctor directory
- **Pricing**: Treatment packages
- **Contact**: Contact form and hospital details
- **Appointment Tracking**: Public tracking by ID

---

## Data Models Required

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (PATIENT | DOCTOR | ADMIN),
  phone: String,
  address: Object,
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Profile Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  specialty: String,
  hospital: String,
  photoUrl: String,
  bio: String,
  experience: Number,
  education: [String],
  languages: [String],
  rating: Number,
  reviewCount: Number,
  tags: [String],
  availability: Object,
  isFeatured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```javascript
{
  _id: ObjectId,
  trackingId: String (unique, e.g., "NAM-2415"),
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: User),
  date: Date,
  timeSlot: String,
  status: String (PENDING | CONFIRMED | COMPLETED | CANCELLED),
  notes: String,
  prescriptionId: ObjectId (ref: Prescription),
  invoiceId: ObjectId (ref: Invoice),
  createdAt: Date,
  updatedAt: Date
}
```

### Prescription Model
```javascript
{
  _id: ObjectId,
  appointmentId: ObjectId (ref: Appointment),
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: User),
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  diagnosis: String,
  notes: String,
  createdAt: Date
}
```

### Invoice Model
```javascript
{
  _id: ObjectId,
  appointmentId: ObjectId (ref: Appointment),
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: User),
  items: [{
    description: String,
    quantity: Number,
    price: Number
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String (PENDING | PAID | CANCELLED),
  paymentMethod: String,
  paidAt: Date,
  createdAt: Date
}
```

### Blog Post Model
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  category: String,
  excerpt: String,
  content: String (HTML),
  coverImage: String,
  author: String,
  authorId: ObjectId (ref: User),
  isPublished: Boolean,
  publishedAt: Date,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Submission Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String (NEW | READ | REPLIED),
  repliedAt: Date,
  createdAt: Date
}
```

---

## Admin Panel Features Needed

### 1. Dashboard Overview
- Total users (patients, doctors, admins)
- Total appointments (today, this week, this month)
- Revenue statistics
- Recent activity feed
- Quick stats cards

### 2. User Management
- List all users (filter by role)
- View user details
- Edit user information
- Activate/deactivate users
- Delete users

### 3. Doctor Management
- Add/Edit/Delete doctors
- Manage doctor profiles
- Set featured doctors
- Manage specialties
- View doctor statistics

### 4. Appointment Management
- View all appointments
- Filter by status, date, doctor, patient
- Edit appointment details
- Cancel appointments
- Generate reports

### 5. Blog Management
- Create/Edit/Delete blog posts
- Manage categories
- Upload cover images
- Publish/Unpublish posts
- View analytics (views, engagement)

### 6. Contact Management
- View contact form submissions
- Mark as read/replied
- Reply to inquiries
- Export contacts

### 7. Analytics & Reports
- Appointment statistics
- Revenue reports
- Doctor performance
- Patient demographics
- Popular services

### 8. Settings
- Hospital information
- Email templates
- System configuration
- User roles & permissions

---

## API Endpoints Required

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/logout` - Logout

### Appointments
- `GET /api/appointments` - Get all appointments (admin)
- `GET /api/appointments/doctor` - Get doctor's appointments
- `GET /api/appointments/patient` - Get patient's appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/track/:trackingId` - Track appointment
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/featured` - Get featured doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create doctor (admin)
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get post by slug
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/revenue` - Revenue reports
- `GET /api/admin/analytics` - Analytics data

---

## Technology Stack

### Frontend
- React 18
- Redux Toolkit
- React Router
- Bootstrap 5
- Axios

### Backend (To be implemented)
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for emails
- Multer for file uploads

### Admin Panel
- React (same frontend)
- Protected routes for admin role
- Admin-specific components
- Charts/Graphs for analytics

---

## Next Steps
1. Set up MongoDB database
2. Create backend API with Express
3. Implement authentication middleware
4. Build admin panel frontend
5. Connect frontend to backend API
6. Add file upload for images
7. Implement email notifications
8. Add analytics and reporting

