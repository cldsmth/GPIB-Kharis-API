module.exports.parseObjectToJSON = function(data) {
	return JSON.stringify(data);
}

module.exports.checkArray = function(data) {
	return Array.isArray(data) && data.length ? true : false;
}

module.exports.checkUndefined = function(data) {
	return typeof data !== "undefined" && data !== null ? true : false;
}

module.exports.BaseResponse = function(res, status, message) {
	return res.json({status: parseInt(status), message: message.toString()});
}

module.exports.ArrayResponse = function(res, status, message, data = array()) {
	return res.json({status: parseInt(status), message: message.toString(), data: data});
}