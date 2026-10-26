const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Design Porto API is running!' });
});

// Routes (nanti kita tambah disini)
//auth
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

//category
const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes);

//projek
const projectRoutes = require('./routes/project.routes');
app.use('/api/projects', projectRoutes);

const inquiryRoutes = require('./routes/inquiry.routes');
app.use('/api/inquiries', inquiryRoutes);

const chatbotRoutes = require('./routes/chatbot.routes');
app.use('/api/chatbot', chatbotRoutes);

// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/inquiries', inquiryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});