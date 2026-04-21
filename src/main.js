import { createApp } from 'vue'
import App from './App.vue'
import CoreUI from '@coreui/vue'
import '@coreui/coreui/dist/css/coreui.min.css'
import router from './router'
import "@/assets/font/Satoshi_Complete/Fonts/WEB/css/satoshi.css";
import '@/assets/css/main.css'
createApp(App).use(router).use(CoreUI).mount('#app')
