const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  publishedDate: Date,
  kind: String
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
}   )

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;