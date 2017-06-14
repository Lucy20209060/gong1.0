<template>
  <div class="goodsDeyails">

    <tIndexHeader :inputValue="carNumber"></tIndexHeader>

    <section class="details-goods-wrap">
      <div class="goods-img-wrap">
        <div class="big-img-wrap">
          <img v-lazy="imgPre + bigImgUrl" />
        </div>
        <div class="small-img-wrap">
          <div class="left-btn" @click="rightSlide"><i class="iconfont icon-turnleft"></i></div>

          <div class="small-img-list">
            <ul class="small-img-list-ul" v-bind:style="{ width: ulWidth+'px'}">
				      <li v-for="(img,index) in detail.goods_images_list" key="index" @click="detailclick(img.image_url)"><img v-lazy="imgPre+img.image_url" /></li>
            </ul>
          </div>

          <div class="right-btn" @click="leftSlide"><i class="iconfont icon-turnleft"></i></div>
        </div>
      </div>

      <dl class="goods-info-wrap">
        <dt v-text="detail.goods.goods_name"></dt>
        <dd class="goods-remark" v-text="detail.goods.goods_remark"></dd>
        <dd class="goods-id-price">
          <p>
          	<i>商品ID :</i>
          	<span class="goods-id" v-text="detail.goods.goods_id"></span>
          </p>
          <p>
          	<i>代发价 :</i>
          	<span class="goods-price" v-if="price != -1">￥{{price}}</span>
            <span class="goods-alert" v-if="price == -1">认证可见</span>
          </p>
        </dd>
        <dd class="infos-wrap standard-wrap" v-if="detail.filter_spec.length != 0&&detail.filter_spec[0].label!='默认'">
        	<i style="padding-top:14px;font-size:14px;">规格：</i>
        	<p>
        		<a herf="javascrpt:;"
        		class="standard-btn" 
        		v-bind:class="{specActive:index==classSign}"
        		v-for="(spec,index) in detail.filter_spec[0].items" key="index"
        		v-text="spec.item"
        		@click="choseSpec(index,spec.item_id)"
        		>规格</a>
        	</p>
        </dd>
        <dd class="infos-wrap" style="font-size:14px;">
        	<i>运费：</i>
        	<p>
        		<b>包邮</b>
        		<!-- <select class="goods-addselect">
        			<option v-for="(pro,index) in options3" key="index" v-text='pro.name' :value="pro.id"></option>
        		</select>
        		<b>运费5元起(运费以实际价格结算为准)</b> -->
        	</p>
        </dd>
        <dd class="infos-wrap" style="font-size:14px;">
        	<i>购买数量：</i>
        	<p>
        		<template>
  					<el-input-number size="small" v-model="num1" :min="1" :max="countNum">
  					</el-input-number>
				</template>
        	</p>
        </dd>
        <dd class="infos-wrap">
        	<i></i>
        	<p>
        		<a id="details-add-btn" href="javascript:;"
            @click="addcart"
            v-if="countNum > 0 && detail.goods.is_on_sale != 0">
        			<i class="iconfont icon-gouwuche"></i>
              <span>加入购物车</span>
        		</a>
    				<a style="cursor:not-allowed;" id="details-download-btn" href="javascript:;" v-if="countNum<=0&&detail.goods.is_on_sale != 0">
            			<i style="left:33%;">卖光光</i>
    				</a>
            <a style="cursor:not-allowed;" id="details-download-btn" href="javascript:;" v-if="detail.goods.is_on_sale == 0">
                  <i style="left:33%;">已下架</i>
            </a>

            <a  id="details-download-btn" v-bind:href="downloadUrl" @click="downimg">
              <i class="iconfont icon-xiazai-copy"></i>
              <span>下载商品图片</span>
            </a>

        	</p>
        </dd>
      </dl>
    </section>

    <dl class="word-info-wrap">
    	<dt><span>商品详情</span></dt>
    	<dd class="producing-area">
    		<p><span class="producing-area-span1">规格参数</span></p>
    		<p>
    			<span v-for="(item2,index) in detail.attrs" v-if="item2 != null">
	    			<i class="producing-area-i1">{{index}}：</i>
	    			<i class="producing-area-i2">{{item2}}</i>
            <!-- <el-tooltip content="item2" placement="top">
              <el-button>{{item2}}</el-button>
            </el-tooltip> -->
    			</span>
    		</p>
    	</dd>
    </dl>

    <section class="details-imgs-wrap" v-html="detail.goods.goods_content"></section>
    
    <!-- 悬浮导航 -->
    <div class="index-fixed-nav">
      <fixedNav :inputValue="carNumber"></fixedNav>
    </div>

    <IndexFooter></IndexFooter>

  </div>
