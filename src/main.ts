import './assets/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import FontAwesomeIcon from '@/utils/fontAwesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-aw', FontAwesomeIcon)

app.mount('#app')
