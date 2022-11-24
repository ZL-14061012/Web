import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const a = createApp(App)

// app1.use(createPinia())
// app1.use(router)

a.mount('#app')
