const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// MongoDB Connection
const MONGODB_URI = "mongodb://localhost:27017/solar_tracker";
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const sensorDataSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ldrReadings: {
    topLeft: Number,
    topRight: Number,
    bottomLeft: Number,
    bottomRight: Number
  },
  servoAngles: {
    horizontal: Number,
    vertical: Number
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

// Root route - serve solar.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'solar.html'));
});

// Routes
app.post('/api/sensor-data', async (req, res) => {
  try {
    const { TL, TR, BL, BR, horizontalAngle, verticalAngle } = req.body;
    
    const sensorData = new SensorData({
      ldrReadings: {
        topLeft: TL,
        topRight: TR,
        bottomLeft: BL,
        bottomRight: BR
      },
      servoAngles: {
        horizontal: horizontalAngle || 0,
        vertical: verticalAngle || 0
      }
    });

    await sensorData.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving data' });
  }
});

// Get latest data
app.get('/api/latest-data', async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });
    res.json(latestData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Get all data
app.get('/api/all-data', async (req, res) => {
  try {
    const allData = await SensorData.find().sort({ timestamp: -1 });
    res.json(allData);
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ error: 'Error fetching all data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 