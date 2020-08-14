const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://username:password@cluster0-9dj3u.gcp.mongodb.net/twitter?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true
        })
        .then(() => console.log("connexion db ok !!!"))
        .catch(err => console.log(err));