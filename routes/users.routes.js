const router = require('express').Router();
const { signup, signupForm, uploadImage } = require('../controllers/users.controller.js');
const { ensureAuthenticated } = require('../config/guards.config');


router.get('/signup/form', signupForm);

router.post('/signup', signup);

router.post('/upload/image', ensureAuthenticated, uploadImage);


module.exports = router;