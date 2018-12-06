"use strict";
module.exports = function(app) {
	var admin = require("../controllers/adminController");

	app.route("/admin")
		.get(admin.get_all)
		.post(admin.insert_data);

	app.route("/admin/:id")
		.get(admin.get_detail)
		.put(admin.update_data)
		.delete(admin.delete_data);
}