</template>

<script>
import tIndexHeader from '@/components/common/index_header'
import IndexFooter from '@/components/common/index_footer'
import fixedNav from '@/components/common/fixed_nav'

export default {
  name: 'goodsDeyails',
  data () {
    return {
      imgPre:this.$store.state.img.imgPre,
      classSign:0,
      detail:[],              // 商品详情
      bigImgUrl:[],           // 图片数组
      
      specKey:'',             // 选中的规格
      countNum:1000,          // 选中的规格对用的库存
      price:0,                // 选中的规格对用的价格
      string_goods_price:'',  // 所有的规格对应的 价格 库存
      num1:1,                 // 购买数量

      positionLeft:0,
      ulWidth:0,

      
      carNumber:0,                  // 购物车中的数量
      downloadUrl:'javascript:;'    // 图片下载链接
    }
  },
  created(){
    // console.log(this.$store.state.orderMsg)
    
    this.details();

    if(this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299') == 1){
      this.downloadUrl = this.$store.state.apilink + '?s=api/Api/DownloadGoodsZip&goods_id='+this.$route.query.id
    }else{
      this.downloadUrl = 'javascript:;'
    }

  },
  watch:{
    // 实时监听库存量 最大购买数量 <= 库存
    countNum:{
      handler(curval,oldval){
        if(curval < this.num1){
          this.num1 = curval;
        }
      },
      deep:true
    }
  },
  methods:{
    // 下载图片
    downimg(){
      if(this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299') != 1){
        this.$message({
          message: '请先认证登录',
          type: 'warning'
        });
      } 
    },
    choseSpec(index,id){
    	this.classSign = index;
    	// 选择的商品规格
    	this.specKey = id;
    	// 商品价格
    	this.price = this.string_goods_price[id].price;
    	// 商品剩余数量
    	this.countNum = Number(this.string_goods_price[id].store_count);

      // console.log(this.countNum)

    },
    // 加入购物车
    addcart(){
    	let _this = this;
    	$.ajax({
			type: "get",
			url: this.$store.state.apilink+"?s=api/cart/add",
			data:{
				goods_id:_this.$route.query.id,
				goods_num:_this.num1,
				goods_spec:_this.specKey
			},
			beforeSend: function () {
                
        if(_this.$cookie.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299') != 1){
        	_this.$message({
          message: '请先认证登录',
          type: 'warning'
        });
        	return false;
        }
      },
			dataType: "json",
			success:function(res){
        // console.log(res)
				switch(res.status){
					case 1:
                _this.getCartNum();
				        _this.$message({
				          message: '添加购物车成功',
				          type: 'success'
				        });
                // console.log(_this.countNum)
                // _this.countNum -= _this.num1;
                
                _this.string_goods_price[_this.specKey].store_count -= _this.num1;

					  break;
					default:
				        _this.$message.error(res.msg);
				}
			}
      	});
    },
    // 获取购物车数量
    getCartNum(){
      const _this = this;
      $.ajax({
        type: "post",
        url: this.$store.state.apilink+"?s=api/cart/cartnum",
        dataType: "json",
        success:function(res){
          if(res.data){
            _this.carNumber = res.data;
          }else{
            _this.carNumber = 0;
          }
        }
      });
    },
    details(){
    	// console.log(this.$route.query.id)
      var _this = this;
      $.ajax({
          type: "post",
          url: this.$store.state.apilink+"?s=api/goods/info",
          data:{
            id:_this.$route.query.id
          },
          dataType: "json",
          success:function(res){
            _this.detail = res.data;
            
            // console.log(res.data)
            if(res.data.filter_spec.length != 0 ){
              // 默认规格
              _this.specKey = res.data.filter_spec[0].items[0].item_id;

              // 规格不同对应的价格字符串
              _this.string_goods_price = JSON.parse(res.data.spec_goods_price);

              // 默认规格 默认价格
              _this.price = _this.string_goods_price[_this.specKey].price;

              // console.log(_this.string_goods_price)

              // 默认数量
              _this.countNum = Number(_this.string_goods_price[_this.specKey].store_count);
            }else{
              _this.countNum = Number(res.data.goods.store_count);
              _this.price = res.data.goods.price;
            }
            
            // 大图默认第一张图
            _this.bigImgUrl = res.data.goods_images_list[0].image_url;

            //设置图片外层宽度
            _this.ulWidth = res.data.goods_images_list.length * 68; 
          }
      });
    },
    leftSlide(){
    	// console.log('左')
  		let $left = parseInt($('.small-img-list-ul').css('left')),
          $right = parseInt($('.small-img-list-ul').css('right'));

      if(this.ulWidth <= 384){
        return false;
      }else if($left>=-(this.ulWidth-384)){
        this.positionLeft -= 68;
        $('.small-img-list-ul').animate({'left' : this.positionLeft + 'px'});
        
      }else{
        $('.small-img-list-ul').animate({'left' : -(this.ulWidth-340)});
      }
    },
    rightSlide(){
    	// console.log('右')
      let $left = parseInt($('.small-img-list-ul').css('left')),
          $right = parseInt($('.small-img-list-ul').css('right'));

      if(this.ulWidth <= 384){
        return false;
      }else if($left<0){
        this.positionLeft += 68;
        $('.small-img-list-ul').animate({'left' : this.positionLeft + 'px'});
        
      }else{
        $('.small-img-list-ul').animate({'left' : 0});
      }

    },
    detailclick(url){
      this.bigImgUrl = url;
    }
  },
  components: {
    tIndexHeader,IndexFooter,fixedNav
  }
}

