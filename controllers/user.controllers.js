const User = require('../models/user.model');
const middleware = require('../middleware/user.middleware');

const jwt = require('jsonwebtoken');

const getUser = (middleware, async(req, res)=>{
	try{
		const getUser = await User.find().select("-password");
	  return res.status(200).json({message:" All User: ", getUser});
	}
	catch(err){
		return res.status(500).json({message:"Server not found", error:err.message});
	}
	 
});

const getUserID = (middleware,  async(req, res)=>{
	try{
		const userId = req.params.id;
		const getUser = await User.findById(userId).select("-password");
		//.select("-password") => is used to remove password , when you hit the api then password didn't show.
		return res.status(200).json({message:"User found: ", getUser});
	}
	catch(err){
		return res.status(500).json({message:"Server not found", error:err.message});
	}
});

module.exports = {getUser, getUserID}

