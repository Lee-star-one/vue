<template lang="">
    <div>
		<!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<a :class='["mui-control-item",item.id==0?"mui-active":" "]' href="#item1mobile" v-for='item in cates' :key="item.id"  @tap="getPhotoListByCateId(item.id)">
					{{item.title}}
				</a>
			</div>
		</div>
	</div>
	<!-- 图片列表区域 -->
	<div>
		<ul class='photo-list'>
			<router-link v-for="item in list" :key="item.id" tag='li' :to="'/home/picture/pictureinfo/'+item.id">
				<img v-lazy="item.img_url" >
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>
		 
	</div>
    </div>
</template>
<script>
// 1. 导入 mui 的js文件
import mui from '../../../lib/mui/js/mui.js'

export default {
	data() {
		return {
			cates:[],
			list:[]
		}
	},
    mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  }); 
},
created() {
    this.getAllCategroy();
    this.getPhotoListByCateId(0);
  },
methods: {
	getAllCategroy(){
		// 获取所有图片分类
		this.$http.get('api/getimgcategory').then(response=>{
			// console.log(response)
			if(response.body.status===0){
				response.body.message.unshift({title:"全部",id:0})
				this.cates=response.body.message
			}
		})
	},
	getPhotoListByCateId(cateId){
		this.$http.get('api/getimages/'+cateId).then(response=>{
			console.log(response)
			if(response.body.status===0){
				this.list=response.body.message
			console.log(this.list)

			}
		
		})

	}
},
}
</script>
<style lang="scss">
  * {
  touch-action: pan-y;
} 
.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	li{
		background: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
		img{
			width: 100%;
			display: block;
			//  vertical-align: middle;
		}
		img[lazy="loading"] {
		width: 40px;
		height: 300px;
		margin: auto;
		}
		.info {
		color: white;
		text-align: left;
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		max-height: 84px;
		.info-title {
			font-size: 14px;
		}
		.info-body {
			font-size: 13px;
		}
		}
	}
	
}
</style>