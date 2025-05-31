const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const albumRoutes = require('./routes/albumRoutes');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://carolwargo.github.io/hr/'],
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/albums', albumRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));