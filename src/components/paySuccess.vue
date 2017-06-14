<template>
<div class="w-pay">
	<mine-header></mine-header>
  <div class="w-pay-success">
  	<h3>支付成功</h3>
  	<div class="pay_info">
  		<h3><i class="iconfont">&#xe636;</i>下单成功，感谢您的支持！</h3>
  		<div class="user_info">
  			<p>商品合计&nbsp;: <span>{{msg.total_amount}}元</span>下单时间：{{addTime}}</p>
  			<p>运费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span>{{msg.shipping_price}}元</span>收货人&nbsp;&nbsp;&nbsp;：<span>{{msg.consignee}}</span></p>
  			<p>实付&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span>{{msg.total_amount}}元</span>联系电话：<span>{{msg.mobile}}</span></p>
  			<p>收货地址：{{msg.province_name}}{{msg.city_name}}{{msg.district_name}}{{msg.address}}</p>
  			<router-link to="/mine/myIndent"><button>查看订单</button></router-link>
  			<div></div>
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
  name: 'pay-success',
  components:{
  	mineHeader,
  	IndexFooter
  },
  data () {
    return {
      msg: '',
      addTime:""
    }
  },
  beforeCreate(){
		// 先检测是否注册
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

        // 再检测是否是从付款页 过来
        if(this.$cookie.getCookie('path4Sign')){
            return;
        }else{
            this.$router.push('/mine/myIndent');
        }
	},
  created(){
  	//从路由中获取参数
  	this.orderSn=this.$route.query.order_sn;
  },
  mounted(){
  	this.getHttps();
  },
  methods:{
  	//获取数据
  	getHttps(){
  		let that = this;
		// console.log(document.referrer)
  		$.ajax({
  			type:"get",
			url:this.$store.state.apilink+"?s=api/order/info",
			data:{
				order_sn:that.orderSn
			},
  			dataType:"json",
  			success:function(data){
  				let d = new Date();
  				that.msg = data.data
  				//设置下单时间
  				d.setTime(that.msg.add_time*1000);
  				that.addTime =d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 " +(d.getHours()>9?d.getHours():"0"+d.getHours())+":"+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())+":"+(d.getSeconds()>9?d.getSeconds():"0"+d.getSeconds());
  			}
  		});
  	}
  }
}
</script>

<style scoped>
	.w-pay{
		background-color: #f5f5f5;
	}
	.w-pay-success{
		margin:0 auto 150px;
		width:1000px;
		
	}
	.w-pay-success h3{
		color:#333;
		font-weight: 900;
		margin:24px 0 16px;
	}
	.w-pay-success .pay_info{
		width:914px;
		background-color: #fff;
		height:308px;
		border:1px solid #bdbdbd;
		padding:40px 0 0 84px;
	}
	.w-pay-success .pay_info h3{
		margin:0;
		display: flex;
		align-items: center;
	}
	.w-pay-success .pay_info h3 i{
		color:#009E4D;
		font-weight: 700;
		display:inline-block;
		font-size:36px;
		margin-right:20px;
	}
	.w-pay-success .pay_info p{
		font-size:14px;
		color:#333;
		/*line-height:;*/
	}
	.w-pay-success .pay_info .user_info{
		position:relative;
	}
	.w-pay-success .pay_info .user_info div{
		position:absolute;
		width:1px;
		height:90px;
		background-color: #D8D8D8;
		left:155px;
		top:28px;
	}
	.w-pay-success .pay_info p span{
		width:140px;
		display: inline-block;
	}
	.w-pay-success .pay_info .user_info{
		padding-top:28px;
	}
	.w-pay-success .pay_info p:nth-of-type(2) span{
		padding:16px 0;
	}
	.w-pay-success .pay_info p:nth-of-type(4){
		box-sizing: border-box;
		padding-left:207px;
		margin-top:16px;
	}
	.w-pay-success .pay_info p:nth-of-type(4) b{
		font-weight: normal;
	}
	.w-pay-success .pay_info button{
		width:120px;height:50px;
		cursor:pointer;
		background-color: #009E4D;
		color:#fff;
		margin-top:45px;
	}
</style>