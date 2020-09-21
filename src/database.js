const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pinterest_tutorial', {
    useNewUrlParser: true
})
    .then(db => console.log('DB esta conectada'))
    .catch(error => console.error(error));