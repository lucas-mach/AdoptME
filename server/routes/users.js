const express = require('express')
const router = express.Router()
const {
    createUser
} = require('../controllers/userController')

// GET ALL users
router.get('/', (req, res) => {
    res.json({mssg : "Got all users"})
})

// Get a SINGLE user
router.get('/:id', (req, res) => {
    res.json({mssg : `Got single user : ${req.params.id}`})
})

// Add a user
router.post('/create', createUser)


module.exports = router