const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  image: { type: String },
  description: { type: String },
  owner: {
    id: {
      type: String
    },
    username: {
      type: String
    }
  },
  likes: [{
    user: {
      id: {
        type: String
      },
      username: {
        type: String
      }
    },
    timestamp: { type: String },
  }],
  comments: [{
    user: {
      id: {
        type: String
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      }
    },
    text: { type: String },
    timestamp: { type: String },
  }]
});

// Create a model
const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;

// module.exports = mongoose.model('Picture', pictureSchema, 'pictures');