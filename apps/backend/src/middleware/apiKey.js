module.exports = function requireApiKey(req, res, next) {
  // let CORS preflights pass
  if (req.method === 'OPTIONS') return next();

  const key = req.header('x-api-key');
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};
