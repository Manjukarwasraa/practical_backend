const mongoose = require('mongoose');

const newUser = new mongoose.Schema(
	{
		name:{
			type: String,
			required: true
		},
		email :{
			type: String,
			required: true,
			unique: true,
			lowercase : true
		},
		password:{
			type: String,
			required: true
		},
		createdAt:{
			type: Date,
			default: Date.now
		}
	},
	{timestamps:true}
);

const User = mongoose.model("user", newUser);

module.exports = User;