<template>
<div class="refunds">
    <p class="refunds-title" v-if="errorInfo < 0">退款操作</p>

    <dl v-if="errorInfo > 0">
      <dt class="refunds-title">退款操作</dt>
      <dd>
        <i>退款类型：</i>
        <p class="refunds-retreat">
          <!-- <span 
            v-bind:class="{refundsactive:index==classSign}" 
             
            v-for="(style,index) in refundsStyle" key="index" v-text="style">
            退款方式
          </span> --><!-- @click="refundsStylefun(index)"点击更改退款类型 -->
          <span v-if="refundsInfo.value == 0 ">退款</span>
          <span v-if="refundsInfo.value == 1 ">退货退款</span>
        </p>
      </dd>

      <dd v-if="orderInfo.orderSt == 2">
        <i>确认收货：</i>
        <p>
          <button class="affirm-btn" @click="affimreceive">确认收货</button>
          <span class="affirm-btn-alert">退款退货前，请先确认收货</span>
        </p>
      </dd>

      <dd>
        <i>退货数量：</i>
        <p class="refunds-number">
          <input v-model="refundsInfo.number" type="number" placeholder="请填写退货数量" />
        </p>
      </dd>

      <dd>
        <i>退款金额：</i>
        <p class="refunds-price">
          <input type="number"  v-model="refundsInfo.sum" placeholder="请填写退款金额" />
          <span><b>元</b>（最高可退<i> {{orderInfo.orderAm}} </i>元）</span>
        </p>
      </dd>

      <dd>
        <i>退款原因：</i>
        <p class="refunds-reason">
          <select v-model="refundsInfo.reason">
            <option value="不想要了">不想要了</option>
            <option value="多拍/拍错">多拍/拍错</option>
            <option value="错发/漏发">错发/漏发</option>
            <option value="物流停滞">物流停滞</option>
            <option value="破损/丢件">破损/丢件</option>
            <option value="未收到货物">未收到货物</option>
          </select>
        </p>
      </dd>

      <dd>
        <i>退款说明：</i>
        <p class="refunds-explain">
          <textarea placeholder="退款说明不超过500字" v-model="refundsInfo.explain"></textarea>
        </p>
      </dd>

      <dd v-if="refundsInfo.value != 0" >
        <i>上传照片：</i>

        <p class="refunds-uploadimg">

          <el-upload
            class="upload-demo"
            action="/api.php?s=api/uploadify/upload_image"
            :data="{'path':'user'}"
            :file-list="imgarr"
            :on-success="successLoading"
            :on-remove="removeLoading"
            accept="image/jpeg,image/jpg,image/png"
            >
            <el-button size="small" v-if="imgarr.length<3">点击上传</el-button>
            <div v-if="imgarr.length<3" slot="tip" class="el-upload__tip">           
              <p>最多上传3张图片，只能上传jpg/png文件，且不超过3M</p>
            </div>
          </el-upload>
        </p>
      </dd>

      <dd>
        <p class="refunds-submit-btn">
          <button @click="submitAppy">提交申请</button>
        </p>
      </dd>
    </dl>

    <div class="refunds-alert" v-if="errorInfo < 0">
        <p><img src="/static/images/kongb.png"></p>
        <p>没有获取到订单信息</p>
    </div>
</div>
</template>

<script>

