const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

require('dotenv').config();

const app = express();

// ✅ Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// ✅ Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// ✅ EJS (for later UI work)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ MongoDB Connection
console.log('MONGO_URI:', process.env.MONGO_URI); // debug log
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error(' Database connection error:', err));

// ✅ Routes
app.use('/login', authRoutes);
app.use('/home', homeRoutes);
app.use('/', (req, res) => {
  res.redirect('/home');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