</script>

<style scoped>
.index-fixed-nav{
    position: fixed;
    width: 40px;
    height: 150px;
    top: 50%;
    left: 50%;
    z-index: 9999;
    margin: -74px 0 0 630px;
}

.details-imgs-wrap p img{
  width: 100%;
  height: auto;
}
.details-over{
	cursor: not-allowed;
}
.goods-addselect{
	border: 1px solid #d8d8d8;
	height: 24px;
	width: 80px;
}
.details-goods-wrap{
  width:1200px;
  height:auto;
  overflow:hidden;
  margin:0 auto;
}
.goods-img-wrap{
  float:left;
  width:400px;
  margin-top:20px;
}
.big-img-wrap{
  width:100%;
  height:400px;
  border:1px solid #d8d8d8;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box; 
}
.big-img-wrap img{
  width:100%;
  height:100%;
}
.small-img-wrap{
  margin-top:15px;
  width:100%;
  height:60px;
  backgound:#333;
}
.left-btn,.right-btn{
  cursor:pointer;
}
.left-btn{
  float:left;
  width:26px;
  height:100%;
  border:1px solid #d8d8d8;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box; 
  position:relative;
}
.left-btn i{
  position:absolute;
  top:37%;
  left:10%;
  color: #999;
}
.right-btn i{
  position:absolute;
  top:29%;
  left:14%;
  color: #999;
  transform:rotate(180deg);
  -ms-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -webkit-transform:rotate(180deg); 
  -o-transform:rotate(180deg); 
}
.small-img-list{
  float:left;
  width:-moz-calc(100% - 52px);
  width:-webkit-calc(100% - 52px);
  width:calc(100% - 52px);
  height:100%;
  overflow:hidden;
  position:relative;
}
.small-img-list ul{
  float:left;
  height:100%;
  position:absolute;
  top:0;
  left:0;
}
.small-img-list li{
  width:60px;
  height:60px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box; 
  float:left;
  margin-left:8px;
  border:1px solid #d8d8d8;
  cursor: pointer;
}
.small-img-list li img{
  width:100%;
  height:100%;
}
.right-btn{
  position:relative;
  float:left;
  width:26px;
  height:100%;
  border:1px solid #d8d8d8;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box; 
}
.goods-info-wrap{
  float:left;
  padding:20px 0 0 62px;
  width:-moz-calc(100% - 450px);
  width:-webkit-calc(100% - 450px);
  width:calc(100% - 450px);
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  text-align:left;
}
.goods-info-wrap dt{
  font-size:20px;
  line-height:40px;
}
.goods-remark{
  color:#999;
  margin-bottom:18px;
  font-size: 14px;
}
.goods-id{
  margin-left: 10px;
}
.goods-id-price{
  background:#f2f2f2;
  height:120px;
  padding:0 20px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
.goods-id-price p{
	line-height:56px;
	margin:0;
}
.goods-id-price i{
	color:#999;
}
.goods-info-wrap .goods-price{
	color:#009448;
	font-size:30px;
  margin-left: 10px;
}
.goods-info-wrap .goods-alert{
  display: inline-block;
  border: 1px solid #009e4d;
  background: #fff;
  padding: 0 10px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: #009e4d;
  border-radius:4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  margin-left: 10px;
}
.goods-info-wrap .goods-id{
	color:#333;
}
.infos-wrap{
	height:auto;
	line-height:38px;
	margin-top:2px;
	overflow:hidden;
}
.active{
  margin: 0;
}
.infos-wrap b{
	font-weight: 100;
}
.infos-wrap>i{
	width:90px;
	float:left;
	height:38px;
}
.goods-info-wrap .infos-wrap p{
	float:left;
	margin:0;
  width: 594px;
}
.goods-info-wrap .infos-wrap p .el-input-number{
  margin-top: 4px;
}
.standard-wrap .standard-btn{
	border:1px solid #999;
	float:left;
	padding:0;
	background:#fff;
	height:30px;
  line-height: 30px;
	margin:14px 14px 0 0;
	padding: 0 10px;
	text-align:center;
	color:#333;
  font-size: 14px;
	cursor:pointer;
  min-width: 50px;
}
.standard-wrap .specActive{
	border: 1px solid #009e4d;
	background: url("/static/images/chose_yes.png") no-repeat right bottom;
}
.el-input-number {
    width: 100px !important;
}
#details-add-btn,#details-download-btn{
  position: relative;
  display: inline-block;
	width:180px;
	height:46px;
	border-radius:4px;
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	overflow:hidden;
	cursor:pointer;
	margin:10px 30px 0 0;
	outline: none;
}
#details-add-btn{
  background: #009e4d;
  font-size:20px;
}
#details-add-btn .iconfont{
  position: absolute;
  display: inline;
	color:#fff;
  top: 9%;
  left: 12%;
}
#details-add-btn span{
  position: absolute;
  top: 6%;
  right: 12%;
  color: #fff;
}
#details-download-btn i{
  position: absolute;
  display: inline;
  color:#333;
  top: 9%;
  left: 8%;
  font-size:20px;
}
#details-download-btn span{
  position: absolute;
  top: 6%;
  right: 10%;
  color: #333;
  font-size:20px;
}

