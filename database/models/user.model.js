const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = Schema({
    username: { type: String, required: true, unique: true },
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    avatar: { type: String, default: '/images/default-profile.svg' },
    following: { type: [Schema.Types.ObjectId], ref: 'user' }
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

/* Ajout d'une méthode d'instance sur le Schema Mongoose (qui compare les deux password cryptés) 
   afin de pouvoir l'utiliser sur toutes les instances du modèle User. */
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;