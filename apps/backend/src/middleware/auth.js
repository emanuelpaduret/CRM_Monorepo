const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    console.log('✅ Authenticated user:', decoded.email);
    next();
  } catch (error) {
    console.log('❌ Auth failed:', error.message);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Middleware to check roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    
    next();
  };
};

module.exports = { authenticateToken, authorize };