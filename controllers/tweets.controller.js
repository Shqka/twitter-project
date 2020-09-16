const { getTweets, createTweet, deleteTweet, getTweet, updateTweet, getCurrentUserTweetsWithFollowing } = require ('../queries/tweets.queries.js');
const e = require('express');


exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getCurrentUserTweetsWithFollowing(req.user);
        res.render('tweets/tweet.pug', { tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user, user: req.user });

    } catch (error) {
        next(error);
    }
}


exports.tweetNew = (req, res, next) => {
    res.render('tweets/tweet-form', { tweet: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}


exports.tweetCreate = async (req, res, next) => {
    try {
        const body = req.body;
        await createTweet({ ...body, author: req.user._id });
        res.redirect('/tweets');

    } catch (error) {
        // Affichage du message d'erreur
        const errors = Object.keys(error.errors).map( key => error.errors[key].message );
        res.status(400).render('tweets/tweet-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
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
        res.render('tweets/tweet-form', { tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
        
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
        res.status(400).render('tweets/tweet-form', { errors, tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
}