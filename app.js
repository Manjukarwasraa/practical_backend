const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');

const authRoutes = require('./routes/auth.routes');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(()=>{
	console.log("Database is connected");
})


const app = express();

app.use(cors({
	origin : "http://localhost:3000", //frontend
	Credential: true
}
)); // this is used to connect frontend and backend annd cookies


app.use(cookieParser());
app.use(express.json());


app.use('/api/user', userRoutes);

app.use('/api/auth', authRoutes);

module.exports = app;

