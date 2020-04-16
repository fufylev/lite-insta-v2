const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

const signToken = user => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    config.get('jwtSecret'),
    { expiresIn: '1h' },
  );
};

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }

      const user = new User({
        email: args.userInput.email,
        password: args.userInput.password
      });

      const result = await user.save();
      const token = signToken(user);

      return { ...result._doc, password: null, _id: result.id, token: token };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }

    const isEqual = await user.isValidPassword(password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }

    const token = signToken(user);

    return { userId: user.id, token: token, tokenExpiration: 1, email: email };
  }
};