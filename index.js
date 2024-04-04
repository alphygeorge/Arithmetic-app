const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Require cookie-parser
const app = express();
const crypto = require('crypto');

// Middleware to parse cookies
app.use(cookieParser());
// Generate a random secure key of 32 bytes (256 bits)


// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for JWT
const JWT_SECRET = 'J8zTpS3vYQbnkAu4mRc9LeF6XaWwD2qZ'; // Change this to your secret key

// Middleware to generate JWT and save it in cookies
app.use('/', (req, res, next) => {

  // Generate JWT
  const secretKey = crypto.randomBytes(32).toString('hex');
console.log("secret key is", secretKey);
  const token = jwt.sign({}, secretKey); // Empty payload
  console.log("Token is =", token)
  
  // Set JWT in cookies
  res.cookie('token', token, { httpOnly: true });

  next();
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.cookies.token; // Now req.cookies should be defined

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

// Route for addition, requires token verification
app.post('/add', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

// Route for subtraction, requires token verification
app.post('/sub', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
});

// Route for multiplication, requires token verification
app.post('/mul', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

// Route for division, requires token verification
app.post('/div', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  if (parseFloat(num2) === 0) {
    res.status(400).json({ error: "Division by zero" });
    return;
  }
  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is listening on port ${PORT}');
});
