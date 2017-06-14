<template>
	<div class="proof">
		<login-header>用户认证</login-header>
		<div class="content">
			<div class="title">
				<img src="/static/images/proof.png" />
				<p>立即认证，您将获得更多服务！</p>
			</div>
			<div class="container">
				<ul class="nav">
					<li class="online" @click='liClick($event)'>线上企业认证</li>
					<li class="live" @click='liClick($event)'>线下企业认证</li>
					<li class="other" @click='liClick($event)'>其他</li>
				</ul>
				<ul class="table table-online">
					<li>
						<p><span class="must-smg">*</span>经营类型：</p>
						<div class="special-input">
							<select>
								<option value="-1">请选择经营类型</option>
								<option value="1">天猫</option>
								<option value="2">淘宝</option>
								<option value="3">京东</option>
								<option value="4">一号店</option>
								<option value="5">苏宁</option>
								<option value="6">微信商城</option>
								<option value="7">阿里巴巴</option>
								<option value="8">网易考拉</option>
								<option value="9">唯品会</option>
								<option value="10">蘑菇街</option>
								<option value="11">贝贝网</option>
								<option value="12">拼多多</option>
								<option value="13">供应链</option>
								<option value="14">自营平台</option>
							</select>
						</div>
						<span class="warn-msg">请选择经营类型</span>
					</li>
					<li>
						<p><span class="must-smg">*</span>网店名称：</p>
						<input type="text" name="" placeholder="填写网址/网店名称" class="merchant_name" />
						<span class="warn-msg">请填写网址/网店名称</span>
					</li>
					<li>
						<p><span class="must-smg">*</span>网店链接：</p>
						<input type="text" name="" placeholder="填写网址地址" class="website" />
						<span class="warn-msg">请填写网址地址</span>
					</li>
					<li>
						<p><span class="must-smg">*</span>联系人姓名：</p>
						<input type="text" name="" placeholder="不能为昵称，X先生，X女士，请填写真实姓名" class="contacts_name" maxlength="4"/>
						<span class="warn-msg">请填写真实姓名</span>
					</li>
					<li>
						<p><span class="must-smg">*</span>联系人手机：</p>
						<input type="text" name="" placeholder="请填写手机号" class="contacts_mobile" :maxlength="maxlength" @input="verifyFirst($event)"/>
						<span class="warn-msg">请填写手机号</span>
					</li>
					<li>
						<p><span class="must-smg">*</span>qq：</p>
						<input type="text" name="" placeholder="请输入QQ号" class="qq" maxlength="12"/>
						<span class="warn-msg">请输入QQ号</span>
					</li>
					<li>
						<p><span class="must-smg">*</span>微信：</p>
						<input type="text" name="" placeholder="请输入微信帐号" class="weixin" />
						<span class="warn-msg">请输入微信帐号</span>
					</li>
					<li>
						<p>邮箱：</p>
						<input type="text" name="" placeholder="请输入邮箱" class="email" />
						<span class="warn-msg">请输入邮箱</span>
					</li>
					<li>
						<p>发货人名称：</p>
						<input type="text" name="" placeholder="请输入发货人姓名" class="delivery_user" maxlength="4"/>
						<span class="warn-msg">请输入发货人姓名</span>
					</li>
					<li class="prompt-msg">
						<p>发货人名称，用于发货时面单打印，如果不填写，默认为仓库信息</p>
						<span class="warn-msg"></span>
					</li>
					<li>
						<p>发货人电话：</p>
						<input type="text" name="" placeholder="请输入发货人电话" class="delivery_mobile" :maxlength="maxlength" @input="verifyFirst($event)"/>
						<span class="warn-msg">请输入发货人电话</span>
					</li>
					<li class="prompt-msg">
						<p>发货人电话，用于发货时面单打印，如果不填写，默认为仓库信息</p>
						<span class="warn-msg"></span>
					</li>
					<li>
						<p><span class="must-smg">*</span>资质照片：</p>
						<div class="special-input photoOnline">
							<el-upload
							class="upload-demo"
							action="/api.php?s=api/uploadify/upload_image"
							:data="{'path':'user'}"
							:on-preview="handlePreviewOnline"
							:on-remove="handleRemoveOnline"
							:file-list="fileListOnline"
							:before-upload="beforeAvatarUploadOnline"
							:on-success="handleAvatarSuccessOnline"
							accept="image/jpeg,image/jpg,image/png"
							>
							<el-button size="small">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">						
								<p style="width:100%;text-align:left;">请提供该网站/网店为您所有的凭证，如后台截屏、认证截屏等，单张照片不超过2M，支持jpg、png格式</p>
							</div>
						</el-upload>
						<!-- <input type="file" v-on:change="getImg($event)" name="" value="上传照片" accept="image/jpg,image/png" /> -->
					</div>
					<span class="warn-msg">请上传照片</span>
				</li>
				<li><input type="button" name="" @click="proofSubmitOnline" value="提交" /><span class="warn-msg"></span></li>
			</ul>
			<ul class="table table-live">
				<li>
					<p><span class="must-smg">*</span>经营类型：</p>
					<div class="special-input">
						<select value="请选择经营类型">
							<option>线下企业</option>
						</select>
					</div>
					<span class="warn-msg"></span>
				</li>
				<li>
					<p><span class="must-smg">*</span>实体店名：</p>
					<input type="text" name="" placeholder="填写网址/网店名称" class="merchant_name" />
					<span class="warn-msg">请填写网址/网店名称</span>
				</li>
				<li>
					<p><span class="must-smg">*</span>联系地址：</p>
					<input type="text" name="" placeholder="填写网址地址"  class="contact_address"/>
					<span class="warn-msg">请填写网址地址</span>
				</li>
				<li>
					<p><span class="must-smg">*</span>联系人姓名：</p>
					<input type="text" name="" placeholder="不能为昵称，X先生，X女士，请填写真实姓名"  class="contacts_name" maxlength="4"/>
					<span class="warn-msg">请填写真实姓名</span>
				</li>
				<li>
					<p><span class="must-smg">*</span>联系人手机：</p>
					<input type="text" name="" placeholder="请填写手机号"  class="contacts_mobile" :maxlength="maxlength" @input="verifyFirst($event)"/>
					<span class="warn-msg">请填写手机号</span>
				</li>
				<li>
					<p><span class="must-smg">*</span>qq：</p>
					<input type="text" name="" placeholder="请输入QQ号"  class="qq" maxlength="12"/>
					<span class="warn-msg">请输入QQ号</span>
				</li>
				<li>
					<p><span class="must-smg">*</span>微信：</p>
					<input type="text" name="" placeholder="请输入微信帐号"  class="weixin"/>
					<span class="warn-msg">请输入微信帐号</span>
				</li>
				<li>
					<p>邮箱：</p>
					<input type="text" name="" placeholder="请输入邮箱"  class="email"/>
					<span class="warn-msg">请输入邮箱</span>
				</li>
				<li>
					<p>发货人名称：</p>
					<input type="text" name="" placeholder="请输入发货人姓名"  class="delivery_user" maxlength="4"/>
					<span class="warn-msg">请输入发货人姓名</span>
				</li>
				<li class="prompt-msg">
					<p>发货人名称，用于发货时面单打印，如果不填写，默认为仓库信息</p>
					<span class="warn-msg"></span>
				</li>
				<li>
					<p>发货人电话：</p>
					<input type="text" name="" placeholder="请输入发货人电话"  class="delivery_mobile" :maxlength="maxlength" @input="verifyFirst($event)"/>
					<span class="warn-msg">请输入发货人电话</span>
				</li>
				<li class="prompt-msg">
					<p>发货人电话，用于发货时面单打印，如果不填写，默认为仓库信息</p>
					<span class="warn-msg"></span>
				</li>
				<li>
					<p><span class="must-smg">*</span>营业执照副本照片：</p>
					<div class="special-input photoLive">
						<el-upload
						class="upload-LiveA"
						action="/api.php?s=api/uploadify/upload_image"
						:data="{'path':'user'}"
						:on-preview="handlePreviewLiveA"
						:on-remove="handleRemoveLiveA"
						:file-list="fileListliveA"
						:before-upload="beforeAvatarUploadLiveA"
						:on-success="handleAvatarSuccessLiveA"
						accept="image/jpeg,image/jpg,image/png"
						>
						<el-button size="small">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">						
							<p style="width:100%;text-align:left;">请提供该网站/网店为您所有的凭证，如后台截屏、认证截屏等，单张照片不超过2M，支持jpg、png格式</p>
						</div>
					</el-upload>
					<!-- <input type="file" v-on:change="getImg($event)" name="" value="上传照片" accept="image/jpg,image/png" /> -->
				</div>
				<span class="warn-msg">请上传照片</span>
			</li>
			<li>
				<p><span class="must-smg">*</span>门店照片：</p>
				<div class="special-input store_photoLive">
					<el-upload
					class="upload-LiveB"
					action="/api.php?s=api/uploadify/upload_image"
					:data="{'path':'user'}"
					:on-preview="handlePreviewLiveB"
					:on-remove="handleRemoveLiveB"
					:file-list="fileListliveB"
					:before-upload="beforeAvatarUploadLiveB"
					:on-success="handleAvatarSuccessLiveB"
					accept="image/jpeg,image/jpg,image/png"
					>
					<el-button size="small">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">
						<p style="width:100%;text-align:left;">请上传门店照片，单张照片不超过2M，支持JPG、PNG格式</p>
					</div>
				</el-upload>
				<!-- <input type="file" v-on:change="getImg($event)" name="" value="上传照片" accept="image/jpg,image/png" /> -->
			</div>
			<span class="warn-msg">请上传照片</span>
		</li>
		<li><input type="button" name="" value="提交" @click="proofSubmitLive"/><span class="warn-msg"></span></li>
	</ul>
	<ul class="table table-other">
		<li>
			<p><span class="must-smg">*</span>经营类型：</p>
			<div class="special-input">
				<select value="请选择经营类型">
					<option>其他</option>
				</select>
			</div>
			<span class="warn-msg"></span>
		</li>
		<li>
			<p><span class="must-smg">*</span>平台名称：</p>
			<input type="text" name="" placeholder="请填写平台名称" class="merchant_name" />
			<span class="warn-msg">请填写平台名称</span>
		</li>
		<li>
			<p><span class="must-smg">*</span>网店链接：</p>
			<input type="text" name="" placeholder="填写网址地址"  class="website"/>
			<span class="warn-msg">请填写网址地址</span>
		</li>
		<li>
			<p><span class="must-smg">*</span>联系人姓名：</p>
			<input type="text" name="" placeholder="不能为昵称，X先生，X女士，请填写真实姓名"  class="contacts_name" maxlength="4"/>
			<span class="warn-msg">请填写真实姓名</span>
		</li>
		<li>
			<p><span class="must-smg">*</span>联系人手机：</p>
			<input type="text" name="" placeholder="请填写手机号"  class="contacts_mobile" :maxlength="maxlength" @input="verifyFirst($event)"/>
			<span class="warn-msg">请填写手机号</span>
		</li>
		<li>
			<p><span class="must-smg">*</span>qq：</p>
			<input type="text" name="" placeholder="请输入QQ号"  class="qq" maxlength="12"/>
			<span class="warn-msg">请输入QQ号</span>
		</li>
		<li>
			<p><span class="must-smg">*</span>微信：</p>
			<input type="text" name="" placeholder="请输入微信帐号"  class="weixin"/>
			<span class="warn-msg">请输入微信帐号</span>
		</li>
		<li>
			<p>邮箱：</p>
			<input type="text" name="" placeholder="请输入邮箱"  class="email"/>
			<span class="warn-msg">请输入邮箱</span>
		</li>
		<li>
			<p>发货人名称：</p>
			<input type="text" name="" placeholder="请输入发货人姓名" class="delivery_user" maxlength="4"/>
			<span class="warn-msg">请输入发货人姓名</span>
		</li>
		<li class="prompt-msg">
			<p>发货人名称，用于发货时面单打印，如果不填写，默认为仓库信息</p>
			<span class="warn-msg"></span>
		</li>
		<li>
			<p>发货人电话：</p>
			<input type="text" name="" placeholder="请输入发货人电话" class="delivery_mobile" :maxlength="maxlength" @input="verifyFirst($event)" />
			<span class="warn-msg">请输入发货人电话</span>
		</li>
		<li class="prompt-msg">
			<p>发货人电话，用于发货时面单打印，如果不填写，默认为仓库信息</p>
			<span class="warn-msg"></span>
		</li>
		<li>
			<p><span class="must-smg">*</span>资质照片：</p>
			<div class="special-input photoOther">
				<el-upload
				class="upload-Other"
				action="/api.php?s=api/uploadify/upload_image"
				:data="{'path':'user'}"
				:on-preview="handlePreviewOther"
				:on-remove="handleRemoveOther"
				:file-list="fileListOther"
				:before-upload="beforeAvatarUploadOther"
				:on-success="handleAvatarSuccessOther"
				accept="image/jpeg,image/jpg,image/png"
				>
				<el-button size="small">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">						
					<p style="width:100%;text-align:left;">请提供该网站/网店为您所有的凭证，如后台截屏、认证截屏等，单张照片不超过2M，支持jpg、png格式</p>
				</div>
			</el-upload>
			<!-- <input type="file" v-on:change="getImg($event)" name="" value="上传照片" accept="image/jpg,image/png" /> -->
		</div>
		<span class="warn-msg">请上传照片</span>
	</li>
	<li class="img-area">
		<div class="preview"></div>
	</li>
	<li><input type="button" name="" value="提交" @click="proofSubmitOther"/><span class="warn-msg"></span></li>
