<template>
  <div id="app">
      <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
      <student-table 
        v-bind:students="students" 
        v-on:student-arrived-or-left="studentArrivedOrLeft"
        v-on:student-deleted="studentDeleted">
      </student-table>
      <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>

import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  }, 
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    // Load all students - make request to API
    this.updateStudents() // Call update students method
  }, 
  methods: {
    updateStudents() { // Get most recent list of students
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      }).catch( () => alert('Unable to fetch student list'))
    },
    newStudentAdded(student) { // Method called when new student is added
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents() // Call method to update students with the student object data
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding student:\n' + msg)
      })
    },
    studentArrivedOrLeft(student, present) { // Method  called when 'present' checkbox is checked/unchecked
      student.present = present // Update student's present value 
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( () => alert('Unable to update student'))
    }, 
    studentDeleted(student) { // Method called when user clicks delete for chosen student
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} // Clear welcome/goodbye message
      }).catch( () => alert('Unable to delete student'))
    }    
  }
}
</script>

<style>

  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";

</style>
