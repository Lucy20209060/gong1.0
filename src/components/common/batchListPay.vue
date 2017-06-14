<template>
	<div class="w-batch-pay">
		<div class="kongb">
	  		<img src="../../../static/images/kongb.png" alt=""  />
	  		<h4>没有找到相关的订单信息！</h4>
  		</div>
		<h3>批量订单列表</h3>
  		<p><i class="iconfont getAll" v-on:click="getAll"></i><span>全选</span><span>商品信息</span><span>商品ID</span><span>单价</span><span>数量</span><span>小计</span><span>收货地址</span></p>
  		<div class="batchList">
	  		<div class="batchCase" >
	  			<p>导入时间：<span>1202年12月12日</span>订单号：<span>1283721873827</span><b class="iconfont" @click="shan">&#xe64f;</b></p>
	  			<div class="batchInfo">
	  				<i class="iconfont" v-on:click="selfCheck"></i>
		  			<img src="../../../static/images/verify_check.png"/>
		  			<span>123</span>
		  			<span>123</span>
		  			<span>123</span>
		  			<span>123</span>
		  			<span>x1</span>
		  			<span>123</span>
		  			<div class="address">
		  				<div><b>123</b><b>123</b></div>
		  				<p>123</p>
		  			</div>
	  			</div>
		  		<div class="money">
		  			运费：<b>￥5</b>应付总计：<b>￥123</b>
		  		</div>
	  		</div>
	  	</div>
	  	<div class="clearList"><span>应付金额：<b>¥55</b></span><button id="orders" @click="ok_go" ><div></div><router-link  to="/mine/batchListPay">去付款</router-link></button></div>
	</div>
</template>

<script>
export default {
  name:'batchListPay',
  data () {
    return {
	  
	}
  },
  methods:{
	//全选
	getAll(){
		this.check = !this.check;
		if(this.check){
			$(".w-batch-pay i").html("&#xe618;")
			$("#orders").css("background-color","#E64346")
		}else{
			$(".w-batch-pay i").html("")
			$("#orders").css("background-color","#ccc")
			}
			this.ok_go()
	},
  	//单选
  	selfCheck(e){
  		if(e.target.innerHTML == ""){
  			e.target.innerHTML = "&#xe618;"
  		}else{
  			e.target.innerHTML = ""
  		}
		this.watchCheck();
  	},
  	//单选监听事件
  	watchCheck(){
  		let checkArr = $(".batchList i");
  		this.goShop = false;
  		this.checks = true;
  		for(let i=0,len=checkArr.length;i<len;i++){
  			if(checkArr[i].innerHTML == ""){
  				this.checks = false
  			}else{
  				this.goShop = true
  			}
  		}
  		if(this.checks){
	  		$(".getAll").html("&#xe618;")
  		}else{
  			$(".getAll").html("")
  		}
  		if(this.goShop){
  			$("#orders").css("background-color","#E64346")
  		}else{
  			$("#orders").css("background-color","#ccc")
  		}
  		this.ok_go()
  	},
  	//删除功能
  	shan(e){
//		let goodsId = $(e.target).parent().children().eq(4).html();
//		let ids = "";
  		let index = $(e.target).attr("count");
  		console.log(index);
//		for(let i=0,len=this.batchList.length;i<len;i++){
//				if(this.batchList[i].goods_id == goodsId){
//					ids = this.batchList[i].id;
//					this.batchList.splice(i,1);
				
//		}
//			console.log(this.batchList)
//			this.removeHttp(ids)
  		$(e.target).parent().parent().remove()
		this.kong()
  	},
  	kong(){
  		console.log($(".batchCase").length)
  		if($(".batchCase").length == 0){
  			$(".batchList").css("display","none");
  			$(".clearList").css("display","none");
  			$(".kongb").css("display","block");
  		}else{
  			$(".batchList").css("display","block");
  			$(".clearList").css("display","block");
  			$(".kongb").css("display","none");
	  	}
	}
  }
}
</script>

