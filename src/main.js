import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vxe-table/lib/style.css'
import VXETable, {Column, Input} from 'vxe-table'
Vue.use(VXETable).use(Column).use(Input)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
