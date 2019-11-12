<template lang="">
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" >
					<router-link to='/news/info'> 
						<img class="mui-media-object mui-pull-left" src="../../image/menu1.png">
						<div class="mui-media-body">
							<h1>幸福</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：2012-12-12 </span>  
                                <!-- {{item.data|dataFormat}} -->
                                <span>点击：0次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            newslist:[]//新闻列表
        }
    },
    created() {
        this.getNewList()
    },
    methods: {
        getNewList(){
            this.$http.get('').then(result=>{
                if(result.body.status ===0){
                    this.newslist=result.body.message
                }else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
               font-size: 14px;
                 
            }
            .mui-ellipsis{
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                color:#226aff
            }
        
        }
    }
</style>