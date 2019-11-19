<template>
  <div class="shopcar-container">

    <div class="goods-list">
        <div class="mui-card" v-for="item in list" :key="item.id">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <mt-switch v-model="$store.getters.getgoodselect[item.id]"
              @change="selectedChange(item.id,$store.getters.getgoodselect[item.id])"
              ></mt-switch>
              <img src="http://demo.dtcms.net/upload/201504/20/thumb_201504200059017695.jpg" alt="">
              <div class="info">
                  <h1>{{item.title}}</h1>
                  <p>
                    <span class="price">￥{{item.sell_price}}</span>
                    <numbox :num='$store.getters.getgoodsCount[item.id]' :goodsid='item.id'></numbox>
                    <a href="#" @click.prevent='remove(item.id,i)'>删除</a>
                  </p>
              </div>
            </div>
        </div>
        
        </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{$store.getters.getgoodsamountandtotle.amount}}</span> 件,总价￥ <span class="red">{{$store.getters.getgoodsamountandtotle.totle}}</span> </p>
            </div>
             <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>


      <p></p>

 
  </div>
</template>
<script>
import shoppcar_numbox from '../../components/homes/subcomponent/shoppcar_numbox.vue'
export default {
  data() {
    return {
      list:[]
    }
  },
  methods: {
    getgoodsinfo(){
      var idArr=[];
      this.$store.state.car.forEach(item=>{
        idArr.push(item.id)
      })
      if(idArr.length<=0){
        return
      }

      this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(response=>{
        if(response.body.status===0){
          this.list=response.body.message;

        }
      })
    },
    remove(id,index){
        // 点击删除，把商品从 store 中根据 传递的Id删除 把 当前组件中的 goodslist 中 对应要删除的那个商品，使用index来删除
       this.list.splice(index,1)
       this.$store.commit('removeForCar',id)
    },
    // 改变select的状态
    selectedChange(id,val){
      console.log(val)
      this.$store.commit('selectedChange',{
        id,
        selected:val
      })

    }
  },
  created() {
    this.getgoodsinfo()
  },
  components:{
    numbox:shoppcar_numbox
  }
};
</script>
<style lang="scss">
.shopcar-container{
   background: #eee;
  overflow: hidden;
.goods-list{
 
  .mui-card-content-inner{
    display: flex;
    align-items: center;
  }
  h1{
    font-size: 13px;
  }
  img{
    width: 60px;
  }
  .info{
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .price{
        color: red;
      font-weight: bold;
      font-size: 16px;
    }
    p{
      margin: 0;
      margin-top: 5px;
    }
  }
  
}
.jiesuan{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red{
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
}
</style>