<style scoped>
	.w-batch-pay{
		float:left;
		width:963px;
		min-height: 799px;
		background-color: #fff;
		padding:16px 25px 0 32px;
		position:relative;
	}
	.w-batch-pay .kongb{
		text-align: center;
		position: absolute;
		left:400px;
		top:270px;
	}
	.w-batch-pay .kongb h4{
		color:#999;
		margin-top:20px;
	}
	
	.w-batch-pay .batchCase{
		margin-bottom:20px;
	}
	.w-batch-pay h3{
		text-align: left;
		color:#333;
		padding-bottom:14px;
		border-bottom:1px solid #D8D8D8
	}
	.w-batch-pay p{
		height:44px;
		font-size:14px;
		background-color: #F2F2F2;
		color:#333;
		text-align: left;
		display: flex;
		align-items: center;
		border: 1px solid #D8D8D8;
		margin:12px 0 22px;
	}
	.w-batch-pay p i{
		cursor: pointer;
		display: inline-block;
		line-height:1;
		width:15px;
		height:15px;
		border:1px solid #A7A7A7;
		margin:0 15px;
	}
	.w-batch-pay p span:nth-of-type(2){
		margin:0 80px 0 110px
	}
	.w-batch-pay p span:nth-of-type(4){
		margin:0 70px 0 107px
	}
	.w-batch-pay p span:nth-of-type(6){
		margin:0 130px 0 70px;
	}
	.w-batch-pay .batchCase{
		height:180px;
		border:1px solid #D8D8D8
	}
	.w-batch-pay .batchCase p{
		box-sizing: border-box;
		padding-left:20px;
	}
	.w-batch-pay .batchCase p i{
		border:none;
		margin-top:-5px;
	}
	.w-batch-pay .batchCase p span:nth-of-type(1){
		margin-right:88px;
	}
	.w-batch-pay .batchCase p span:nth-of-type(2){
		margin:0;
		margin-right:440px;
	}
	.w-batch-pay .batchCase p{
		height:33px;
		margin:0;
	}
	.w-batch-pay .batchInfo{
		height:114px;
		position:relative;
	}
	.w-batch-pay .batchInfo i{
		line-height:1;
		cursor: pointer;
		position:absolute;
		left:15px;
		top:30px;
		width:15px;
		height:15px;
		background-color:#F2F2F2;
		border: 1px solid #D8D8D8;
	}
	.w-batch-pay .batchInfo img{
		position:absolute;
		left:50px;
		top:10px;
		width:88px;
		height:88px;
		border:1px solid #D8D8D8;
	}
	.w-batch-pay .batchInfo span{
		display: inline-block;
		text-align: left;
		font-size:14px;
		color:#333;
		position: absolute;
	}
	.w-batch-pay .batchInfo span:nth-of-type(1){
		left:172px;
		top:30px;
		width:130px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.w-batch-pay .batchInfo span:nth-of-type(2){
		left:172px;
		top:65px;
		color:#999;
		width:130px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.w-batch-pay .batchInfo span:nth-of-type(3){
		left:330px;
		top:30px;
	}
	.w-batch-pay .batchInfo span:nth-of-type(4){
		left:470px;
		top:30px;
	}
	.w-batch-pay .batchInfo span:nth-of-type(5){
		position:absolute;
		left:574px;
		top:30px;
	}
	.w-batch-pay .batchInfo span:nth-of-type(6){
		left:668px;
		top:30px;
	}
	.w-batch-pay .batchInfo span:nth-of-type(7){
		left:668px;
		top:50px;
	}
	.w-batch-pay .batchCase .address{
		box-sizing: border-box;
		padding:22px 10px 0 0;
		position:absolute;
		right:0;
		top:0;
		width:180px;
		font-size:12px;
		height:116px;
		border-left:1px solid #D8D8D8
	}
	.w-batch-pay .batchCase .address div{
		text-align: left;
	}
	.w-batch-pay .batchCase .address b{
		font-weight:normal;
		padding-left:20px;
	}
	.w-batch-pay .batchCase .address p{
		height:60px;
		width:100%;
		background-color: #fff;
		border:none;
		line-height:20px;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		-webkit-box-align:inherit;
		font-size:12px;
	}
	.w-batch-pay .batchCase .money{
		height:34px;
		border-top:1px solid #D8D8D8;
		display:flex;
		align-items: center;
		box-sizing: border-box;
		padding-left:720px;
		font-size:14px;
	}
	.w-batch-pay .batchCase .money b{
		font-weight:normal;
		display: inline-block;
		width:50px;
	}
	
	.w-batch-pay .clearList{
		font-size:14px;
		line-height:58px;
		text-align: left;
		width:961px;
		height:58px;
		border:1px solid #D8D8D8;
		box-sizing: border-box;
		padding-left:700px;
	}
	.w-batch-pay .clearList b{
		font-weight: normal;
		color:#E64346;
	}
	.w-batch-pay .clearList button{
		position:relative;
		display: block;
		float: right;
		width:100px;
		height:100%;
		background-color:#ccc;
	}
	.w-batch-pay .clearList button div{
		position:absolute;
		left:0;
		top:0;
		width:100%;height:100%;
	}
</style>