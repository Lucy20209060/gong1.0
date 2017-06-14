<template>
	<div class="payway-weixin">
		<mineHeader></mineHeader>
		<div class="paymentcenter">
			<div class="title">
				请您及时付款，以便订单尽快处理！
			</div>
			<div class="ordermsg">
				<div>订单编号：{{order_sn}}</div>
				<router-link :to="'/payment?id='+ orderNumber"><div v-model="paid_money" class="paid_money"><返回支付方式页面</div></router-link>
			</div>
			<div class="payway-area">
				<div class="weixinsaoyisao">
					<ul  class="pay-detail">
						<li>
							<img src="/static/images/wechat2.png" />
						</li>
						<li style="border-bottom: 2px solid #D5D5D5;height: 70px;">
							应付金额：￥<span style="font-size: 36px;color: #666666">{{paid_money}}</span>
						</li>
						<li >
							请您于<span class="time">{{pay_remain_time | timeStamp}}</span>内完成支付
						</li>
					</ul>
					<div>
						<div class="erweima">
							<img v-lazy="imgerweima" />
						</div>
						<img src="/static/images/saoyisaotishi.png">
					</div>
					<img src="/static/images/saoyisao.png" class="phone" />
				</div>
			</div>
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import mineHeader from '@/components/common/mine_header'
	import IndexFooter from '@/components/common/index_footer'
	export default {
		name: 'payment',
		data () {
			return {
				order_sn:'',
				paid_money:'',
				pay_remain_time:''*1,
				orderNumber:this.$route.query.id,
				zhifubaochecked:false,
				weixinchecked:false,
				yinlianchecked:false,
				imgerweima:''
			}
		},
		components:{
			mineHeader,
			IndexFooter
		},
		beforeCreate(){
			// 如果有payment页面标志 才能进入paywayWeixin页面 否则进入 我的订单 页面 

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

		    if(this.$cookie.getCookie('path3Sign')){
	            return;
	        }else{
	        	this.$router.push('/mine/myIndent');
	        }


		},
		beforeMount(){
			let _this = this;
			_this.getOrderMsg(_this.orderNumber)
			_this.getWeixinErweima();
		},
		filters:{
			timeStamp(second_time) {
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
				return time;
			},
		},
		methods:{
			getOrderMsg(id){
				let _this = this;
				$.ajax({
					url: this.$store.state.apilink+"?s=api/order/detail&id="+id,
					dataType: "json",
					type: 'get',
					success: function (res) {
						// console.log(res);
						_this.order_sn = res.data.order_sn
						_this.paid_money = res.data.total_amount
						_this.time(res.data.pay_remain_time)
						_this.checkpay()
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			time(o) {
				let _this = this;
				let second_time = parseInt(o);
				let T ;
				if (second_time <= 0) {
					clearTimeout(T);
					_this.$message('订单超时请重新下单');
					_this.$router.push("/mine/orderDetail?id="+_this.orderNumber)
				} else {
					second_time --;
					_this.pay_remain_time = second_time;
					T = setTimeout(function () {
						_this.time(second_time)
					},1000)
				}
			},
			checkpay() {
				let _this = this;
				$.ajax({
					url: this.$store.state.apilink+"?s=api/order/info&order_sn="+_this.order_sn,
					dataType: "json",
					type: 'get',
					success: function (res) {
						let T ;
						if (res.data.status == 0) {
							T = setTimeout(function () {
								_this.checkpay()
							},1000)
						}else{
							clearTimeout(T);
							_this.$router.push("/mine/orderDetail?id="+_this.orderNumber)
						}
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			getWeixinErweima(){
				let _this = this
				$.ajax({
					url: this.$store.state.apilink+"?s=api/payment/wxqrcode&order_id="+_this.orderNumber,
					dataType: "json",
					type: 'get',
					success: function (res) {
						_this.imgerweima = res.data
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
		}
	}

</script>

<style scoped>
	.payway-weixin{
		width: 100%;
		background: #f5f5f5;
		/*padding: 20px 0 380px 0;*/
	}
	.payway-weixin .paymentcenter{
		padding: 10px 0 100px 0;
		width: 1000px;
		margin: 0 auto;
	}
	.payway-weixin .title{
		margin-bottom: 13px;
	}
	.payway-weixin .paid_money{
		color:#E64346;
	}
	.payway-weixin .ordermsg{
		display: flex;
		justify-content: space-between;
		margin-bottom: 13px;
	}
	.payway-weixin .payway-area{
		background:#fff;
		border:1px solid #BDBDBD;
		width: 100%;
		height: auto;
		/*padding: 18px 20px 40px 20px ;*/
	}
	.payway-weixin .pay-detail{
		width: 250px;
		height: 250px;
		margin-right: 80px;
		/*text-align: center;*/
	}
	.payway-weixin .pay-detail li{
		height: 60px;
		line-height: 60px;
		font-size: 14px;
	}
	.payway-weixin .time{
		color: #E64346;
	}
	.payway-weixin .weixinsaoyisao{
		padding: 125px 0; 
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.payway-weixin .erweima{
		border:1px solid #D9D9D9;
		width: 214px;
		height: 214px;
		padding: 10px;
		margin: 0 10px 10px 0;
	}
	.payway-weixin .erweima img{
		height: 100%;
		width: 100%;
	}
	.payway-weixin .phone{
		margin-top:22px;
	}
</style>
