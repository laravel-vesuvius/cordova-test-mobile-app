import Auth from './services/auth'
import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import Routes from './routes.js'
import App from './App.vue'

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

Auth.setTokenCheck();

document.addEventListener('deviceready', function () {
  // Init App
  new Vue({
    el: '#app',
    template: '<app/>',
    // Init Framework7 by passing parameters here
    framework7: {
      root: '#app',
      /* Uncomment to enable Material theme: */
      material: true,
      routes: Routes,
      domCache: false
    },
    // Register App Component
    components: {
      app: App
    }
  });
}, false);
