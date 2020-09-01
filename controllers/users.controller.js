const { createUser } = require('../queries/users.queries.js');


exports.signupForm = async (req, res, next) => {
    res.render('users/user-form.pug', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}


exports.signup = async (req, res, next) => {
    const body = req.body;
    try {
        const user = await createUser(body);
        res.redirect('/');
    } catch (error) {
        res.render('users/user-form', { errors: [ error.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
}