import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/route'


Vue.config.productionTip = false
Vue.use(router)

new Vue({
  vuetify,
  router,  
  render: (h) => h(App),
}).$mount('#app');