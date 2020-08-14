const router = require('express').Router();
const api = require('./api');
const Tweet = require('../database/models/tweet.model');

router.use('/api', api);

router.get('/', (req, res) => {
    res.render('tweets/tweet-list.pug');
})

router.get('/tweet/new', (req, res) => {
    res.render('tweets/tweet-form.pug');
})

module.exports = router;