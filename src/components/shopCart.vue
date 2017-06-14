<template>
  <div class="shop-cart">
		<tIndexHeader></tIndexHeader>
		<div class="w-shop-cart" style="filter:alpha(opacity=0);opacity:0">
  	<h3>我的购物车</h3>
  	<p v-if="cartnone"><i class="iconfont getAll" v-on:click="getAll"></i><span>全选</span><span>商品信息</span><span>商品ID</span><span>单价</span><span>数量</span><span>小计</span><span>操作</span></p>
  	<div class="carList">
  		<div class="carCase" v-for="(item,w_index) in cartList" key="w_index" >
  			<i class="iconfont" v-on:click="selfCheck" :count="w_index">{{item.selected==1?'&#xe618;':''}}</i>
  			<router-link :to="{path:'/goodsDetails',query:{id:item.goods_id}}"><img v-bind:src="imgPre + item.image.image_url"/><h6 v-if="item.is_on_sale==0||item.store_count==0||+item.goods_num>item.store_count"></h6></router-link>
  			<strong v-if="item.store_count==0&&item.is_on_sale==1">此商品已售罄</strong>
  			<strong v-if="+item.goods_num>item.store_count&&item.store_count!=0&&item.is_on_sale==1">商品库存不足</strong>
  			<strong v-if="item.is_on_sale==0">此商品已下架</strong>
  			<span><router-link :to="{path:'/goodsDetails',query:{id:item.goods_id}}">{{item.goods_name}}</router-link></span>
  			<span>{{item.spec_key_name}}</span>
  			<span>{{item.goods_id}}</span>
  			<span>￥{{item.member_goods_price}}</span>
  			<div><button v-on:click="jian">-</button><b class="goodsNum">{{item.goods_num}}</b><button v-on:click="jia" :count="item.store_count">+</button></div>
  			<span>￥{{item.goods_fee}}</span>
  			<span class="remove_menu" v-on:click="shan" :remove_id="item.id" :count="w_index">删除</span>
  		</div>
  	</div>
  	<div class="clearList" v-if="cartnone"><i class="iconfont getAll" v-on:click="getAll"></i><span>全选</span><span v-on:click="pishan">批量删除</span>共{{this.jianshu}}件商品<span>商品总额（不含运费）：<b>¥{{this.zongjia}}</b></span><button id="orders" v-on:click="ok_go">确认下单</button>
  	</div>
  	<div class="cartnone" v-if="!cartnone">
  		<img src="../../static/images/cartnone.png"><span>您的购物车空空如也哦~</span><span><router-link to="/">请继续购物</router-link></span>
  	</div>
  	</div>
  	<indexFooter></indexFooter>
  </div>
</template>
 
<script>
import tIndexHeader from '@/components/common/mine_header'
import indexFooter from '@/components/common/index_footer'

