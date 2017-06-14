<template>
  <div class="w-batch-list">
  	<div class="kongb">
  		<img src="/static/images/kongb.png" alt=""  />
  		<h4>没有找到相关的订单信息！</h4>
  	</div>
  	<h3>批量订单列表</h3>
  	<p><i class="iconfont getAll" v-on:click="getAll"></i><span>全选</span><span>商品信息</span><span>商品ID</span><span>单价</span><span>数量</span><span>小计</span><span>收货地址</span></p>
  	<div class="batchList">
  		<div class="batchCase" v-for="(item,w_batchIndex) in batchList" key="w_batchIndex">
  			<p>导入时间：<span>1202年12月12日</span>订单号：<span>1283721873827</span><b class="iconfont"  v-on:click="removeHttp" :count="w_batchIndex" :remove_id="item.id">&#xe64f;</b></p>
  			<div class="batchInfo">
  				<i class="iconfont" v-on:click="selfCheck" :count="w_batchIndex" :remove_id="item.id" ></i>
	  			<img :src="item.goods_list.original_img" />
	  			<span>{{item.goods_list.goods_name}}</span>
	  			<span>{{item.goods_list.spec_name}}</span>
	  			<span>{{item.goods_id}}</span>
	  			<span>{{item.goods_list.market_price}}</span>
	  			<span>x1</span>
	  			<span>123</span>
	  			<span>运费：包邮</span>
	  			<div class="address">
	  				<div><b>{{item.name}}</b><b>{{item.mobile}}</b></div>
	  				<p>{{item.address}}</p>
	  			</div>
  			</div>
  		</div>
  	</div>
  	<div class="clearList"><i class="iconfont getAll" v-on:click="getAll"></i><span>全选</span><span v-on:click="pishan">批量删除</span>共<b>1</b>件商品<span>商品总额（不含运费）：<b>¥55</b></span><button id="orders" v-on:click="ok_go">确认下单</button></div>
  </div>
</template>

<script>

