const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  users: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
  }],
  status: {
    type: String, 
    enum: ['pending', 'ok', 'bloqued'],
    default: 'ok',
    required: true
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }  
})

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;