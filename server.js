require('dotenv').config({path: '.env'});
const express = require('express');
const connectDB = require('./db');
const jobStatusRoutes = require('./routes/jobStatusRoutes');
const cors = require('cors');

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://darkturquoise-chimpanzee-333233.hostingersite.com', 'https://agentcallback.vercel.app', '*'], methods: ['GET'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

app.use('/api/jobs', jobStatusRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({message: 'Internal server error'});
});

const port = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(port, () => console.log(`API listening on ${port}`));
});