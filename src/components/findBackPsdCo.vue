<template>
  <div class="findback-psd-co">
    <div class="address-header">修改密码</div>
  	<div class="content">
         <ul>
            <li class="hint"></li>
            <li>
                <div>
                    <span class="iconfont icon-shouji"></span>
                </div>
                <input type="tel" name="" class="finsbackPsd-phone" :maxlength="maxlength" @input="verifyFirst($event)" v-on:keyup.13='findbackPsdSubmit' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入手机号" />
                <span class="iconfont icon-iconfontshanchu pointer" @click="iconfontshanchu" style="display: none;color: #999"></span>
            </li>
            <li>
                <div>
                    <span class="iconfont icon-p-password"></span>
                </div>
                <input type="tel" name="" class="finsbackPsd-code" maxlength="4" v-on:keyup.13='findbackPsdSubmit' onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入验证码" />
                <button class="pointer" @click="getCode" v-model="getCodeValue" :disabled="disabled">{{getCodeValue}}</button>
            </li>
            <li>
                <div>
                    <span class="iconfont icon-p-password"></span>
                </div>
                <input type="password" name="" class="finsbackPsd-password" v-on:keyup.13='findbackPsdSubmit' maxlength="16" onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" placeholder="请输入密码" />
                <span class="iconfont icon-biyan pointer" @click="iconSee($event)"></span>
            </li>
            <li>
                <div>
                    <span class="iconfont icon-p-password"></span>
                </div>
                <input type="password" name="" class="finsbackPsd-password-check" maxlength="16" v-on:keyup.13='findbackPsdSubmit' onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')" placeholder="请再次输入密码" />
                <span class="iconfont icon-biyan pointer" @click="iconSee($event)"></span>
            </li>
            <li>
                <p style="color:#999">建议使用数字、字母、符号两种及以上的组合，6-16个字符</p>
            </li>
            <li>
                <input type="button" name="" value="修改" @click="findbackPsdSubmit"/>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
    export default {
      name: 'findback-psd-co',
      data () {
        return {
          msg: '',
          wait: 60,
          getCodeValue:'获取验证码',
          disabled:false,
          maxlength:11,
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
    iconSee(e) {
        if ($(e.currentTarget).hasClass('icon-biyan')) {
            $(e.currentTarget).removeClass('icon-biyan').addClass('icon-helpeye');
            $(e.currentTarget).prev('input').attr('type','tel')
        }else{
            $(e.currentTarget).removeClass('icon-helpeye').addClass('icon-biyan');
            $(e.currentTarget).prev('input').attr('type','password')
        }
    },
    iconfontshanchu(e){
    	$(e.currentTarget).prev('input').val('');
        $('.icon-iconfontshanchu').hide()
    },
    getCode(){
    	let _this = this;
        $.ajax({
            url:this.$store.state.apilink+'?s=api/Api/send_validate_code',
            data:{mobile:$(".finsbackPsd-phone").val(),scene:2,type:'mobile'},
            dataType: "json",
            type: 'get',
            beforeSend:function () {
                let finsbackPsdPhone = $(".finsbackPsd-phone").val();
                let hintspan = '<span class="iconfont icon-warning" style="color:#FF5858;margin: 0 5px"></span>';
                if(finsbackPsdPhone == ''){
                    $('.hint').html(hintspan+'请输入手机号');
                    return false;
                }
            },
            success: function (res) {
                if (res.status == 1) {
                    _this.$message(res.msg);
                    _this.time();
                }else{
                    _this.$message(res.msg);
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
    findbackPsdSubmit(){
    	let _this = this;
    	$.ajax({
            url: this.$store.state.apilink+"?s=api/User/forget_pwd",
            data: {
                mobile:$(".finsbackPsd-phone").val(),
                code:$(".finsbackPsd-code").val(),
                confirm_password:$(".finsbackPsd-password").val(),
                new_password:$(".finsbackPsd-password-check").val()
            },
            type: 'post',
            dataType:'json',
            beforeSend: function () {
                if(!_this.findbackPsdSubmitCheck()){
                    return false;
                };
            },
            success: function (res) {
                _this.$message(res.msg);
                if (res.code == 1){

                    // 设置  cookie 默认1天
                   _this.$cookie.setCookie('a34ea2d96d4239d4d86803bb3cd99788',res.user_id,'d1');
                   _this.$cookie.setCookie('8e3c824e1d6254b74a013799c1565538',$(".finsbackPsd-phone").val(),'d1');
                }
            },
            error:function (res) {
                _this.$message(res.msg);
            }
        });
    },
    findbackPsdSubmitCheck() {
        let finsbackPsdPhone = $(".finsbackPsd-phone").val();
        let finsbackPsdCode = $(".finsbackPsd-code").val();
        let finsbackPsdPassword = $(".finsbackPsd-password").val();
        let finsbackPsdPasswordCheck = $(".finsbackPsd-password-check").val();
        finsbackPsdPhone = finsbackPsdPhone.replace(/(^\s+)|(\s+$)/g,"");
        finsbackPsdCode = finsbackPsdCode.replace(/(^\s+)|(\s+$)/g,"")
        finsbackPsdPassword = finsbackPsdPassword.replace(/(^\s+)|(\s+$)/g,"")
        let hintspan = '<span class="iconfont icon-warning" style="color:#FF5858;margin: 0 5px"></span>';
        // console.log(finsbackPsdPhone);
        // console.log(finsbackPsdCode);
        if (finsbackPsdPhone == '') {
            $('.hint').html(hintspan+'请填写手机号码');
            return false;
        }else if(finsbackPsdCode == '') {
            $('.hint').html(hintspan+'请填写验证码');
            return false;
        }else if(finsbackPsdPassword == '') {
            $('.hint').html(hintspan+'请填写密码');
            return false;
        }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]).{5,17}$/).test(finsbackPsdPassword)) {
            $('.hint').html(hintspan+'密码格式不正确');
            return false;
        }else if(finsbackPsdPasswordCheck == '') {
            $('.hint').html(hintspan+'请再次输入密码');
            return false;
        }else if(finsbackPsdPasswordCheck != finsbackPsdPassword) {
            $('.hint').html(hintspan+'两次密码不相同，请重新输入');
            return false;
        } else {
            return true;
        }
    },
}
}
</script>

<style scoped>
	.findback-psd-co{min-height: 380px;background: #fff;float: left;position: relative;width: 970px;/*padding: 15px 29px 98px 21px;*/}
    .findback-psd-co .address-header{margin: 15px 29px 0 21px;text-align: left;border-bottom: 3px solid #D8D8D8;padding-bottom: 12px;}
    .findback-psd-co .content{min-height: 380px;width:100%;text-align:center}
    .findback-psd-co .content ul{width:400px;display:inline-block;padding:70px 250px;background:#fff}
    .findback-psd-co .content ul li:nth-child(1){margin-top:1px;height:30px;color:#ff1b1b;font-size:14px;line-height:30px;text-align:left}
    .findback-psd-co .content ul li:nth-child(2),.findback-psd-co .content ul li:nth-child(3),.findback-psd-co .content ul li:nth-child(4),.findback-psd-co .content ul li:nth-child(5){display:flex;overflow:hidden;margin-top:1px;height:46px;border:1px solid #d8d8d8;border-radius:4px;font-size:16px;line-height:46px;align-items:center}
    .findback-psd-co .content ul li:nth-child(2) div,.findback-psd-co .content ul li:nth-child(3) div,.findback-psd-co .content ul li:nth-child(4) div,.findback-psd-co .content ul li:nth-child(5) div{background:#f2f2f2}
    .findback-psd-co .content ul li:nth-child(2) input,.findback-psd-co .content ul li:nth-child(3) input,.findback-psd-co .content ul li:nth-child(4) input,.findback-psd-co .content ul li:nth-child(5) input{padding:0 16px;width:260px;height:100%}
    .findback-psd-co .content ul li:nth-child(2) .iconfont,.findback-psd-co .content ul li:nth-child(3) .iconfont,.findback-psd-co .content ul li:nth-child(4) .iconfont,.findback-psd-co .content ul li:nth-child(5) .iconfont{margin:0 16px;height:100%}
    .findback-psd-co .content ul li:nth-child(3),.findback-psd-co .content ul li:nth-child(4),.findback-psd-co .content ul li:nth-child(5){margin-top:20px}
    .findback-psd-co .content ul li:nth-child(3) input{width:240px;padding-right:0}
    .findback-psd-co .content ul li:nth-child(3) button{padding-left:15px;border-left:1px solid #D8D8D8}
    .findback-psd-co .content ul li:nth-child(6){margin-top:12px;height:12px;font-size:12px;line-height:12px;text-align:left}
    .findback-psd-co .content ul li:nth-child(7){margin-top:20px;height:46px;border-radius:4px;background:#009448;line-height:46px}
    .findback-psd-co .content ul li:nth-child(7) input{width:100%;height:100%;color:#fff;font-size:20px}
</style>