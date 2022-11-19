let express = require('express')
let api_routes = require('./routes/api')

// Create web application
let app = express() 

// Let app know to decipher JSON correctly, and convert data to JS
app.use(express.json())

app.use('/api', api_routes)

// Code will run if previous line doesn't run
// For instance, if user attempts to make an invalid/not found URL/API call
app.use(function(req, res, next) { 
    // Respond with 404 error and message below to invalid (for this server) requests
    res.status(404).send('404 - Not found')
})

// Error handling
app.use(function(err, req, res, next) {
    console.err(err.stack)
    res.status(500).send('500 - Server error')
})

// Run server either on preconfigured port or port 3000
let server = app.listen(process.env.PORT || 3000, function() { 
    // Message to alert developer which port Express server is running on
    console.log('Express server running on port ', server.address().port)
})