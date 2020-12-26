const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports.updateUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hash_password: hash,
    };

    User.findByIdAndUpdate(req.user._id, data, {
      new: true,
      runValidators: true,
    })
      .then((result) => {
        let { _id, firstName, lastName, email, role, fullName } = result;
        return res.status(200).json({
          message: 'Success.',
          user: { _id, firstName, lastName, email, role, fullName },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });
};
