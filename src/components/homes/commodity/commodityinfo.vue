<template>
    <div class="goodsinfo-container">
        <transition
        @before-enter='beforeEnter'
        @enter='enter'
        @after-enter='afterEnter'
        >
           
            <!-- 小球 -->
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
       

        <!-- 商品轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                 <swiper :infoId='lunboList' :isfull='false'></swiper>
                </div>
            </div>
        </div>
        <!-- 商品价格 -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：{{goodsinfo.market_price}} &nbsp;&nbsp;销售价：<span class="now_price">{{goodsinfo.sell_price}}</span> 
                    </p>
                    购买数量:
                    <numbox @getcount='getSelectedCount' :max='goodsinfo.stock_quantity'></numbox>
                   

                    <p class="btn-info">
                    <mt-button type='primary' size="small" >立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
                    </p>
                  
                   
                </div>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p>商品货号：{{goodsinfo.goods_no}}</p>
                   <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                   <p>上架时间：{{goodsinfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//导入轮播图的插件
import swiper from '../subcomponent/swiper.vue'
// 导入 数字选择框 组件
import numbox from '../subcomponent/goodinfo_numbox.vue'

export default {
    data() {
        return {
          id:this.$route.params.id, 
          lunboList:[] , //轮播图的数据 
          goodsinfo:[], //获取到的商品信息
          ballFlag:false ,//控制小球的隐藏与显示标示符
          selectedCount:1 //保存用户的商品数量,默认。认为用户买一个
        }
    },
    methods: {
        // 获取数量的方法
        getSelectedCount(count){    
            this.selectedCount=count;
            console.log(this.selectedCount)

        },
        // 添加到购物车
        addToShopcar(){
            this.ballFlag=!this.ballFlag
            // 拼接出一个，要保存到store 中 car 数组的 商品信息对象
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true
            }
            // 调用store中的 mutation 来将商品加入购物车
            this.$store.commit('addTocar',goodsinfo)
        },
        // 获取到轮播图的数据
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(response=>{
                console.log(response)
                if(response.body.status===0){
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src                 
                    response.body.message.forEach(item=>{
                        item.img=item.src
                    })
                     this.lunboList=response.body.message
                }
            })
        },
         // 获取商品的信息
        getGoodsInfo(){
            this.$http.get("api/goods/getinfo/"+this.id).then(response=>{
                if(response.body.status===0){
                    this.goodsinfo=response.body.message[0]
                }
                console.log(this.goodsinfo)
            })
        },
    goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id){
        // 点击跳转到 评论页面
        this.$router.push({name:'goodscomment',params:{id}})
    },
    beforeEnter(el){
        el.style.transform='translate(0,0)'
    },
    enter(el,done){
    // 获取小球的 在页面中的位置
        const ballPostion =this.$refs.ball.getBoundingClientRect();
    // 获取 徽标的页面位置
    const badgePosition=document.getElementById('badge').getBoundingClientRect()

    const xDist=badgePosition.left-ballPostion.left;
    const yDist=badgePosition.top-ballPostion.top

    el.style.transform=`translate(${xDist}px,${yDist}px)`
    el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
    done()
    
    },
    afterEnter(){
        this.ballFlag=!this.ballFlag
    }
    
    },
    created() {
        this.getLunbotu()
        this.getGoodsInfo()
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss">
   .goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
   .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .btn-info{
      margin: none;
      margin-top: 10px;
  }
  .ball{
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: red;
      position: absolute;
      z-index: 99;
      top:390px;
      left: 146px;
  }
} 
</style>