</ul>
</div>
</div>

<index-footer></index-footer>
</div>
</template>

<script>
	import loginHeader from '@/components/common/login_header'
	import IndexFooter from '@/components/common/index_footer'
	let file = []

	export default {
		name: 'proof',
		data () {
			return {
				file:file,
				success:true,
				failure:true,
				fileListOnline: new Array(),
				uploadfileOnline:new Array(),
				fileListliveA: new Array(),
				uploadfileliveA:new Array(),
				fileListliveB: new Array(),
				uploadfileliveB: new Array(),
				fileListOther: new Array(),
				uploadfileOther: new Array(),
				maxlength:11,
			}
		},
		components:{
			loginHeader,IndexFooter
		},
		beforeCreate(){
			let proof  = this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');

	        if(proof == 1){            // 成功

	        	this.$router.push('/verify');

	        }else if(proof == -1){     // 审核中

	        	this.$router.push('/verify');
	            
	        }else if(proof == -2||proof == -3||proof == -4){     // 审核没通过，未查询到数据，未认证
	            
	        }else{
	        	this.$router.push('/login');
	        }

		},
		methods:{
			verifyFirst(e){
				if (e.srcElement.value.substring(0,1) == 1) {
					this.maxlength = '11';
				}else if(e.srcElement.value.length >= 1){
					this.maxlength = '1';
					this.$message.error('首位不为1');
				}
			},
			handleAvatarSuccessOnline(file){
				// console.log(this.uploadfileOnline.length);
				if (this.uploadfileOnline.length < 5) {
					this.uploadfileOnline.push(file.url);
				}
			},
			handleRemoveOnline(file) {
				// console.log(this.uploadfileOnline.length);

				let _this = this
				// console.log(file.response.url);
				
				$.ajax({
					url: this.$store.state.apilink+"?s=api/uploadify/remove_image",
					data: {path: file.response.url},
					type: 'post',
					dataType:"json",
					success: function (res) {
						if (res.code == 1) {
							for (let i = 0; i < _this.uploadfileOnline.length; i++) {
								if(_this.uploadfileOnline[i] == file.response.url) {
									_this.uploadfileOnline.splice(i,1)
									// console.log(_this.uploadfileOnline);
									break;
								}
							}
						}
					},
					error:function (errorres) {
						_this.$message(errorres.msg);
					}
				});
			},
			handlePreviewOnline(file) {
				// console.log(this.uploadfileOnline.length);

				// console.log(file.url);
			},
			beforeAvatarUploadOnline(file) {
				// console.log(this.uploadfileOnline.length);

				// console.log(file);
				if (this.uploadfileOnline.length == 5 ) {
					this.$message.error('最多只能传五张图');
					return false 
				}
				const isLt2MOnline = file.size / 1024 / 1024 < 2;

				if ((file.type != 'image/jpeg') && (file.type != 'image/jpg') && (file.type != 'image/png')) {
					this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
					return false
				}
				if (!isLt2MOnline) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return   isLt2MOnline;
			},
			beforeAvatarUploadLiveA(file) {
				let _this = this;
				// console.log(_this.uploadfileliveA);
				if (this.uploadfileliveA.length == 5 ) {
					this.$message.error('最多只能传五张图');
					return false 
				}
				const isLt2MA = (file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png')
				const isLt2MLiveA = file.size / 1024 / 1024 < 2;

				if (!isLt2MA) {
					this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
				}
				if (!isLt2MLiveA) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2MA && isLt2MLiveA;
			},
			handleAvatarSuccessLiveA(file){
				// console.log(this.uploadfileliveA.length);
				if (this.uploadfileliveA.length < 5) {
					this.uploadfileliveA.push(file.url);
				}
			},
			handleRemoveLiveA(file) {
				let _this = this
				// console.log(file.response.url);
				
				$.ajax({
					url: this.$store.state.apilink+"?s=api/uploadify/remove_image",
					data: {path: file.response.url},
					type: 'post',
					dataType:"json",
					success: function (res) {
						if (res.code == 1) {
							for (let i = 0; i < _this.uploadfileliveA.length; i++) {
								if(_this.uploadfileliveA[i] == file.response.url) {
									_this.uploadfileliveA.splice(i,1)
									// console.log(_this.uploadfileliveA);
									break;
								}
							}
						}
					},
					error:function (errorres) {
						_this.$message(errorres.msg);
					}
				});
			},
			handlePreviewLiveA(file) {
				// console.log(file.url);
			},
			handleAvatarSuccessLiveB(file){
				if (this.uploadfileliveB.length < 5) {
					this.uploadfileliveB.push(file.url);
				}
			},
			handleRemoveLiveB(file) {
				let _this = this
				// console.log(file.response.url);
				
				$.ajax({
					url: this.$store.state.apilink+"?s=api/uploadify/remove_image",
					data: {path: file.response.url},
					type: 'post',
					dataType:"json",
					success: function (res) {
						if (res.code == 1) {
							for (let i = 0; i < _this.uploadfileliveB.length; i++) {
								if(_this.uploadfileliveB[i] == file.response.url) {
									_this.uploadfileliveB.splice(i,1)
									// console.log(_this.uploadfileliveB);
									break;
								}
							}
						}
					},
					error:function (errorres) {
						_this.$message(errorres.msg);
					}
				});
			},
			handlePreviewLiveB(file) {
				// console.log(file.url);
			},
			beforeAvatarUploadLiveB(file) {
				if (this.uploadfileliveB.length == 5 ) {
					this.$message.error('最多只能传五张图');
					return false 
				}
				const isLt2MB = (file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png')
				const isLt2MLiveB = file.size / 1024 / 1024 < 2;

				if (!isLt2MB) {
					this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
				}
				if (!isLt2MLiveB) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2MB && isLt2MLiveB;
			},
			handleAvatarSuccessOther(file){
				if (this.uploadfileOther.length < 5) {
					this.uploadfileOther.push(file.url);
				}
			},
			handleRemoveOther(file) {
				let _this = this
				// console.log(file.response.url);
				
				$.ajax({
					url: this.$store.state.apilink+"?s=api/uploadify/remove_image",
					data: {path: file.response.url},
					type: 'post',
					dataType:"json",
					success: function (res) {
						if (res.code == 1) {
							for (let i = 0; i < _this.uploadfileOther.length; i++) {
								if(_this.uploadfileOther[i] == file.response.url) {
									_this.uploadfileOther.splice(i,1)
									// console.log(_this.uploadfileOther);
									break;
								}
							}
						}
					},
					error:function (errorres) {
						_this.$message(errorres.msg);
					}
				});
			},
			handlePreviewOther(file) {
				console.log(file.url);
			},
			beforeAvatarUploadOther(file) {
				if (this.uploadfileOther.length == 5 ) {
					this.$message.error('最多只能传五张图');
					return false 
				}
				const isLt2MO = (file.type == 'image/jpeg') || (file.type == 'image/jpg') || (file.type == 'image/png')
				const isLt2MOther = file.size / 1024 / 1024 < 2;

				if (!isLt2MO) {
					this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
				}
				if (!isLt2MOther) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2MO && isLt2MOther;
			},
			liClick (e) {
				let _this = e.currentTarget
				let classname = e.target.className;
				console.log(e);
				$(_this).css({
					'text-decoration': 'underline',
					'color': '#009E4D',
				})
				$(_this).siblings().css({
					'text-decoration': 'none',
					'color': '#333',
				})
				$('.container ul.table-'+classname+'').css('display','inline-block')
				$('.container ul.table-'+classname+'').siblings('.table').css('display','none')
			},
			
			proofSubmitOnline(){

				let _this = this;
				let photo = _this.uploadfileOnline
				$.ajax({
					url: this.$store.state.apilink+"?m=Api&c=User&a=insert_authentication_userinfo",
					data:{
						authentication_type:1,
						management_type:$('.table-online select').find("option:selected").val(),
						merchant_name:$('.table-online .merchant_name').val(),
						website:$('.table-online .website').val(),
						contacts_name:$('.table-online .contacts_name').val(),
						contacts_mobile:$('.table-online .contacts_mobile').val(),
						qq:$('.table-online .qq').val(),
						weixin:$('.table-online .weixin').val(),
						email:$('.table-online .email').val(),
						delivery_user:$('.table-online .delivery_user').val(),
						delivery_mobile:$('.table-online .delivery_mobile').val(),
						photo:photo,
						user_id:_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788')
					},
					dataType: "json",
					type: 'post',
					beforeSend:function(){
						$('.table-online .warn-msg').css('color','#fff') 
						if ($('.table-online select').val() == '-1') {
							$('.table-online select').parents('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-online .merchant_name').val() == ''){
							$('.table-online .merchant_name').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-online .website').val() == ''){
							$('.table-online .website').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-online .contacts_name').val() == ''){
							$('.table-online .contacts_name').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-online .contacts_mobile').val() == ''){
							$('.table-online .contacts_mobile').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-online .qq').val() == ''){
							$('.table-online .qq').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-online .weixin').val() == ''){
							$('.table-online .weixin').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if(photo.length == 0){
							$('.table-online .photoOnline').parent('li').find('.warn-msg').css('color','#FF1B1B');
							return false;
						}
					},
					success: function (res) {
						_this.$message(res.msg);
						if (res.code == 1) {

							_this.$cookie.setCookie('b61a9d162ac1dfaa22d0f05bdc7f6299','-1','d1');

							_this.$router.push({path:'/verify'});
						}
					},
					error:function (errorres) {
						_this.$message(errorres);
					}
				});


			},
			proofSubmitLive(){
				let _this = this;
				let photo = _this.uploadfileliveA
				let store_photo = _this.uploadfileliveB

				// console.log(photo);
				// console.log(store_photo);
				$.ajax({
					url: this.$store.state.apilink+"?m=Api&c=User&a=insert_authentication_userinfo",
					data:{
						authentication_type:2,
						merchant_name:$('.table-live .merchant_name').val(),
						contact_address:$('.table-live .contact_address').val(),
						contacts_name:$('.table-live .contacts_name').val(),
						contacts_mobile:$('.table-live .contacts_mobile').val(),
						qq:$('.table-live .qq').val(),
						weixin:$('.table-live .weixin').val(),
						email:$('.table-live .email').val(),
						delivery_user:$('.table-live .delivery_user').val(),
						delivery_mobile:$('.table-live .delivery_mobile').val(),
						photo:photo,
						store_photo:store_photo,
						user_id:_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788')
					},
					dataType: "json",
					type: 'post',
					beforeSend:function(){
						$('.table-live .warn-msg').css('color','#fff') 
						if (_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788') == null){
							_this.$router.push({path:"/login"})
							return false;
						}else if ($('.table-live select').val() == '-1') {
							$('.table-live select').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-live .merchant_name').val() == ''){
							$('.table-live .merchant_name').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-live .contact_address').val() == ''){
							$('.table-live .contact_address').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-live .contacts_name').val() == ''){
							$('.table-live .contacts_name').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-live .contacts_mobile').val() == ''){
							$('.table-live .contacts_mobile').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-live .qq').val() == ''){
							$('.table-live .qq').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-live .weixin').val() == ''){
							$('.table-live .weixin').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}
						// else if(_this.uploadfileliveA.length == 0){
						// 	$('.table-live .photoLive').parent('li').find('.warn-msg').css('color','#FF1B1B');
						// 	return false;
						// }else if(_this.uploadfileliveB.length == 0){
						// 	$('.table-live .store_photoLive').parent('li').find('.warn-msg').css('color','#FF1B1B');
						// 	return false;
						// }
					},
					success: function (res) {
						_this.$message(res.msg);
						if (res.code == 1) {
							_this.$cookie.setCookie('b61a9d162ac1dfaa22d0f05bdc7f6299','-1','d1');

							_this.$router.push({path:'/verify'});
						}

					},
					error:function (errorres) {
						_this.$message(errorres);
					}
				});


			},
			proofSubmitOther(){
				let _this = this;
				let photo = _this.uploadfileOther
				// console.log(_this.uploadfileOther);
				$.ajax({
					url: this.$store.state.apilink+"?m=Api&c=User&a=insert_authentication_userinfo",
					data:{
						authentication_type:3,
						merchant_name:$('.table-other .merchant_name').val(),
						website:$('.table-other .website').val(),
						contacts_name:$('.table-other .contacts_name').val(),
						contacts_mobile:$('.table-other .contacts_mobile').val(),
						qq:$('.table-other .qq').val(),
						weixin:$('.table-other .weixin').val(),
						email:$('.table-other .email').val(),
						delivery_user:$('.table-other .delivery_user').val(),
						delivery_mobile:$('.table-other .delivery_mobile').val(),
						photo:photo,
						user_id:_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788')
					},
					dataType: "json",
					type: 'post',
					beforeSend:function(){
						$('.table-other .warn-msg').css('color','#fff') 
						if (_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788') == null){
							_this.$router.push({path:"/login"})
							return false;
						}else if ($('.table-other select').val() == '-1') {
							$('.table-other select').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-other .merchant_name').val() == ''){
							$('.table-other .merchant_name').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-other .website').val() == ''){
							$('.table-other .website').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-other .contacts_name').val() == ''){
							$('.table-other .contacts_name').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-other .contacts_mobile').val() == ''){
							$('.table-other .contacts_mobile').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-other .qq').val() == ''){
							$('.table-other .qq').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if ($('.table-other .weixin').val() == ''){
							$('.table-other .weixin').parent('li').find('.warn-msg').css('color','#FF1B1B') 
							return false;
						}else if(photo.length == 0){
							$('.table-other .photoOther').parent('li').find('.warn-msg').css('color','#FF1B1B');
							return false;
						}
					},
					success: function (res) {
						_this.$message(res.msg);
						if (res.code == 1) {
							
							_this.$cookie.setCookie('b61a9d162ac1dfaa22d0f05bdc7f6299','-1','d1');

							_this.$router.push({path:'/verify'});
						}
					},
					error:function (errorres) {
						_this.$message(errorres);
					}
				});
			}
		}
	}




</script>

<style scoped>
	.proof {
		width: 100%;
		height: 100%
	}

	.proof .content {
		/*height: 645px;*/
		width: 100%;
		background: #F5F5F5;
		text-align: center;
		padding: 50px  0;
	}
	.proof .content .title{
		margin-bottom: 16px;
	}
	.proof .content .title img{
		margin-bottom: 24px;
	}
/*
		.proof .content .container {
			width: 400px;
			display: inline-block;
			margin-top: 16px;
			padding: 70px 250px;
			background: #fff
		}*/
		.proof .content .container .nav{
			width: 410px;
			margin: 0 auto;
			padding: 70px 240px 40px 250px;
			background: #fff;
			overflow: hidden;
		}
		.proof .content .container .nav li{
			cursor: pointer;
			float: left;
			margin-right: 56px;
		}
		.proof .content .container .nav li:nth-child(1){
			text-decoration: underline;
			color: #009E4D;
		}
		.proof .content .container .table{
			width: 810px;
			display: inline-block;
			padding: 0 90px 70px 0;
			background: #fff;
		}
		.proof .content .container .table-other,.proof .content .container .table-live{
			display: none;
		}
		.proof .content .container .table li:not(.prompt-msg):not(.file-area){
			/*height: 40px;*/
			line-height: 40px;
			margin-top: 20px;
			float: left;
			overflow: hidden;
			width: 100%;
		}
		.proof .content .container .table li:not(.prompt-msg):not(.file-area) p{
			float: left;
			width: 30%;
			text-align: right;
		}
		.proof .content .container .table .special-input{
			width: 320px;
			float: left;
			text-align: left;
		}
		.proof .content .container .table .must-smg{
			color: #FF1B1B;
		}
		.proof .content .container .table .prompt-msg{
			font-size: 12px;
			height: 32px;
			line-height: 16px;
			margin: 12px 0 0 30%;
			float: left;
			text-align: left;
		}
		.proof .el-upload__tip{
			font-size: 12px;
			height: 32px;
			line-height: 16px;
			margin-top: 12px;
		}
		.proof .content .container .table .prompt-msg p{
			width: 400px;
			text-align: left;
		}
		.proof .content .container .table .warn-msg{
			font-size: 14px;
			color: #fff;
			float: left;
			padding-left: 10px;
			line-height: 40px;
			-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;
		}

		.proof .content .container .table input[type='text']{
			width: 380px;
			padding: 0 10px;
			/*height: 100%;*/
			border-radius: 4px;
			float: left;
			border:1px solid #D8D8D8;
			height: 40px;
		}
		.proof .content .container .table select{
			border:1px solid #D8D8D8;
			height: 32px;
			width: 260px
		}
		.proof .content .container .table input[type='button']{
			width: 402px;
			height: 42px;
			background: #009E4D;
			border-radius: 4px;
			color: #fff;
			font-size: 20px;
		}

	</style>