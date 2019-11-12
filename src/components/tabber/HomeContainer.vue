<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
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
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图数据
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      this.$http
        .get("")
        .then(result => {
          // console.log(result.body);
          if (result.body.status === 0) {
            // 成功
            this.lunbotuList = result.message;
          } else {
            //    失败
            Toast("Upload Complete");
          }
        });
    }
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
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background: darkkhaki;
    }
    &:nth-child(2) {
      background: darkcyan;
    }
    &:nth-child(3) {
      background: darkgoldenrod;
    }
  }
}
</style>