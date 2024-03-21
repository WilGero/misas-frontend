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

import store from './store'

//para axios
import axios from 'axios';
import VueAxios  from 'vue-axios';

// axios.defaults.withCredentials=true;
// Configurar Axios para incluir el token en las solicitudes
axios.defaults.baseURL = 'http://localhost:5050/';

createApp(App).use(VueAxios,axios).use(store).use(router).mount('#app')
