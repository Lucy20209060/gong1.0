<template>
	<div class="fixed_nav" v-if="scrolled > 650">
		<!-- 客服按钮 -->
		<p id="fixed_nav_p1" @click="kefu">
			<i class="iconfont icon-kefu"></i>
			<span>联系客服</span>
		</p>
		<p id="fixed_nav_p2">
			<router-link  :to="loginstatus? '/shopCart' : '/login' ">
				<!-- <span>{{inputValue > 0 ? inputValue:carNum}}</span> -->
				<i class="iconfont icon-gouwuche"></i>
			</router-link>
			<span>购物车</span>
		</p>
		<p id="fixed_nav_p3" @click="goTop">
			<i><img src="/static/images/top.png"></i>
			
			<span>返回顶部</span>
		</p>
	</div>
</template>

<script>
export default {
	name: 'fixed_nav',
	data () {
		return {
			carNum:0,
			loginstatus:this.$cookie.getCookie('8e3c824e1d6254b74a013799c1565538'),
			scrolled:0
		}
	},
	props: {
		inputValue: Number
	},
	created(){
		window.addEventListener('scroll', this.handleScroll);
  		const _this = this;
		$.ajax({
			type: "post",
			url: _this.$store.state.apilink+"?s=api/cart/cartnum",
			dataType: "json",
			success:function(res){
				if(res.data){
					_this.carNum = res.data;
				}else{
					_this.carNum = 0;
				}
				
			}
	  	});
	},
	methods:{
	  	goTop(){
	  		//主页 回到顶部
		    $('body,html').animate({scrollTop:0},1000);
	  	},
	  	kefu(){
	  		ysf.open();
	  	},
	  	handleScroll(){
	      this.scrolled = $(window).scrollTop();
	    }
	}
}
</script>

<style scoped>
.fixed_nav{
	border: 1px solid #d8d8d8;
}
.fixed_nav p{
	width:100%;
	height: 40px;
	text-align: center;
	
}
.fixed_nav :nth-child(2){
	border-top: 1px solid #d8d8d8;
	/*border-bottom: 1px solid #d8d8d8;*/
	-moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box; 
}
.fixed_nav :nth-child(3){
	border-top: 1px solid #d8d8d8;
	-moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box; 
}
.fixed_nav p{
	position: relative;
	cursor: pointer;
	background: #fff;

}
.fixed_nav p i{
	width: 22px;
	height: 22px;
	font-size: 18px;
	position: absolute;
	top:0;
	right: 0;
	left: 0;
	bottom: 0;
	margin: auto;
}
#fixed_nav_p1:hover i{
	color: #009e4d;
}
#fixed_nav_p1 i{
	color: #999;
	/*display: none;*/
}
#fixed_nav_p2 i{
	color: #999;
	border: 0;
}
#fixed_nav_p2 a{
	display: block;
	height: 100%;
}
#fixed_nav_p2:hover i{
	color: #009e4d;
}

#fixed_nav_p1:hover span,#fixed_nav_p2:hover span,#fixed_nav_p3:hover span{
	animation:mymove .5s 1 linear;
	-webkit-animation:mymove .5s 1 linear;
	-moz-animation:mymove .5s 1 linear;
	-ms-animation:mymove .5s 1 linear;

	animation-fill-mode:forwards;
	-webkit-animation-fill-mode:forwards;
	-moz-animation-fill-mode:forwards;
	-ms-animation-fill-mode:forwards;
}
@keyframes mymove{
	from{opacity: .5;left: -110px;}
	to{opacity: 1;left: -90px;}
}
@-webkit-keyframes mymove{
	from{opacity: .5;left: -110px;}
	to{opacity: 1;left: -90px;}
}
@-moz-keyframes mymove{
	from{opacity: .5;left: -110px;}
	to{opacity: 1;left: -90px;}
}
@-ms-keyframes mymove{
	from{opacity: .5;left: -110px;}
	to{opacity: 1;left: -90px;}
}


#fixed_nav_p1 span,#fixed_nav_p2 span,#fixed_nav_p3 span{
	opacity: 0;
	position: absolute;
	color: #999;
	top: 1px;
	text-align: center;
	left: -90px;
	border: 1px solid #d8d8d8;
	padding: 0 10px;
	height: 36px;
	line-height: 36px;
	font-size: 12px;
	z-index: 999;
	border-radius: 4px;
	background: #fff;
}
#fixed_nav_p1 span:after,#fixed_nav_p2 span:after,#fixed_nav_p3 span:after{
	content: '';
	width: 10px;
	height: 10px;
	position: absolute;
	right: -7px;
	top: 11px;
	background: #FFF;
	border-top: 1px solid #d8d8d8;
	border-right: 1px solid #d8d8d8;
	transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
}
#fixed_nav_p3 i{
	display: block;
	width: 100%;
	height: 100%;
}
#fixed_nav_p3 i img{
	width: 100%;
	height:100%;
}
#fixed_nav_p3 i{
	background: #999;
}
#fixed_nav_p3:hover i{
	background: #009e4d;
}

</style>