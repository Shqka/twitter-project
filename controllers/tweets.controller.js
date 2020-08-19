const { getTweets, createTweet } = require ('../queries/tweets.queries.js');


exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getTweets;
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
        await createTweet(body);
        res.redirect('/tweets');

    } catch (error) {
        // Affichage du message d'erreur
        const errors = Object.keys(error.errors).map( key => error.errors[key].message );
        res.status(400).render('tweets/tweet-form', { errors });
    }
}