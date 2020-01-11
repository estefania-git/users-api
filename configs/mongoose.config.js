const mongoose = require("mongoose");

const dbURL = "mongodb+srv://User-API:Caramelo321@cluster0-kvcfs.mongodb.net/User-APIS?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

module.exports = mongoose;
