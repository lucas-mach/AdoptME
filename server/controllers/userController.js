const Pet = require('../models/petModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// Create account
const createUser = async (req, res) => {
    const {username, password, phone} = req.body
    
    try {
        const user = await User.create({username, password, phone})
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser
}