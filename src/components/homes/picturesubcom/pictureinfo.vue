<template>
    <div class="photoinfo-container">
        <h2>{{list.title}}</h2>
        <p class="subtitle">
            <span>发表时间：{{list.add_time| dateFormat}}</span>
            <span>点击{{list.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
          <vue-preview :slides="photo" class="imgPrev"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="list.content">
        
        </div>
        <!-- 评论区 -->
        <comment-box>

        </comment-box>
    </div>
</template>
<script>
import comment from "../subcomponent/comment.vue";
export default {
    data() {
        return {
            id:this.$route.params.id,
            list:[],
            photo:[]
        }
    },
    created() {
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){
            // 获取图片详情
            this.$http.get("api/getimageInfo/" + this.id).then(response=>{
                if(response.body.status==0){
                    this.list=response.body.message[0]
                }
            })

        },
        getThumbs(){
            // 获取缩略图
            this.$http.get("api/getthumimages/" + this.id).then(response=>{
                if(response.body.status==0){
                    console.log(response.body.message)
                    response.body.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src
                       
                    })
                     this.photo=response.body.message
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
.photoinfo-container{
    padding: 3px;
    h2{
       color: #26a2ff;
       font-size: 15px;
       text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
            
            figure{
                display: inline-block;
                margin: 8px;
            }
            img{
                margin: 5px;
                width: 90px;
                height: 70px;
                box-shadow: 0 0 8px #999;
            }
        }
}   
</style>