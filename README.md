# JobConnect - Real-time Interview Platform

A modern job platform that enables instant interview requests with real-time notifications. Built with React, Express, MongoDB, and Socket.IO for seamless communication between applicants and recruiters.
 # Deployment link:

 - Frontend:https://interview-dashboard-two.vercel.app/
 - Backend:https://interviewdashboard.onrender.com

## 🚀 Features

### For Applicants
- **Instant Application**: Submit interview requests with immediate confirmation
- **Smart Form**: Dropdown selection for popular job titles with validation
- **Real-time Feedback**: Loading states and success notifications
- **Responsive Design**: Works perfectly on desktop and mobile

### For Recruiters
- **Live Dashboard**: See new applications instantly without refreshing
- **Real-time Updates**: Socket.IO powered live notifications
- **Request Management**: Accept/reject applications with one click
- **Smart Filtering**: Filter by status (All, Pending, Accepted)
- **Professional Interface**: Clean table view with all applicant details

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd job-platform-realtime
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobplatform
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobplatform
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - no local setup needed
```

### 5. Run the Application

#### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev:frontend
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🌐 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/interview-requests` | Fetch all interview requests | - |
| `POST` | `/api/interview-requests` | Submit new interview request | `{ name, email, jobTitle }` |
| `PUT` | `/api/interview-requests/:id/accept` | Accept an interview request | - |


## 📊 Database Schema

### InterviewRequest Model
```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🔄 Real-time Features

The platform uses **Socket.IO** for real-time communication:

### Events
- `newInterviewRequest` - Emitted when a new application is submitted
- `requestStatusUpdated` - Emitted when a request status changes
- `connection` - User connects to the platform
- `disconnect` - User disconnects from the platform

### How it Works
1. Applicant submits form on `/apply`
2. Backend saves to MongoDB and emits `newInterviewRequest`
3. All connected recruiters receive the update instantly
4. Recruiter accepts request, backend emits `requestStatusUpdated`
5. All clients see the status change in real-time

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with glassmorphism effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Hover states, transitions, and micro-interactions
- **Color System**: Consistent blue-to-purple gradient theme
- **Typography**: Inter font for excellent readability
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with platform overview |
| `/apply` | Apply | Application form for job seekers |
| `/recruiter` | Recruiter | Real-time dashboard for recruiters |

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Backend (Render/Heroku)
1. Create new web service
2. Connect GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables (MongoDB URI, PORT)

### Environment Variables for Production
```env
# Backend
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production

# Frontend (if needed)
VITE_API_URL=https://your-backend-url.com
```

## 🧪 Testing the Application

### Manual Testing Steps
1. **Application Flow**:
   - Go to `/apply`
   - Fill out the form with valid data
   - Submit and verify success message
   - Check that data appears in recruiter dashboard

2. **Real-time Updates**:
   - Open `/recruiter` in one browser tab
   - Open `/apply` in another tab
   - Submit application and watch it appear instantly in recruiter tab

3. **Status Updates**:
   - Click "Accept" button on recruiter dashboard
   - Verify status changes to "Accepted"
   - Test filtering functionality


## 📈 Performance Optimizations

- **Socket.IO**: Efficient real-time updates without polling
- **React Optimization**: Proper state management and re-render prevention
- **Database Indexing**: Optimized queries with proper indexes
- **Lazy Loading**: Components loaded on demand
- **Caching**: Browser caching for static assets


## 🎯 Assignment Completion Checklist

- ✅ **Applicant Flow**: Form with name, email, job title
- ✅ **Recruiter Flow**: Real-time dashboard with accept functionality
- ✅ **Real-time Updates**: Socket.IO implementation
- ✅ **API Endpoints**: All required REST endpoints
- ✅ **Database Schema**: Proper Mongoose schema
- ✅ **Bonus Features**: 
  - ✅ Filter by pending/accepted
  - ✅ Form loading and success feedback
  - ✅ Production-ready code quality
  - ✅ Comprehensive documentation

**Tech Stack Compliance**: ✅ React, Express, MongoDB, Mongoose, Socket.IO

# Screenshot
![image](https://github.com/user-attachments/assets/7368a666-8945-49b7-94c0-d9b0df111927)
# Apply Page
![image](https://github.com/user-attachments/assets/e77db35f-b490-4663-a26a-6b42c929f028)
# Message after submit the Interview Request
![image](https://github.com/user-attachments/assets/17a70e83-ba94-4fe4-b045-e91c3bb1a964)
# Recruiter page
![image](https://github.com/user-attachments/assets/370a11c9-3999-4f16-8f46-1fccd0fdbe3f)




