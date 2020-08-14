const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('tweets/tweet-list.pug');
})

router.get('/tweet/new', (req, res) => {
    res.render('tweets/tweet-form.pug');
})

module.exports = router;