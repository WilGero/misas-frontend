import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// para bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'popper.js';
import 'jquery';

// para fontawesome
import '@fortawesome/fontawesome-free/css/all.css';

//para axios
// import axios from 'axios';

// axios.defaults.baseURL = 'https://localhost:5050/';
createApp(App).use(router).mount('#app')
