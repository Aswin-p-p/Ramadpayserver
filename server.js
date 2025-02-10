const express = require('express');
const path = require('path');
const cors = require('cors');
const form2Routes = require('./forms/form_2'); 
const MainForm = require('./forms/MainForm'); 
const fs = require('fs');

// Define the path for the uploads directory
const uploadPath = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS with specific configuration
app.use(cors({
  origin: 'https://ramadpay.netlify.app',
  methods: 'GET,POST,PUT,DELETE,OPTIONS', 
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', form2Routes);
app.use('/api', MainForm);
// Catch-all route to serve React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
