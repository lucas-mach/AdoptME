const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petSchema = new Schema({
    animal: {   
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: false,
        default: "unspecified"
    },
    price: {
        type: Number,
        required: false,
        default: 0
    },
    maturity: { // baby, teen, adult, elder
        type: String,
        required: false,
        default: "unspecified"
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} // Reference to User model
    
}, { timestamps: true })

module.exports = mongoose.model('Pet', petSchema)

