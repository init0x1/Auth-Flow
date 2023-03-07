const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');


const User = require('./database');


const app = express();

// Setup session middleware
app.use(session({
    secret: 'your-secret-key', // Secret used to sign the session ID cookie
    resave: false, // Don,t save session if unmodified
    saveUninitialized: false, // Don,t create a session until something is stored
  }));
  
  // Parse incoming request bodies in a middleware before your handlers
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  app.use(cookieParser());
  
  // Serve static files from the 'public' directory
  app.use(express.static(__dirname + '/public'));
  
  // Set up rate limiting middleware
  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.'
  });
  app.use('/login', limiter);
  
  // Set up logging middleware using Morgan
  app.use(morgan('dev'));
  
 
  // Handle requests to the root URL
  app.get('/', (req, res) => {
    const user = req.session.user;
    if (!user) {
      res.redirect('/login');
    } else {
      res.redirect('/home');
    }
  });
  
  // Handle requests to the login page
  app.get('/login', (req, res) => {
    const user = req.session.user;
    if (user) {
      res.redirect('/home');
    } else {
      res.sendFile(__dirname + '/public/index.html');
    }
  });
  
  // Handle POST requests to the login page
  app.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username, password: req.body.password }).lean();
      if (user) {
        // Save the user,s username in the session
        req.session.user = req.body.username;
        // Set a cookie to indicate that the user is logged in
        res.cookie('login', 'Yes', { secure: true, httpOnly: true });
        res.redirect('/home');
      } else {
        res.sendFile(__dirname + '/public/index.html');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  });
  
  // Handle POST requests to log out the user
  app.post('/logout', (req, res) => {
    // Destroy the session and remove the login cookie
    req.session.destroy();
    res.cookie('login', 'No', { secure: true, httpOnly: true });
    res.redirect('/login');
  });
// Route for the home page ('/home')
app.get('/home', (req, res) => {
  const user = req.session.user;
  if (!user) { // if there is no user in session, redirect to login page
    res.redirect('/login');
  } else { // if there is a user in session, serve home page
    res.sendFile(__dirname + '/public/home.html');
  }
});

// Route for the signup page ('/signup')

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username }).lean();
    if (existingUser) {
      res.sendFile(__dirname + '/public/signup.html');
    } else {
      await User.create({ username, password });
      res.redirect('/login');
    }
  } catch (error) {
    res.status(500).send('Error signing up');
  }
});

// Setup server to listen on port 3000
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
