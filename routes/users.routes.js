const express = require("express");
const router = express.Router();


router.get("/:id", (req, res, next) => {
  res.json({ mensaje: "estoy en users" });
});

module.exports = router;
