const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const createUser = async(req, res)=>{
	try{
		const {name, email, password} = req.body;

		if(!name || !email || !password){
			return res.status(400).json({message:"All field are required"})
		}

		const existUser = await User.findOne({email});
		if(existUser){
			return res.status(400).json({message: "User email is already exist"});
		}

	  const hashedPassword = await bcrypt.hash(password, 10);
	  const newUser = new User({
			name,
		  email,
		  password : hashedPassword
	  });

		await newUser.save();

		const userResponse = {
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			createdAt: newUser.createdAt
		}
		return res.status(201).json({message:"User created successfully!!", User:userResponse});
	  
	}
	catch(err){
		return res.status(500).json({message:"Server not found", error:err.message});
	}
};

const loginUser = async(req, res)=>{
	try{
		const {email, password} = req.body;

	  if(!email || !password){
		 return res.status(400).json({message:"Email and password are required"})
	  } 

	  const user = await User.findOne({email})
	  if(!user){
		 return res.status(400).json({message:"Invaild email"});
	  }

	  const existPassword = await bcrypt.compare(password, user.password);

	  if(!existPassword){
		 return res.status(400).json({message:"Invalid Password"});
	  }
		 //return res.status(200).json({message:"Login successfully!!", user:{_id:user._id, name:user.name, email:user.email}});

		 //jwt.sign => uses only in logi api to create a new token
		const tokenData = jwt.sign(
			{
				_id : user._id
		  },
			process.env.JWT_SECRET_KEY, 
			{expiresIn: "10d"}
	  );

		res.cookie("token", tokenData, {
			httpOnly : true,
			secure: false,
			sameSite: "lax",
			maxAge : 10 * 24 * 60 * 60* 1000
		})

		const userResponse = {
			_id: user._id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt
		}
		return res.status(200).json({message:"Login successfully!!", userResponse, tokenData})
	}
	catch(err){
		return res.status(500).json({message:"Server not found", error:err.message});
	}
	
};

module.exports = {createUser, loginUser};

