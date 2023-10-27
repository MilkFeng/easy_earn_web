import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.min.css';


import {
    VStepper,
    VStepperHeader,
    VStepperActions,
    VStepperItem,
    VStepperWindow,
    VStepperWindowItem
} from 'vuetify/labs/VStepper';

import { md3 } from 'vuetify/blueprints';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  // theme: {
  //   defaultTheme: 'dark'
  // },
});

export default (app) => {
    app.use(vuetify);

    app.component('VStepper', VStepper)
        .component('VStepperHeader', VStepperHeader)
        .component('VStepperActions', VStepperActions)
        .component('VStepperItem', VStepperItem)
        .component('VStepperWindow', VStepperWindow)
        .component('VStepperWindowItem', VStepperWindowItem);
}