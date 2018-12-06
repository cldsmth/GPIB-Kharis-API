"use strict";
var functions = require("../../helpers/functions");
var mongoose = require("mongoose"), Category = mongoose.model("categories");

exports.get_all = function(req, res) {
	Category.find({}, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 404, "Error", err);
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
	Category.find({type: req.params.type}, function(err, data) {
		if(err){
			functions.ArrayResponse(res, 404, "Error", err);
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
			functions.ArrayResponse(res, 404, "Error", err);
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
			functions.ArrayResponse(res, 404, "Error", err);
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
			functions.ArrayResponse(res, 404, "Error", err);
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
			functions.ArrayResponse(res, 404, "Error", err);
		}else{
			if(data.n >= 1){
				functions.BaseResponse(res, 200, "Success");
			}else{
				functions.BaseResponse(res, 400, "Failed");
			}
		}
	});
};