const { Router } = require('express');
// const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

const signToken = user => {
  return jwt.sign(
    { userId: user._id },
    config.get('jwtSecret'),
    { expiresIn: '1h' },
  );
};

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length is 6')
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect credentials',
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ 'local.email': email });

      if (candidate) {
        return res.status(400).json({ message: 'This email already in use' });
      }

      const user = new User({
        method: 'local',
        local: {
          email: email,
          password: password,
        },
      });
      await user.save();
      const token = signToken(user);

      res.status(201).json({ token, userId: user._id, message: 'User created' });
    } catch (e) {
      res.status(500).json({ message: 'Register, something went wrong, try again' });
    }
  });

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Invalid email').normalizeEmail().isEmail(),
    check('password', 'Password in required').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect credentials',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ 'local.email': email });

      if (!user) {
        return res.status(400).json({ message: 'User is not found' });
      }

      const isMatch = await user.isValidPassword(password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = signToken(user);

      res.status(200).json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Login, something went wrong, try again' });
    }
  });

module.exports = router;
