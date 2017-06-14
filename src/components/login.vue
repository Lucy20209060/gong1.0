<template>
  <div class="login">
    <login-header>欢迎登录</login-header>
    <div class="content" style="background: url(/static/images/login_bg.png) 100% 100%;">
        <ul>
            <li>安厨供应链登录</li>
            <li class="hint"></li>
            <li>
               <div>
                  <span class="iconfont icon-shouji"></span>
              </div>
              <input type="tel" name="" class="login-phone" :maxlength="maxlength" placeholder="请输入手机号码" @input="verifyFirst($event)" v-on:keyup.13='loginSubmit' onkeyup="value=value.replace(/[^\d]/g,'')"/>
              <span class="iconfont icon-iconfontshanchu pointer" v-on:click='iconfontshanchu($event)' style="display: none;color:#999"></span>
          </li>
          <li>
           <div>
              <span class="iconfont icon-p-password"></span>
          </div>
          <input type="password" name="" class="login-password" placeholder="请输入密码" maxlength="16" v-on:keyup.13='loginSubmit'/>
      </li>
      <li>
       <p style="color:#999">建议使用数字、字母、符号两种及以上的组合，6-16个字符</p>
   </li>
   <li>
       <input type="button" name="" class="login-submit" value="登录" v-on:click='loginSubmit' />
   </li>
   <li>
       <router-link to="/findBackPsd">忘记密码？</router-link>
       <router-link class="btn-register" to="/register">立即注册</router-link>
   </li>
</ul>
</div>
<index-footer></index-footer>
</div>
</template>

<script>
    import loginHeader from "@/components/common/login_header"
    import IndexFooter from "@/components/common/index_footer"
    export default {
      name: 'login',
      data () {
        return {
          maxlength:11
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
  mounted(){
    // this.islogin();
  },
  methods:{
    islogin() {
        let _this = this;
        $.ajax({
            url: this.$store.state.apilink+"?s=api/User/is_login",
            dataType: "json",
            type: 'get',
            success: function (res) {
                if (res.code == '2'){
                    sessionStorage.loginstatus = true;
                    sessionStorage.user_id = res.user_id;
										// console.log(this.$store.state.apilink+"?s=api/User/is_login")
                    $.ajax({
                        url: _this.$store.state.apilink+"?s=api/user/getUserInfo",
                        data:{user_id:sessionStorage.user_id},
                        dataType: "json",
                        type: 'get',
                        success: function (res) {
                          // console.log(res)
                            sessionStorage.username = res.result.mobile;
                            _this.isverify();
                        }
                    });
                            //开发后期开启，否则开发中账户无法使用，必须等认证通过才能使用
                        }else{
                            // 删除userId
                            _this.$cookie.delCookie('a34ea2d96d4239d4d86803bb3cd99788');
                            // 删除电话号码
                            _this.$cookie.delCookie('8e3c824e1d6254b74a013799c1565538');
                            // 删除认证状态
                            _this.$cookie.delCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');
                            _this.$cookie.delCookie('PHPSESSID')
                        }
                    },
                    error:function (res) {
                        _this.$message('未知错误！');
                    }
                });
    },
    isverify(){
        let _this = this;
        if (sessionStorage.user_id == undefined) {
          _this.$router.push({path:'/login'});
          return;
        }
        $.ajax({
          url: _this.$store.state.apilink+"?s=api/User/user_is_verify",
          data: {user_id: sessionStorage.user_id},
          type: 'post',
          dataType:"json",
          success: function (res) {
            if((res.code == '-2') || (res.code == '-4')){
              _this.$router.push({path:'/proof'});
            }else if(res.code == '-1'){
              _this.$message(res.msg);
              _this.$router.push({path:'/verify'});
            }else if(res.code == '1'){
              _this.$router.push({path:'/'});
            }else{
              return
            }
          },
          error:function (errorres) {
            _this.$message(errorres.msg);
          }
        });
      },
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
loginSubmitCheck() {
    let loginPhone = $(".login-phone").val();
    let loginPassword = $(".login-password").val();
    loginPhone = loginPhone.replace(/(^\s+)|(\s+$)/g,"");
    loginPassword = loginPassword.replace(/(^\s+)|(\s+$)/g,"")
    let hintspan = '<span class="iconfont icon-warning" style="color:#FF5858;margin: 0 5px"></span>';
    if (loginPhone == '') {
        $('.hint').html(hintspan+'请填写手机号码');
        return false;
    }else if(loginPassword == '') {
        $('.hint').html(hintspan+'请填写密码');
        return false;
    }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]).{5,17}$/).test(loginPassword)) {
        $('.hint').html(hintspan+'密码格式不正确');
        return false;
    } else {
        return true;
    }
},
loginSubmit(){

    // 删除userId
    this.$cookie.delCookie('a34ea2d96d4239d4d86803bb3cd99788');
    // 删除电话号码
    this.$cookie.delCookie('8e3c824e1d6254b74a013799c1565538');
    // 删除认证状态
    this.$cookie.delCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');

    this.$cookie.delCookie('PHPSESSID');



   let _this = this;
   $.ajax({
    url: _this.$store.state.apilink+"?s=api/User/do_login",
    data: {
      username:$(".login-phone").val(),
      password:$(".login-password").val()
    },
    dataType: "json",
    type: 'post',
    beforeSend: function () {
        if(!_this.loginSubmitCheck()){
           return false;
       }
   },
   success: function (res) {
    if (res.status == 200){

        // 设置  cookie 默认1天
       _this.$cookie.setCookie('a34ea2d96d4239d4d86803bb3cd99788',res.user_id,'d1');
       _this.$cookie.setCookie('8e3c824e1d6254b74a013799c1565538',$(".login-phone").val(),'d1');


        $.ajax({
            url:_this.$store.state.apilink+'?s=api/User/user_is_verify',
            data:{
              user_id:_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788')
            },
            dataType: "json",
            type: 'post',
            success: function (res) {
              // console.log(res)
                _this.$cookie.setCookie('b61a9d162ac1dfaa22d0f05bdc7f6299',res.code,'d1');
                if(res.code == 1){
                    _this.$router.push({path:'/'});
                }else if(res.code== -1){
                    _this.$router.push({path:'/verify'});
                }else{
                    _this.$router.push({path:'/proof'});
                }
            },
            error:function (res) {
              _this.$message('系统繁忙，请稍候~');
            }
        });

    }else{
        _this.$message(res.msg);
    }
},
error:function (res) {
    _this.$message('系统繁忙，请稍候~');
}
});
},
iconfontshanchu(e){
   $(e.currentTarget).prev('input').val('');
   $('.icon-iconfontshanchu').hide()
}
}
}

