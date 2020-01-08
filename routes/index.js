const express = require("express");
const router = express.Router();


router.use("/users", require("./users.routes"));
router.use("/address", require("./address.routes"));

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
