var express = require("express");
var bcrypt = require("bcryptjs");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var santize = require("mongo-sanitize");
let axios = require("axios");
var parseString = require("xml2js").parseString;
var ObjectId = require("mongoose").Types.ObjectId;

var Templates = require("../models/templates.js");

var router = express.Router();
router.use(cors());

router.get("/", async (req, res, next) => {
  try {
    let templates = await Templates.find({});
    res.send(templates);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let template = await Templates.findById(req.params.id);
    if (template) {
      res.send(template);
    } else {
      res.send("No template with that id");
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newTemplate = new Templates();
    newTemplate.title = req.body.title;
    newTemplate.canvas = {};
    await newTemplate.save();
    res.send({ id: newTemplate._id });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    let template = await Templates.findById(req.params.id);
    template.canvas = req.body;
    console.log(req.body);
    template.save();
    res.send("Template " + req.params.id + " updated");
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    let result = await Templates.deleteOne({ _id: req.body.id });
    let deleted = result.deletedCount;
    if (deleted) {
      res.send("Deleted");
    } else {
      res.send("No feed with that id");
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
