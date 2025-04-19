const Express = require("express");
const verifyJWT = require('./middleware/verifyJWT');
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const mongoose = require("mongoose");
const connectDB = require('./config/dbconect');
const app = Express();
const PORT =  4000;


connectDB();

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:3000',
]; // Add your frontend URLs here

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
  

app.use(Express.json());
app.use(cookieParser());

app.use('/signup', require('./routes/SignUp'));
app.use('/login', require('./routes/LogIn'));
app.use('/verify', require('./routes/VerifyEmail') );

app.use('/logout', require('./routes/LogOut'));
app.use('/refresh', require('./routes/Refresh'));

app.use(verifyJWT);
app.use('/poll', require('./routes/Poll'));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
});

