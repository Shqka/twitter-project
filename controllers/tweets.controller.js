const Tweet = require('../database/models/tweet.model.js');


exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await Tweet.find({}).exec();
        res.render('tweets/tweet-list.pug', { tweets });

    } catch (error) {
        next(error);
    }
}


exports.tweetNew = (req, res, next) => {
    res.render('tweets/tweet-form.pug');
}


exports.tweetCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const newTweet = new Tweet(body);
        await newTweet.save();

    } catch (error) {
        // Affichage du message d'erreur
        const errors = Object.keys(error.errors).map( key => error.errors[key].message );
        res.status(400).render('tweets/tweet-form', { errors });
    }
}