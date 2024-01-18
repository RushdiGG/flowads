var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
var expressLayouts = require("express-ejs-layouts");

var users = require("./routes/users.js");
var productfeeds = require("./routes/productfeeds.js");
var templates = require("./routes/templates.js");
var accounts = require("./routes/accounts.js");
var images = require("./routes/images.js");

var app = express();

var port = process.env.PORT || 5000;
var database = process.env.DB;

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/api/productfeeds", productfeeds);
app.use("/api/templates", templates);
app.use("/api/images", images);
app.use("/accounts", accounts);

app.use((req, res, next) => {
  res.send("API Server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
