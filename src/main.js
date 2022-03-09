import { createApp }        from 'vue'
import VueSweetalert2       from 'vue-sweetalert2';
import { abilitiesPlugin }  from '@casl/vue';
import abilities            from './Services/abilities';
import 'sweetalert2/dist/sweetalert2.min.css';

import App          from './App.vue'
import Router       from './Router'
import Services     from './Services'
import Store        from './Store'
// Importing Layout 
import Login        from './Layouts/Login'
import Default      from './Layouts/Default'
import Dashboard    from './Layouts/Dashboard'

createApp(App)
    .use(Router)
    .use(Store)
    .use(Services, Store)
    .use(VueSweetalert2)
    .use(abilitiesPlugin, abilities, {
        useGlobalProperties: true
    })
    // Layout Registration
    .component('Login'      , Login)
    .component('Default'    , Default)
    .component('Dashboard'  , Dashboard)
    // End Registration
    .mount('#app')
