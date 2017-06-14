<template>
	<div class="payment">
		<mineHeader></mineHeader>
		<div class="paymentcenter">
			<div class="title">
				选择付款方式：
			</div>
			<div class="ordermsg">
				<div>订单编号：{{order_sn}}</div>
				<div v-model="paid_money">实付：￥<span class="totalmoney">{{paid_money}}</span></div>
			</div>
			<div class="payway-area">
				<div class="paywaytop">
					<div>支付方式</div>
					<ul class="payway">
						<li>
							<input type="radio" id="zhifubao" :checked="zhifubaochecked" name="" v-on:click="choicePayway('zhifubao')" />
							<label for="zhifubao">
								<img src="/static/images/zhifubao.png" />
							</label>
						</li>
						<li>
							<input type="radio" id="weixin" :checked="weixinchecked"  name="" v-on:click="choicePayway('weixin')" />
							<label for="weixin">
								<img src="/static/images/weixin.png" />
							</label>
						</li>
					 <li>
						<input type="radio" id="yinlian" :checked="yinlianchecked"  name="" v-on:click="choicePayway('yinlian')" />
						<label for="yinlian">
							<img src="/static/images/yinlian.png" />
						</label>
					</li>
				</ul>
			</div>
			<div class="paybtnarea">
				<div>
					<input type="button" class="pay-submit" name="" value="立即付款" @click="paySubmit"/>
				</div>
				<div>
					剩余付款时间：<span class="time">{{pay_remain_time | timeStamp}}</span>
				</div>
			</div>
			<el-dialog v-model="dialogVisible" size="tiny" :close-on-click-modal='false' :close-on-press-escape='false' :show-close="false">
				<div class="checkbtnarea">
					<router-link :to="'/mine/orderDetail?id='+orderNumber">
						<el-button>支付完成</el-button>
					</router-link>
					<el-button v-on:click="dialogVisible = false" class="btn-repay">重新支付</el-button>
					<p>请尽快支付完成，否则订单会被取消！</p>
					<p>如有疑问，请联系客服0571-28272936</p>
				</div>
			</el-dialog>
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
				imgerweima:'',
				dialogVisible:false,
			}
		},
		components:{
			mineHeader,
			IndexFooter
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


	        // 如果有order页面标志 才能进入payment页面 否则进入 我的订单 页面 		    
	        if(this.$cookie.getCookie('path2Sign')){
	            return;
	        }else{
	        	this.$router.push('/mine/myIndent');
	        }
		    
		},
		mounted(){
			let _this = this;
			// console.log(this.$route.query.id);
			_this.getOrderMsg(_this.orderNumber)
		},
		// 时间过滤器 天-时-分-秒
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
						_this.order_sn = res.data.order_sn;
						_this.paid_money = res.data.total_amount;
						_this.time(res.data.pay_remain_time);
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},

			// 倒计时更新
			time(o) {
				let _this = this;
				let second_time = parseInt(o);

				let SecondTime = setInterval(function(){
					
					// 计时结束 清除定时器
					if (second_time <= 0) {
						clearTimeout(SecondTime);
						_this.$message('订单超时请重新下单');
						_this.$router.push("/mine/orderDetail?id="+_this.orderNumber)
					}

					second_time--;
					_this.pay_remain_time = second_time;

					// 组件卸载后 清除定时器 防止在进入其他页面后 仍在执行
					if (_this && _this._isDestroyed){
						clearTimeout(SecondTime);
					}

				},1000);
			},

			// 选择支付方式
			choicePayway(e){
				let _this = this
				$('label').removeClass('redlabel')
				if (e == 'zhifubao') {
					this.zhifubaochecked ='checked';
					this.weixinchecked =false;
					this.yinlianchecked =false;
					$('#zhifubao').next().addClass('redlabel')
				}else if(e == 'weixin'){
					this.zhifubaochecked =false;
					this.weixinchecked ='checked';
					this.yinlianchecked =false;
					$('#weixin').next().addClass('redlabel')


					$.ajax({
						url: _this.$store.state.apilink+"?s=api/payment/wxqrcode&order_id="+_this.orderNumber,
						dataType: "json",
						type: 'get',
						success: function (res) {
						// console.log(res);
						_this.imgerweima = res.data
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
				}
				 else if(e == 'yinlian'){
				 	this.zhifubaochecked =false;
				 	this.weixinchecked =false;
				 	this.yinlianchecked ='checked';
				 	$('.payway label')["0"].className = '';
				 	$('.payway label')["1"].className = '';
				 	$('.payway label')["2"].className = 'redlabel';
				 }
			},
			postWindow(url,name1,name2,value1,value2){
			//创建表单对象
			let _form = $("<form></form>",{
				'id':'tempForm',
				'method':'post',
				'action':url,
				'target':'_blank',
				'style':'display:none'
			}).appendTo($('body'));

			//将隐藏域加入表单
			_form.append($("<input>",{'type':'hidden','name':name1,'value':value1}));
			_form.append($("<input>",{'type':'hidden','name':name2,'value':value2}));
			//触发提交事件
			_form.trigger('submit');
			//表单删除
			_form.remove();
		},

		// 立即支付 按钮
		paySubmit(){
			let _this = this;
			let payway = '';
			let pay_code = '';
			if (_this.zhifubaochecked == false && _this.weixinchecked == false && _this.yinlianchecked == false ) {
				_this.$message('请选择支付方式')
				return false
			}else if (_this.zhifubaochecked == 'checked') {
				payway = 'alipay';
				pay_code = 'pay_code='+payway;

				// 进入paywaySuccess页面 标志 
  				_this.$cookie.setCookie('path4Sign','true','h2');

				_this.postWindow(`${_this.$store.state.paylink}/index.php/Home/Payment/getCode.html`,'order_id','pay_radio',_this.orderNumber,pay_code)
				_this.dialogVisible = true
			}else if (_this.weixinchecked == 'checked'){

				// 进入paywayWeixin页面 标志 
  				_this.$cookie.setCookie('path3Sign','true','s10');

				_this.$router.push('/paywayWeixin?id='+_this.orderNumber)
			}else if(_this.yinlianchecked == 'checked'){
        	 	payway = 'allinpay';
                pay_code = 'pay_code='+payway;

                // 进入paywaySuccess页面 标志 
  				_this.$cookie.setCookie('path4Sign','true','h2');

                _this.postWindow(`${_this.$store.state.paylink}/api.php/Home/Payment/getCode.html`,'order_id','pay_radio',_this.orderNumber,pay_code);
                _this.dialogVisible = true
        	 }
        	
        	
        }
    }
}
</script>

<style scoped>
	.payment{
		width: 100%;
		background: #f5f5f5;
		/*padding: 20px 0 380px 0;*/
	}
	.payment .paymentcenter{
		padding: 10px 0 100px 0;
		width: 1000px;
		margin: 0 auto;
	}
	.payment .title{
		margin-bottom: 13px;
	}
	.payment .ordermsg{
		display: flex;
		justify-content: space-between;
		margin-bottom: 13px;
	}
	.payment .payway-area{
		background:#fff;
		border:1px solid #BDBDBD;
		width: 100%;
		height: auto;
		/*padding: 18px 20px 40px 20px ;*/
	}
	.payment .paywaytop{
		margin:18px 20px;
	}
	.payment .paybtnarea{
		margin: 18px 20px 40px 20px ;
	}
	.payment .payway{
		height: 180px;
		display: flex;
		align-items: center;
	}
	.payment .payway label{
		height: 50px;
		margin-left: 10px;
		display: inline-block;
		border:1px solid #D9D9D9;
	}
	.payment .payway label:hover{
		border:1px solid #E64346;
	}
	.payment .payway .redlabel{
		border:1px solid #E64346;
	}
	.payment .payway li{
		margin-right: 50px; 
		display: flex;
		align-items: center;
	}
	.payment .pay-submit{
		padding: 18px 27px;
		color: #fff;
		background: #E64346;
		margin-bottom: 17px; 
	}
	.payment .time{
		color: #E64346;
	}
	.payment .checkbtnarea{
		padding: 20px;
		text-align: center;
	}
	.payment .btn-repay{
		margin:0 0 50px 20px;
	}
	.payment .checkbtnarea p{
		margin-top: 10px;
	}
</style>
