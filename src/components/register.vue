<template>
  <div class="register">
  		<login-header>用户注册</login-header>
        <div class="content">
            <ul>
                <li>
                	<router-link to="/login">已有账号?<span>马上登录</span></router-link>
                	</li>
                <li class="hint"></li>
                <li>
                	<div>
                		<span class="iconfont icon-shouji"></span>
                	</div>
                	<input type="tel" name="" class="register-phone" :maxlength="maxlength" placeholder="请输入手机号" @input="verifyFirst($event)" v-on:keyup.13='registerSubmit' onkeyup="value=value.replace(/[^\d]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" /><span class="iconfont icon-iconfontshanchu pointer" v-on:click="iconfontshanchu" style="color:#999;display: none;"></span>
                </li>
                <li>
                	<div>
                		<span class="iconfont icon-p-password"></span>
                	</div>
                	<input type="tel" name="" class="register-code" placeholder="请输入验证码" maxlength="4" v-on:keyup.13='registerSubmit' onkeyup="value=value.replace(/[^\d]/g,'')"/>
                	<button v-on:click="getCode" class="noselect pointer" v-model='getCodeValue' :disabled='disabled'>{{getCodeValue}}</button>
                </li>
                <li>
                	<div>
                		<span class="iconfont icon-p-password"></span>
                	</div>
                	<input type="password" name="" class="register-password" maxlength="16" placeholder="请输入密码" v-on:keyup.13='registerSubmit' onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" />
                	<span class="iconfont iconsee icon-biyan pointer" v-on:click="iconSee"></span>
                </li>
                <li>
                	<p style="color: #999">建议使用数字、字母、符号两种及以上的组合，6-16个字符</p>
                </li>
                <li>
                	<input type="radio" name="" id="radio" :checked="checked" @click="radio()" v-on:keyup.13='registerSubmit'/>
                	<label for="radio" style="color: #999" class="pointer">
                		&nbsp;我已阅读并同意 
                		<span class="terms" style="color: #333;" @click="dialogVisible = true">《安厨供应链服务条款》</span>
                	</label>
                </li>
                <li>
                	<input type="button" class="register-submit" v-on:click="registerSubmit" name="" value="注册" />
                </li>
            </ul>
        </div>
        <el-dialog title="服务条款" v-model="dialogVisible" size="small" :close-on-click-modal='false' :close-on-press-escape='false'>
              <p style="line-height: 20px;height: 500px;overflow-y: scroll;">
                <span style="font-weight: bold;">甲方：杭州安厨电子商务有限公司</span><br/>
                <span style="font-weight: bold;">乙方：注册方</span><br/>
