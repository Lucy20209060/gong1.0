<template>
	<div class="address">
		<div class="address-header">新增收货地址</div>
		<div class="operating-area"  v-model="addressEmpty">
			<el-row>
				<el-col :span="3" class="left-label">
					<span class="warn">*</span>
					所在地区：
				</el-col>
				<el-col :span="20" class="choice-address">
					<select class="choicead addressprovince" @click="selectProvince($event)" >
						<option value="-1" v-if="addressEmpty.province == -1" :selected="-1 == addressEmpty.province ? true :false ">-选择省-</option>
						<option v-for="(item,index) in province" key="index" :value="item.id" :selected="item.id == addressEmpty.province ? true :false ">{{item.name}}</option>
					</select>
					<select class="choicead addresscity" @click="selectCity($event)">
						<option value="-1" v-if="addressEmpty.city == -1" :selected="-1 == addressEmpty.city ? true :false ">-选择市-</option>
						<option v-for="(item,index) in city" key="index" :value="item.id" :selected="item.id == addressEmpty.city ? true :false ">{{item.name}}</option>
					</select>
					<select class="choicead addressdistrict" @click="selectArea($event)">
						<option value="-1" v-if="addressEmpty.area == -1" :selected="-1 == addressEmpty.area ? true :false ">-选择区/县-</option>
						<option v-for="(item,index) in area" key="index" :value="item.id" :selected="item.id == addressEmpty.area ? true :false ">{{item.name}}</option>
					</select>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3" class="left-label text-area">
					<span class="warn">*</span>
					详细地址：
				</el-col>
				<el-col :span="15" class="right-input text-area">
					<textarea placeholder="建议您填写详细收货地址，如街道名称，街道门牌号，楼层和房间号等信息" class="right-input addressdetail" v-model='addressEmpty.detail'>{{addressEmpty.detail}}</textarea>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3" class="left-label">
					<span class="warn">*</span>
					收货人姓名：
				</el-col>
				<el-col :span="15">
					<input type="text" name="" placeholder="不能为昵称、X先生、X小姐等，请使用真实姓名" class="right-input addressconsignee" v-model='addressEmpty.name' maxlength="4" />
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3" class="left-label">
					<span class="warn">*</span>
					联系方式：
				</el-col>
				<el-col :span="15" >
					<input type="text" name="" placeholder="收货人的手机号码" class="right-input addressmobile" v-model='addressEmpty.phone' :maxlength="maxlength" @input="verifyFirst($event)"/>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="3" class="left-label">&nbsp;</el-col>
				<el-col :span="15" class="submit-area">
					<input type="button" class="right-submit" name="" value="保存" v-on:click=" addressEmpty.address_id == '' ? addressAdd() : addressMod() "/>
					<input type="button" class="right-delete" name="" value="清空" @click="addressClear"/>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-row :gutter="24" class="show-area">
				<el-col :span="6" v-for="(item,index) in addressList" key="index">
					<div 
					class="address-card" 
					:style="item.is_default == 1 ? 'background: url(/static/images/addwrap.png) no-repeat 0 0' : 'background:url(/static/images/addwrap.png) no-repeat right 0'"
					>
						<div class="btn-area">
							<el-col :span="14" class="left">
								<button 
								class="btn-left" 
								v-on:click="item.is_default == 1 ? '' : toDefault(item.address_id,index)" 
								:style="item.is_default == 1 ? 'background: #E4E4E4;' : 'cursor:pointer'"
								>
									{{item.is_default | checkChoice}}
								</button>
							</el-col>
							<el-col :span="10" class="right">
								<button class="btn-modify" @click="addressModify(index)">修改</button>
								<button class="btn-delete" @click="addressDelete(item.address_id,index)">删除</button>
							</el-col>
						</div>
						<div class="address-area">
							<p>
								{{item.consignee}} &nbsp; 
								{{item.mobile}}
								<br/>
								{{item.province_name}} &nbsp; 
								{{item.city_name}} &nbsp; 
								{{item.district_name}} &nbsp; 
								{{item.address}}
							</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'address',
		data () {
			return {
				addressEmpty:{
					address_id:'',
					is_default:0,
					name:"",
					phone:"",
					province:'-1',
					city:'-1',
					area:'-1',
					detail:""
				},
				province:[],
				city:[],
				area:[],
				addressList:[],
				maxlength:11,
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
		mounted(){
			this.getAddressList();
			this.getProvince()
		},
		filters:{
			checkChoice(e,index){
				return (e == 1 ?  '默认地址' :  '设为默认地址')
			}
		},
		methods:{
			addressAdd(){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/create",
					data:{
						province:_this.addressEmpty.province,
					 	city:_this.addressEmpty.city,
					 	district:_this.addressEmpty.area, 
					 	address:_this.addressEmpty.detail, 
					 	consignee:_this.addressEmpty.name, 
					 	mobile:_this.addressEmpty.phone
					},
					dataType: "json",
					type: 'post',
					beforeSend:function(){
						// console.log(_this.addressEmpty.province);
						// console.log(_this.addressEmpty.city);
						// console.log(_this.addressEmpty.area);
						if (_this.addressEmpty.province == -1 || _this.addressEmpty.city == -1 || _this.addressEmpty.area == -1) {
							_this.$message.error('请填写完整的地址信息');
							return false;
						}else if (_this.addressEmpty.name == '') {
							_this.$message.error('请填写收货人姓名');
							return false;
						}else if (_this.addressEmpty.phone == '') {
							_this.$message.error('请填写联系方式');
							return false;
						}
					},
					success: function (res) {
							if (res.error_code == 'FAILED') {
								_this.$message.error(res.error_msg);
							}else{
								_this.$message('创建成功');
								_this.getAddressList();
							}
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			verifyFirst(e){
    		    if (e.srcElement.value.substring(0,1) == 1) {
    		        this.maxlength = '11';
    		    }else if(e.srcElement.value.length >= 1){
    		        this.maxlength = '1';
    		        this.$message.error('首位不为1');
    		    }
    		},
			addressMod(){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/update",
					data:{
						id:_this.addressEmpty.address_id,
						province:_this.addressEmpty.province,
					 	city:_this.addressEmpty.city,
					 	district:_this.addressEmpty.area, 
					 	address:_this.addressEmpty.detail, 
					 	consignee:_this.addressEmpty.name, 
					 	mobile:_this.addressEmpty.phone
					 },
					dataType: "json",
					type: 'post',
					beforeSend:function(){
						if (_this.addressEmpty.province == -1 || _this.addressEmpty.city == -1 || _this.addressEmpty.area == -1) {
							_this.$message.error('请填写完整的地址信息');
							return false;
						}else if (_this.addressEmpty.name == '') {
							_this.$message.error('请填写收货人姓名');
							return false;
						}else if (_this.addressEmpty.phone == '') {
							_this.$message.error('请填写联系方式');
							return false;
						}
					},
					success: function (res) {
						if (res.error_code == 'FAILED') {
							_this.$message.error(res.error_msg);
						}else{
							_this.$message('修改成功');
							_this.getAddressList();
						}
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			addressDelete(id,index){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/delete",
					data:{id:id},
					dataType: "json",
					type: 'post',
					success: function (res) {
						if (res.error == 0) {
							_this.getAddressList();
						}
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			addressClear(){
				this.addressEmpty = {
							address_id:'',
							is_default:0,
							name:"",
							phone:"",
							province:'-1',
							city:'-1',
							area:'-1',
							detail:""
						};
			},
			toDefault(id,index){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/set_default",
					data:{id:id},
					dataType: "json",
					type: 'post',
					success: function (res) {
						if (res.error == 0) {
							for (let i = 0; i < _this.addressList.length; i++) {
								_this.addressList[i].is_default = 0;
							}
							_this.addressList[index].is_default = 1;
						}
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			getAddressList(){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/getlist",
					dataType: "json",
					type: 'get',
					success: function (res) {
						_this.addressList = res.data;
						this.addressEmpty = {
							address_id:'',
							is_default:0,
							name:"",
							phone:"",
							province:'-1',
							city:'-1',
							area:'-1',
							detail:""
						};
					},
					error:function (res) {
						_this.$message('未知错误！');
					}
				});
			},
			selectProvince(e){
				this.addressEmpty.province = e.target.value;
				this.addressEmpty.city = '-1';
				this.addressEmpty.area = '-1';
				this.getCity(e.target.value);
				// console.log(this.addressEmpty);
			},
			selectCity(e){
				this.addressEmpty.city = e.target.value;
				this.addressEmpty.area = '-1';
				this.getArea(e.target.value);
				// console.log(this.addressEmpty);
			},
			selectArea(e){
				this.addressEmpty.area = e.target.value;
			},
			getProvince(){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/getregion&parent_id=0",
					dataType:"json",
					type: 'get',
					success: function (res) {
						_this.province = res.data;
					},
					error:function (res) {
						_this.$message(res);
					}
				});

			},
			getCity(id){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/getregion&parent_id="+id,
					dataType: "json",
					type: 'get',
					success: function (res) {
						_this.city = res.data;
					},
					error:function (res) {
						_this.$message(res);
					}
				});
			},
			getArea(id){
				let _this = this;
				$.ajax({
					url: _this.$store.state.apilink+"?s=api/address/getregion&parent_id="+id,
					dataType: "json",
					type: 'get',
					success: function (res) {
						_this.area = res.data;
					},
					error:function (res) {
						_this.$message(res);
					}
				});
			},
			addressModify(index){
				let _this = this;
				_this.getProvince(0);
				_this.getCity(_this.addressList[index].province);
				_this.getArea(_this.addressList[index].city);
				
				_this.addressEmpty.address_id = _this.addressList[index].address_id;
				_this.addressEmpty.is_default = _this.addressList[index].is_default;
				_this.addressEmpty.name = _this.addressList[index].consignee;
				_this.addressEmpty.phone = _this.addressList[index].mobile;
				_this.addressEmpty.province = _this.addressList[index].province;
				_this.addressEmpty.city = _this.addressList[index].city;
				_this.addressEmpty.area = _this.addressList[index].district;
				_this.addressEmpty.detail = _this.addressList[index].address;

			}
		}
	}
	</script>

	<style scoped>
		.address{
			min-height: 380px;
			background: #fff;
			float: left;
			position: relative;
			width: 970px;
			padding: 15px 29px 98px 21px;
		}
		.address .address-header{
			text-align: left;
			border-bottom: 3px solid #D8D8D8; 
			padding-bottom: 12px;
		}
		.address .left-label{
			text-align: right;
			height: 50px;
			line-height: 50px;
		}
		.address input.right-input{
			border:1px solid #D8D8D8;
			width: 100%;
			margin: 5px 0;
			height: 40px;
			padding: 0 10px;
		}
		.address textarea.right-input{
			border:1px solid #D8D8D8;
			width: 100%;
			height: 75%;
			padding: 10px;
		}
		.address .text-area{
			height: 100px;
		}
		.address .right-submit,.right-delete{
			border:1px solid #D8D8D8;
			background: #F2F2F2;
			padding: 5px 15px;
			margin-right: 10px;
		}
		.address .submit-area{
			line-height: 50px;
			text-align: left;
		}
		.address .choice-address{
			padding: 10px 0;
			text-align: left;
		}
		.address .choicead{
			width: 200px;
			margin-right: 10px;
			border:1px solid #D8D8D8;
		}
		.address .warn{
			color:#E64346;
		}
		.address .address-card{
			float:left;
			width:230px;
			min-height:160px;
			padding:0 5px;
			margin: 10px 0;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-o-box-sizing: border-box;
			-ms-box-sizing: border-box;
			box-sizing: border-box; 
			background: url('/static/images/addwrap.png') no-repeat 0 0;
		}
		.address .address-card .btn-area{
			height: 45px;
			line-height: 45px;
		}
		.address .address-card .btn-area .left{
			text-align: left;
		}
		.address .address-card .btn-area .right{
			text-align: right;
		}
		.address .address-card .btn-area .left button{
			border-radius: 10px;
			padding: 2px 10px;
		}
		.address .address-card .btn-area .right button{
			cursor: pointer;
		}
		.address .address-card .address-area{
			font-size: 12px;
		}
	</style>