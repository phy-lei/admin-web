import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router';
import 'element-plus/es/components/message/style/css'
import '@/styles/index.scss' // global css
import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount('#app')