<br/>
根据相关法律法规的规定，甲乙双方通过友好协商，本着平等、自愿、公平和诚实信用的原则，就乙方在其合作平台销售甲方商品事宜订立本协议<br/>
<br/>
第一条条款目的<br/>
1.1为了规范安厨经营秩序，保障安厨自营商品的质量，以维护采购方的合法权益，安厨与采购方就安厨自营商品的合作运营事宜，根据《用户的权利和义务》、《安厨平台规则》的有关内容制定。<br/>
1.2本条款由杭州安厨电子商务有限公司（以下简称“安厨”或“甲方"）与申请成为采购方的会员（以下简称”采购方“或者”乙方“）共同认证。<br/>
<br/>
第二条合作内容及方式<br/>
2.1乙方在其合作平台上架销售甲方商品，消费者在乙方合作平台下单后，乙方在甲方平台自助下单或批量导入订单，由甲方为消费者配送商品。<br/>
2.2乙方将完整的订单信息发送给甲方，包括商品信息、数量、收件地址、收件人、电话等,如产品、数量、包裹地址等信息有误造成售后顾客退换货的，产生的责任由出错方承担。<br/>
2.3发货时间：乙方通过安厨平台向甲方系统下单，并且提供收件人正确的收货地址等信息。甲方在接到订单后，正常情况下，商品48小时内完成发货。<br/>
2.4 邮资说明：货物运输产生的费用由乙方承担（包邮商品除外）。<br/>
<br/>
第三条退换货与责任界定<br/>
3.1甲方保证所售为正品农产品，因商品质量问题发生的退、换货，甲方会协助完成货品退换且因退、换货产生的一切物流费用由甲方承担；因食品的特殊性，非质量问题的商品甲方不接受退换货，相应售后由乙方自行处理。<br/>
3.2若因甲方错发、漏发、物流等原因发生的乙方消费者退、换货，因退、换货产生的一切费用由甲方承担。<br/>
3.3乙方消费者收到货物后，如有破损、质量不合格、商品漏发等异常情况，乙方需明确要求消费者提供证据并拍照，包括但不限于商品外箱、破损商品和快递单号的照片，并在（2）个工作日内反馈给甲方，甲方应在收到乙方反馈后及时配合处理。<br/>
<br/>
第四条财务结算及预付款<br/>
4.1  甲乙双方约定开展合作前乙方应向甲方支付10000元（壹万元）预付货款，以积分形式充入乙方在线账户，每日订单从预付款中扣取，预付款不足时需要乙方补足货款方能正常发货。<br/>
4.2  乙方也可按每批订单实际金额进行在线支付，付款成功后甲方按乙方订单要求进行发货。<br/>
4.3  甲乙双方在结算、汇款、收款过程中产生的手续费由甲乙双方各自承担。<br/>
4.4  协议解除甲乙双方根据实际履行结算费用，预付款如有多出部分甲方应退还给乙方。<br/>
<br/>
第五条保密条款<br/>
本协议所称商业秘密包括但不限于本协议任何补充协议所述内容及在合作过程中涉及的其他秘密信息。任何一方未经另一方书面同意，均不得将该信息向任何第三方披露、传播、编辑或展示。保密期限直至该商业秘密进入公众领域或双方书面同意解除本条限制。<br/>
<br/>
第六条不可抗力<br/>
不可抗力致使本协议不能履行或不能完全履行的，遭受方可以免责或部分免责。本协议不可抗力是指：不能预见、不可避免、无法克服的客观情况。如因发生地震、台风、水灾、火灾、战争、内乱、政府行为导致协议迟延履行或不能履行，遭遇不可抗力的一方应在不可抗力发生后15个工作日内由事故发生地主管当局出具事故证明书。双方就不可抗力造成的后果进行协商，根据其影响程度，免除或部分免除相应责任。<br/>
<br/>
第七条争议解决<br/>
凡因本协议引起的或与本协议有关的任何争议，如双方不能通过友好协商解决，双方均可提交给合同签署地有管辖权的法院解决。因本协议引起的纠纷，甲乙双方约定适用中华人民共和国法律解决。<br/>
<br/>
第八条协议终止<br/>
8.1协议期间，如果发生下列情况之一时，守约方有权提前解除本协议：<br/>
（1）违约方违反本协议约定给对方造成严重损失，经守约方通知后仍不改正，守约方有权经提前5日通知违约方后解除本协议。<br/>
（2）任何一方发生无力偿债，其事业为债权人接管、结束、解散、宣告破产等事情时，对方有权终止本合同。<br/>
8.2除前款约定情况外，任何一方由于自身原因不能继续履行本协议，必须以书面形式向对方提出，并取得对方同意，协议解除甲乙双方根据实际履行结算费用。<br/>
8.3协议终止后，乙方应配合甲方完成相关的交接工作；业务交接完毕以后，配合甲方进行费用对账结算。<br/>
              </p>
            <input type="button" name="" @click="dialogVisible = false" value="确定" style="margin: 20px auto 0 auto;border:1px solid #D8D8D8;background: #009E4D;color: #fff;padding: 15px 60px;display: block;" />
        </el-dialog>

  </div>
</template>

<script>

