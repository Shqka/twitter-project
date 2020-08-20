const { getTweets, createTweet, deleteTweet, getTweet, updateTweet } = require ('../queries/tweets.queries.js');
const e = require('express');


exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getTweets();
        res.render('tweets/tweet.pug', { tweets });

    } catch (error) {
        next(error);
    }
}


exports.tweetNew = (req, res, next) => {
    res.render('tweets/tweet-form', { tweet: {} });
}


exports.tweetCreate = async (req, res, next) => {
    try {
        const body = req.body;
        await createTweet(body);
        res.redirect('/tweets');

    } catch (error) {
        // Affichage du message d'erreur
        const errors = Object.keys(error.errors).map( key => error.errors[key].message );
        res.status(400).render('tweets/tweet-form', { errors });
    }
}


exports.tweetDelete = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        await deleteTweet(tweetId);
        const tweets = await getTweets();
        res.render('tweets/tweet-list', { tweets });

    } catch (error) {
        next(error);
    }
}


exports.tweetEdit = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await getTweet(tweetId);
        res.render('tweets/tweet-form', { tweet });
        
    } catch (error) {
        next(error);
    }
}


exports.tweetUpdate = async (req, res, next) => {
    const tweetId = req.params.tweetId;

    try {
        const body = req.body;
        await updateTweet(tweetId, body);
        res.redirect('/tweets');

    } catch (error) {
        const errors = Object.keys(error.errors).map( key => error.errors[key].message );
        const tweet = await getTweet(tweetId);
        res.status(400).render('tweets/tweet-form', { errors, tweet });
    }
}