<template>
	<div class="w-refund">
		<h3>退款信息</h3>
		<div v-if="error==0">
			<div class="refundInfo">
				
				<div>
					<p>退款状态：{{status}}</p>
					<p>退款类型：{{refundInfo.type==0?'退款':'退款退货'}}</p>
					<p>申请时间：{{addTime}}</p>
					<p>退款数量：{{refundInfo.num}}</p>
					<p>退款金额：{{refundInfo.price}}</p>
					<p>退款原因：{{refundInfo.reason}}</p>
					<p v-if="refundInfo.type!=0">
						退款地址：{{refundInfo.return_address}}
					</p>
					<p>退款说明：{{refundInfo.comment}}</p>
					<p v-if="refundInfo.status==11">
						失败原因：{{refundInfo.refuse_reason}}
					</p>
					<p v-if="refundInfo.type==1&&imgList.length!=0">
						<span>上传图片：</span>
						<img v-for="(items,indexs) in imgList" :src="imgPre + items"  key="indexs" />
					</p>
				</div>	
				
			</div>
			<div class="operate" v-if="refundInfo.status==2&&refundInfo.type==1">
				<h3>退货操作</h3>
				<p>退货物流：<input type="text" id="ltType" placeholder="请填写退货快递/物流公司名称" /></p>
				<p>退货单号：<input type="text" id="ltCode" placeholder="请填写退货快递/物流单号" /></p>
				<p v-if="refundInfo.delivery_name==''"><i class="iconfont">&#xe60a;</i>请在<span>{{outTime}}</span>内填写退货物流信息，否则退款失败</p>
				<button @click="postltInfo" class="pointer" v-if="refundInfo.delivery_name==''">提交</button>
				<p style="color:#FF0000" v-if="refundInfo.delivery_name!=''">您已经提交退货物流信息，如有差错或者疑问，请联系客服。</p>
			</div>
		</div>

		<section class="noOrder" v-if="error != 0">
	  		<p><img src="/static/images/kongb.png" /></p>
	  		<p>抱歉，没有获取到订单信息~</p>
	  	</section>
	</div>
</template>

<script>
export default{
	name:"refundDetail",
	data () {
		return{
			imgPre:this.$store.state.img.imgPre,
			ids:"",
			refundInfo:"",
			status:"",
			addTime:"",
			imgList:[],
			outTime:"",
			error:''
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
		this.ids = this.$route.query
	},
	mounted(){
		this.getHttp();
	},
	methods:{
		//获取退款详情请求
		getHttp(){
			let that = this;
			$.ajax({
				type:"get",
				url:this.$store.state.apilink+"?s=api/order/get_return_detail",
				data:that.ids,
				dataType:"json",
				success:function(data){
					// console.log(data)
					that.error = data.error;
					let d = new Date();
  					d.setTime(data.data.addtime*1000);
  					that.addTime = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 " +(d.getHours()>9?d.getHours():"0"+d.getHours())+":"+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
					that.refundInfo = data.data;
					if(data.data.imgs!=""){
						if(/,/.test(data.data.imgs)){
							that.imgList = data.data.imgs.split(",")
						}else{
							that.imgList = data.data.imgs.split()
						}
					}
					that.timeStamp(data.data.return_remain_time)
					setTimeout(function(){
						$("#ltType").val(data.data.delivery_name)
						$("#ltCode").val(data.data.delivery_no)
					},300)
					//判断状态
					switch (that.refundInfo.status){
						case '1':that.status = "申请中"
							break;
						case '2':that.status="请退货"
							break;
						case '3':that.status = "退款中"
							break;
						case '10':that.refundInfo.type==0?that.status="退款成功":that.status="退货退款成功"
							break;
						case '11':that.refundInfo.type==0?that.status="退款失败":that.status="退货退款失败"
							break;
						case '12':that.status = "退款成功"
							break;
					}
				}
			});
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
				}

				// 组件卸载后 清除定时器 防止在进入其他页面后 仍在执行
				if (that && that._isDestroyed){
					clearInterval(SecondTime);
				}

				that.outTime = time;


			},1000)
	  	},
		//提交退货物流信息
		postltInfo(){
			let that = this;
			let lttype = $("#ltType").val();
			let ltcode = $("#ltCode").val();
			if(/^\d+$/.test(ltcode) && lttype!=""){
				$.ajax({
					type:"post",
					url:this.$store.state.apilink+"?s=api/order/return_delivery",
					data:{
						order_sn:that.refundInfo.order_sn,
						delivery_name: lttype,
						delivery_no: ltcode
					},
					dataType:"json",
					success:function(data){
						if(data.error == 0){
							that.$message("提交成功，请耐心等待");
							setTimeout(function(){
								that.$router.go(0);
							},1500)
						}else{
							that.$message(data.error_code);
						}
					}
				});
			}else{
				that.$message("请填写正确的退货物流信息")
			}
		}
	}
}
</script>

<style scoped>
	.noOrder{
		text-align: center;
		padding: 100px 0 20px;
	}
	.noOrder img{
		width: 110px;
		height:auto;
		margin-bottom: 20px;
	}
	.w-refund{
		float:left;
		background-color:#fff;
		width:970px;
		padding:16px 27px 100px 23px;
	}
	.w-refund h3{
		color:#333;
		font-size:16px;
		padding-bottom:14px;
		border-bottom: 2px solid #D8D8D8;
	}
	.w-refund .refundInfo div{
		margin-top:20px;
		width:905px;
		padding:35px 20px 30px 43px;
		border:1px solid #D8D8D8;
		background-color: #FEFDF9;
		font-size:14px;
	}
	.w-refund .refundInfo div p{
		margin-bottom:6px;
		overflow:hidden;
	}
	.w-refund .refundInfo div p:first-child{
		font-weight: 800;
	}
	.w-refund .refundInfo div p span{
		float:left;
	}
	.w-refund .refundInfo div img{
		width:68px;height:68px;
		border:1px solid #D8D8D8;
		margin-right:15px;
	}
	.w-refund .operate{
		margin-top:60px;
	}
	.w-refund .operate h3{
		margin-bottom: 27px;
	}
	.w-refund .operate p{
		display: flex;
		align-items: center;
		font-size:14px;
	}
	.w-refund .operate p input{
		width:338px;height:28px;
		border:1px solid #D8D8D8;
		padding-left:10px;
	}
	.w-refund .operate p:first-of-type{
		margin-bottom: 20px;
	}
	.w-refund .operate p:first-of-type input{
		border-color:#FF1B1B
	}
	.w-refund .operate p:nth-of-type(3){
		margin-top:6px;
		color:#999;
	}
	.w-refund .operate p:nth-of-type(3) i{
		font-size:14px;
		margin:0 3px 0 70px;
	}
	.w-refund .operate p:nth-of-type(3) span{
		color:#FF1B1B;
	}
	.w-refund .operate button{
		width:88px;height:28px;
		background-color:#009E4D;
		border-radius:4px;
		color:#fff;
		margin:40px 0 0 72px;
	}
</style>