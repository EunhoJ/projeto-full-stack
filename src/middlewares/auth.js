import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Token unauthorized'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch ( error ) {
    res.status(401).json({
      message: 'Token Invalid', error
    });
  }
};

// Fixed