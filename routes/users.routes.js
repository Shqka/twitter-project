const router = require('express').Router();
const { signup, signupForm, uploadImage, userProfile, userList } = require('../controllers/users.controller.js');
const { ensureAuthenticated } = require('../config/guards.config');


router.get('/', userList);

router.get('/:username', userProfile);

router.get('/signup/form', signupForm);

router.post('/signup', signup);

router.post('/upload/image', ensureAuthenticated, uploadImage);


module.exports = router;