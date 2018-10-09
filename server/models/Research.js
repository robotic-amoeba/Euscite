const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const researchSchema = new Schema({
  name: String,
  admin: String,
  tag: [],
  brach: Boolean,
  post: Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

