
let { Sequelize, DataTypes } = require('sequelize') // Import Sequelize and DataTypes from sequalize library

// Environment variable - globally stored computer variable
let env = process.env.NODE_ENV || 'development' // Set default environment variable if nothing is already chosen

console.log('Using ' + '"' + env + '"' + ' environment')

// Import config.js
let configFile = require(__dirname + '/../config.json')
let config = configFile[env] // Config is set to either 'development' or 'production'

let password = process.env.DB_PASSWORD // Undefined locally, not needed with sqlite. Is needed for Azure
config.password = password

let db = {} // Database object - undefined upon instantiation

let sequalize = new Sequelize(config) // New sequalize variable using configuration

let studentModelCreate = require('./student') // Function definition
let studentModel = studentModelCreate(sequalize, DataTypes)
 
db[studentModel.name] = studentModel

db.sequalize = sequalize // Sequalize configuration
db.Sequelize = Sequelize // Sequalize library

module.exports = db // Export database object