</script>

<style scoped>

    .login{width:100%;height:100%}
    .login .content{height:600px}
    .login .content ul{width:350px;float:right;margin:100px 360px 0 0;padding:20px 40px;background:#fff}
    .login .content ul li:nth-child(1){height:65px;line-height:65px;font-size:20px;border-bottom:2px solid #E2E2E2;text-align:center}
    .login .content ul li:nth-child(2){height:30px;line-height:30px;font-size:14px;color:#FF1B1B;margin-top:1px;text-align: left;}
    .login .content ul li:nth-child(3),.login .content ul li:nth-child(4){height:46px;line-height:46px;font-size:16px;margin-top:1px;border:1px solid #D8D8D8;border-radius:4px;display:flex;align-items:center;overflow:hidden}
    .login .content ul li:nth-child(3) div,.login .content ul li:nth-child(4) div{background:#f2f2f2}
    .login .content ul li:nth-child(3) input,.login .content ul li:nth-child(4) input{width:260px;height:100%;padding:0 16px}
    .login .content ul li:nth-child(3) .iconfont,.login .content ul li:nth-child(4) .iconfont{height:100%;margin:0 17px}
    .login .content ul li:nth-child(4){margin-top:20px}
    .login .content ul li:nth-child(5){height:12px;line-height:12px;font-size:12px;margin-top:12px;text-align: left;}
    .login .content ul li:nth-child(6){text-align:center;height:46px;line-height:46px;background:#009448;margin-top:20px;border-radius:4px}
    .login .content ul li:nth-child(6) input{font-size:20px;color:#fff;width: 100%;height: 100%;}
    .login .content ul li:nth-child(7){height:17px;line-height:17px;margin-top:20px;text-align: left;}
    .login .btn-register{float:right;color:#009448!important}
</style>
