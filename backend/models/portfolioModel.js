const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  socialMedia: {
    type: Object, 
  },
  skills: [{
    type: String,
  }],
  experiences: [{
    type: Object, 
  }],

  education: [{
    type: Object, 
  }],
  awards: [{
    type: String,
  }],
image : {
  type : String
}
,city : {
  type : String,
},country: {
  type : String,
},postalCode :{
  type : String,
},gouvernorate : {
  type : String,
},website : {
  type : String
}
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
