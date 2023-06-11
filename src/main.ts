import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"
import ElementPlus from "element-plus";
import 'virtual:svg-icons-register'
import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import '@/styles/index.scss' // global css
import App from './App.vue'

const app = createApp(App);
app.component("svg-icon", SvgIcon);
app.use(ElementPlus)
app.use(router);
app.use(createPinia());
app.mount('#app')
