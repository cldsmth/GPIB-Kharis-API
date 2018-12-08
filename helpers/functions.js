module.exports.generate_code = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i<length; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text.toUpperCase();
}

module.exports.isEmpty = function(value) {
	return typeof value == "string" && !value.trim() || typeof value == "undefined" || value === null;
}

module.exports.isUndefined = function(data) {
	return typeof data !== "undefined" && data !== null ? false : true;
}

module.exports.parseObjectToJSON = function(data) {
	return JSON.stringify(data);
}

module.exports.checkArray = function(data) {
	return Array.isArray(data) && data.length ? true : false;
}

module.exports.BaseResponse = function(res, status, message) {
	return res.json({status: parseInt(status), message: message.toString()});
}

module.exports.ArrayResponse = function(res, status, message, data = array()) {
	return res.json({status: parseInt(status), message: message.toString(), data: data});
}