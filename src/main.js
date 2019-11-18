// 入口文件
console.log('OK')
import Vue from 'vue'
// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)
// 导入axios包
import axios from 'axios'
// 将axios绑定到Vue的原型上 通过this.$axios
Vue.prototype.$axios=axios

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刷新重新加载的时候 在刚调用的时候先从本地的存储中 把购物车的数据读出来 放到store中 本地持久化存储
var car= JSON.parse(localStorage.getItem('car')||'[]')

var store =new Vuex.Store({
    state:{ //this.$store.state.***
        car:car  //将 购物车中的商品数据，用一个数组存储起来，在car数组中
        // 存储一些商品的对象 {id：商品的id，count：要购买的数量，price：上平的单价，selected：true}

    },
    mutations:{ //this.$store.commit('方法的名称','按需传递唯一的参数')
        // 点击加入购物车，把商品信息保存到store 中的car 上
        // 分析
        // 1 如果购物车中之前已经有了对应商品的信息，那么只需要跟新数量
        // 2.如果没有，则直接把商品数据 push 到car即可

       
        addTocar(state,goodsinfo){
            var flag=false

            state.car.some(item=>{
            if(item.id===goodsinfo.id){
                item.count+=parseInt(goodsinfo.count)
                flag=true
                return true
            }
        })
        if(!flag){
            state.car.push(goodsinfo)
        }

        // 当更新 car 之后 把car 数组 ，存储到本地localStorage中
        localStorage.setItem('car',JSON.stringify(state.car))
        }
       
        
    },
    getters:{ //this.$store.getters.***
        // 相当于计算属性，也相当于fulters
        getAllCount:function(state) {
            var c= 0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        }
    }
})

// 导入时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
   return moment(dataStr).format(pattern)
})

// 2.1导入vue.resource
import VueResource from 'vue-resource'
// 2.2安装vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root='http://www.liulongbin.top:3005/'
// 导入mint-ui组件
// import {
//     Header,
//     Swipe,
//     SwipeItem,
//     Button
// } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


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
    store //挂载store
})