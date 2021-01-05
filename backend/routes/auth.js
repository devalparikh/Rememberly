const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

let User = require('../models/user.model');

require('dotenv').config();

// @route POST /auth/login
// @desc Login Autheniticate user
// @access Public
router.route('/login').post((req, res) => {

  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      } else {
        // Validate password
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });

            jwt.sign(
              { id: user._id },
              process.env.SECRET_KEY,
              { expiresIn: 3600 * 24 }, // Token expires in 1 day
              (err, token) => {
                if (err) throw err
                res.status(200).json({
                  status: user.username + ' Authenticated!',
                  token,
                  user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                  }
                });
              }
            );
          });
      }
    })
    .catch(err => {
      res.status(400).json({ msg: err });
    });
})

// @route POST /auth/register
// @desc Register new user
// @access Public
router.route('/register').post((req, res) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }

  // Check if username already exists
  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (!user) {
        // Check if email already exists
        User.findOne({
          email: req.body.email
        })
          .then(user => {
            if (!user) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                User.create(userData)
                  .then(user => {

                    jwt.sign(
                      { id: user._id },
                      process.env.SECRET_KEY,
                      { expiresIn: 3600 * 24 }, // Token expires in 1 day
                      (err, token) => {
                        if (err) throw err
                        res.status(200).json({
                          status: user.username + ' Registered!',
                          token,
                          user: {
                            id: user._id,
                            email: user.email,
                            username: user.username,
                          }
                        });
                      }
                    );
                  })
                  .catch(err => {
                    res.status(400).json({ msg: err })
                  })
              });
            } else {
              res.status(500).json({ msg: 'Email ' + user.email + ' already exists.' });
            }
          })

      } else {
        res.status(500).json({ msg: 'Username ' + user.username + ' already exists.' });
      }
    })
    .catch(err => {
      res.status(400).json({ msg: err });
    });
});

// @route GET /auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;