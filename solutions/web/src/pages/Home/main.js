import Vue from 'vue'
import App from '/src/pages/Home/App.vue'
import vuetify from '../../plugins/vuetify'


Vue.config.productionTip = false

new Vue({
  vuetify,  
  render: (h) => h(App),
}).$mount('#app');