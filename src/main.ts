import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
//import VueRouter from  'vue-router'

const app = createApp(App)
//app.config.globalProperties.resoursePath = 'https://jsonplaceholder.typicode.com/'

app.use(createPinia()) // Create the root store
app.use(router)

app.mount('#app')
