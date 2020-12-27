const jwt = require('jsonwebtoken');
const uploadcareStorage = require('multer-storage-uploadcare');
const multer = require('multer');

const storage = uploadcareStorage({
  public_key: process.env.UPLOADCARE_PUBLIC_KEY,
  private_key: process.env.UPLOADCARE_PRIVATE_KEY,
  store: 'auto',
});

module.exports.upload = multer({ storage });

module.exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
  next();
};

module.exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'User access denied' });
  }
  next();
};

module.exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Admin access denied' });
  }
  next();
};
