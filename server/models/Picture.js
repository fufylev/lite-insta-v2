const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  image: { type: String },
  description: { type: String },
  created: { type: Date, default: new Date()  },
  owner: { type: Schema.ObjectId, ref: 'User' },
  likes: [{
    user: { type: Schema.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: new Date() },
  }],
  comments: [{
    user: { type: Schema.ObjectId, ref: 'User' },
    text: { type: String },
    timestamp: { type: Date, default: new Date() },
  }],
});

// Create a model
const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;

// module.exports = mongoose.model('Picture', pictureSchema, 'pictures');