/*#details-download-btn i{
	font-size:20px;
	color:#333;
	width:100%;
	height:100%;
	line-height:46px;
	background:#f2f2f2;
}*/
#details-download-btn{
	border:1px solid #d8d8d8;
}
.el-select {
    width: 90px;
    margin:0 10px;
}
.word-info-wrap{
	width:1200px;
	min-height:20px;
	border:1px solid #d8d8d8;
	margin:75px auto 30px;
	text-align:left;
}
.word-info-wrap dt{
	border-bottom:1px solid #d8d8d8;
	line-height:40px;
}
.word-info-wrap dt span{
	border-left:2px solid #009448;
	margin-left:16px;
	padding-left:16px;
	font-size:18px;
}
.word-info-wrap .producing-area-span1{
	text-align: left;
}
.word-info-wrap dd{
	padding:20px 60px;
	overflow: hidden;
}
.word-info-wrap dd p{
	display: block;
	overflow: hidden;
}
.word-info-wrap dd p span{
	float: left;
	width: 50%;
	text-align:left;
	line-height:30px;
}
.word-info-wrap .producing-area-i1{
  float: left;
	color: #999;
  margin-left: -10px;
  text-align: right;
  width: 100px;
}
.word-info-wrap .producing-area-i2{
  width: 260px;
  float: left;
  /*white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  cursor: pointer;*/
  font-size: 14px;
}
.producing-area{
	position:relative;
  font-size: 14px;
}
/*.producing-area:before{
	content: '';
    position: absolute;
    width: 96%;
    height: 1px;
    bottom: 0;
    left: 2%;
    border-top: 1px solid #d8d8d8;
}*/
.details-imgs-wrap{
	width:1200px;
	height:auto;
	margin:0 auto 30px;
	text-align:center;
	overflow:hidden;
}
.details-imgs-wrap p{
  line-height: 1px;
}
.details-imgs-wrap img{
	display:inline-block;
	width:98%;
	height:auto;
}
</style>