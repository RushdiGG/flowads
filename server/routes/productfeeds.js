var express = require("express");
var bcrypt = require("bcryptjs");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var santize = require("mongo-sanitize");
let axios = require("axios");
var parseString = require("xml2js").parseString;
const CSV = require("csv-string");
const { create } = require("xmlbuilder2");
let { generateXml } = require("../modules/aws/generateXml.js");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

var Productfeeds = require("../models/productfeeds.js");

var router = express.Router();
router.use(cors());

var required_fields = ["id", "title", "price", "link", "image_link"];

router.get("/", async (req, res, next) => {
  try {
    let feeds = await Productfeeds.find({});
    res.send(feeds);
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/", async (req, res, next) => {
  try {
    let cb = (success) => {
      res.send(success ? "all good" : "failed");
    };
    let url = req.body.url;
    let title = req.body.title;
    axios.get(url).then((fileRes) => {
      let format = feedFormat(fileRes);
      if (!format) {
        cb(false);
      }
      switch (format) {
        case "xml":
          feedFromXML(fileRes.data, url, title, cb);
          break;
        case "csv":
          feedFromCSV(fileRes.data, url, title, cb);
          break;
        default:
          cb(false);
          break;
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/:id/generate", async (req, res, next) => {
  try {
    let productfeed = await Productfeeds.findById(req.params.id);
    if (!productfeed) return res.json("No productfeed with that id");
    let products = productfeed.products
      .filter((p) => p.is_active)
      .map((product, i) => {
        return {
          ...product,
          image_link: `http://flowads-api.eu-north-1.elasticbeanstalk.com/api/images/generate?template=${req.body.template}&productfeed=${req.body.productfeedId}&product=${product.id}`,
        };
      });
    const headers = productfeed.productfields;
    console.log(headers);
    console.log(products);
    const root = create({ version: "1.0" })
      .ele("root", { att: "val" })
      .ele("foo")
      .ele("bar")
      .txt("foobar")
      .up()
      .up()
      .ele("baz")
      .up()
      .up();

    // convert the XML tree to string
    const xml = root.end({ prettyPrint: true });

    let result = await generateXml(req, res, xml);
    console.log(result);
    if (!result) return res.status(500).send("Fail");
    productfeed.adfeeds.push(result);
    await productfeed.save();
    res.status(201).send(result);
  } catch (err) {
    res.json({ error: err });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let productfeed = await Productfeeds.findById(req.params.id);
    productfeed.products = req.body;
    await productfeed.save();
    res.send("Updated");
  } catch (err) {
    res.json({ error: err });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    let result = await Productfeeds.deleteOne({ _id: req.body.id });
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

function feedFormat(res) {
  let type = res.headers["content-type"];
  if (!type) false;
  if (type.includes("application/xml")) {
    console.log("its a xml");
    return "xml";
  } else if (type.includes("text/csv")) {
    console.log("its a csv");
    return "csv";
  } else {
    console.log("unknown file format");
    return false;
  }
}

function feedFromXML(xml, url, title, cb) {
  try {
    if (!xml) cb(false);
    parseString(xml, async (err, result) => {
      let newFeed = new Productfeeds();
      newFeed.title = title;
      newFeed.productfields = ["title", "image_link"];
      newFeed.link = url;
      newFeed.products = result.feed.entry.map((product) => {
        return {
          title: product["g:title"][0],
          image_link: product["g:image_link"][0],
          is_active: false,
        };
      });
      newFeed.save();
      cb(true);
    });
  } catch (e) {
    console.log(e);
    cb(false);
  }
}

function feedFromCSV(csv, url, title, cb) {
  try {
    if (!csv) cb(false);
    let parsedCsv = CSV.parse(csv);
    let hObj = {};
    let headers = parsedCsv.shift();
    headers.map((header, i) => {
      hObj[header] = i;
    });
    let newFeed = new Productfeeds();
    newFeed.title = title;
    newFeed.productfields = headers;
    newFeed.link = url;
    newFeed.products = parsedCsv.map((row) => {
      let product = { is_active: false };
      for (let i = 0; i < headers.length; i++) {
        let field = headers[i];
        let index = hObj[field];
        product[field] = row[index];
      }
      return product;
    });
    newFeed.save();
    cb(true);
  } catch (e) {
    console.log(e);
    cb(false);
  }
}

function CSVtoArray(text) {
  var re_valid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value =
    /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;

  var a = []; // Initialize array to receive values.
  text.replace(
    re_value, // "Walk" the string using replace with callback.
    function (m0, m1, m2, m3) {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return ""; // Return empty string.
    }
  );

  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push("");
  return a;
}

module.exports = router;
