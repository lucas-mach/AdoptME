const express = require('express')
const router = express.Router()
const {
    createPet,
    getPets,
    getPet,
    getAllPetsSameSpecies,
    deletePet,
    updatePet,
} = require('../controllers/petController')

// Get all pets of same species specified
router.get('/allpets-same-species', getAllPetsSameSpecies)

// GET ALL pets
router.get('/allpets', getPets)

// Get a SINGLE pet
router.get('/getpet/:id', getPet)

// Create a pet and update the Owner's petIds array
router.post('/add', createPet)

// Delete a pet
router.delete('/deletePet', deletePet)

// Update a pet
router.patch('/update', updatePet)

module.exports = router