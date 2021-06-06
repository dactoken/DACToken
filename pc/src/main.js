// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'

Vue.use(ElementUI)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: require('./language/zh'), // 中文语言包
    en: require('./language/en'), // 英文语言包
    jp: require('./language/jp'), // 日语语言包
    kn: require('./language/kn'), // 韩语语语言包
    e: require('./language/e') // 俄语语言包
  }
})
localStorage.setItem('Language', 'zh')
Vue.config.productionTip = false

import Web3 from 'web3'
Vue.prototype.Web3 = Web3
// 定义时间格式全局过滤器
import moment from 'moment'
Vue.filter('dateFormat', function(daraStr, pattern = 'HH:mm:ss') {
  return moment(daraStr).format(pattern)
})
// if (location.host.indexOf('localhost') == -1) {
//     window.console.log = () => {}
// }
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
