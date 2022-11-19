<template>
    <tr v-bind:class="{present: student.present, absent: !student.present}">
        <td>{{student.name}}</td>
        <td>{{student.starID}}</td>
        <td>
            <input type="checkbox" 
                v-bind:checked="student.present" 
                v-on:change="arrivedOrLeft(student, $event.srcElement.checked)"> 
        </td>
        <!-- Only show delete button in table when user checks edit table box -->
        <td v-on:click="studentDeleted" v-show="edit">
            <img src="@/assets/delete-button-icon.png" id="delete-icon"></td>
    </tr>
</template>

<script>
export default {
    name: "StudentRow",
    props: {
        student: Object,
        edit: Boolean
    },
    methods: {
        arrivedOrLeft(student, present) { // Tell parent that a student has arrived/left based on change event of checkbox
            this.$emit('student-arrived-or-left', student, present)
        },
        studentDeleted() { // Ask to confirm whether user wants to delete student 
            if (confirm(`Delete ${this.student.name}?`)) {
                this.$emit('student-deleted', this.student) // If user clicks yes, alert parent to make the delete
            }
        }
    }
}
</script>

<style>
    .present {
        color: gray;
        font-style: italic;
    }

    .absent {
        color: black;
        font-weight: bold;
    }

    #delete-icon {
        height: 35px;
        width: auto;
    }
</style>