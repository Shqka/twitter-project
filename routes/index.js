const router = require('express').Router();
const api = require('./api.js');
const Tweet = require('../database/models/tweet.model.js');

router.use('/api', api);

router.get('/', (req, res) => {
    Tweet.find({})
         .exec()
         .then( tweets => res.render('tweets/tweet-list.pug', { tweets }) );    
})

router.get('/tweet/new', (req, res) => {
    res.render('tweets/tweet-form.pug');
})

module.exports = router;