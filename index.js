const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const app = express();

// app.use(methodOverride("_method"));
app.use(cookieparser());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
app.set("view engine", "ejs");
const home = require("./routes/home.js");

app.use("/", home);

app.listen(1089, () => console.log("Running at 1089"));
