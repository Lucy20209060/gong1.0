<template>
	<div class="login-header">
            <div class="logo-wrap">
            	<router-link to="/"><img class="logo" src="/static/images/image.png" alt="安厨供应链" /></router-link>
            	<span class="iconfont icon-shuxian"></span>
            	<span class="word"><slot></slot></span>
            </div>
        </div>
</template>
<script type="text/javascript">
	export default {
		name: 'login-header',
        date(){
            return {
                
            }
        }
	}
</script>
<style type="text/css">
.login-header{height:120px;}
.login-header .logo-wrap{width:1200px;margin:0 auto;height:100%;display:flex;align-items:center}
.login-header .logo{width:183px;height:auto;}
.login-header .icon-shuxian{font-size:35px}
.login-header .word{font-size:26px;color:#666}
</style>