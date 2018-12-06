"use strict";
var functions = require("../../helpers/functions");
var mongoose = require("mongoose"), Category = mongoose.model("categories");

exports.get_all = function(req, res) {
	var projection = {
		title: true,
		type: true,
		status: true,
		timestamp: true,
		datetime: true
	};
	var options = {
		sort: {
			title: 1
		}
	};
	Category.find({}, projection, options, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 400, "Error", err);
		}else{
			if(functions.checkArray(data)){
				functions.ArrayResponse(res, 200, "Data Exist", data);
			}else{
				functions.BaseResponse(res, 400, "No Data");
			}
		}
	});
};

exports.get_all_by_type = function(req, res) {
	var query = {
		type: req.params.type
	};
	var projection = {
		title: true,
		status: true,
		timestamp: true,
		datetime: true
	};
	var options = {
		sort: {
			title: 1
		}
	};
	Category.find(query, projection, options, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 400, "Error", err);
		}else{
			if(functions.checkArray(data)){
				functions.ArrayResponse(res, 200, "Data Exist", data);
			}else{
				functions.BaseResponse(res, 400, "No Data");
			}
		}
	});
};

exports.get_detail = function(req, res) {
	Category.findById(req.params.id, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 400, "Error", err);
		}else{
			if(functions.checkUndefined(data)){
				functions.ArrayResponse(res, 200, "Data Exist", data);
			}else{
				functions.BaseResponse(res, 400, "No Data");
			}
		}
	});
};

exports.insert_data = function(req, res) {
	var param = new Category(req.body);
	param.save(function(err, data) {
		if(err){
			functions.ArrayResponse(res, 400, "Error", err);
		}else{
			if(functions.checkUndefined(data)){
				functions.ArrayResponse(res, 200, "Success", data);
			}else{
				functions.BaseResponse(res, 400, "Failed");
			}
		}
	});
};

exports.update_data = function(req, res) {
	Category.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 400, "Error", err);
		}else{
			if(functions.checkUndefined(data)){
				functions.ArrayResponse(res, 200, "Success", data);
			}else{
				functions.BaseResponse(res, 400, "Failed");
			}
		}
	});
};

exports.delete_data = function(req, res) {
	Category.deleteOne({_id: req.params.id}, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 400, "Error", err);
		}else{
			if(data.n >= 1){
				functions.BaseResponse(res, 200, "Success");
			}else{
				functions.BaseResponse(res, 400, "Failed");
			}
		}
	});
};