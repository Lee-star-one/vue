<template>
  <div>
     <!-- 轮播图区域 -->
    
    <swiper :infoId="lunbotuList" :isfull='true'></swiper>
    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/news">
          <img src="../../image/menu1.png" alt />
          <div class="mui-media-body">新闻咨询</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/picture">
          <img src="../../image/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/commodity">
          <img src="../../image/menu3.png" alt />
          <div class="mui-media-body">购买商品</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/comments">
          <img src="../../image/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/comments">
          <img src="../../image/menu5.png" alt />
          <div class="mui-media-body">视屏专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/comments">
          <img src="../../image/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import swiper from '../homes/subcomponent/swiper.vue'
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotuList:[]
    };
  },
  created() {
   this.getLunbotu();
  },
  methods: {
    getLunbotu() {
// axios请求
      this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo',{
        params:{}
      }).then(response=>{
          console.log(response.data.message)
          if(response.status ===200){
            this.lunbotuList = response.data.message;
          }
      }).then(function(err){
        console.log(err)
      })
    }
  },
  components:{
    swiper
  }
};
</script>
<style lang="scss">
.mui-grid-view.mui-grid-9 {
  background: white;
 
  img {
    width: 60px;
    height: 60px;
  }
}

</style>