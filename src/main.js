import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/router.js";

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.min.css';
import axios from 'axios';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(vuetify);
app.use(router);

app.mount('#app');


