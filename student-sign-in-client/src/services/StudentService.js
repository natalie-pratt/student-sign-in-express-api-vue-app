
import axios from 'axios'

// Base URL for api call
let base_url = '/api/students' 

export default {
    
    // Function to retrive (GET) list of students from API
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    // Function to add (POST) student to API
    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    // Function to update (patch) student data 
    updateStudent(student) {
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },

    // Function to delete student data
    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}