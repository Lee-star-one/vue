<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <textarea  placeholder="请输入要输入的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomment">提交评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for=' (item,i) in comments' :key="item.add_time+Math.random()">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class='cmt-body'>
                    {{item.content === 'undefined' ? '此人没有留言' :item.content}}

                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>

    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            comments:[],
            // id=this.$route.parmas.id
            pageIndex:1, //默认第一业
            msg:""

            
        }
    },
    created() {
        // console.log(this.$route.params.id)
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/'+this.$route.params.id+'?pageindex='+this.pageIndex).then(result=>{
                console.log(result.body.message)
                if(result.body.status===0){
                    Toast('评论获取成功')
                    this.comments=this.comments.concat(result.body.message)
                }else{
                    Toast('评论获取失败')
                }
                
            })
        },
            getmore(){
            this.pageIndex++;
            this.getComments()
        },
        postcomment(){
            if(this.msg.trim().length==0){
                return Toast('提交内容不能为空')
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg}).then(result=>{
                if(result.body.status==0){
                    // 1.拼接一个评论
                    var cmt={
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    }
                    this.comments.unshift(cmt);
                    Toast(result.body.message)
                    this.msg=''
                }else{
                    Toast('评论失败')
                }
            })
        }
    
    },
   
}
</script>
<style lang="scss">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>