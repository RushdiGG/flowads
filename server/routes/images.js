var express = require("express");
var cors = require("cors");
let { handleUploadMiddleware } = require("../modules/aws/awsUpload.js");

const fabric = require("fabric").fabric;
require("../modules/FlowadsCanvas.js");

var Productfeeds = require("../models/productfeeds.js");
var Templates = require("../models/templates.js");
var Images = require("../models/images.js");

var router = express.Router();
router.use(cors());

// Accept maximum 1 file
router.post(
  "/upload",
  handleUploadMiddleware.array("input_files", 1),
  async (req, res, next) => {
    console.log(req);
    res.status(200);
    let image = new Images();
    image.url = req.files[0].location;
    image.width = req.body.width;
    // height: req.body.height
    image.save();
    return res.json({
      msg: "Uploaded!",
      url: image.url,
    });
  }
);

router.get("/", async (req, res, next) => {
  res.status(200);
  let images = await Images.find();
  return res.json({
    images: images,
  });
});

router.get("/generate", async (req, res, next) => {
  try {
    let feed = await Productfeeds.findById(req.query.productfeed);
    let template = await Templates.findById(req.query.template);
    let product = feed.products.filter((p) => p.id == req.query.product);
    if (product.length < 1)
      return res.send("No product/template/feed with that id");
    let fabricCanvas = new fabric.StaticCanvas("canvas", {
      height: 1080,
      width: 1080,
    });
    fabric.nodeCanvas.registerFont(__dirname + "/fonts/Roboto-Regular.ttf", {
      family: "Roboto",
      weight: "regular",
      style: "normal",
    });
    fabric.nodeCanvas.registerFont(__dirname + "/fonts/Roboto-Bold.ttf", {
      family: "Roboto",
      weight: "bold",
      style: "normal",
    });
    // console.log(product);
    fabricCanvas.loadFromJSON(template.canvas, () => {
      fabricCanvas.changeProduct(product[0], () => {
        let url = fabricCanvas.toDataURL({ format: "png", quality: 0.8 });
        if (req.query.preview) {
          res.render("generator", { dataURL: url });
        } else {
          var data = url.replace(/^data:image\/png;base64,/, "");
          var img = Buffer.from(data, "base64");

          res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length,
          });
          res.end(img);
        }
      });
    });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
