
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema( {
	
	email: String,
	username: String,
	password: String,
	wins: []
})

module.exports = mongoose.model('User', UserSchema);