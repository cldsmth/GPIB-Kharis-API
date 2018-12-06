"use strict";
var functions = require("../../helpers/functions");
var mongoose = require("mongoose"), Admin = mongoose.model("admins");

exports.get_all = function(req, res) {
	var projection = {
		name: true,
		email: true,
		img: true,
		status: true,
		timestamp: true,
		datetime: true
	};
	var options = {
		sort: {
			datetime: -1
		}
	};
	Admin.find({}, projection, options, function(err, data) {
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
	Admin.findById(req.params.id, function(err, data) {
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
	var param = new Admin(req.body);
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
	Admin.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
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
	Admin.deleteOne({_id: req.params.id}, function(err, data) {
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