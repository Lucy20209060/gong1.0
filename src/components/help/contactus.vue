<template>
	<div class="contactus">
		<div class="header">联系我们</div>
		<div class="content">
			<p>
				如果您对安厨的产品有任何的疑问，或者对我们的服务有任何意见或建议，非常欢迎您直接与我们联络，我们将竭诚为您服务。
			</p>
			<div class="contenta">
				<div class="dianhua">
					<span class="iconfont icon-dianhua"></span>
					<p class="title">客服联系方式</p>
					<p>客服热线：0571-28270936</p>
					<p>热线时间：9：00-18：00 <br/>（周一至周五）</p>
				</div>
				<div class="dizhi">
					<span class="iconfont icon-dizhi"></span>
					<p class="title">联系地址</p>
					<p>地址：杭州市滨江区泰安路盾安发展大厦16楼</p>
				</div>
				<div class="tuangou">
					<span class="iconfont icon-zhuoyou-tuangou"></span>
					<p class="title">企业团购联系方式</p>
					<p>公司电话：0571-28270937</p>
					<p>公司邮箱：gongyl@hzanchu.com</p>
				</div>
				<div class="hezuoyewu">
					<span class="iconfont icon-hezuoyewu"></span>
					<p class="title">商务合作</p>
					<p>电话：0571-28270937</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.contactus{
		width: 100%;
		height: 100%;
	}
	.contactus .header{
		height: 16px;
    	line-height: 16px;
		margin: 18px 0;
		font-size: 14px;
		font-weight: bold;
		padding-left: 1rem;
		border-left: 3px solid #009E4D; 
	}
	.contactus .content{
		padding-left: 1rem;
	}
	.contactus h4{
		font-weight: bold;
	}
	.contactus .contenta{
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
	.contactus .contenta>div{
		width: 220px;
		height: 220px;
		text-align: center;
	}
	.contactus .contenta .title{
		margin-bottom: 20px;
	}
	.contactus .contenta .iconfont{
		font-size:36px;
		margin: 30px 0;
		display: block;
	}
	.contactus .contenta .dianhua{
		background: #F9E0E0;
	}
	.contactus .contenta .icon-dianhua{
		color: #D26C69;
	}
	.contactus .contenta .dizhi{
		background: #DDF2F4
	}
	.contactus .contenta .icon-dizhi{
		color: #30AFBC;
	}
	.contactus .contenta .tuangou{
		background: #EBF3DA
	}
	.contactus .contenta .icon-tuangou{
		color: #99BF46;
	}
	.contactus .contenta .hezuoyewu{
		background: #D5ECF9
	}
	.contactus .contenta .icon-hezuoyewu{
		color: #31A0E1;
	}
</style>