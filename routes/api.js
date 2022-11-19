
// Import all needed information from index.js
let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

// Router to request and return all students 
router.get('/students', function(req, res, next) {
    Student.findAll({order: [
        'present',
        db.Sequelize.fn('lower', db.Sequelize.col('starID')) // Order by present, then case insensitive names
    ]}).then( students => {
        return res.json(students)
    }).catch(err => next(err))
})

// Router that will create ('post') a student object and return a message if successful
router.post('/students', function(req, res, next) {
    Student.create( req.body ).then( data => {
        return res.status(201).send('Successfully Created')
    }).catch(err => {
        // Handle user errors
        if (err instanceof db.Sequelize.ValidationError) {
            // Respond with 400 Bad Request code, and error messages
            let messages = err.errors.map(e => e.message)
            // Return JSON array of seqelize validation errors
            return res.status(400).json(messages) 
        }
        // Else, another issue has arisen
        // Send error to server.js to be handled
        return next(err)
    })
})

// Edit students (present/not present)
router.patch('/students/:id', function(req, res, next) {
    // If request is to students/100, studentID = 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent, {where: {id: studentID}})
        .then( (rowsModified) => {
            let numberOfRowsModified = rowsModified[0]
            if (numberOfRowsModified = 1) { // All good if 1 row modified
                return res.send('OKAY')
            } else { // If no rows are modified, alert user
                return res.status(404).json(["Student with that ID not found"])
            }
        })
        .catch(err => {
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map(e => e.message)
                return res.status(400).json(messages) // Send bad request error code if validation error occurs
            } else {
                // Unexpected error
                return next(err)
            } 
        }) 
})

// Delete students
router.delete('/students/:id', function(req, res, next) {
    let studentID = req.params.id
    Student.destroy({where: {id: studentID}})
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1) { // Show OKAY message if student found and deleted 
                return res.send('OKAY')
            } else {
                return res.status(404).json(['404 - Not Found']) // Show 404 message if student not found
            }
        })
        .catch(err => next(err)) // Unexpected error
})

// Export router to rest of program
module.exports = router