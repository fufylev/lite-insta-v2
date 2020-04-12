const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  image: { type: String },
  description: { type: String },
  owner: { type: Schema.Types.Mixed },
  likes: [{
    user: { type: Schema.Types.Mixed },
    timestamp: { type: String },
  }],
  comments: [{
    user: { type: Schema.Types.Mixed },
    text: { type: String },
    timestamp: { type: String },
  }]
});

module.exports = mongoose.model('Picture', pictureSchema, 'pictures');