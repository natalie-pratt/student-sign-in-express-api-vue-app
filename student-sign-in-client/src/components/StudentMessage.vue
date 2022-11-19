<template>
    <div v-if="student.name">
        <!-- If most recent student is checked as present, welcome them -->
        <div v-if="student.present" class="alert alert-success">
            Welcome, {{student.name}}!
        </div>

        <!-- If most recent student is checked as departing, say goodbye -->
        <div v-else class="alert alert-info">
            Goodbye, {{student.name}}. See you later!
        </div>
    </div>
</template>

<script>
export default {
    name: "StudentMessage",
    props: {
        student: Object
    }
}
</script>