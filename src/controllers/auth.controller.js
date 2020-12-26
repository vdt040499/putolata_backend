const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const shortid = require('shortid');
const nodemailer = require('nodemailer');

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: 'User already registered',
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: 'Something went wrong',
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });

    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === 'user') {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: 'Invalid password',
        });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully!',
  });
};

exports.forgotPassword = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'No users found.',
        });
      }

      crypto.randomBytes(3, (err, buf) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        }

        let token = buf.toString('hex');

        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

        user.save().catch((err) => {
          return res.status(500).json({
            error: err,
          });
        });

        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        let mailOptions = {
          from: `PuToLaTa <${process.env.EMAIL_USERNAME}>`,
          to: user.email,
          subject: 'Reset your password',
          text: `Your password reset token (valid for only 10 minutes) ${token}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          }

          return res.status(201).json({
            message: 'Token sent to your email.',
          });
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.resetPassword = (req, res) => {
  User.findOne({
    passwordResetToken: req.body.passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: 'Token is invalid or has expired.',
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        user.hash_password = hash;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        user
          .save()
          .then((result) => {
            let token = jwt.sign(
              { userId: user._id, role: user.role },
              process.env.JWT_KEY,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
            );

            let { _id, firstName, lastName, email, role, fullName } = result;

            return res.status(201).json({
              message: 'Password reset successful.',
              token: token,
              user: { _id, firstName, lastName, email, role, fullName },
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: err,
            });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
