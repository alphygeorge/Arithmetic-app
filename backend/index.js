// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const app = express();
// var cors=require("cors");
// const path = require("path");


// // Middleware to parse cookies
// app.use(cookieParser());
// app.use(express.static('public'));
// // Middleware to parse JSON bodies
// app.use(express.json());

// app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Secret key for JWT
// const JWT_SECRET = 'J8zTpS3vYQbnkAu4mRc9LeF6XaWwD2qZ'; 
// // Middleware to generate JWT and save it in cookies
// app.use('/', (req, res, next) => {
//   // Generate JWT
//   const token = jwt.sign({}, JWT_SECRET);
//   console.log(token) 
  
//   // Set JWT in cookies
//   res.cookie('token', token, {  });

//   next();
// });

// // Middleware to verify JWT
// function verifyToken(req, res, next) {
//   const token = req.cookies.token; 

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// // Route for addition, requires token verification

// app.get("/", async (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
 
// });
// app.post('/addition', verifyToken, (req, res) => {
//   const { num1, num2 } = req.body;
//   if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
//     return res.status(400).json({ error: 'Invalid numbers provided' });
//   }
//   const result = parseFloat(num1) + parseFloat(num2);
//   res.json({ result });
// });

// // Route for subtraction,
// app.post('/subtraction', verifyToken, (req, res) => {
//   const { num1, num2 } = req.body;
//   if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
//     return res.status(400).json({ error: 'Invalid numbers provided' });
//   }
//   const result = parseFloat(num1) - parseFloat(num2);
//   res.json({ result });
// });

// // Route for multiplication, requires token verification
// app.post('/multiplication', verifyToken, (req, res) => {
//   const { num1, num2 } = req.body;
//   if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
//     return res.status(400).json({ error: 'Invalid numbers provided' });
//   }
//   const result = parseFloat(num1) * parseFloat(num2);
//   res.json({ result });
// });

// // Route for division, requires token verification
// app.post('/division', verifyToken, (req, res) => {
//   const { num1, num2 } = req.body;
//   if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
//     return res.status(400).json({ error: 'Invalid numbers provided' });
//   }
//   if (parseFloat(num2) === 0) {
//     return res.status(400).json({ error: "Division by zero" });
//   }
//   const result = parseFloat(num1) / parseFloat(num2);
//   res.json({ result });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });


const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware to parse cookies
app.use(cookieParser());
app.use(express.static('public'));
// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Secret key for JWT
const JWT_SECRET = 'J8zTpS3vYQbnkAu4mRc9LeF6XaWwD2qZ';

// Middleware to generate JWT and save it in cookies
app.use('/', (req, res, next) => {
  // Generate JWT
  const token = jwt.sign({}, JWT_SECRET);
  console.log(token);

  // Set JWT in cookies
  res.cookie('token', token, { httpOnly: true });

  next();
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.cookies.token;

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
app.post('/addition', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

// Route for subtraction, requires token verification
app.post('/subtraction', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
});

// Route for multiplication, requires token verification
app.post('/multiplication', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

// Route for division, requires token verification
app.post('/division', verifyToken, (req, res) => {
  const { num1, num2 } = req.body;
  if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }
  if (parseFloat(num2) === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }
  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
