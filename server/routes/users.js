var express = require("express");
var bcrypt = require("bcryptjs");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var santize = require("mongo-sanitize");

var router = express.Router();
router.use(cors());

var Users = require("../models/users.js");

router.get("/test", (req, res, next) => {
  res.json({ test: "test" });
});

router.post("/register", (req, res, next) => {
  var userData = {
    name: santize(req.body.name),
    email: santize(req.body.email),
    password: santize(req.body.password),
    created: new Date(),
  };

  Users.findOne({ email: userData.email }).then((user) => {
    if (!user) {
      bcrypt.hash(userData.password, 10, (err, hash) => {
        userData.password = hash;
        var newUser = new Users(userData);
        newUser.save((err) => {
          if (!err) {
            res.json({ status: "ok" });
          } else {
            res.status(400).json({ status: "error", message: "Database error, please try again." });
          }
        });
      });
    } else {
      res.status(400).json({ status: "error", message: "User already exists" });
    }
  });
});

router.post("/login", (req, res, next) => {
  Users.findOne({ email: santize(req.body.email) })
    .then((user) => {
      if (user && req.body.password) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          var token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, "SRS_SECRET_KEY", {
            expiresIn: 1440,
          });
          res.json({ status: "ok", token: token });
        } else {
          res
            .status(400)
            .json({
              stats: "error",
              message: "Sorry, the email and password you entered do not match. Please try again.",
            });
        }
      } else {
        res
          .status(400)
          .json({
            status: "error",
            message: "Sorry, the email and password you entered do not match. Please try again.",
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: err });
    });
});

module.exports = router;
