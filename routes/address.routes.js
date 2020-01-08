const express = require("express");
const router = express.Router();

router.get("/all", (req, res, next) => {
  res.json({ mensaje: "estoy en address" });
});

module.exports = router;
