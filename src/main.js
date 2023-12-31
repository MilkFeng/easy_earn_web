import { createApp } from 'vue';

import App from './App.vue'

import vuetify from './plugins/vuetify.js';
import axios from './plugins/axios.js';
import router from './plugins/router.js';
import auth from './plugins/auth.js';
import store from './plugins/store';

// 剪切板
import VueClipboard from 'vue-clipboard2';

const app = createApp(App);

app.use(vuetify)
    .use(axios)
    .use(router)
    .use(auth)
    .use(store)
    .use(VueClipboard)
    .mount('#app');