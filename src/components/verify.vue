<template>
	<div class="verify">
		<login-header>用户认证</login-header>
		<div class="content">
			<div class="title">
				<img src="/static/images/verify.png" />
				<p>立即认证，您将获得更多服务！</p>
			</div>
			<ul>
				<li><img src="/static/images/verify_check.png" /></li>
				<li v-if="proofInfo == -1"><p>审核中</p></li>
				<li v-if="proofInfo == -1"><p>我们将在24小时内完成审核（工作时间9:00-18:00内）</p></li>
				<li v-if="proofInfo == 1">审核成功,去<a href="/#/">首页</a>看看</li>
				<!-- <li><router-link to="/"><input type="button" name="" value="完成" /></router-link></li> -->
			</ul>
		</div>
		<indexFooter></indexFooter>

	</div>
</template>
<script >
import loginHeader from "@/components/common/login_header"
import indexFooter from "@/components/common/index_footer"
	export default {
		name:'verify',
		data(){
			return {
                proofInfo:this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299')
            }
		},
		components:{
			loginHeader,indexFooter
		},
		beforeCreate(){

			let proof  = this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');

			let _this = this;

	        if(proof == -1|| proof == 1){            // 审核中 成功   

	        	let info = '';

	        	if(proof == 1){
	        		info = '您的认证已成功';
	        	}else{
	        		info = '您的认证正在审核中，请稍候';
	        	}

	        	_this.$message(`${info}，3s后将自动跳至首页`);

	        	let Timeout = setTimeout(function(){

	        		clearTimeout(Timeout);
	        		_this.$router.push('/');

	        	},3000);

	        }else if(proof == -2 || proof == -3 ||proof == -4){     // 审核没通过 未查询到数据 未提交认证
	            this.$router.push('/proof');
	        }else{
	        	this.$router.push('/login');
	        }

		}
	}
</script>
<style scoped>
	.verify{width:100%;height:100%}
.verify .content{height:645px;width:100%;background:#F5F5F5;text-align:center}
.title img{margin:24px auto}
.verify .content ul{width:400px;display:inline-block;margin-top:16px;padding:70px 250px;background:#fff}
.verify .content ul li:nth-child(1){height:100px;line-height:100px}
.verify .content ul li:nth-child(2){margin-top:50px}
.verify .content ul li:nth-child(3){margin-top:20px}
/*.verify .content ul li a{margin-top:45px;height:46px;border-radius:4px;background:#009448;line-height:46px}*/
/*.verify .content ul li input{width:100%;height:100%;color:#fff;font-size:20px}*/
.verify .btn-verify{float:right;color:#009448!important}
.verify .content ul li a{
	color: #009e4d;
	text-decoration: underline;
}
</style>