export default {
  name: 'refunds',
  data () {
    return {
      classSign:'0',
      refundsInfo:{
        number:'',
        sum:'',
        reason:'',
        explain:'',
        value:0
      },
      imgarr:[],
      errorInfo:2,
      orderInfo:{
        orderId:'', // 订单id
        orderSn:'', // 订单号
        orderAm:0,  // 订单总额
        orderSt:'' // 订单状态
      },
      goodsInfo:[]
      
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
    }else if(proof == -4 ){                   // 未提交认证
      this.$message("未提交认证，请先认证");
      this.$router.push('/proof');
    }else{
      this.$router.push('/login');
    }


  },
  watch:{
    'refundsInfo.sum':{
      handler(curVal,oldVal){

        // 数字类型 若为字符串类型 则按位数一一对比
        if(Number(curVal) > this.orderInfo.orderAm){
          this.refundsInfo.sum = this.orderInfo.orderAm;
        }

        if(Number(curVal) < 0 ){
          this.refundsInfo.sum = 0;
        }

      },
      deep:true
    }
  },
  created(){
    this.getOrderInfo();
  },
  methods:{
    // 获取订单信息
    getOrderInfo(){
      const _this = this;
      $.ajax({
        type:"get",
        url:_this.$store.state.apilink+"?s=api/order/get_order_goods",
        data:{
          goods_id:_this.$route.query.goods_id,
          order_sn:_this.$route.query.order_sn,
          goods_spec:_this.$route.query.goods_spec
        },
        dataType:"json",
        success:function(res){
          // console.log(res)
          if(res.error == 0){// 有信息
            _this.goodsInfo = res.data;
            _this.errorInfo = 2;
            _this.orderInfo.orderSt = res.data.order_status;
            _this.orderInfo.orderAm = res.data.total_amount;
            _this.orderInfo.orderId = res.data.order_id;

            // 1待发货 2待收货 10交易成功
            if(_this.orderInfo.orderSt == 1 ){

              _this.refundsInfo.value = 0;

            }else if(_this.orderInfo.orderSt == 2 ){

              _this.refundsInfo.value = 1;

            }else if(_this.orderInfo.orderSt == 10 ){

              _this.refundsInfo.value = 1;

            }
              
          }else{
            _this.errorInfo = -1;
          }
        }
      });
    },
    // 确认收货
    affimreceive(){
      let _this = this;
      $.ajax({
        type:"post",
        url:this.$store.state.apilink+"?s=api/order/confirm",
        data:{
          id:_this.orderInfo.orderId
        },
        dataType:"json",
        success:function(res){
          if(res.error == 0){
            _this.$message("确认收货成功");
            _this.orderInfo.orderSt = 10;
          }else{
            _this.$message(data.error_code)
          }
        }
      });

    },
    inputfilters(){
      if(this.refundsInfo.sum > this.orderInfo.orderAm){
        this.refundsInfo.sum = this.orderInfo.orderAm;
      }
    },
    successLoading(file){
        if(file.code > 0){  // 上传成功
          this.$message({
            message: file.msg,
            type: 'success'
          });
          this.imgarr.push(file.url);
          // console.log(this.imgarr)
        }else{  // 上传服务器失败
          this.$message.error('上传失败，请重新上传');
        }
    },
    // 删除图片
    removeLoading(file){
      for(var i in this.imgarr){
        
        if(this.imgarr[i] == file.response.url){
          this.imgarr.splice(i,1);
        }
        
      }
    },
    // 提交申请按钮
    submitAppy(){
      const _this = this;
      $.ajax({
        url: this.$store.state.apilink+"?s=api/order/return_goods",
        data: {
          order_id : _this.goodsInfo.order_id,
          order_sn : _this.$route.query.order_sn,
          goods_spec:_this.$route.query.goods_spec,
          goods_id:_this.goodsInfo.goods_id,
          type : _this.refundsInfo.value,
          reason : _this.refundsInfo.reason,
          imgs : _this.imgarr.join(),
          num : _this.refundsInfo.number,
          price : _this.refundsInfo.sum,
          comment:_this.refundsInfo.explain
        },
        type: 'post',
        dataType:"json",
        beforeSend: function () {
          if(_this.orderInfo.orderSt == 2){
            _this.$message({
              message: '请先确认收货！',
              type: 'warning'
            });
            return false;
          }else if( _this.refundsInfo.reason == ''||
              _this.refundsInfo.number == ''||
              _this.refundsInfo.sum==''||
              _this.refundsInfo.explain=='' ){

                _this.$message({
                  message: '退款信息不完整！',
                  type: 'warning'
                });
                return false;
          }
        },
        success: function (res) {
          if(res.error_code){
            _this.$message.error('订单失效或不存在');
          }else{
            _this.$message({
              message: res.data,
              type: 'success'
            });

            _this.$router.push({path:'/mine/refundDetail',
              query:{
                goods_id:_this.$route.query.goods_id,
                order_sn:_this.$route.query.order_sn,
                spec_key:_this.$route.query.goods_spec,
                return_sn:''
              }});
            
          }
        }
      });
    },
    // 删除图片
    deleteImg(index){
      this.imgarr.splice(index,1);
    },
    refundsStylefun(index){
      this.classSign = index;
      this.refundsInfo.value = index;
    }
  }
}
</script>

