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

import { VStepper } from 'vuetify/labs/VStepper';

import { md3 } from 'vuetify/blueprints';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  // theme: {
  //   defaultTheme: 'dark'
  // },
});

const app = createApp(App);

app.component('VStepper', VStepper);

app.config.globalProperties.$axios = axios;

app.use(vuetify);
app.use(router);

app.mount('#app');


