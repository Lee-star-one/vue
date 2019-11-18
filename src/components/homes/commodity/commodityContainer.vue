<!-- 在网页中，有两种跳转方式： -->
<!-- 方式1： 使用 a 标签 的形式叫做 标签跳转  -->
<!-- 方式2： 使用 window.location.href 的形式，叫做 编程式导航 -->
<template lang="">
    <div class='goodlist-container'>
        <div class='good-item' v-for='item in list' :key="item.id" @click="goDetai(item.id)">
            <img :src="item.img_url">
            <h1>{{item.title}}</h1>
            <div class='info'>
                <p class='price'>
                    <span class='new'>￥{{item.market_price}}</span>
                    <span class="old">￥{{item.sell_price}}</span>
                </p>
                <p class='sell'>
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
         <mt-button type="danger" size="large" @click='getmore'>加载更多</mt-button>
    </div>

    
</template>
<script>
export default {
    data() {
        // data 是往自己组件内部，挂载一些私有数据的
        return {
          pageindex:1,// 分页的页数
          list:[]
        }
    },
    methods:{
        getcommodity(){
        this.$http.get("api/getgoods?pageindex="+this.pageindex).then(response=>{
               if(response.body.status==0){
                   this.list=response.body.message
               }
               console.log(response)
            })
        },
        getmore(){
            this.pageindex++
            this.getcommodity()
        },
        goDetai(id){
            // 使用js的形式进行路由导航
            // 注意 一定要区分 体会this.$route 和 this.$router这两个对象
            // 其中：this.$route是路由【参数对象】，所有路由中的参数 params query 都属于它
            // 其中 this.$router 是一个路由【导航对象】，用它 可以方便 使用js代码实现路由的 前进后退 跳转到新的URL地址
            console.log(this)
            // 1.最简单的
            this.$router.push('/home/commodity/'+id)
            // 2.传递对象
            // this.$router.push({path:'/home/commodity/'+id})
            // 3.传递命名的路由
            // this.$router.push({name:'commodityinfo',params:{id} })
            
        }

        
        
    },
    created() {
        this.getcommodity()
    },
}
</script>
<style lang="scss">
.goodlist-container{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    
    .good-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%
        }
        h1{
            font-size: 14px
        }
        .info{
            background: #eee;
            p{
                padding:5px;
                margin: 0;
            }
            .price{
                .new{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
        
    }
}
</style>