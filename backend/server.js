import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import InterviewRequest from './models/InterviewRequest.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors()); // Allows all origins (or customize here if needed)
app.use(express.json());

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();

// ✅ API Routes

// GET /api/interview-requests - Fetch all interview requests
app.get('/api/interview-requests', async (req, res) => {
  try {
    const requests = await InterviewRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch interview requests' });
  }
});

// POST /api/interview-requests - Submit new interview request
app.post('/api/interview-requests', async (req, res) => {
  try {
    const { name, email, jobTitle } = req.body;

    if (!name || !email || !jobTitle) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newRequest = new InterviewRequest({ name, email, jobTitle });
    const savedRequest = await newRequest.save();

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Failed to submit interview request' });
  }
});

// PUT /api/interview-requests/:id/accept - Mark request as accepted
app.put('/api/interview-requests/:id/accept', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await InterviewRequest.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Interview request not found' });
    }

    res.json(updatedRequest);
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Failed to accept interview request' });
  }
});

// ✅ Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
