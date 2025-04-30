import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

createApp(App).mount('#app')

App.use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions);
