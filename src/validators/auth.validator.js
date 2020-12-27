const { check, validationResult } = require('express-validator');

module.exports.validateSignupRequest = [
  check('firstName').notEmpty().withMessage('firstName is required'),
  check('lastName').notEmpty().withMessage('lastName is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),
];

module.exports.validateSigninRequest = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),
];

module.exports.validateForgotPassword = [
  check('email').isEmail().withMessage('Valid email is required'),
];

module.exports.validateResetPassword = [
  check('passwordResetToken').notEmpty().withMessage('Valid email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),
];

module.exports.validateUpdateRequest = [
  check('firstName').notEmpty().withMessage('firstName is required'),
  check('lastName').notEmpty().withMessage('lastName is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),
];

module.exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