import loginHeader from "@/components/common/login_header"
import IndexFooter from "@/components/common/index_footer"
export default {
  name: 'register',
  data () {
    return {
        msg: '',
        wait: 60,
        getCodeValue:'获取验证码',
        disabled:false,
        maxlength:'11',
        checked:false,
        dialogVisible:false
    }
  },
  components:{
    loginHeader,IndexFooter
  },
  beforeCreate(){
        let userid  = this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788');
        if(userid){
            this.$router.push('/');
        }
  },
  methods:{
    verifyFirst(e){
        let hintspan = '<span class="iconfont icon-warning" style="color:#FF5858;margin: 0 5px"></span>';
        if (e.srcElement.value.substring(0,1) == 1) {
            this.maxlength = '11';
            $('.hint').html('');
            $('.icon-iconfontshanchu').show()
        }else if(e.srcElement.value.length >= 1){
            this.maxlength = '1';
            $('.hint').html(hintspan+'首位不为1');
            $('.icon-iconfontshanchu').show()
        }else{
            $('.icon-iconfontshanchu').hide()
        }
    },
  	registerSubmitCheck() {
        let registerPhone = $(".register-phone").val();
        let registerCode = $(".register-code").val();
        let registerPassword = $(".register-password").val();
        registerPhone = registerPhone.replace(/(^\s+)|(\s+$)/g,"");
        registerCode = registerCode.replace(/(^\s+)|(\s+$)/g,"")
        registerPassword = registerPassword.replace(/(^\s+)|(\s+$)/g,"")
        let hintspan = '<span class="iconfont icon-warning" style="color:#FF5858;margin: 0 5px"></span>';
        $('.hint').html('')
        if (registerPhone == '') {
            $('.hint').html(hintspan+'请填写手机号码');
            return false;
        }else if(registerCode == '') {
            $('.hint').html(hintspan+'请填写验证码');
            return false;
        }else if(registerPassword == '') {
            $('.hint').html(hintspan+'请填写密码');
            return false;
        }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]).{5,17}$/).test(registerPassword)) {
            $('.hint').html(hintspan+'密码格式不正确');
            return false;
        }else if(!$('#radio').prop('checked')) {
            $('.hint').html(hintspan+'请阅读条款');
            return false;
        } else {
            return true;
        }
    },
	iconfontshanchu(e){
    	$(e.currentTarget).prev('input').val('');
        $('.icon-iconfontshanchu').hide()
    },
    registerSubmit(){
    	let _this = this;
    	$.ajax({
            url: _this.$store.state.apilink+"?s=api/User/reg",
            data: {user_name:$(".register-phone").val(),code:$(".register-code").val(),password:$(".register-password").val()},
            type: 'post',
            dataType:"json",
            beforeSend: function () {
                if(!_this.registerSubmitCheck()){
                    return false;
                };
            },
            success: function (res) {
                _this.$message(res.msg);
                if (res.code == 1){
                    // 设置用户id
                    _this.$cookie.setCookie('a34ea2d96d4239d4d86803bb3cd99788',res.result.user_id,'d1');
                    // 设置电话号码
                    _this.$cookie.setCookie('8e3c824e1d6254b74a013799c1565538',$(".register-phone").val(),'d1');
                    // 设置认证状态
                    _this.$cookie.setCookie('b61a9d162ac1dfaa22d0f05bdc7f6299','-4','d1');
                    // 跳转 proof
                    _this.$router.push({path:'/proof'});
                }
            },
            error:function (res) {
                _this.$message(res.msg);
            }
        });
    },
    time() {
    	let _this = this
        if (_this.wait == 0) {
            _this.getCodeValue="获取验证码";
            _this.wait = 60;
            _this.disabled = false;
        } else {
            _this.disabled = true;
            _this.getCodeValue = "请等待" + _this.wait + "s";
            _this.wait--;
            setTimeout(function () {
                _this.time()
            },
            1000)
        }
    },
    getCode(){
    	let _this = this;
    	// let getcode = document.getElementById('getcode');
        $.ajax({
            url:this.$store.state.apilink+"?s=api/Api/send_validate_code",
            data:{mobile:$(".register-phone").val(),scene:1,type:'mobile'},
            dataType: "json",
            type: 'post',
            beforeSend:function () {
                let registerPhone = $(".register-phone").val();
                let hintspan = '<span class="iconfont icon-warning" style="color:#FF5858;margin: 0 5px"></span>';
                if(registerPhone == ''){
                    $('.hint').html(hintspan+'请输入手机号');
                    return false;
                }
            },
            success: function (res) {
                if (res.status == '1') {
                    _this.time()
                }
                _this.$message(res.msg); 

            },
            error:function (res) {
                _this.$message(res.msg);
            }
        });
    },
    radio(e){
    	this.checked = !this.checked;
    },
    iconSee(e) {
        if ($(e.currentTarget).hasClass('icon-biyan')) {
            $(e.currentTarget).removeClass('icon-biyan').addClass('icon-helpeye');
            $(e.currentTarget).prev('input').attr('type','tel')
        }else{
            $(e.currentTarget).removeClass('icon-helpeye').addClass('icon-biyan');
            $(e.currentTarget).prev('input').attr('type','password')
        }
    }
  }
}

 

