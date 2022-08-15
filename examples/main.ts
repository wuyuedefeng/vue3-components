import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueComponents from '../packages'

const app = createApp(App)
app.use(router)
app.use(VueComponents)
app.mount('#app')
