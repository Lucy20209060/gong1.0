<template>
  <div class="w-order-detail" style="filter:alpha(opacity=0);opacity:0;">
  	<h3>订单详情</h3>
  	<div v-if="errorCode != 1" class="stateInfo">

  		<div class="non-payment" v-if="status==0">
  			<p>当前订单状态：待付款</p>
  			<p>请在{{outTime}}内付款，否则订单取消</p>
  			<p><router-link :to="{path:'/payment',query:{id:orderInfo.order_id}}" ><button>立即付款</button></router-link><button @click="outOrder">取消订单</button></p>
  		</div>

  		<div class="overTime" v-if="status==11||status==5||status==4">
  			<p>当前订单状态：交易关闭</p>
  		</div>

  		<div class="unfilled" v-if="status==1">
  			当前订单状态：待发货
  		</div>

  		<div class="waitfill" v-if="status==2 || status==10">
  			<p v-if="status==2">当前订单状态：待收货</p>
  			<p style="padding:20px 0;" v-if="status==2">还剩{{confirmT}}系统自动确认收货</p>
  			<p v-if="status==2"><button @click="confirm">确认收货</button></p>
  			<p v-if="status==10">当前订单状态：交易成功</p>
  		</div>

  	</div>

  	<div class="stateInfo shipping-wrap" v-if="status==2 || status==10"  style="background:#fff;">

		<!-- 只有一个包裹 -->
			<div class="shipping-1" v-if="orderInfo.shipping.length == 1">
				<ul class="card-ul">
					<li v-for="(item4,index) in orderInfo.shipping[0].goodsList" key="index">
						<img v-bind:src="imgPre + item4.img_url" />
						<span>{{item4.goods_name}}</span>
					</li>
				</ul>

				<dl class="card-dl" v-if="orderInfo.shipping[0].is_send == 1">
					<dd>物流公司：{{orderInfo.shipping[0].shipping_name}}</dd>
					<dd>物流单号：{{orderInfo.shipping[0].shipping_code}}</dd>
					<dd class="card-dl-dd">
						<div class="card-dl-dd-div1">物流信息：</div>
						<div class="card-dl-dd-div2">
							<span v-for="(item5,index) in orderInfo.shipping[0].data" 
							:class="{shippingSign:index+1 == orderInfo.shipping[0].data.length}"
								key="index">

								<i>{{item5.ftime}}</i>
								<i>{{item5.context}}</i>
							</span>
						</div>
					</dd>
				</dl>

				<dl class="card-dl card-dl-no" v-if="orderInfo.shipping[0].is_send != 1">
  					<img src="/static/images/logistics.png" />
  					<span>该包裹暂无物流信息</span>
  				</dl>
			</div>
		
		<!-- 多个包裹 -->
		<el-tabs v-if="orderInfo.shipping.length > 1">
		  <el-tab-pane v-for="(item,index) in orderInfo.shipping" key="index">
		    <span slot="label">包裹{{ Number(index) + 1 }}</span>
  			<div>
  				<ul class="card-ul">
  					<li v-for="(item2,index) in item.goodsList" key="index">
  						<img v-bind:src="imgPre + item2.img_url" />
  						<span>{{item2.goods_name}}</span>
  					</li>
  				</ul>

  				<dl class="card-dl" v-if="item.is_send == 1">
  					<dd>物流公司：{{item.shipping_name}}</dd>
  					<dd>物流单号：{{item.shipping_code}}</dd>
  					<dd class="card-dl-dd">
  						<div class="card-dl-dd-div1">物流信息：</div>
  						<div class="card-dl-dd-div2">

  							<span v-for="(item3,index) in item.data" 
							:class="{shippingSign:index+1 == item.data.length}"
								key="index">
								<i>{{item3.ftime}}</i>
								<i>{{item3.context}}</i>
							</span>
  						</div>
  					</dd>
  				</dl>

  				<dl class="card-dl card-dl-no" v-if="item.is_send != 1">
  					<img src="/static/images/logistics.png" />
  					<span>该包裹暂无物流信息</span>
  				</dl>
  			</div>

		  </el-tab-pane>
		</el-tabs>
  	</div>

  	<div v-if="errorCode != 1" class="indentInfo">
  		<h4>订单信息</h4>
  		<p>订单编号：{{orderInfo.order_sn}}</p>
  		<p>下单时间：{{addTime}} </p>
  		<p>支付金额：￥{{orderInfo.total_amount}}</p>
  		<p>用户信息：<span>{{orderInfo.consignee}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{orderInfo.mobile}}&nbsp;&nbsp;&nbsp;&nbsp;<span>{{orderInfo.province_name}}{{orderInfo.city_name}}{{orderInfo.district_name}}{{orderInfo.address}}</span></p>
  	</div>
  	<h4 v-if="errorCode != 1" class="casetitle">商品信息</h4>
  	<div class="caseInfo" v-if="errorCode != 1">
  		<p><i>商品</i><i>数量</i><i>单价</i><i>订单额（元）</i><i>商品操作</i><b style="color:#999">交易状态</b></p>
  		<div class="detailInfo" v-for="(item,q_index) in orderInfo.goods_list" key="q_index">

  			<img v-bind:src="imgPre + item.image.image_url" />

	  		<span v-text="item.goods_name">商品名称</span>

			<span v-text="'x'+item.goods_num">商品数量</span>

			<span v-text="item.goods_price">商品价格</span>

			<span v-text="item.total_amount">订单额</span>

			<span class="orderdetail-spec_key" v-text="item.spec_key_name">商品规格</span>
			
			<!-- 交易状态 -->
			<b class="return_status" v-if="item.return.status==1">申请中</b>

	  		<b class="return_status" v-if="item.return.status==2||item.return.status==3">
	  			{{item.return.type==0?"申请中":"待退货"}}
	  		</b>

	  		<b class="return_status" v-if="item.return.status==10 || item.return.status==12">
	  			{{item.return.type==0?"退款成功":"退货退款成功"}}
	  		</b>

	  		<b class="return_status" v-if="item.return.status==11">
	  			{{item.return.type==0?"退款失败":"退货退款失败"}}
	  		</b>
			
			<!-- 商品操作 -->
	  		<div class="jiao_state">
	  			<router-link 
	  				:to="{path:'refunds',query:{goods_id:item.goods_id,order_sn:orderInfo.order_sn,goods_spec:item.spec_key,return_sn:item.return.return_sn}}" 
	  				v-if="item.return.status==-1&&status!=0&&status!=4&&status!=5&&status!=11">
	  				<button class="pointer">
	  					退货退款
	  				</button>
	  			</router-link>

				<router-link 
					:to="{path:'refundDetail',query:{goods_id:item.goods_id,order_sn:orderInfo.order_sn,return_sn:item.return.return_sn}}" 
					v-if="item.return.status==2">
					<button class="tuih pointer">
						退货
					</button>
				</router-link>

				<router-link 
					:to="{path:'refundDetail',query:{goods_id:item.goods_id,order_sn:orderInfo.order_sn,goods_spec:item.spec_key,return_sn:item.return.return_sn}}" 
					v-if="item.return.status==1||item.return.status==3||item.return.status==10||item.return.status==11||item.return.status==12">
					<button class="pointer">
						退款详情
					</button>
				</router-link><br />
				<button 
					class="pointer" 
					@click="cancel(item.goods_id,item.spec_key)" 
					v-if="item.return.status==2||item.return.status==1||item.return.status==3">
					取消退款
				</button>
	  		</div>
  		</div>
  	</div>

  	<section class="noOrder" v-if="errorCode == 1">
  		<p><img src="/static/images/kongb.png" /></p>
  		<p>抱歉，没有获取到订单信息~</p>
  	</section>


  </div>
