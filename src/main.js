// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VTooltip from 'v-tooltip'

require('@fortawesome/fontawesome-free/js/all.js')
require('../node_modules/bulma/css/bulma.css')
require('@/assets/tooltip.css')

Vue.config.productionTip = false

Vue.use(VTooltip)
/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
