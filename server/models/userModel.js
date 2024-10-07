const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: "unspecified"
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }] // Reference to Pet model

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)

