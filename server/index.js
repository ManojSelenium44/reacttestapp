import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.server.cors));
app.use(express.json());

// Rate limiting
const limiter = rateLimit(config.security.rateLimit);
app.use('/api/', limiter);

// In-memory user storage (replace with a database in production)
const users = [
  {
    id: 1,
    username: 'admin',
    // Password: admin123
    password: '$2a$10$XQGXnhN0Xt0HvGqLRYJqYOGhwTi9eYoF.0tBjXeBGx9HX9b5qIk8a'
  }
];

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Start server
app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});