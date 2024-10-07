require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const petRoutes = require('./routes/pets')
const userRoutes = require('./routes/users')

// Express app
const app = express()


// Middleware
app.use(express.json()) 

app.use((req,res,next) => {
    console.log(req.path, req.method)   // Log anytime a endpoint is hit into console
    next()
})


// Routes
app.use('/api/pets', petRoutes)
app.use('/api/users', userRoutes)


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and Listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })














