<template>
  <div class="my-indent">
  	<div class="kongb" v-if="watchList">
  		<img src="/static/images/kongb.png" alt=""  />
  		<h4>没有找到相关的订单信息！</h4>
  	</div>
  	<div class="w-r-menu">
  		<ul>
  			<li @click="cutFind(allList,index)" class="selec">全部订单</li>
  			<li @click="cutFind(daifuk)" class="selec">待付款（{{msg.wPay}}）</li>
  			<li @click="cutFind(daifah)" class="selec">待发货（{{msg.wGhuo}}）</li>
  			<li @click="cutFind(daishouh)" class="selec">待收货（{{msg.wShuo}}）</li>
  			<li @click="cutFind(tuihuo)" class="selec">退货退款（{{msg.tCount}}）</li>
  		</ul>
  		<!--<span @click="cutFind(tuihuo)" class="selec">退货退款（{{msg.tCount}}）</span>-->
  	</div>
  	<div class="w-filter">
  		<p>
  			订单编号：<input type="text" id="indent_id" />商品名称：<input type="text" id="case_id" />手机号：<input type="text" id="phone_id"/>
  		</p>
  		<p>
  			下单时间：<el-date-picker v-model="value1" type="datetime"  placeholder="开始时间" class="f_time"></el-date-picker>
  			至<el-date-picker v-model="value2" type="datetime"  placeholder="结束时间" class="l_time"></el-date-picker>
  			<button @click="findCase">搜索</button><!--<button>导出</button>-->
  		</p>
  	</div>
  	<div class="case_list">
  		<div class="case" v-for="(item,w_myIndent) in showList" key="w_myIndent">
  			<h3>下单时间：<span>{{goTime(item.add_time)}}</span>订单号：<span>{{item.order_sn}}</span></h3>
	  			<div class="case_info">
	  				<div class="f_info">
	  					<div v-for="(items,w_goodsIndex) in item.goods_list" key="w_goodsIndex">
			  				<router-link :to="{path:'/goodsDetails',query:{id:items.goods_id}}"><img v-lazy="imgPre + items.image.image_url" />
			  				</router-link>
			  				<span><router-link :to="{path:'/goodsDetails',query:{id:items.goods_id}}">{{items.goods_name}}</router-link></span>
			  				<span>x{{items.goods_num}}</span>
			  				<span>{{items.goods_price}}</span>
			  				<span v-if="items.return.status==0" class="pointer"><router-link :to="{path:'refunds',query:{goods_id:items.goods_id,order_sn:item.order_sn,goods_spec:items.spec_key}}" >退款退货</router-link></span>
			  				<span v-if="items.return.status==1">申请中</span>
			  				<span v-if="items.return.status==3||items.return.status==2">{{items.return.type==0?"申请中":"请退货"}}</span>
			  				<span v-if="items.return.status==10">退货退款成功</span>
			  				<span v-if="items.return.status==11">退款失败</span>
			  				<span v-if="items.return.status==12">退款成功</span>
			  				<span v-if="items.return.status==9 || items.return.status==13">退货完成</span>
			  				<span v-if="items.return.status==14">申请中</span>

			  				<span class="myindent-sku">{{items.spec_key_name}}</span>
	  					</div>
	  				</div>

	  				<div class="r_info">
		  				<div class="xiaoji" :heis="item.goods_list.length*116" >
		  					<div>
		  						<span>{{item.total_amount}}</span><br />
		  						<i>运费：包邮</i>
		  					</div>
		  					
		  				</div>
		  				<div class="state">
		  					<div>
		  						<span>{{item.status_name}}</span>
		  					</div>
		  				</div>
		  				<div class="detail">
		  					<div>
		  						<p>
			  						<a href='javascript:;' 
					  					@click="goMoney(item.order_id)" 
					  					v-if="item.status==0">
					  					<button>去付款</button>
				  					</a>	
		  						</p>

		  						<p>
			  						<router-link tag="button"
					  					:to="{path:'orderDetail',query:{id:item.order_id}}" 
					  					v-if="item.status!=0&&item.status!=2">
				  						查看详情
				  					</router-link>	
		  						</p>
			  					
			  					<p>
			  						<span v-if="item.status==0" 
				  					@click="outOrder(item.order_id)"
									class="outOrder pointer" >取消订单</span>
			  					</p>

			  					
								<p>
									<router-link tag="span" class="pointer"
					  					:to="{path:'orderDetail',query:{id:item.order_id}}" 
					  					v-if="item.status==0||item.status==2">查看详情
					  				</router-link>	
								</p>
			  					
								<p>
									<button class="quer" 
					  					v-if="item.status==2" 
					  					@click="goConfirm(item.order_id)">确认收货
				  					</button>	
								</p>
			  						
		  					</div>
		  					
		  				</div>
	  				</div>
	  			</div>
  		</div>
  		<div class="paginations" v-if="!watchList">
  			<el-pagination
		      @current-change="handleCurrentChange"
		      :page-size="pageSize"
		      layout="prev, pager, next"
		      :total="findList.length" v-if="findList.length>5">
	    	</el-pagination>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'my-indent',
  data () {
    return {
    imgPre:this.$store.state.img.imgPre,
      msg: {
      	wPay:0,
      	wGhuo:0,
      	wShuo:0,
      	tCount:0
      },
      heigs:'300px',
      pageSize:5,
      currentPage:1,
     	//时间列表方法
      pickerOptions1: {
          shortcuts: [{
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
	     	indentList:[],
        findList:[],
        showList:[],
        watchList:false,
        allList:[],
        daifuk:[],
        daifah:[],
        daishouh:[],
        tuihuo:[]
    }
  },
  beforeMount(){
  	this.getHttp();
  },
  mounted(){
  	// this.setHeight();
  	$(".selec").on("click",function(e){
  		let es = e || event;
  		$(".selec").css("color","#999");
			$(es.target).css("color","#009E4D");
  	})
  },
  methods:{
  	goMoney(id){
  		// 进入付款页标志
  		this.$cookie.setCookie('path2Sign','true','s10');

	    this.$router.push({
	    	path:'/payment',
	    	query:{
	    		id:id
	    	}
		});
  	},
  	//分页器方法
  	handleCurrentChange(e){
  		let _this = this;
  		_this.showList = _this.findList.slice();
  		_this.showList = _this.showList.slice(_this.pageSize*(e-1),_this.pageSize*e);
  		_this.setHeight();
  		_this.watchKlist();
  	},
  	//取消订单
  	outOrder(s){
  		let that = this;
  		$.ajax({
  			type:"get",
  			url:this.$store.state.apilink+"?s=api/order/cancel&id="+s,
  			dataType:"json",
  			success:function(data){
  				if(data.error == 0){
	  				that.$message("取消订单成功");
	  				setTimeout(function(){
	  					that.$router.go(0);
	  				},1500)
  				}else{
  					that.$message(data.error_code);
  				}
  			}
  		})
  	},
  	//确认收货
  	goConfirm(id){
  		let that = this;
  		let times = new Date().getTime();
  		$.ajax({
  			type:"get",
			url:this.$store.state.apilink+"?s=api/order/confirm&id="+id+"&_t="+times,
  			dataType:"json",
  			success:function(data){
  				if(data.error == 0){
  					that.$message("确认收货成功");
  					setTimeout(function(){
	  					that.$router.go(0);
  					},1500)
  				}else{
  					that.$message(data.error_code);
  				}
  			}
  		});
  	},
  	//获取列表请求
  	getHttp(){
  		let that = this;
  		$.ajax({
  			type:"get",
  			url:this.$store.state.apilink+"?s=api/order/getlist",
  			dataType:'json',
  			success:function(data){
  				if(data.data){
	  				that.indentList = data.data;
	  				that.allList = data.data;
	  				// console.log(data)
	  				//按状态分组
  					for(let i=0,len=that.allList.length;i<len;i++){
	  					if(that.allList[i].return_status!=0){
	  						that.tuihuo.push(that.allList[i])
	  					}
	  					if(that.allList[i].status==0){
	  						that.daifuk.push(that.allList[i])
	  					}
	  					if(that.allList[i].status==1){
	  						that.daifah.push(that.allList[i])
	  					}
	  					if(that.allList[i].status==2){
	  						that.daishouh.push(that.allList[i])
	  					}
  					}
						that.msg.wPay = that.daifuk.length;
						that.msg.wGhuo = that.daifah.length;
						that.msg.wShuo = that.daishouh.length;
						that.msg.tCount = that.tuihuo.length;
  				}
  				that.findList = that.indentList.slice();
  				that.showList = that.findList.slice();
  				that.showList = that.showList.slice(that.pageSize*0,that.pageSize)
  				that.watchKlist();
  			}
  		})
  	},
  	//是否为空监听事件
  	watchKlist(){
  		if(this.showList.length == "0"){
  			this.watchList = true;
  		}else{
  			this.watchList = false;
  		}
  	},
  	//设置高度
		setHeight(){
			setTimeout(function(){
				let len = $(".xiaoji").length;
				for(let i=0;i<len;i++){
					$(".xiaoji").eq(i).css("height",$(".xiaoji").eq(i).attr("heis"));
					$(".state").eq(i).css("height",$(".xiaoji").eq(i).attr("heis"));
					$(".detail").eq(i).css("height",$(".xiaoji").eq(i).attr("heis"));
				}
			},200)
		},
  	//时间转换
  	goTime(s){
  		let d = new Date();
  		d.setTime(s*1000);
  		return d.getFullYear()+"年"+(+d.getMonth()+1)+"月"+d.getDate()+"日"
  	},
  	//切换状态列表
  	cutFind(list){
  		this.indentList = list;
  		this.findList = list;
 			this.handleCurrentChange(1);
  	},
  	//搜索功能
  	findCase(){
  		let timeArr = [];
  		let indentCode = $("#indent_id").val();
  		let phoneCode = $("#phone_id").val();
  		let caseCode = $("#case_id").val();
  		let find = [];
  		if(indentCode==""&&phoneCode==""&&caseCode==""&&(this.value1=="" || this.value1== undefined )&&(this.value2==""||this.value2== undefined)){
  			this.findList = this.indentList.slice();
  			this.handleCurrentChange(1);
  			return;
  		}
  		if(indentCode != ""){
  			for(let i=0,len=this.indentList.length;i<len;i++){
  				if(indentCode == this.indentList[i].order_sn){
  					find.push(this.indentList[i])
  				}
  			}
  			timeArr = find;
  		}else{
  			if(caseCode != ""){
  				for(let i=0,len=this.indentList.length;i<len;i++){
  					for(let x=0,lens=this.indentList[i].goods_list.length;x<lens;x++){
  						if(this.indentList[i].goods_list[x].goods_name.indexOf(caseCode) != -1){
	  						find.push(this.indentList[i])
	  					}
  					}
	  				
  				}
  				timeArr = find;
  			}else{
  				if(phoneCode != ""){
  					for(let i=0,len=this.indentList.length;i<len;i++){
		  				if(phoneCode == this.indentList[i].mobile){
		  					find.push(this.indentList[i])
		  				}
  					}
  				timeArr = find;
  				}
  			}
  		}
  		if(indentCode == "" && phoneCode == "" && caseCode == ""){
  			timeArr = this.indentList;
  		}
  		// console.log(this.value1)
  		if((this.value1!=""&&this.value1) && (this.value2!=""&&this.value2)){
  			let startTime = (new Date(this.value1)).getTime();
  			let endTime = (new Date(this.value2)).getTime();
  			if(startTime>endTime){
  				this.$message("请设置正确的时间段");
  				this.value1="";
  				this.value2="";
  				return;
  			}
				find = [];
  			for(let j=0,lens=timeArr.length;j<lens;j++){
  				if(timeArr[j].add_time*1000 > startTime && timeArr[j].add_time*1000 < endTime){
  					find.push(timeArr[j])
  				}
  			}
  		}
  		this.findList = find.slice();
  		this.handleCurrentChange(1);
  	}
  }
}
</script>

<style scoped>
	.my-indent{
		background-color:#fff;
		position:relative;
		float:left;
		width:970px;
		padding:15px 29px 60px 21px;
	}
	.my-indent .w-r-menu ul{
		width:700px;
		height:36px;
		border:1px solid #D8D8D8;
		border-bottom: none;
		padding-top:13px;
		overflow: hidden;
	}
	.my-indent .w-r-menu ul li{
		cursor:pointer;
		float:left;
		border-right:1px solid #D8D8D8;
		height:16px;
		line-height:16px;
		color:#999;
		padding:0 22px;
	}
	.my-indent .w-r-menu ul li:first-of-type{
		color:#009E4D;
	}
	.my-indent .w-r-menu ul li:last-child{
		border-right:none;
	}
	.my-indent .w-r-menu span{
		cursor:pointer;
		position:absolute;
		left:538px;
		top:10px;
		color:#999;
		margin-top:16px;
		padding:0 25px;
		float:left;
	}
	.my-indent .w-filter{
		width:952px;
		height:110px;
		border:1px solid #D8D8D8;
		padding:18px 0 0 20px;
	}
	.my-indent .w-filter p{
		text-align: left;
		color:#333;
		font-size:14px;
		line-height:28px;
	}
	.my-indent .w-filter p:last-child{
		margin:20px 0;
		display: flex;
		align-items: center;
	}
	.my-indent .w-filter p input{
		display: inline-block;
		width:198px;
		height:28px;
		border:1px solid #D8D8D8;
	}
	.my-indent .w-filter p:first-child input{
		margin-right:58px;
	}
	.my-indent .w-filter p:first-child input:last-child{
		margin-right:0;
	}
	.my-indent .w-filter .f_time{
		margin-right:15px;
	}
	.my-indent .w-filter .l_time{
		margin:0 38px 0 15px;
	}
	.my-indent .w-filter button{
		cursor: pointer;
		width:58px;
		height:30px;
		color:#333;
		border:1px solid #D8D8D8;
		background-color:#F2F2F2;
		margin-right:20px;
	}
	.my-indent .case_list{
		margin-top:25px;
		min-height: 500px;
	}
	.my-indent .case_list .case{
		width:970px;
		min-height:148px;
		border:1px solid #D8D8D8;
		position:relative;
		margin-bottom: 17px;
	}
	.my-indent .case_list .case h3{
		width:100%;
		height:35px;
		color:#999;
		font-size: 14px;
		line-height: 35px;
		text-align: left;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding-left:18px;
		border-bottom:1px solid #D8D8D8;
		background-color: #F2F2F2;
	}
	.my-indent .case_list .case h3 span{
		color:#999;
		margin-right:88px;
	}
	.my-indent .case_info{
		overflow: hidden;
		position: relative;
		font-size: 14px;
	}
	.my-indent .case_info .xiaoji{
		box-sizing: border-box;
		color:#999;
		text-align: center;
	}
	.xiaoji div,.state div,.detail div{
		text-align: center;
		position: absolute;
		width: 100%;
		top: 50%;
		transform:translateY(-50%);
		-ms-transform:translateY(-50%);
		-moz-transform:translateY(-50%);
		-webkit-transform:translateY(-50%);
		-o-transform:translateY(-50%);
	}
	.my-indent .case_info .xiaoji i{
		color:#333;
		display: inline-block;
		margin-top:10px;
	}
	.my-indent .case_info .state{
		box-sizing: border-box;
		text-align: center;
	}
	.my-indent .case_info .detail{
		box-sizing:border-box;
		line-height:26px;
		text-align: center;
	}
	.my-indent .case_info .detail button{
		width:78px;
		height:28px;
		cursor:pointer;
		font-size:14px;
		border:1px solid #D8D8D8;
		background-color: #F2F2F2;
	}
	.my-indent .case_info div img{
		width:88px;
		height:88px;
		/*border:1px solid #D8D8D8;*/
		margin:10px 19px 0;
	}
	.my-indent .case_info .f_info{
		width:580px;
	}
	.my-indent .case_info .r_info{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 388px;
	}
	.r_info .xiaoji,.r_info .state,.r_info .detail {
		float: left;
		height: 100%;
		width: 33.3%;
		border-left: 1px solid #d8d8d8;
		position: relative;
	}
	.my-indent .case_info .f_info div{
		width:580px;
		height:115px;
		border-top:1px solid #D8D8D8;
		position:relative;
	}
	.my-indent .case_info .f_info div:nth-of-type(1){
		border:none;
	}
	.my-indent .case_info .f_info span{
		position:absolute;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.my-indent .case_info .f_info span:nth-of-type(1){
		width:155px;
		color:#333;
		left:125px;
		top:30px;
	}
	.my-indent .case_info .f_info span:nth-of-type(2){
		width:50px;
		color:#999;
		left:300px;
		top:30px;
	}
	.my-indent .case_info .f_info span:nth-of-type(3){
		width:60px;
		color:#999;
		left:370px;
		top:30px;
	}
	.my-indent .case_info .f_info span:nth-of-type(4){
		width:110px;
		/*cursor: pointer;*/
		color:#333;
		left:440px;
		top:30px;
		color:#009E4D
	}
	.my-indent .case_info .f_info span:nth-of-type(5),.my-indent .case_info .f_info span:nth-of-type(6),.my-indent .case_info .f_info span:nth-of-type(7){
		width:90px;
		cursor: pointer;
		color:#009E4D;
		left:440px;
		top: 30px;
	}
	.my-indent .case_info .f_info .myindent-sku{
		color: #666 !important;
		left:125px !important;
		top:60px !important;
	}
	.my-indent .paginations{
		margin-top:50px;
		text-align: right;
	}
	
	.my-indent .kongb{
		text-align: center;
		position: absolute;
		left:400px;
		top:270px;
	}
	.my-indent .kongb h4{
		color:#999;
		margin-top:20px;
	}
	.my-indent .quer{
		position:absolute;
		left:25px;
		top:26px;
	}
</style>