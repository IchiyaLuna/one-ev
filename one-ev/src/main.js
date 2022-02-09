import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ArgonDashboard from './plugins/argon-dashboard';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(store).use(router).use(ArgonDashboard)
  .mount('#app');
