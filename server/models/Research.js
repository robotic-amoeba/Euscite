const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const researchSchema = new Schema({
  name: String,
  admin: String,
  tags: [],
  brach: Boolean,
  entries: Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Research = mongoose.model('Research', researchSchema);
module.exports = Research;

