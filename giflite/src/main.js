import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// Vue.config.debug = true
// Vue.config.devtools = true
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = App.constructor

new Vue({
  render: h => h(App),
}).$mount('#app')