<style scoped>
.affirm-btn-alert{
  background: #009e4d;
  display: inline-block;
  padding: 5px 10px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  position: relative;
  margin-left: 20px;
  color: #fff;
}
.affirm-btn-alert:after{
  content: '';
  position: absolute;
  border: 7px solid transparent;
  border-right-color:#009e4d;
  left: -14px;
  bottom: 6px; 
}
.affirm-btn{
  border: 1px solid #009e4d;
  padding: 7px 9px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.upload-demo{
  width: 400px;
}
.refunds-alert{
  padding: 100px 0 100px;
  text-align: center;
}
/*.refunds-retreat .refundsactive{
  border: 1px solid #009e4d;
  background: url("/static/images/chose_yes.png") no-repeat right bottom;
}*/
.img_upload_file{
  width: 0;
  height: 0;
  visibility: hidden;
}
.refunds-submit-btn button{
  background: #009e4d;
  width: 160px;
  height: 46px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.refunds-uploadimg-bottom i{
  color: #009e4d;
}
.refunds-uploadimg-bottom b{
  /*font-weight: 100;*/
  color: #009e4d;

}
.refunds-uploadimg-bottom{
  display: block;
  clear: both;
  padding-top: 8px;
}
.refunds-uploadimg label{
  font-size: 20px;
  background: linear-gradient(to bottom,#fefefe 0,#f3f3f3 100%);
  background: -webkit-linear-gradient(top,#fefefe 0,#f3f3f3 100%);
  background: -moz-linear-gradient(top,#fefefe 0,#f3f3f3 100%);
  background: -o-linear-gradient(top,#fefefe 0,#f3f3f3 100%);
  border: 1px solid #d8d8d8;
  width:70px;
  height: 70px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  float: left;
  cursor: pointer;
  padding: 8px 0 0 12px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
.refunds-uploadimg span i:hover{
  color: #009e4d;
}
.refunds-uploadimg span i{
  position: absolute;
  top: 0;
  right: 0;
  color: #999;
  cursor: pointer;
}
.refunds-uploadimg span img{
  width:100%;
  height: auto;
}
.refunds-uploadimg span{
  position: relative;
  display: inline-block;
  width:70px;
  height: 70px;
  border: 1px solid #d8d8d8;
  margin-right: 13px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  float: left;
}
.refunds-explain textarea{
  border: 1px solid #d8d8d8;
  width:400px;
  height: 90px;
  line-height: 28px;
  padding: 0 10px;
  resize:none;
  font-size: 14px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
.refunds-reason select{
  border: 1px solid #d8d8d8;
  width:220px;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  font-size: 14px;
}
.refunds-price span{
  margin-left: 10px;
}
.refunds-price b{
  font-weight: 100;
}
.refunds-price input{
  font-size: 14px;
  border: 1px solid #d8d8d8;
  width:200px;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
}
.refunds-number{
  border: 1px solid #d8d8d8;
  width:250px;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
  -webkit-appearance: none !important;
  margin: 0; 
}
input[type="number"]{
  -moz-appearance:textfield;
}

.refunds-number input{
  font-size: 14px;
}
.refunds-retreat span{
  display: inline-block;
  margin-right:30px;
  width:90px;
  height: 28px;
  /*border: 1px solid #d8d8d8;*/
  text-align: center;
  line-height: 28px;
  /*cursor: pointer;*/
}
.refunds dd>p{
  margin-left: 100px;
}
.refunds dd>i{
  position: absolute;
  left: 20px;
  top: 5px;
}
.refunds dd{
  position: relative;
  margin-bottom: 20px;
}
.refunds{
  float: left;
  width: 1019px;
  height:700px;
  overflow: hidden;
  padding: 0 15px 30px 15px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  font-size: 14px;
}
.refunds-title{
  line-height: 60px;
  border-bottom: 1px solid #d8d8d8;
  font-size: 16px;
  margin-bottom: 30px;
}
</style>
