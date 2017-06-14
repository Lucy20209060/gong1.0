<template>
  <div class="w-batch">
  	<h3>批量订单列表</h3>
  	<div class="step">
  		<h4>操作步骤：</h4>
  		<p><span>1</span>点击<a>下载最新商品列表</a>，获取最新的商品清单；</p>
  		<p><a href="http://b2bapi.anchumall.cc/download/%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8.xlsx"><button>点击下载</button></a></p>
  		<p><span>2</span>点击<a>下载订单导入模板</a>，获取导入模板，根据模板格式填入订单信息；</p>
  		<p><a href="http://b2bapi.anchumall.cc/download/%E8%AE%A2%E5%8D%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"><button>点击下载</button></a></p>
  		<p><span>3</span>上传订单导入模板，上传后如有失败条目，可下载失败文件并重新上传；</p>
  		<p>上传成功后，可在“个人中心-交易管理-批量订单列表”查看导入成功的订单，并且进行付款操作。</p>
  		<form id="form" method="post" action="/api.php?s=api/orderimport/import_orders">
  			<input type="file" style="display:none" id="loadfile" v-on:change="watchsubmit" /><input type="button" @click="uploadFile" value="上传文件" class="submit"	/>
  		</form>
  		<p>成功：<i>0</i>失败：<i>0</i></p>
  		<p v-if="errors==1"><a href="#">下载导入失败商品</a></p>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'batch',
  data () {
    return {
      msg: '',
      errors:0
    }
  },
  methods:{
  	//上传文件功能
  	uploadFile(){
  		$("#loadfile").click();
  	},
  	//表单提交监听事件
  	watchsubmit(){
			if($("#loadfile").val() != ""){
  			$("#form").submit();
			}
  	}
  }
}
</script>

<style scoped>
	.w-batch{
		width:972px;
		float: left;
		padding:16px 25px 130px 22px;
		background-color:#fff;
		min-height: 500px;
	}
	.w-batch button{
		cursor:pointer;
		font-size:14px;
	}
	.w-batch h3{
		color:#333;
		text-align: left;
		padding-bottom:15px;
		border-bottom: 1px solid #D8D8D8;
		margin-bottom: 22px;
	}
	.w-batch h4,.w-batch p{
		text-align: left;
		font-size:14px;
		color:#333;
	}
	.w-batch h4{
		margin-bottom:26px;
	}
	.w-batch p span{
		display: inline-block;
		width:19px;
		height:19px;
		color:#fff;
		border-radius:4px;
		background-color: #009E4D;
		text-align: center;
		font-size:14px;
		line-height:19px;
		margin:0 15px;
	}
	.w-batch p a{
		color:#E64346;
	}
	.w-batch p button{
		width:78px;
		height:28px;
		border:1px solid #D8D8D8;
		background-color: #F2F2F2;
		margin-left:48px;
	}
	.w-batch .step p:nth-of-type(2),.w-batch .step p:nth-of-type(4){
		margin:12px 0 24px;
	}
	.w-batch .step p:nth-of-type(6){
		margin:44px 0 16px;
		box-sizing: border-box;
		padding-left:15px;
		color:#999;
	}
	.w-batch form .submit{
		width:120px;
		height:50px;
		color:#fff;
		margin-left:15px;
		background-color:#009E4D;
	}
	.w-batch .step p:nth-of-type(7){
		color:#E64346;
		margin-top:14px;
		box-sizing: border-box;
		padding-left: 15px;
	}
	.w-batch .step p:nth-of-type(7) i{
		color:#E64346;
		margin-right: 20px;
	}
	.w-batch .step p:last-of-type{
		color:#E64346;
		margin-top:14px;
		box-sizing: border-box;
		padding-left: 15px;
	}
	.w-batch .step p:last-of-type a{
		color:#E64346;
		margin-right: 20px;
		text-decoration:underline;
	}
</style>