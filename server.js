// server.js
const mongoose = require('mongoose');
const express = require('express');
// const DB='mongodb+srv://AfiyaAteeq:<db_password>@cluster0.hwzgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DB='mongodb+srv://AfiyaAteeq:afiyaateeqatlas@cluster0.hwzgb.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0'

const cors = require('cors');
//const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption={
  origin:"http//locahost:5000",
  methods:"GET,POST,PUT,DELETE,PATCH,DELETE",
  credential:true,
};

// Middleware
app.use(cors(corsOption));
app.use(express.json());


// MongoDB connection (updated)
mongoose.connect(DB)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
