const User = require('../models/User');
const Picture = require('../models/Picture');

module.exports = {
  User: {
    id: () => "hello",
  },
  /*Mutation: {
    createCat: async (_, { name }) => {
      const kitty = new User({ name });
      await kitty.save();
      return kitty;
    }
  }*/
};
