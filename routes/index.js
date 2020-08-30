const router = require('express').Router();
const tweets = require('./tweets.routes.js');
const users = require('./users.routes.js');


router.use('/tweets', tweets);

router.use('/users', users);

router.get('/', (req, res) => {
    res.redirect('/tweets');
})


module.exports = router;