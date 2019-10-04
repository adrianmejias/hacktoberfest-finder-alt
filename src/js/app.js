// Require dependencies
window.Vue = require('vue');

// @url https://github.com/vuejs/vue-devtools
Vue.config.devtools = true;

// Create a Vue component
import App from './components/App';

// Create a Vue instance
const app = new Vue({
    el: '#app',

    components: { App }
});
