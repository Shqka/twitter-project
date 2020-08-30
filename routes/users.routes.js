const router = require('express').Router();
const { signup, signupForm } = require('../controllers/users.controller.js');


router.get('/signup/form', signupForm);
router.post('./signup', signup);


module.exports = router;