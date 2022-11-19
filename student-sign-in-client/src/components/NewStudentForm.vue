<template>
    <div>
        <div class="alert alert-danger" v-if="errors.length > 0">
            <ul>
                <li v-for="error in errors" v-bind:key="error">{{error}}</li>
            </ul>
        </div>

        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <!-- v-model newStudentName -->
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <!-- v-model newStarID -->
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>
            <!-- v-on:click event handler -->
            <button class="btn btn-primary" v-on:click="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewStudentForm',
    emits:['student-added'],
    data() {
        return {
            newStudentName: '',
            newStarID: '',
            errors: []
        }
    },
    methods: {
        addStudent() {
            this.errors = [] // Clear errors array

            if (!this.newStudentName) { // If there is no name, push error message
                this.errors.push('Student name must be entered')
            } 

            if (!this.newStarID) { // If there is no starID, push error message
                this.errors.push("StarID must be entered")
            }

            if (this.errors.length == 0) { // If there are no validation errors, add new student
                let student = {
                    name: this.newStudentName, 
                    starID: this.newStarID, 
                    present: false
                    
                }

                this.$emit('student-added', student) // Tell parent that student was added and send student information
                
                this.newStudentName = '' // Clear form inputs
                this.newStarID = ''
            } 
        }
    }
}
</script>

