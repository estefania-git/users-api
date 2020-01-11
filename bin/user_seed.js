const mongoose = require('mongoose');
const User = require('../models/User');
const user_data = require('./user_data');

const dbURL = "mongodb://localhost/User-API";

mongoose.connect(dbURL).then(() => {
    useMongoClient: true;
    
    User.create(user_data)
    .then(user => {
        console.log(`All the users inserted`, `User list: ${user}`);
        mongoose.disconnect();
    })
    .catch(err => {
        console.log(err);
    });
});

