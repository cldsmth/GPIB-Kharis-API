"use strict";
var functions = require("../../helpers/functions");
var mongoose = require("mongoose"), Category = mongoose.model("categories");

exports.get_all = function(req, res) {
	try{
		var query = {};
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
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.get_all_by_type = function(req, res) {
	try{
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
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.get_detail = function(req, res) {
	try{
		Category.findById(req.params.id, function(err, data) {
			if(err){
				functions.ArrayResponse(res, 400, "Error", err);
			}else{
				if(!functions.isUndefined(data)){
					functions.ArrayResponse(res, 200, "Data Exist", data);
				}else{
					functions.BaseResponse(res, 400, "No Data");
				}
			}
		});
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.insert_data = function(req, res) {
	try{
		var param = new Category(req.body);
		param.save(function(err, data) {
			if(err){
				functions.ArrayResponse(res, 400, "Error", err);
			}else{
				if(!functions.isUndefined(data)){
					functions.ArrayResponse(res, 200, "Success", data);
				}else{
					functions.BaseResponse(res, 400, "Failed");
				}
			}
		});
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.update_data = function(req, res) {
	try{
		var projection = {
			__v: 0
		}
		var body = req.body;
		body.timestamp = Date.now();
		Category.findOneAndUpdate({_id: req.params.id}, body, {fields: projection, new: true}, function(err, data) {
			if(err){
				functions.ArrayResponse(res, 400, "Error", err);
			}else{
				if(!functions.isUndefined(data)){
					functions.ArrayResponse(res, 200, "Success", data);
				}else{
					functions.BaseResponse(res, 400, "Failed");
				}
			}
		});
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.delete_data = function(req, res) {
	try{
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
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};