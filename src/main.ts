import { createApp } from 'vue';
import pinia from '@/stores';
import App from './App.vue';
// reset style sheet
import '@/styles/reset.scss';
// CSS common style sheet
import '@/styles/common.scss';

import 'virtual:svg-icons-register';

// element css
import 'element-plus/dist/index.css';
// custom element dark css
import '@/styles/theme/element-dark.scss';
// custom element css
import '@/styles/element.scss';
import ElementPlus from 'element-plus';
// element icons
import * as Icons from '@element-plus/icons-vue';
import router from '@/router';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

// register the element Icons component

const app = createApp(App);
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.component('SvgIcon', SvgIcon);

app.use(ElementPlus).use(router).use(pinia).mount('#app');