export default {
  name: 'shopCart',
  data () {
    return {
		imgPre:this.$store.state.img.imgPre,
		cartList:[],
		check:false,
		checks:true,
		shanOK:false,
		goShop:false,
		updateInfo:"",
		zongjia:0,
		jianshu:0,
		cartnone:false
    }
  },
  components:{
  	indexFooter,tIndexHeader
  },
  	beforeCreate(){

        let proof  = this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');

        if(proof == 1 ){

        }else if(proof == -1){            						// 审核中
        	this.$message("认证状态中，暂无权限访问该页面");
        	this.$router.push('/');

        }else if(proof == -2 || proof == -3 ){     				// 审核没通过 未查询到数据
        	this.$message("认证失败，请重新进行审核");
            this.$router.push('/proof');
        }else if(proof == -4 ){     							// 未提交认证
        	this.$message("未提交认证，请先认证");
            this.$router.push('/proof');
        }else{
        	this.$router.push('/login');
        }

	},
  mounted(){
  	this.getHttp();
  },
  methods:{
      removeCookie(cookieName) {
				let cookies = document.cookie.split(";");
				for (let i = 0; i < cookies.length; i++) {
					if (cookies[i].indexOf(" ") == 0) {
						cookies[i] = cookies[i].substring(1);
					}
					if (cookies[i].indexOf(cookieName) == 0) {
						let exp = new Date();
						exp.setTime(exp.getTime() - 60 * 1000);
						document.cookie = cookies[i] + ";expires=" + exp.toUTCString();
						break;
					}
				}
			},
  	//更新数据
  	updataHttp(){
  		this.getInfo();
  		let that = this;
  		$.ajax({
  			type:"post",
  			url:that.$store.state.apilink+"?s=api/cart/update",
  			async:true,
  			dataType:"json",
  			data:that.updataInfo,
  			success:function(data){
  				// console.log(data)
  				that.cartList = data.data.cartList;

  				if(that.cartList.length == "0"){
	    			that.cartnone = false;
	    		}else{
	    			that.cartnone = true;
	    		}
					that.gongjia();
					that.watchCheck();
  			}
  		});
  	},
  	//计算总价
  	gongjia(){
  		this.jianshu = 0;
  		this.zongjia = 0;
			for(let i=0,len=this.cartList.length;i<len;i++){
				if(this.cartList[i].selected == '1'){
					this.jianshu++;
					this.zongjia = +this.zongjia + this.cartList[i].member_goods_price*this.cartList[i].goods_num;
					this.zongjia = this.zongjia.toFixed(2)
				}
			}
  	},
  	//获取列表
  	getInfo(){
  		let getArr = $(".carList i");
  		let id_Info = "";
  		let num_Info = "";
  		for(let i=0,len=getArr.length;i<len;i++){
  			if(getArr[i].innerHTML != ""){
  				id_Info += "'"+$(".remove_menu").eq(i).attr("remove_id")+"':'"+"1"+"',";
  				// console.log($(".carList .carCase").eq(i).children().eq(8))
  			}
				num_Info += "'"+$(".remove_menu").eq(i).attr("remove_id")+"':'"+$(".goodsNum").eq(i).html()+"',";
  		}
  		id_Info = eval("({"+id_Info.slice(0,id_Info.length-1)+"})");
  		num_Info = eval("({"+num_Info.slice(0,num_Info.length-1)+"})");
  		this.updataInfo = {
  			'cart_select':id_Info,
				'goods_num':num_Info
  		}
  	},
  	//请求获取商品列表
  	getHttp(){
  		let that = this;
  		$.ajax({
	    	type:"get",
	    	dataType:"json",
	    	url:that.$store.state.apilink+"?s=api/cart/getlist",
	    	success:function(data){
	    		// console.log(data)
	    		that.cartList = data.data.cartList;
	    		that.gongjia();
	    		if(that.cartList.length == "0"){
	    			that.cartnone = false;
	    		}else{
	    			that.cartnone = true;
	    		}
  				$(".w-shop-cart").css({'filter':'alpha(opacity=100)','opacity':'1'})
	    		setTimeout(function(){
		    		that.watchCheck();
	    		},100)
	    	}
    	});
  	},
  	//删除请求
  	removeHttp(Ids){
  		let that = this;
  		that.shanOK = false;
  		$.ajax({
	    	type:"post",
	    	url:that.$store.state.apilink+"?s=api/cart/remove&ids="+Ids,
	    	async:false,
	    	success:function(data){
	    		if(JSON.parse(data).error == 0){
	    			that.shanOK = true;
	    		}
	    	}
    	});
  	},
  	//删除元素
  	shan(e){
  		let goodsId = $(e.target).parent().children().eq(4).html();
  		let ids = $(e.target).attr("remove_id");
  		let cts = $(e.target).attr("count");
  		//发送删除请求
  		this.removeHttp(ids)
  		if(this.shanOK){
				this.cartList.splice(cts,1);
  			this.updataHttp();
  		}else{
  			this.$message("删除失败");
  		}
			
  	},
  	//批量删除
  	pishan(){
  		let sArr = $(".carList i");
			let goodArr = [];
  		for(let i=0,len=sArr.length;i<len;i++){
  			if(sArr[i].innerHTML != ""){
  				goodArr.push(this.cartList[i].id);
  			}
  		}
  		goodArr=goodArr.join(",")
  		//发送删除请求
  		this.removeHttp(goodArr)
  		$(".w-shop-cart i").html("")
  		if(this.shanOK){
  			//发送更新请求
  			this.updataHttp();
  		}else{
  			alert("删除失败")
  		}
  		this.watchCheck();
  	},
  	//全选
  	getAll(){
			this.check = !this.check;
			if($(".carList i").length == 0){
				this.check=false;
			}
			if(this.check){
				$(".w-shop-cart i").html("&#xe618;")
				$("#orders").css({"background-color":"#E64346","color":"#fff"})
			}else{
				$(".w-shop-cart i").html("")
				$("#orders").css({"background-color":"#ccc","color":"#999"})
			}
			this.updataHttp();
  	},
  	//单选
  	selfCheck(e){
  		if(e.target.innerHTML == ""){
  			e.target.innerHTML = "&#xe618;"
  		}else{
  			e.target.innerHTML = ""
  		}
  		this.watchCheck();
  		this.updataHttp();
  	},
  	//加数量
  	jia(e){
  		if($(e.target).prev().html() == $(e.target).attr("count")){
  			this.updataHttp();
  			return;
  		}
  		$(e.target).prev().html(+$(e.target).prev().html()+1)
  		this.updataHttp();
  	},
  	//减数量
  	jian(e){
  		if($(e.target).next().html()=="1"){
  			this.updataHttp();
  			return;
  		}
  		$(e.target).next().html(+$(e.target).next().html()-1)
  		this.updataHttp();
  	},
  	//单选监听事件
  	watchCheck(){
  		let checkArr = $(".carList i");
  		this.goShop = false;
  		this.checks = true;
  		for(let i=0,len=checkArr.length;i<len;i++){
  			if(checkArr[i].innerHTML == ""){
  				this.checks = false
  				this.check = false
  			}else{
  				this.goShop = true
  			}
  		}
  		if(checkArr.length == 0){
  			this.checks = false;
  		}
  		if(this.checks){
	  		$(".getAll").html("&#xe618;")
	  		this.check = true;
  		}else{
  			$(".getAll").html("")
  			this.check = false;
  		}
  		if(this.goShop){
  			$("#orders").css({"background-color":"#E64346","color":"#fff"})
  		}else{
  			$("#orders").css({"background-color":"#ccc","color":"#999"})
  		}
  	},
  	//确认下单
  	ok_go(){
  		if($("#orders").css("background-color") == "rgb(204, 204, 204)"){
  			this.$message('请选择商品');
  		}else{
  			// 购物车页面标志cookie path1Sign 10s删除 该标志下才能进入 /order 页面
  			this.$cookie.setCookie('path1Sign','true','s10');
			this.$router.push({path:"order"});
  		}
  	}
  }
}
</script>

