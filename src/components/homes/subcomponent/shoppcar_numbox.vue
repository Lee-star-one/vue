<template>
    <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="num" @change="countChange" ref='numbox' readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../../lib/mui/js/mui.js'
export default {
     mounted() {
    mui(".mui-numbox").numbox();
  },
    methods: {
        countChange(){
    // 数量改变了
      // console.log(this.$refs.numbox.value);
      // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
            console.log(this.$refs.numbox.value)
            this.$store.commit('updatagoods',{
                id:this.goodsid,
                num:this.$refs.numbox.value
            })
        }
    },
    props:['num','goodsid']
  
 
}
</script>
<style lang="scss">
    
</style>