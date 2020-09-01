const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = Schema({
    content: {
        type: String,
        maxlength: [140, "Tweet trop long (140 caractères maximum)"],
        minlength: [3, "Tweet trop court (3 caractères minimum)"],
        required: [true, "Le champ est requis"]
    },
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;