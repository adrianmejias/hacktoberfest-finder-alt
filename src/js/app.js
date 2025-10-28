// Import Vue 3
import { createApp } from 'vue';
import mitt from 'mitt';

// Create a Vue component
import App from "./components/App.vue";

// Create the emitter
const emitter = mitt();

// Create a Vue instance
const app = createApp(App);
app.provide('emitter', emitter);
app.mount("#app");