</script>

<style scoped>
	.register{width:100%;height:100%}
.register .header{height:120px;line-height:120px}
.register .logo-wrap{margin:0 auto;width:1200px;height:100%;display:flex;align-items:center}
.register .logo{width:178px;height:34px}
.register .icon-shuxian{font-size:35px}
.register .word{color:#666;font-size:26px}
.register .content{height:645px;width:100%;background:#F5F5F5;text-align:center}
.register .content ul{width:400px;display:inline-block;margin-top:70px;padding:70px 250px;background:#fff}
.register .content ul li:nth-child(1){height:25px;border-bottom:2px solid #e2e2e2;font-size:14px;line-height:25px;text-align:right}
.register .content ul li:nth-child(1) span{color:#009448}
.register .content ul li:nth-child(2){margin-top:1px;height:30px;color:#ff1b1b;font-size:14px;line-height:30px;text-align:left}
.register .content ul li:nth-child(3),.register .content ul li:nth-child(4),.register .content ul li:nth-child(5){display:flex;overflow:hidden;margin-top:1px;height:46px;border:1px solid #d8d8d8;border-radius:4px;font-size:16px;line-height:46px;align-items:center}
.register .content ul li:nth-child(3) div,.register .content ul li:nth-child(4) div,.register .content ul li:nth-child(5) div{background:#f2f2f2}
.register .content ul li:nth-child(3) input,.register .content ul li:nth-child(4) input,.register .content ul li:nth-child(5) input{padding:0 16px;width:260px;height:100%}
.register .content ul li:nth-child(4) input{width:240px;padding-right:0}
.register .content ul li:nth-child(4) button{padding-left:15px;border-left:1px solid #D8D8D8}
.register .content ul li:nth-child(3) .iconfont,.register .content ul li:nth-child(4) .iconfont,.register .content ul li:nth-child(5) .iconfont{margin:0 16px;height:100%}
.register .content ul li:nth-child(4),.register .content ul li:nth-child(5){margin-top:20px}
.register .content ul li:nth-child(6),.register .content ul li:nth-child(7){margin-top:12px;height:12px;font-size:12px;line-height:12px;text-align:left}
.register .content ul li:nth-child(7){margin-top:20px;height:12px;line-height:12px;display:flex;align-items:center}
.register .content ul li:nth-child(8){margin-top:20px;height:46px;border-radius:4px;background:#009448;line-height:46px}
.register .content ul li:nth-child(8) input{width:100%;height:100%;color:#fff;font-size:20px}
.register .content .terms:hover{color:#009448!important;}
.register .btn-register{float:right;color:#009448!important}
.register .footer{padding-top:75px;text-align:center;font-size:16px}
</style>