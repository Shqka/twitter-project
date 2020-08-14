const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({

  content: {
    type: String,
    maxlength: [140, "Tweet trop long (140 caractères maximum)"],
    minlength: [3, "Tweet trop court (4 caractères minimum)"],
    required: [true, "Le champ est requis"]
  }
  
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;