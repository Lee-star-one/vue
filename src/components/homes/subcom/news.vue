<template>
    <div class="info-container">
        <div class="info-title">
            <h1>一季度多家房企利润跌幅超50%去库存促销打响</h1>
            <p><span>发表时间：2015-04-16 11:50:20</span><span>点击一次</span></p>
        </div>
        <hr>
        <div class="content">
            好好
        </div>
        <div class="info-list">

        </div>
        <comment-box>

        </comment-box>
    </div>
</template>
<script>
import comment  from '../subcomponent/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id
        }
    },
    components:{
        // 用来注册子组建的节点
        'comment-box':comment
    }
}
</script>
<style lang="scss">
.info-container{
    padding: 0 5px;
    .info-title{
        h1{
            font-size: 16px;
            text-align: center;
            color: red;
            line-height: 30px;
            
        }
        p{
            display: flex;
            justify-content: space-between;
            line-height: 20px;
        }
        
    }
    // .content{}
}   
</style>