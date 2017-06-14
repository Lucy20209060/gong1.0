<template>
	<div class="w-menu">
		<div class="w-tManagement">
			<p v-on:click="tmt"><i class="iconfont">&#xe60c;</i>交易管理</p>
			<ul @click="clickColor">
				<router-link to="/mine/myIndent" ><li>我的订单</li></router-link>
				<router-link to="/shopCart" ><li>购物车</li></router-link>
				<!-- <router-link to="/mine/batch" ><li>批量下单</li></router-link> -->
				<!-- <router-link to="/mine/batchList" ><li>批量下单列表</li></router-link> -->
			</ul>
		</div>
		<div class="w-dManagement">
			<p v-on:click="dmt"><i class="iconfont">&#xe60c;</i>资料管理</p>
			<ul @click="clickColor">
				<router-link to="/mine/certification" ><li>认证信息</li></router-link>
				<router-link to="/mine/address" ><li>收货地址</li></router-link>
				<router-link to="/mine/safe" ><li>安全中心</li></router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'w-menu',
		data(){
			return{
				show:true,
				show2:true
			}
		},
		mounted(){
			this.colors()
		},
		updated(){
			this.colors()
		},
		methods:{
			//添加点击动画效果
			tmt(){
				if(this.show){
					$(".w-tManagement").animate({
						height:32
					},500,function(){
						$(".w-tManagement i").html("&#xe60b;")
					})
				}else{
					$(".w-tManagement").animate({
						height:100
					},500,function(){
						$(".w-tManagement i").html("&#xe60c;")
					})
				}
				this.show=!this.show
			},
			dmt(){
				if(this.show2){
					$(".w-dManagement").animate({
						height:32
					},500,function(){
						$(".w-dManagement i").html("&#xe60b;")
					})
				}else{
					$(".w-dManagement").animate({
						height:130
					},500,function(){
						$(".w-dManagement i").html("&#xe60c;")
					})
				}
				this.show2=!this.show2;
			},
			//监听字体颜色
			colors(){
				let hash = window.location.hash.replace(/#\/mine\//,"");
				// console.log(hash)
				let count = 0;
				switch (hash){
					case "myIndent":count=0
						break;
					case "certification":count=2
						break;
					case "safe":count=4
						break;
					default:count=0
						break;
				}
				$(".w-menu li").css("color","#333")
				$(".w-menu li").eq(count).css("color","#009E4D")
			},
			//点击切换字体颜色
			clickColor(e){
				$(".w-menu li").css("color","#333");
				$(e.target).css("color","#009E4D");
			}
		}
	}
</script>

<style scoped>
	.w-menu{
		float:left;
		width:156px;
		background-color: #fff;
		margin-right:10px;
		/*display: -webkit-box;
		-webkit-box-pack: center;
		-moz-box-pack: center;
		flex-direction: column;*/
		padding:0 5px 0 9px;
	}
	.w-menu .w-tManagement{
		width:156px;
		height:100px;
		border-bottom: 1px dashed #dcdcdc;
		padding-bottom: 16px;
		overflow: hidden;
	}
	.w-menu .w-tManagement p{
		cursor: pointer;
		position:relative;
		line-height: 48px;
		font-size:16px;
		text-align: center;
	}
	.w-menu .w-tManagement p i{
		position:absolute;
		left:20px;
		top:1px;
	}
	.w-menu ul{
		overflow: hidden;
	}
	
	.w-menu .w-tManagement li{
		/*margin-left:2px;*/
		text-align: left;
		box-sizing: content-box;
		padding-left:48px;
		line-height:24px;
		font-size:12px;
	}
	.w-menu .w-dManagement{
		width:156px;
		height:130px;
		overflow: hidden;
		padding-bottom: 16px;
	}
	.w-menu .w-dManagement p{
		cursor: pointer;
		position:relative;
		line-height: 48px;
		text-align: center;
	}
	.w-menu .w-dManagement p i{
		position:absolute;
		left:20px;
		top:1px;
	}
	.w-menu .w-dManagement li{
		/*margin-left:2px;*/
		text-align: left;
		box-sizing: content-box;
		padding-left:48px;
		line-height:24px;
		font-size:12px;
	}
</style>