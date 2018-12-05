"use strict";
module.exports = function(app) {
	var category = require("../controllers/categoryController");

	app.route("/category")
		.get(category.get_all)
		.post(category.insert_data);

	app.route("/category/:id")
		.get(category.get_detail)
		.put(category.update_data)
		.delete(category.delete_data);

	app.route("/category/list/:type")
		.get(category.get_all_by_type);
}