export default {
  name: 'batch-list',
  data () {
    return {
    	batchList:[],
    	check:false,
    	batchRemove:[],
    	countsRemove:[]
    }
  },
  beforeMount(){
  	this.batchHttp()
  },
  methods:{
  	//排序
  	sortNumber(a,b){
  		return a - b;
  	},
  	//初始化
  	batchHttp(){
			let that = this;
  		$.ajax({
  			type:"get",
  			url:that.$store.state.apilink+"?s=api/orderimport/getlist",
  			async:true,
  			success:function(data){
  				that.batchList = JSON.parse(data).data;
  				if(that.batchList == undefined || $(".batchCase").length == 1){
		  			$(".batchList").css("display","none");
		  			$(".clearList").css("display","none");
		  			$(".kongb").css("display","block");
		  		}else{
		  			$(".batchList").css("display","block");
		  			$(".clearList").css("display","block");
		  			$(".kongb").css("display","none");
		  		}
  			}
  		})
  	},
  	//删除请求
  	removeHttp(e){
  		let that = this;
  		let ids = $(e.target).attr("remove_id");
  		$.ajax({
	    	type:"get",
	    	url:that.$store.state.apilink+"?s=api/orderimport/delete&ids="+ids,
	    	async:true,
	    	success:function(data){
	    		//请求成功，并且状态正常，调用删除dom元素方法
	    		if(JSON.parse(data).error == 0){
						that.shan(e);
	    		}
	    	}
    	});
  	},
  	//监听空白事件
  	kong(){
  		if(this.batchList.length == 0 || $(".batchCase").length == 0){
  			$(".batchList").css("display","none");
  			$(".clearList").css("display","none");
  			$(".kongb").css("display","block");
  			$(".getAll").html("")
  		}else{
  			$(".batchList").css("display","block");
  			$(".clearList").css("display","block");
  			$(".kongb").css("display","none");
  		}
  	},
  	//删除功能
  	shan(e){
  		let index = $(e.target).attr("count");
  		let count_id = $(e.target).attr("remove_id")
  		//把列表数组中被删除的元素清除      
  		this.batchRemove.push(count_id); //放入要被删除的数组
//			this.batchList.splice(index,1) 暂时不用，防止最后传出列表出现错误
			//删除dom
			this.countsRemove.push(index)
  		$(e.target).parent().parent().remove();
  		//监听事件
  		this.kong()
  	},
  	//批量删除
  	pishan(){
  		let arr = $(".shan");
  		let that = this;
  		let countsArr = [];
  		let goodArr = [];
  		for(let i=0,len=arr.length;i<len;i++){
				that.countsRemove.push($(".shan").eq(i).attr("count"));
				if(that.batchRemove.indexOf($(".shan").eq(i).attr("remove_id")) == -1){
					that.batchRemove.push($(".shan").eq(i).attr("remove_id"));
					goodArr.push($(".shan").eq(i).attr("remove_id"));
				}
				if(that.countsRemove.indexOf($(".shan").eq(i).attr("count")) == -1){
					that.countsRemove.push($(".shan").eq(i).attr("count"));
					countsArr.push($(".shan").eq(i).attr("count"));
				}
  		}
			if(goodArr == ""){
				return
			}
			goodArr = goodArr.join(",")
			//颠倒数组 （逻辑） 必须颠倒数组，防止删错商品
//			that.countsRemove.sort(that.sortNumber);
//			if(that.countsRemove.length>=2 && that.countsRemove[0]<that.countsRemove[1]){
//				that.countsRemove.reverse();
//			}
			countsArr.sort(that.sortNumber).reverse();
			$.ajax({
				type:"get",
				url:that.$store.state.apilink+"?s=api/orderimport/delete&ids="+goodArr,
				async:true,
				success:function(data){
					if(JSON.parse(data).error == 0){
						//暂时也不处理，最后跳转再做处理
//						for(let j=0,lens=counts.length;j<lens;j++){
//							that.batchList.splice(counts[j],1);
//						}
						$(".shan").parent().parent().remove();
			  		that.kong();
	    		}
				}
			})
  	},
  	//全选
  	getAll(){
			this.check = !this.check;
			if(this.check){
				$(".w-batch-list i").html("&#xe618;")
				$(".batchList i").addClass("shan")
				$("#orders").css("background-color","#E64346")
			}else{
				$(".w-batch-list i").html("")
				$(".batchList i").removeClass("shan")
				$("#orders").css("background-color","#ccc")
			}
  	},
  	//单选
  	selfCheck(e){
  		if(e.target.innerHTML == ""){
  			e.target.innerHTML = "&#xe618;";
  			$(e.target).addClass("shan");
  		}else{
  			e.target.innerHTML = ""
  			$(e.target).removeClass("shan")
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
  	},
  	//确认下单
  	ok_go(){
			if($("#orders").css("background-color") == "rgb(230, 67, 70)"){
				this.$router.push({path:'batchListPay'})
			}
  	}
  }
}
</script>

<style scoped>
	.w-batch-list{
		position:relative;
		float:left;
		width:963px;
		min-height: 799px;
		background-color: #fff;
		padding:16px 25px 0 32px;
	}
	.w-batch-list .batchCase{
		margin-bottom:20px;
	}
	.w-batch-list h3{
		text-align: left;
		color:#333;
		padding-bottom:14px;
		border-bottom:1px solid #D8D8D8
	}
	.w-batch-list p{
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
	.w-batch-list p i{
		cursor: pointer;
		display: inline-block;
		line-height:1;
		width:15px;
		height:15px;
		border:1px solid #A7A7A7;
		margin:0 15px;
	}
	.w-batch-list p span:nth-of-type(2){
		margin:0 80px 0 110px
	}
	.w-batch-list p span:nth-of-type(4){
		margin:0 70px 0 107px
	}
	.w-batch-list p span:nth-of-type(6){
		margin:0 130px 0 70px;
	}
	.w-batch-list .batchCase{
		height:148px;
		border:1px solid #D8D8D8
	}
	.w-batch-list .batchCase p{
		box-sizing: border-box;
		padding-left:20px;
	}
	.w-batch-list .batchCase p i{
		border:none;
		margin-top:-5px;
	}
	.w-batch-list .batchCase p span:nth-of-type(1){
		margin-right:88px;
	}
	.w-batch-list .batchCase p span:nth-of-type(2){
		margin:0;
		margin-right:440px;
	}
	.w-batch-list .batchCase p{
		height:33px;
		margin:0;
	}
	.w-batch-list .batchInfo{
		height:114px;
		position:relative;
	}
	.w-batch-list .batchInfo i{
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
	.w-batch-list .batchInfo img{
		position:absolute;
		left:50px;
		top:10px;
		width:88px;
		height:88px;
		border:1px solid #D8D8D8;
	}
	.w-batch-list .batchInfo span{
		display: inline-block;
		text-align: left;
		font-size:14px;
		color:#333;
		position: absolute;
	}
	.w-batch-list .batchInfo span:nth-of-type(1){
		left:172px;
		top:30px;
		width:130px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.w-batch-list .batchInfo span:nth-of-type(2){
		left:172px;
		top:65px;
		color:#999;
		width:130px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.w-batch-list .batchInfo span:nth-of-type(3){
		left:330px;
		top:30px;
	}
	.w-batch-list .batchInfo span:nth-of-type(4){
		left:470px;
		top:30px;
	}
	.w-batch-list .batchInfo span:nth-of-type(5){
		position:absolute;
		left:574px;
		top:30px;
	}
	.w-batch-list .batchInfo span:nth-of-type(6){
		left:668px;
		top:30px;
	}
	.w-batch-list .batchInfo span:nth-of-type(7){
		left:668px;
		top:50px;
	}
	.w-batch-list .batchCase .address{
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
	.w-batch-list .batchCase p b{
		font-size:17px;
	}
	.w-batch-list .batchCase .address div{
		text-align: left;
	}
	.w-batch-list .batchCase .address b{
		font-weight:normal;
		padding-left:20px;
	}
	.w-batch-list .batchCase .address p{
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
	.w-batch-list .kongb{
		text-align: center;
		position: absolute;
		left:400px;
		top:270px;
	}
	.w-batch-list .kongb h4{
		color:#999;
		margin-top:20px;
	}

	.w-batch-list .clearList{
		font-size:14px;
		line-height:58px;
		text-align: left;
		width:961px;
		height:58px;
		border:1px solid #D8D8D8;
	}
	.w-batch-list .clearList i{
		cursor: pointer;
		display: inline-block;
		background-color: #F2F2F2;
		line-height:1;
		width:15px;
		height:15px;
		border:1px solid #A7A7A7;
		margin:0 15px;
	}
	.w-batch-list .clearList span:nth-of-type(2){
		margin:0 380px 0 40px;
	}
	.w-batch-list .clearList span:nth-of-type(3){
		margin:0 27px; 
	}
	.w-batch-list .clearList button{
		position:relative;
		display: block;
		float: right;
		width:100px;
		height:100%;
		background-color:#ccc;
	}
	.w-batch-list .clearList button div{
		position:absolute;
		left:0;
		top:0;
		width:100%;height:100%;
	}
</style>