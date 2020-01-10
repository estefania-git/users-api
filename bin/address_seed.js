const mongoose = require('mongoose');
const Address = require('../models/Address');
const address_data = require('./address_data');

const dbURL = "mongodb://localhost/User-API";

mongoose.connect(dbURL).then(() => {
    useMongoClient: true;

    Address.create(address_data)
    .then(address => {
        console.log(`All the addresses inserted`, `Address list: ${address}`);
        mongoose.disconnect();
    })
    .catch(err => {
        console.log(err);
    });
});