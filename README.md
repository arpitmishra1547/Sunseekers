# SunSeekers - Dual-Axis Solar Tracker

A web-based dashboard for monitoring and controlling a dual-axis solar tracking system.

## Features

- Real-time LDR sensor readings visualization
- Interactive solar panel animation
- Servo motor angle monitoring with circular gauges
- MongoDB integration for data storage
- Responsive design with dark mode support

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

## Deployment on Vercel

### Prerequisites

1. Create a MongoDB Atlas cluster (free tier available)
2. Get your MongoDB connection string

### Deployment Steps

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Set up MongoDB Environment Variable**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable: `MONGODB_URI` with your MongoDB connection string

4. **Deploy**:
```bash
vercel --prod
```

### Alternative: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the `MONGODB_URI` environment variable in Vercel dashboard
4. Deploy automatically on push

## Environment Variables

- `MONGODB_URI`: Your MongoDB connection string (required for production)
- `PORT`: Server port (default: 3000)

## API Endpoints

- `GET /`: Main dashboard
- `POST /api/sensor-data`: Save sensor data
- `GET /api/latest-data`: Get latest sensor data
- `GET /api/all-data`: Get all sensor data
- `GET /api/health`: Health check

## Project Structure

```
├── solar.html          # Main dashboard
├── about.html          # About page
├── contact.html        # Contact page
├── server.js           # Express server
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
├── darkmode.css        # Dark mode styles
├── darkmode.js         # Dark mode functionality
└── README.md           # This file
```

## Troubleshooting

### Common Vercel Deployment Issues

1. **MongoDB Connection Error**: Ensure `MONGODB_URI` environment variable is set correctly
2. **Build Failures**: Check that all dependencies are in `dependencies` (not `devDependencies`)
3. **404 Errors**: Verify `vercel.json` routing configuration

### Health Check

Visit `/api/health` to check if your deployment is working correctly.

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Charts**: Chart.js
- **Deployment**: Vercel

## Contact

- **Email**: arpitmishra1547@gmail.com
- **Phone**: +91 9977006842
- **LinkedIn**: [Arpit Mishra](https://www.linkedin.com/in/arpitmishraz/)
- **GitHub**: [arpitmishra1547](https://github.com/arpitmishra1547) 