const mongoose = require('mongoose');

const CONST_RATE = [1,2,3,4,5];

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  resource: {
    ref: 'Resource',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  rate: {
    type: String,
    enum: CONST_RATE,
    required: true
  },
  comment: {
    type: String,
    required: true,
    minlength: 10
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

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;