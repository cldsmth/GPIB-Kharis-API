"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	title: {
		type: String,
		required: "Kindly enter the title of the category"
	},
	slug: {
		type: String,
		required: "Slug is required"
	},
	type: {
		type: [{
			type: String,
			enum: ['article', 'event']
		}],
		required: "Type is required"
	},
	status: {
		type: Number,
		default: 0
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	datetime: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("categories", CategorySchema);