<style scoped>
	.w-shop-cart{
		width:1000px;
		padding:22px 0 40px 0;
		margin:0 auto;
		min-height:500px;
	}
	.w-shop-cart h3{
		font-weight: 600;
		text-align: left;
		color:#333;
	}
	.w-shop-cart p{
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
	.w-shop-cart p i{
		cursor: pointer;
		display: inline-block;
		line-height:1;
		width:15px;
		height:15px;
		border:1px solid #A7A7A7;
		margin:0 15px;
	}
	.w-shop-cart p span:nth-of-type(2){
		margin:0 130px 0 110px
	}
	.w-shop-cart p span:nth-of-type(4){
		margin:0 110px 0 90px
	}
	.w-shop-cart p span:nth-of-type(6){
		margin:0 95px 0 120px;
	}
	.w-shop-cart .carCase{
		width:998px;
		height:118px;
		overflow: hidden;
		position:relative;
		border:1px solid #D8D8D8;
		margin-bottom: 12px;
	}
	.w-shop-cart .carCase div{
		float:left;
	}
	.w-shop-cart .carCase i{
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
	.w-shop-cart .carCase img{
		position:absolute;
		left:50px;
		top:10px;
		width:98px;
		height:98px;
		/*border:1px solid #D8D8D8;*/
	}
	.w-shop-cart .carCase span{
		display: inline-block;
		font-size:14px;
		color:#333;
		position: absolute;
	}
	.w-shop-cart .carCase span:nth-of-type(1){
		left:172px;
		top:30px;
		width:150px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.w-shop-cart .carCase span:nth-of-type(2){
		left:172px;
		top:65px;
		color:#999;
	}
	.w-shop-cart .carCase span:nth-of-type(3){
		left:375px;
		top:30px;
	}
	.w-shop-cart .carCase span:nth-of-type(4){
		left:491px;
		top:30px;
	}
	.w-shop-cart .carCase div{
		height:28px;
		position:absolute;
		left:614px;
		top:27px;
		border:1px solid #D8D8D8
	}
	.w-shop-cart .carCase div button{
		float:left;
		cursor: pointer;
		width:28px;
		height:30px;
	}
	.w-shop-cart .carCase div b{
		font-size:14px;
		line-height:28px;
		color:#333;
		height:100%;
		font-weight: 100;
		float: left;
		width:40px;
		border:1px solid #D8D8D8;
		border-top:none;
		border-bottom:none;
		text-align: center;
	}
	.w-shop-cart .carCase span:nth-of-type(5){
		left:780px;
		top:30px;
	}
	.w-shop-cart .carCase span:nth-of-type(6){
		right:60px;
		top:30px;
		cursor: pointer;
	}
	
	.w-shop-cart .clearList{
		font-size:14px;
		position:relative;
		display: flex;
		align-items:center;
		text-align: left;
		width:998px;
		height:58px;
		border:1px solid #D8D8D8;
	}
	.w-shop-cart .clearList i{
		cursor: pointer;
		display: inline-block;
		background-color: #F2F2F2;
		line-height:1;
		width:15px;
		height:15px;
		border:1px solid #A7A7A7;
		margin:0 15px;
	}
	.w-shop-cart .clearList span:nth-of-type(2){
		margin:0 380px 0 40px;
		cursor: pointer;
	}
	.w-shop-cart .clearList span:nth-of-type(3){
		margin:0 27px; 
	}
	.w-shop-cart .clearList button{
		display: block;
		position:absolute;
		cursor:pointer;
		right:0;
		top:0;
		width:100px;
		height:100%;
		background-color:#ccc;
	}
	
	.w-shop-cart .cartnone{
		position:relative;
		width:500px;
		margin:200px auto;
	}
	.w-shop-cart .cartnone span:first-of-type{
		position:absolute;
		left:155px;
		top:10px;
	}
	.w-shop-cart .cartnone span:last-of-type a{
		position:absolute;
		left:155px;
		top:40px;
		color:#FF1B1B;
		text-decoration: underline;
	}
	.w-shop-cart .carCase strong{
		position:absolute;
		font-size:14px;
		font-weight: 100;
		left:172px;
		top:90px;
		color:#f00;
		z-index: 100;
	}
	.w-shop-cart .carCase h6{
		position:absolute;
		width:100px;height:100px;
		background: #ccc;
		top:10px;left:50px;
		opacity: 0.7;
		z-index: 10;
	}
</style>