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

// ==============================

// const AuthorsController = {
//     async index(req, res){
//       const users = await User
//          .find()
//          .populate('address');
//       res.send(users);
//     },
//     async show(req, res){
//       const author = await Author
//          .findById(req.params.id)
//          .populate(‘books’);
//       res.send(author);
//     }
//   };