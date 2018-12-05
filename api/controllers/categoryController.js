"use strict";
var mongoose = require("mongoose"), Category = mongoose.model("categories");

exports.get_all = function(req, res) {
	Category.find({}, function(err, data) {
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
};

exports.insert_data = function(req, res) {
	var param = new Category(req.body);
	param.save(function(err, data) {
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
};

exports.get_detail = function(req, res) {
	Category.findById(req.params.id, function(err, data) {
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
};

exports.update_data = function(req, res) {
	Category.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
};

exports.delete_data = function(req, res) {
	Category.remove({_id: req.params.id}, function(err, data) {
		if(err){
			res.send(err);
		}else{
			res.json({message: "Category successfully deleted"});
		}
	});
};

exports.get_all_by_type = function(req, res) {
	Category.find({type: req.params.type}, function(err, data) {
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
};