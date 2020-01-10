require("dotenv").config();

const express = require("express");
const app = express();

// DB, middlewares, locals & debug
require("./configs/mongoose.config");
require("./configs/middlewares.config")(app);
require("./configs/preprocessor.config")(app);
require("./configs/locals.config")(app);
require("./configs/debug.config");

// Base URL's
app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));
app.use("/address", require("./routes/address"));

module.exports = app;
