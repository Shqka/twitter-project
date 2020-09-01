const { app } = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserByEmail, findUserById } = require('../queries/users.queries.js');


app.use(passport.initialize());  // Initialisation obligatoire

app.use(passport.session());  // Utilisation des sessions avec passport


/* Après l'authentification nous ne stockons que l'_id du user
   dans la session pour ne pas la surcharger */
passport.serializeUser((user, done) => {
    done(null, user._id);
});


/* A chaque requête, la session est récupérée par express-session en utilisant
   l'id de la session dans le cookie. Passport récupère l'_id du user dans la session
   et exécute cette méthode. Nous récupérons le user avec son _id et le retournons
   à Passport avec done(null, user). Passport le mettra alors sur req.user */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);

    } catch (error) {
        done(error);
    }
});


/* Configuration de la stratégie locale
   Nous utilisons l'email comme identifiant et devons donc passer
   l'option usernameField pour qu'elle corresponde à l'email */
passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Nous essayons de récupérer l'utilisateur avec son email
        const user = await findUserByEmail(email);
        if (user) {
            // Si nous trouvons le user, nous comparons le mot de passe hashé
            // de la bdd avec le hash du mot de passe fourni par l'utilisateur
            const passwordMatch = await user.comparePassword(password);
            if (passwordMatch) {
                // Si les mdp correspondent on retourne le user
                done(null, user);
            } else {
                // Sinon les mdp ne correspondent pas on retourne une erreur
                done(null, false, { message: 'Mot de passe incorrect !'});
            }
        } else {
            // Si nous ne trouvons pas de user, on retourne une erreur
            done(null, false, { message: 'Email introuvable !'});
        }
    } catch (error) {
        done(error);
    }
}))