// Require dependencies
window.Vue = require('vue');
window.Bus = new Vue;

// Configure Vue
Vue.config.productionTip = process.env.NODE_ENV === 'development';

// @url https://github.com/vuejs/vue-devtools
Vue.config.devtools = process.env.NODE_ENV === 'development';

// Create a Vue component
import App from './components/App';

// Create a Vue instance
new Vue({
    render: h => h(App)
}).$mount('#app');
