module.exports = (sequelize, DataTypes) => {
    
    // Create student object model for database
    let Student = sequelize.define('Student', {

        // Give student object attributes datatypes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
    // If force is true, table is dropped when app restarts, if false, it is not dropped
    // Sync student table and return logged message
    Student.sync({force: false}).then( () => {
        console.log('Synced student table')
    })

    return Student
}