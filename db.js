const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agent_jobs';
  mongoose.set('debug', true);                      // <— add this
  await mongoose.connect(uri, {serverSelectionTimeoutMS: 5000});
  console.log('MongoDB connected →', mongoose.connection.name);
};

module.exports = connectDB;