</template>

<script>
export default {
  name: 'order-detail',
  data () {
    return {
    	imgPre:this.$store.state.img.imgPre,
		status:"",
		orderInfo:"",
		outTime:"",
		order_id:"",
		addTime:"",
		confirmT:"",
		return_status:"",
		errorCode:''
    }
  },
  	beforeCreate(){
  		
        let proof  = this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');

        if(proof == 1 ){

        }else if(proof == -1){            // 审核中
        	this.$message("认证状态中，暂无权限访问该页面");
        	this.$router.push('/');

        }else if(proof == -2 || proof == -3 ){     // 审核没通过 未查询到数据
        	this.$message("认证失败，请重新进行审核");
            this.$router.push('/proof');
        }else if(proof == -4 ){     // 未提交认证
        	this.$message("未提交认证，请先认证");
            this.$router.push('/proof');
        }else{
        	this.$router.push('/login');
        }
	},
  created(){
  	//获取订单id
  	this.order_id = this.$route.query.id

  },
  beforeMount () {
  	this.getHttp();
  },
  destroyed(){
    // console.log(22)
  },
  methods : {
	// 获取订单详情
  	getHttp(){
  		let that = this;
  		$.ajax({
  			type:"get",
			url:this.$store.state.apilink+"?s=api/order/detail&id="+this.order_id,
  			dataType:"json",
  			success:function(data){
					$(".w-order-detail").animate({'filter':'alpha(opacity=100)','opacity':'1'})
  				let info = data;
  				that.errorCode = data.error;
  				console.log(data)
  				let d = new Date();
  				d.setTime(info.data.add_time*1000);
  				//状态码
  				that.status = info.data.order_status;
  				that.return_status = info.data.return_status;
  				that.orderInfo = info.data;
  				//设置剩余时间
  				that.confirmTime(that.orderInfo.confirm_shipping_remain_time);
  				// console.log(that.orderInfo.pay_remain_time)
  				that.timeStamp(that.orderInfo.pay_remain_time);	
  				//设置下单时间
  				that.addTime = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 " +(d.getHours()>9?d.getHours():"0"+d.getHours())+":"+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
			  	
  			}
  		});
  	},
  	//剩余小时
  	confirmTime(s){
  		this.confirmT =  Math.floor(s/60/60/24)+"天"+Math.floor(s/60/60%24)+"时"
  	},
  	//计算时间方法
  	timeStamp(second_time){

  		let that = this;
	  		let SecondTime = setInterval(function(){

				let time = parseInt(second_time) + "秒";
				if (parseInt(second_time) > 60) {
					let second = parseInt(second_time) % 60;
					let min = parseInt(second_time / 60);
					time = min + "分" + second + "秒";
					if (min > 60) {
						min = parseInt(second_time / 60) % 60;
						let hour = parseInt(parseInt(second_time / 60) / 60);
						time = hour + "小时" + min + "分" + second + "秒";
						if (hour > 24) {
							hour = parseInt(parseInt(second_time / 60) / 60) % 24;
							let day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
							time = day + "天" + hour + "小时" + min + "分" + second + "秒";
						}
					}
				}

				second_time--;

				// console.log(second_time)

				// 计时结束 清除定时器，取消订单
				if(second_time <= 0){
					clearInterval(SecondTime);
					if(that.status == 0 ||that.status == 2){
						that.outOrder();
					}
					
				}

				// 组件卸载后 清除定时器 防止在进入其他页面后 仍在执行
				if (that && that._isDestroyed){
					clearInterval(SecondTime);
				}

				that.outTime = time;

			},1000)
		
  	},
  	//取消订单
  	outOrder(){
  		let that = this;
  		$.ajax({
  			type:"get",
			url:this.$store.state.apilink+"?s=api/order/cancel&id="+this.order_id,
  			dataType:"json",
  			success:function(data){
  				if(data.error == 0){
	  				that.$message("取消订单成功");
						that.$router.push({path:'myIndent'})
  				}else{
  					that.$message(data.error_code);
  				}
  			}
  		})
  	},
  	//确认收货
  	confirm(){
  		let that = this;
  		$.ajax({
  			type:"post",
 			url:this.$store.state.apilink+"?s=api/order/confirm&id="+that.order_id,
  			dataType:"json",
				success:function(data){
					if(data.error == 0){
						that.$message("确认收货成功");
						that.$router.push({path:'myIndent'})
					}else{
						that.$message(data.error_code)
					}
				}
  		});
  	},
  	//取消退货
  	cancel(gid,spec){
  		let that = this;
  		$.ajax({
  			type:"get",
			url:this.$store.state.apilink + "?s=api/order/return_cancel",
			data:{
				order_sn:that.orderInfo.order_sn,
				goods_id:gid,
				goods_spec:spec
			},
  			dataType:"json",
  			success:function(data){
  				if(data.error == 0){
  					that.$message("取消退款成功");
  					that.$router.push({path:'myIndent'})
  				}else{
  					that.$message(data.error_code)
  				}
  			}
  		});
  	}
  }
}
</script>

