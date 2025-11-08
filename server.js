require('dotenv').config({path: '.env'});
const express = require('express');
const connectDB = require('./db');
const jobStatusRoutes = require('./routes/jobStatusRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
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