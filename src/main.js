// 入口文件
console.log('OK')
import Vue from 'vue'
// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)

// 导入时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat',function(dataStr,patter="YYYY-MM-DD HH:mm:ss"){
    moment(dataStr).format(patter)
})

// 2.1导入vue.resource
import VueResource from 'vue-resource'
// 2.2安装vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root=''
// 导入mint-ui组件
import {
    Header,
    Swipe,
    SwipeItem,
    Button
} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);


// 导入mui 
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 导入App根组件
import app from './App.vue'

// 导入自己的router.js 路由模块
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
})