<style scoped>
	.w-order-detail .card-dl-no{
		text-align: center;
		padding: 30px 0;
	}
	.w-order-detail .card-dl-no span{
		display: block;
		padding-top:10px; 
	}
	.shippingSign{
		color: #333;
	}
	.card-dl-dd-div1{
		float: left;
		width: 70px;
	}
	.card-dl-dd-div2{
		float: left;
		width: calc(100% - 70px);
		width: -moz-calc(100% - 70px);
		width: -webkit-calc(100% - 70px);
	}
	.card-dl-dd-div2 span{
		overflow: hidden;
		margin-bottom: 6px;
	}
	.card-dl-dd-div2 span i:nth-of-type(1){
		float: left;
		width: 150px;
	}
	.card-dl-dd-div2 span i:nth-of-type(2){
		float: left;
		width: calc(100% - 152px);
		width: -moz-calc(100% - 152px);
		width: -webkit-calc(100% - 152px);
	}
	.card-dl-dd div span{
		display: block;
		margin-left:0 !important;
	}
	.card-dl-dd{
		overflow: hidden;
	}
	.card-ul,.card-dl{
		float: left;
		height: auto;
	}
	.card-ul{
		width: 150px;
		margin-left:10px;
	}
	.card-dl{
		width: 660px;
		border-left: 1px solid #eee;
		padding-left:40px;
		color: #999;
	}
	.card-ul li{
		display: block;
		height:36px;
		margin-bottom: 4px;
	}
	.card-ul li img{
		float: left;
		height: 100%;
		width: 36px;
	}
	.card-ul li span{
		float: left;
		height: 100%;
		width: calc(100% - 36px);
		width: -moz-calc(100% - 36px);
		width: -webkit-calc(100% - 36px);
		vertical-align: top;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		padding-left: 10px;
		text-overflow: ellipsis;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		box-sizing: border-box;
	}
	.waitfill .el-tab-pane > div,.shipping-1{
		height: 200px;
		overflow-y:auto; 
		background: #fff;
		padding: 20px 0;
	}
	.noOrder{
		text-align: center;
		padding: 100px 0 20px;
	}
	.noOrder img{
		width: 110px;
		height:auto;
		margin-bottom: 20px;
	}
	.w-order-detail{
		float:left;
		background-color: #fff;
		width:970px;
		min-height: 500px;
		padding:20px 27px 115px 23px;
	}
	.w-order-detail h3{
		color:#333;
		padding-bottom:14px;
		border-bottom: 1px solid #D8D8D8;
	}
	.w-order-detail .stateInfo{
		width:968px;
		font-size:14px;
		min-height:100px;
		background-color: #FEFDF9;
		border:1px solid #D8D8D8;
		margin:20px 0 30px;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		box-sizing: border-box;
		padding:20px 30px;
		align-items:center;
	}
	.w-order-detail .stateInfo .non-payment>p:nth-of-type(2){
		margin:20px 0;
	}
	.w-order-detail .stateInfo .non-payment button,.w-order-detail .stateInfo .waitfill button{
		cursor:pointer;
		width:90px;height:30px;
		border:1px solid #D8D8D8;
		border-radius:4px;
		background-color: #009E4D;
		color:#fff;
	}
	.w-order-detail .stateInfo .non-payment button:nth-of-type(2){
		margin-left:20px;
		background-color:#f2f2f2;
		color:#333;
	}
	
	.w-order-detail .stateInfo .overTime p:first-child,.w-order-detail .stateInfo .dealSuccess p:first-child{
		margin-bottom:10px;
	}

	.w-order-detail .indentInfo h4{
		color:#333;
	}
	.w-order-detail .indentInfo p{
		font-size:14px;
		color:#999;
	}
	.w-order-detail .indentInfo p:nth-of-type(1){
		margin:20px 0 10px;
	}
	.w-order-detail .indentInfo p:nth-of-type(3){
		margin:10px 0;
	}
	.w-order-detail .casetitle{
		color:#333;
		margin:50px 0 20px;
	}
	.w-order-detail .caseInfo{
		width:968px;
		border:1px solid #D8D8D8;
		position:relative;
	}
	.w-order-detail .caseInfo p{
		height:32px;
		border-bottom: 1px solid #D8D8D8;
		display: flex;
		position: relative;
		align-items:center;
	}
	.w-order-detail .caseInfo p b{
		position: absolute;
		left:490px;
		top:5px;
		font-weight: 100;
	}
	.w-order-detail .caseInfo p i{
		display: inline-block;
		color:#999;
	}
	.w-order-detail .caseInfo p i:nth-of-type(1){
		margin:0 240px 0 50px;
	}
	.w-order-detail .caseInfo p i:nth-of-type(3){
		margin:0 195px 0 55px;
	}
	.w-order-detail .caseInfo p i:nth-of-type(5){
		margin-left:87px;
	}
	.w-order-detail .caseInfo img{
		position:absolute;
		left:20px;
		top:12px;
		width:88px;height:88px;
		/*border:1px solid #D8D8D8*/
	}
	.w-order-detail .caseInfo span{
		position:absolute;
		font-size:14px;
	}
	.w-order-detail .caseInfo .detailInfo>span:nth-of-type(1){
		left:140px;
		top:34px;
		color:#333;
		display: inline-block;
		width:150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.w-order-detail .caseInfo .detailInfo>span:nth-of-type(2){
		left:330px;
		top:34px;
		color:#999;
	}
	.w-order-detail .caseInfo .detailInfo>span:nth-of-type(3){
		left:410px;
		top:34px;
		color:#999;
	}
	.w-order-detail .caseInfo .detailInfo>span:nth-of-type(4){
		left:664px;
		top:34px;
	}
	.w-order-detail .caseInfo .detailInfo .orderdetail-spec_key{
		left:140px;
		top:68px;
		color: #666;
	}
	
	.w-order-detail .waitfill > div,.w-order-detail .dealSuccess div{
		border-top:1px solid #D8D8D8;
		margin-top:10px;
		padding:15px 0;
		width:100%;
	}
	.w-order-detail .waitfill div span,.w-order-detail .dealSuccess div span{
		margin-left:70px;
	}
	.w-order-detail .waitfill div span:first-of-type,.w-order-detail .dealSuccess div span:first-of-type{
		margin-left:0px;
	}
	.w-order-detail .return_status{
		position: absolute;
		font-weight:100;
		left:492px;
		top:34px;
		font-size:14px;
	}
	.w-order-detail .tuih{
		width:78px;height:28px;
		background-color: #f2f2f2;
		border:1px solid #D8D8D8;
	}
	.w-order-detail .caseInfo .jiao_state{
		width: 100px;height:90px;
		margin:25px 64px 0 0;
		position: absolute;
		right:0;top:0px;
		text-align: center;
		background-color: #fff;
	}
	.w-order-detail .detailInfo{
		overflow: hidden;
		position:relative;
		height:116px;
		border-top: 1px solid #D8D8D8;
	}
	.w-order-detail .detailInfo:first-of-type{
		border-top:none;
	}
	.w-order-detail .shipping-wrap{
		height: auto;
		border: 0;
		overflow-y:auto; 
		margin-top: 0;
		padding: 0 0 20px 0;
	}
</style>