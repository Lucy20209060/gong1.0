<template>
  <div class="certification">
    
  	<div class="address-header">认证信息<span class="certfy">（{{proofInfo}}）</span></div>

    <div v-if="proofStatus == 1 ||proofStatus == -1">
    	<div class="operating-area">
    		<el-row v-for="(item,index) in msg" key="index" class="items">
    			<el-col :span="4" class="name">{{item.name}}</el-col>
    			<el-col :span="20" class="value">{{item.value}}</el-col>
    		</el-row>
    		<el-row class="items">
    			<el-col :span="4" class="name">资质照片：</el-col>
    			<el-col :span="20" class="value"><img v-for="(item,index) in photo[0].value" v-lazy="imgPre + item" class="value-img" /></el-col>
    		</el-row>
        <el-row class="items" v-if="msg[0].value == 2">
          <el-col :span="4" class="name">门店照片：</el-col>
          <el-col :span="20" class="value"><img v-for="(item,index) in photo[1].value" v-lazy="imgPre + item" class="value-img" /></el-col>
        </el-row>
      </div>
    </div>

    <div v-else class="verify-fail-wrap">
      <p><img src="/static/images/kongb.png" /></p>
      <p style="padding-top:20px;">
        <span>未查询到数据（未认证 或 认证失败），</span>
        <a href="/#/proof">请点击此处重新认证</a>
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'certification',
    data () {
      return {
        imgPre:this.$store.state.img.imgPre,
        proofInfo:'认证信息',
        proofStatus:this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299'),
        msg: [
        {
         name:'企业类型：',
         value:''
       },{
         name:'经营类型：',
         value:''
       },
       {
         name:'网店名称：',
         value:''
       },
       {
         name:'网店链接：',
         value:''
       },
       {
         name:'联系人姓名：',
         value:''
       },
       {
         name:'联系人手机：',
         value:''
       },
       {
         name:'QQ：',
         value:''
       },
       {
         name:'微信：',
         value:''
       },
       {
         name:'邮箱：',
         value:''
       },
       {
         name:'发货人名称：',
         value:''
       },
       {
         name:'发货人电话：',
         value:''
       }
       ],
       photo:[
       {
        name:'门店照片：',
        value:[]
      },
      {
        name:'资质照片：',
        value:[]
      }
      ]
    }
  },
  created(){
    if(this.proofStatus == 1){
      this.proofInfo = '审核成功';
    }else if(this.proofStatus == -1){
      this.proofInfo = '审核中';
    }else if(this.proofStatus == -2){
      this.proofInfo = '审核未通过';
    }else if(this.proofStatus == -3){
      this.proofInfo = '未查询到数据';
    }else if(this.proofStatus == -4){
      this.proofInfo = '未提交认证';
    }else{
      this.$router.push('/login');
    }
  },
  mounted(){
    this.getMsg()
  },
  methods:{
    getMsg(){
      let _this = this;
      $.ajax({
        url: this.$store.state.apilink+"?s=api/user/getUserInfo",
        data:{
          user_id:_this.$cookie.getCookie('a34ea2d96d4239d4d86803bb3cd99788')
        },
        dataType: "json",
        type: 'get',
        success: function (res) {
          // console.log(res);


          if (res.result.authentication_type == 1) {
            _this.msg[0].value = '线上企业'
          }else if(res.result.authentication_type == 2) {
            _this.msg[0].value = '线下企业'
          }else{
            _this.msg[0].value = '其他'
          }

          switch(res.result.management_type)
          {
            case '1':
            _this.msg[1].value = '天猫'
            break;
            case '2':
            _this.msg[1].value = '淘宝'
            break;
            case '3':
            _this.msg[1].value = '京东'
            break;
            case '4':
            _this.msg[1].value = '一号店'
            break;
            case '5':
            _this.msg[1].value = '苏宁'
            break;
            case '6':
            _this.msg[1].value = '微信商城'
            break;
            case '7':
            _this.msg[1].value = '阿里巴巴'
            break;
            case '8':
            _this.msg[1].value = '网易考拉'
            break;
            case '9':
            _this.msg[1].value = '唯品会'
            break;
            case '10':
            _this.msg[1].value = '蘑菇街'
            break;
            case '11':
            _this.msg[1].value = '贝贝网'
            break;
            case '12':
            _this.msg[1].value = '拼多多'
            break;
            case '13':
            _this.msg[1].value = '供应链'
            break;
            case '14':
            _this.msg[1].value = '自营平台'
            break;
            default:
            break;
          }
          _this.msg[2].value = res.result.merchant_name;
            // _this.msg[3].value = res.result.contact_address;
            _this.msg[3].value = res.result.website;
            _this.msg[4].value = res.result.contacts_name;
            _this.msg[5].value = res.result.contacts_mobile;
            _this.msg[6].value = res.result.qq;
            _this.msg[7].value = res.result.weixin;
            _this.msg[8].value = res.result.email;
            _this.msg[9].value = res.result.delivery_user;
            _this.msg[10].value = res.result.delivery_mobile;
            _this.photo[0].value = res.result.photo.split(',');
            _this.photo[1].value = res.result.store_phone.split(',');
          },
          error:function (res) {
            _this.$message('未知错误！');
          }
        });
    }
  }
}
</script>

<style scoped>
  .certification{
    min-height: 380px;
    background: #fff;
    float: left;
    position: relative;
    width: 970px;
    padding: 15px 29px 98px 21px;
  }
  .certification .address-header{
    text-align: left;
    border-bottom: 3px solid #D8D8D8; 
    padding-bottom: 12px;
  }
  .certification .certfy{
    color: #009E4D;
  }
  .certification .items{
    min-height: 35px;
    margin: 10px 0;
  }
  .certification .name{
    text-align: right;
  }
  .certification .value{
    text-align: left;
    padding: 0 10px;
    background: 
  }
  .certification .value-img{
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
  .verify-fail-wrap{
    text-align: center;
    padding:50px 0 30px;
    font-size: 14px;
  }
  .verify-fail-wrap p a{
    text-decoration: underline;
    color: #009e4d;
  }
  .verify-fail-wrap p img{
    width: 110px;
    height:auto;
  }
</style>