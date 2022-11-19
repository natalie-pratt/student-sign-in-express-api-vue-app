import { createApp } from 'vue'
import App from './App.vue'
import StudentService from '@/services/StudentService.js'

let app = createApp(App)

// Create new student service global property
app.config.globalProperties.$student_api = StudentService

app.mount('#app')