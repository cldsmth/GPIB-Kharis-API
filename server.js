var express = require("express"),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require("mongoose"),
	Category = require("./api/models/categoryModel"), //created model category here
	Admin = require("./api/models/adminModel"), //created model admin here
	bodyParser = require("body-parser"),
	cors = require("cors");
	
global.__basedir = __dirname;

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gpib-api');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); //for parsing application/xwww-form-urlencoded
app.use(cors()); //cross origin

var categoryRoutes = require("./api/routes/categoryRoutes"); //importing category route
var adminRoutes = require("./api/routes/adminRoutes"); //importing admin route
categoryRoutes(app); //register the category route
adminRoutes(app); //register the admin route

app.listen(port);
console.log("GPIB Kharis RESTful API server started on: " + port);

app.use(function(req, res) {
  res.status(404).send({status: 404, message: req.originalUrl + " not found"});
});