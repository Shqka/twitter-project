const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config.js');
const tweets = require('./tweets.routes.js');
const users = require('./users.routes.js');
const auth = require('./auth.routes.js');


router.use('/tweets', ensureAuthenticated, tweets);

router.use('/users', users);

router.use('/auth', auth);

router.get('/', (req, res) => {
    res.redirect('/tweets');
})


module.exports = router;