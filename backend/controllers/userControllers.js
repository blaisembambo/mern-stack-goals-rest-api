const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    //verify if all the fields are filled in
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Fill in all the fields')
    }

    //verify if the email is already registered
    const isRegistered = await User.findOne({ email })
    
    if (isRegistered) {
        res.status(400)
        throw new Error("Email already registered");
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.create({ name, email, password:hashedPassword });

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(400)
        throw new Error('Mauvais identifiants')
    }


});

//generatetoken

const generateToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if (user && (await bcrypt.compare(password, user.password))) {

        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        });
        
    } else {
        res.status(400)
        throw new Error('Incorrect login credentials')
    }
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});


module.exports = { getMe, registerUser, loginUser };