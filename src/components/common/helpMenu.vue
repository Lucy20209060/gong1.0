<template>
	<div class="w-help-menu">
		<p @click="goAnimate(0,115)"><i class="iconfont">&#xe60c;</i>品牌承诺</p>
		<ul @click="clickColor">
			<router-link to="/help/origin"><li style="color:#009E4D">原产地直供</li></router-link>
			<router-link to="/help/quality"><li>品质保证</li></router-link>
			<router-link to="/help/delivery"><li>闪电发货</li></router-link>
			<router-link to="/help/bestservice"><li>优质服务</li></router-link>
		</ul>
		<p @click="goAnimate(1,115)"><i class="iconfont">&#xe60c;</i>采购方须知</p>
		<ul @click="clickColor">
			<router-link to="/help/registercertify"><li>注册及认证</li></router-link>
			<router-link to="/help/userrights"><li>用户的权利和义务</li></router-link>
			<router-link to="/help/platformrules"><li>平台规则</li></router-link>
			<router-link to="/help/termsofservice"><li>服务条款</li></router-link>
		</ul>
		<p @click="goAnimate(2,136)"><i class="iconfont">&#xe60c;</i>售后服务</p>
		<ul @click="clickColor">
			<router-link to="/help/pledge"><li>服务承诺</li></router-link>
			<router-link to="/help/returnterms"><li>退货条款</li></router-link>
			<router-link to="/help/returnprocess"><li>退换货流程</li></router-link>
			<router-link to="/help/invoice"><li>发票制度</li></router-link>
			<router-link to="/help/problem"><li>常见问题</li></router-link>
		</ul>
		<p @click="goAnimate(3,57)"><i class="iconfont">&#xe60c;</i>关于我们</p>
		<ul @click="clickColor">
			<router-link to="/help/weare"><li>我们是谁</li></router-link>
			<router-link to="/help/contactus"><li>联系我们</li></router-link>
		</ul>
	</div>
</template>

<script>
  export default{
  	name:'help_menu',
  	data () {
  	  return{
  	  	msg:''
  	  }
  	},
  	mounted(){
  		this.colors();
  	},
  	methods:{
  		//动画效果
  		goAnimate(count,hCount){
  			if($(".w-help-menu ul").eq(count).height() > 10){
  				$(".w-help-menu ul").eq(count).animate({
  					height:0
  				},500,function(){
  					$(".w-help-menu p i").eq(count).html("&#xe60b;")
  				})
  			}else{
  				$(".w-help-menu ul").eq(count).animate({
  					height:hCount
  				},500,function(){
  					$(".w-help-menu p i").eq(count).html("&#xe60c;")
  				})
  			}
  		},
  		//点击切换字体颜色
		clickColor(e){
			$(".w-help-menu li").css("color","#333");
			$(e.target).css("color","#009E4D");
		},
		//监听字体颜色
		colors(){
			let hash = window.location.hash.replace(/#\/help\//,"");
			console.log(hash)
			let count = 0;
			switch (hash){
				case "origin":count=0
					break;
				case "quality":count=1
					break;
				case "delivery":count=2
					break;
				case "bestservice":count=3
					break;
				case "registercertify":count=4
					break;
				case "userrights":count=5
					break;
				case "platformrules":count=6
					break;
				case "termsofservice":count=7
					break;
				case "pledge":count=8
					break;
				case "returnterms":count=9
					break;
				case "returnprocess":count=10
					break;
				case "invoice":count=11
					break;
				case "problem":count=12
					break;
				case "weare":count=13
					break;
				case "contactus":count=14
					break;
				default:count=0
					break;
			}
			$(".w-help-menu li").css("color","#333")
			$(".w-help-menu li").eq(count).css("color","#009E4D")
		}
  	}
  }
</script>

<style scoped>
	.w-help-menu{
		width:100%;
		height:800px;
		background-color:#fff;
		padding:0 5px;
	}
	.w-help-menu p{
		line-height:52px;
		font-weight: 800;
		color:#333;
		cursor:pointer;
	}
	.w-help-menu p i{
		font-weight: 100;
		margin:0 10px 0 20px;
		font-size:14px;
	}
	.w-help-menu ul{
		overflow: hidden;
		
		padding-bottom:5px;
		border-bottom: 1px dashed #ccc;
	}
	.w-help-menu ul:last-of-type{
		border:none;
	}
	.w-help-menu ul li{
		cursor:pointer;
		padding-left:44px;
		font-size:14px;
		color:#333;
		line-height:26px;
	}
</style>