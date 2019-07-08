const express = require("express");
var router = express.Router();
var User = require("../model/userSchema");

router.post("/login", async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var response = await User.find({ email: email });

  if (response.password == password) {
    req.session.email = req.body.email;
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(500);
    res.end();
  }
});

router.get("/logout", function(req, res, next) {
  req.session.destroy();
  res.clearCookie("sid");
  res.writeHead(200);
  res.end();
});
module.exports = router;
