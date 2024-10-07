const Pet = require('../models/petModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// Create a pet and update the Owner's petIds array
const createPet = async (req, res) => {
    const {animal, breed, price, maturity, userId} = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({error: "No such userId"})
    }
    
    try {
        const user = await User.findById(userId)
        try {
            const pet = await Pet.create({animal, breed, price, maturity, owner: userId})
            user.pets.push(pet._id) // Push the pet's _id into the user's pets array
            await user.save()
            return res.status(200).json(pet) 
        } catch (error) {   // Pet not created successfully
            res.status(400).json({error: error.message})
        }
        
    } catch (error) {   // User not found
        res.status(401).json({error: error.message})
    }
}

// get all pets
const getPets = async (req, res) => {
    const pets = await Pet.find({}).sort({createdAt: -1})  // Sort by newest pet first
    res.status(200).json(pets)
}

// Get single pet by its petId
const getPet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such petId"})
    }

    const pet = await Pet.findById(id)

    if (!pet) {
        return res.status(404).json({error: "Pet not found"})
    }
    res.status(200).json(pet)
}

// Get all pets of the same species
const getAllPetsSameSpecies = async (req, res) => {
    const { animal } = req.body
    const pets = await Pet.find({animal}).sort({createdAt: 1})

    if (pets.length === 0) {
        return res.status(200).json({mssg: "No animals available of this species"})
    }
    res.status(200).json(pets)
}

// Delete a pet by its ID, also delete from User's pet array
const deletePet = async (req, res) => {
    const { userId, petId } = req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({error: "No such userId"})
    }

    if (!mongoose.Types.ObjectId.isValid(petId)) {
        return res.status(404).json({error: "No such petId"})
    }

    const user = await User.findById(userId)

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check if the pet belongs to the user
    const petIndex = user.pets.findIndex(pet => pet._id.toString() === petId);

    if (petIndex === -1) {
        return res.status(404).json({ message: "Pet not found for this user" });
    }

    // Remove the pet from the user's pets array
    user.pets.splice(petIndex, 1);
    await user.save(); // Save the updated user
    
    // delete pet itself
    const pet = Pet.findOneAndDelete({_id : petId})
        .then(result => {
            if (result) {   // A pet was found by id
                res.status(200).json({ message: 'Pet deleted successfully', deletedPet: result });
            } else {
                res.status(404).json({ message: 'Pet not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
    if (!pet) {
        return res.status(400).json({error: "no pet"})
    }
    res.status(200).json(pet)
}

// Update a pet only with values provided
const updatePet = async (req, res) => {
    const { petId } = req.body;
    
    // Construct the update object by only including non-null and non-undefined values
    const updateFields = {};
    
    // Check if these values are passed in, if not do not add to updateFields
    if (req.body.userId !== undefined && req.body.userId !== null) {
        updateFields.owner = req.body.userId;
    }
    if (req.body.animal !== undefined && req.body.animal !== null) {
        updateFields.animal = req.body.animal;
    }
    if (req.body.breed !== undefined && req.body.breed !== null) {
        updateFields.breed = req.body.breed;
    }
    if (req.body.price !== undefined && req.body.price !== null) {
        updateFields.price = req.body.price;
    }
    if (req.body.maturity !== undefined && req.body.maturity !== null) {
        updateFields.maturity = req.body.maturity;
    }

    try {
        // Perform the update only if there are fields to update
        const pet = await Pet.findOneAndUpdate({ _id: petId }, updateFields, { new: true });
        
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        return res.status(200).json(pet);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating pet', error });
    }
}

 
module.exports = {
    createPet,
    getPets,
    getPet,
    getAllPetsSameSpecies,
    deletePet,
    updatePet
}