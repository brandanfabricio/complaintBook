import { createApp } from 'vue'
import App from './App.vue'
import CoreUI from '@coreui/vue'
import '@coreui/coreui/dist/css/coreui.min.css'
import router from './router'

createApp(App).use(router).use(CoreUI).mount('#app')
