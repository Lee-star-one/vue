// 入口文件
console.log('OK')
import Vue from 'vue'

// 导入mint-ui组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

// 导入mui 
import  './lib/mui/css/mui.css'

// 导入App根组件
import app from './App.vue'

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
})