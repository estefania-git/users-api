const mongoose = require("mongoose");
const User = require("../models/User.model");
const Address = require("../models/Address.model");

let users = [
  {
    name: "Maria",
    email: "maria@hotmail.es",
    birthDate: "20/01/1995",
    address: "españa"
  },

  {
    name: "Estefania",
    email: "estefania@hotmail.es",
    birthDate: "07/05/1998",
    address: "spain"
  }
];

mongoose
  .connect("mongodb://localhost/User-API", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    User.deleteMany().then(() => {
      User.insertMany(users)
        .then(() => {
          return User.deleteMany();
        })
        .then(() => {
          return User.create(users);
        })
        .then(usersCreated => {
          console.log(
            `${usersCreated.length} users created with the following id:`
          );
          console.log(usersCreated.map(u => u._id));

          process.exit(0);
        });
    });
  })
  .catch(err => console.error("Error connecting to mongo", err));
