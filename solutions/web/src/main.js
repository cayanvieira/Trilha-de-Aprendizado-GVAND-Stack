import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/route'
import { createProvider } from './vue-apollo'
import VueApollo from 'vue-apollo'
import 'regenerator-runtime/runtime'


Vue.config.productionTip = false
Vue.use(router)
Vue.use(VueApollo)

new Vue({
  vuetify,
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount('#app');