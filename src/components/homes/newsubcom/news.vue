<template>
    <div class="info-container">
        <div class="info-title">
            <h1>{{newsinfo.title}}</h1>
            <p><span>发表时间：{{newsinfo.add_time|dateFormat}}</span><span>点击{{newsinfo.click}}次</span></p>
        </div>
        <hr>
        <div class="content" v-html="newsinfo.content">
           
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
            id:this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
            newsinfo:[]
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(response=>{
                 console.log(response)
               if (response.body.status === 0) {
                this.newsinfo = response.body.message[0];
                } else {
                
                }
            })
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