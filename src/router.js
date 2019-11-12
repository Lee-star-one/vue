// 路由入口文件
import VueRouter from 'vue-router'

// 导入模块
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import shopcarContainer from './components/tabber/shopcarContainer.vue'
import searchContainer from './components/tabber/searchContainer.vue'
import commentsContainer from './components/homes/commentsContainer.vue'
import commodityContainer from './components/homes/commodityContainer.vue'
import newsContainer from './components/homes/newsContainer.vue'
import newsinfo from './components/homes/subcom/news.vue'
import pictureContainer from './components/homes/pictureContainer.vue'



// 3. 创建路由对象
var router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/shopcar',
      component: shopcarContainer
    },
    {
      path: '/search',
      component: searchContainer
    },
    {
      path: '/home/news',
      component: newsContainer
    },
    {
      path: '/home/picture',
      component: pictureContainer
    },
    {
      path: '/home/commodity',
      component: commodityContainer
    },
    {
      path: '/home/comments',
      component: commentsContainer
    },
    {
      path: '/news/info',
      component: newsinfo
    }



  ],
  linkActiveClass: 'mui-active' //覆盖默认高亮的类
})

// 把路由对象暴露出去
export default router