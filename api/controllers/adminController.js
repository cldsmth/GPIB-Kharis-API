"use strict";
var functions = require("../../helpers/functions");
var PasswordHash = require("../../class/PasswordHash"), passwordHash = new PasswordHash();
var mongoose = require("mongoose"), Admin = mongoose.model("admins");

exports.login = function(req, res) {
	try{
		var body = req.body;
		var email = body.email;
		var password = body.password;
		getSalthHash(email).then(resolve => {
			var query = {
				email: email,
				password: passwordHash.getHashPassword(password, resolve)
			};
			var projection = {
				name: true,
				email: true,
				img: true,
				auth_code: true,
				status: true
			};
			Admin.findOne(query, projection, function(err, data) {
				if(err){
					functions.ArrayResponse(res, 400, "Error", err);
				}else{
					if(!functions.isUndefined(data)){
						if(data.status == 1){
							functions.ArrayResponse(res, 200, "Success", data);	
						}else{
							functions.BaseResponse(res, 401, "Your account has been inactive");
						}
					}else{
						functions.BaseResponse(res, 400, "Failed");
					}
				}
			});
		}).catch(reject => {
			functions.BaseResponse(res, 400, reject);
		});
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.change_password = function(req, res) {
	try{
		var body = req.body;
		var id = body.id;
		var new_password = body.new_password;
		var confirm_password = body.confirm_password;
		if(new_password == confirm_password){
			var passwords = passwordHash.saltHashPassword(new_password);
			var query = {
				_id: id
			};
			var field = {
				salt_hash: passwords.salt,
				password: passwords.password,
				timestamp: Date.now()
			};
			var projection = {
				salt_hash: 1,
				password: 1,
				status: 1
			};
			Admin.findOneAndUpdate(query, {$set: field}, {fields: projection, new: true}, function(err, data) {
				if(err){
					functions.ArrayResponse(res, 400, "Error", err);
				}else{
					if(!functions.isUndefined(data)){
						functions.BaseResponse(res, 200, "Success");
					}else{
						functions.BaseResponse(res, 400, "Failed");
					}
				}
			});
		}else{
			functions.BaseResponse(res, 401, "Confirm password does not match");
		}
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.get_all = function(req, res) {
	try{
		var size = 20;
		var page = req.params.page;
		var query = {};
		var projection = {
			name: true,
			email: true,
			img: true,
			status: true,
			timestamp: true,
			datetime: true
		};
		var options = {
			skip: size * (page - 1),
	    	limit: size
		};
		if(Number(page)){
			Admin.count(query, function(err_count, tot_count) {
		    	if(err_count){
					functions.ArrayResponse(res, 400, "Error", err_count);
				}else{
					Admin.find(query, projection, options).sort({datetime: -1}).exec(function(err, data) {
						if(err){
							functions.ArrayResponse(res, 400, "Error", err);
						}else{
							if(functions.checkArray(data)){
								var datas = {
									total_page: Math.ceil(tot_count / size),
									total_data: data.length,
									total_data_all: tot_count,
									remaining: tot_count - (((page-1) * size) + data.length),
									data: data
								};
								functions.ArrayResponse(res, 200, "Data Exist", datas);
							}else{
								functions.BaseResponse(res, 400, "No Data");
							}
						}
					});
				}
		    });
		}else{
			functions.BaseResponse(res, 401, "Invalid page number, should start with 1");
		}
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

exports.get_detail = function(req, res) {
	try{
		Admin.findById(req.params.id, function(err, data) {
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
		var body = req.body;
		body.auth_code = functions.generate_code(32);
		if(!functions.isEmpty(body.password)){
			var passwords = passwordHash.saltHashPassword(body.password);
			body.salt_hash = passwords.salt;
			body.password = passwords.password;
		}else{
			body.salt_hash = "";
			body.password = "";
		}
	 	var param = new Admin(body);
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
			name: 1,
			email: 1,
			img: 1,
			status: 1,
			timestamp: 1,
			datetime: 1
		};
		var body = req.body;
		body.timestamp = Date.now();
		Admin.findOneAndUpdate({_id: req.params.id}, body, {fields: projection, new: true}, function(err, data) {
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
	}catch(error){
		functions.BaseResponse(res, 400, error);
	}
};

function getSalthHash(email) {
	return new Promise(function(resolve, reject) {
		try{
			Admin.findOne({email: email}, {salt_hash: true}, function(err, data) {
				var value;
				if(err){
					value = ""; 
				}else{
					if(!functions.isUndefined(data)){
						value = data.salt_hash;
					}else{
						value = "";
					}
				}
				resolve(value);
			});
		}catch(error){
			reject(error);
		}
	});
};