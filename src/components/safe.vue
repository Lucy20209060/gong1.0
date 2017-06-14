<template>
  <div class="safe">
  	<div class="address-header">安全中心</div>
  	<div class="operating-area">
  		<el-row class="change-psd-area">
  			<el-col :span="2" style="text-align: center;"><img src="/static/images/yes.png" /></el-col>
  			<el-col :span="2"><span class="title">登陆密码</span></el-col>
  			<el-col :span="2"><span class="iconfont icon-shuxian"></span></el-col>
  			<el-col :span="14"><span class="explanation">安全性高的登录密码可以保证账户安全。登录密码格式密码长度为6到16个字符； 须设置时使用英文字母、数字和符号的组合。
</span></el-col>
  			<el-col :span="4" style="text-align: center;"><router-link to="/mine/safe/findBackPsdCo"><span class="change-psd">修改</span></router-link></el-col>
  		</el-row>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'safe',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.safe{
		min-height: 380px;
		background: #fff;
		float: left;
		position: relative;
		width: 970px;
		padding: 15px 29px 98px 21px;
	}
	.safe .address-header{
		text-align: left;
		border-bottom: 3px solid #D8D8D8; 
		padding-bottom: 12px;
	}
	.safe .change-psd-area{
		height: 50px;
		display: flex;
		align-items: center;
		margin: 10px 0;

	}
	.safe .title{
		font-size: 18px;
	}
	.safe .explanation{
		font-size: 14px;
	}
	.safe .icon-shuxian{
		font-size: 35px;
	}
	.safe .change-psd{
		color: #009E4D;
		font-size: 14px;
	}
</style>