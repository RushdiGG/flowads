var express = require("express");
var bcrypt = require("bcryptjs");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var santize = require("mongo-sanitize");

var router = express.Router();
router.use(cors());

var Accounts = require("../models/accounts.js");

router.get("/test", (req, res, next) => {
  res.json({ test: "test" });
});

router.post("/", (req, res, next) => {
  var accountData = {
    name: santize(req.body.name),
    fb_id: santize(req.body.fb_id),
  };

  Accounts.findOne({ fb_id: accountData.fb_id }).then((user) => {
    if (!user) {
      var newAccount = new Accounts(accountData);
      newAccount.save((err) => {
        if (!err) {
          res.json({ status: "ok" });
        } else {
          res.status(400).json({ status: "error", message: "Database error, please try again." });
        }
      });
    } else {
      res.status(400).json({ status: "error", message: "Account already exists" });
    }
  });
});

module.exports = router;
