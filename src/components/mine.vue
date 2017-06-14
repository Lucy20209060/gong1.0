<template>
  <div class="mine">
      <mine-header></mine-header>
      <div class="content">
      	<w-menu></w-menu>
	      <router-view>
	      </router-view>
      </div>
		  <index-footer></index-footer>
  </div>
</template>

<script>
import mineHeader from '@/components/common/mine_header'
import IndexFooter from '@/components/common/index_footer'
import wMenu from '@/components/w_menu'
import myIndent from '@/components/myIndent'
import shopCart from '@/components/shopCart'

export default {
  name: 'mine',
  data () {
    return {
      msg: ''
    }
  },
  components:{
  	wMenu,
  	mineHeader,
  	IndexFooter,
  	myIndent
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
              return
            }else{
              sessionStorage.removeItem('loginstatus')
              sessionStorage.removeItem('user_id')
              sessionStorage.removeItem('username')
              _this.removeCookie('PHPSESSID')
              _this.$router.push({path:'/'});
            }
          },
          error:function (res) {
            _this.$message('未知错误！');
          }
        });
      },
      removeCookie(cookieName) {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf(" ") == 0) {
            cookies[i] = cookies[i].substring(1);
          }
          if (cookies[i].indexOf(cookieName) == 0) {
            let exp = new Date();
            exp.setTime(exp.getTime() - 60 * 1000);
            document.cookie = cookies[i] + ";expires=" + exp.toUTCString();
            break;
          }
        }
      }
  }
}
</script>

<style>
	.mine{
		background-color: #f5f5f5;
	}
	.mine .content{
		overflow: hidden;
		width:1200px;
		margin:17px auto 29px;
	}
</style>
