export const config = {
  // Use environment variables for sensitive data
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '1h'
  },
  server: {
    port: process.env.PORT || 3001,
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true
    }
  },
  security: {
    bcryptSaltRounds: 10,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  }
};