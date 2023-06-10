import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router';
import 'virtual:svg-icons-register';
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

import 'element-plus/es/components/message/style/css'
import '@/styles/index.scss' // global css

import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import App from './App.vue'

const app = createApp(App);
app.component("svg-icon", SvgIcon);
app.use(router);
app.use(createPinia());
app.mount('#app')
