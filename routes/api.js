const router = require('express').Router();
const tweets = require('./api.tweets.js');

router.use('/tweets', tweets);

module.exports = router;