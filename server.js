var express = require("express"),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require("mongoose"),
	Category = require("./api/models/categoryModel"), //created model category here
	bodyParser = require("body-parser");

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gpib-api');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var categoryRoutes = require("./api/routes/categoryRoutes"); //importing category route
categoryRoutes(app); //register the category route

app.listen(port);
console.log("GPIB Kharis RESTful API server started on: " + port);