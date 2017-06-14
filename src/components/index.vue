<template>
  <div class="index">

    <tIndexHeader></tIndexHeader>


    <div class="block index-bannder-wrap">
      <el-carousel trigger="click" height="430px" arrow="never">
        <el-carousel-item v-for="(item,index) in banner" key="index">
          <a 
            v-bind:href="item.ad_link==''?'javascript:;':item.ad_link" 
            v-bind:style="setbackground(imgPre + item.ad_code)"
            target="_blank">
            <!-- <img v-lazy="imgPre + item.ad_code" v-bind:title="item.ad_name" /> -->
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <section class="index-center">
      <div class="index-center-list" v-for="(item,index2) in category" key="index2">
        <header>
          <span v-text="item.name"></span>
          <i>
            <router-link :to="{path:'/classify',query:{id:item.id,type:'undefined',name:item.name}}">查看更多>>
            </router-link>
          </i>
        </header>
        <section class="list-content">
          <a 
            v-for="(product,index3) in item.products" key="index3" 
            v-bind:href="http+'/#/goodsDetails?id='+product.goods_id" target="_blank">
            <dl>
              <dt><img v-lazy="imgPre + product.image.image_url" /></dt>
              <dd v-text="product.goods_name"></dd>
              <dd v-if="product.price != -1"><i>￥</i><span v-text="product.price"></span></dd>
              <dd v-if="product.price == -1">认证可见</dd>
            </dl>
          </a>
        </section>
      </div>
    </section>

    <IndexFooter></IndexFooter>

    <div class="index-fixed-nav">
      <fixedNav></fixedNav>
    </div>
  </div>
</template>

<script>
import tIndexHeader from '@/components/common/index_header'
import IndexFooter from '@/components/common/index_footer'
import fixedNav from '@/components/common/fixed_nav'
import indexNav from '@/components/common/index_nav'

export default {
  name: 'index',
  data () {
    return {
      imgPre:this.$store.state.img.imgPre,
      category:[],
      banner:[],
      http:''
    }
  },
  components: {
    tIndexHeader,IndexFooter,fixedNav,indexNav
  },
  created(){
    this.category_products();
    this.bannerlist();

  },
  mounted(){
  	if(!window.location.origin){
	 		this.http = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	 	}else{
	 		this.http = window.location.origin;
	 	}
  },
  methods:{
    setbackground(img){
      return 'background:url('+img+') no-repeat center'
    },
    category_products() {

      var _this = this;
      $.ajax({
          type: "post",
          url: this.$store.state.apilink+"?s=api/index/category_products",
          dataType: "json",
          success:function(res){
              _this.category = res.data;
          },
          error:function(res){
            // console.log('error')
          }
      });
    },
    bannerlist() {
  		var _this = this;
  		$.ajax({
  			type: "post",
  			url: this.$store.state.apilink+"?s=api/index/bannerlist",
  			dataType: "json",
  			success:function(res){
  			  _this.banner = res.data;
          // console.log(res)
  			}
  		});
    }
  }
  
}

</script>

<style scoped>
.index-fixed-nav{
    position: fixed;
    width: 40px;
    height: 120px;
    right: 5%;
    top: 40%;
    z-index: 9999;
}
.index-bannder-wrap{
  height:auto;
}
.index-bannder-wrap a{
  display: block;
  height: 100%;
  text-align: center;
  overflow: hidden;
}
.index-bannder-wrap a img{
  width: auto;
  height: 100%;
}
.index-logo-wrap{width:100%;height:158px;border-bottom:2px solid #009e4d;}
.logo-up{padding-top:40px;margin:0 auto;}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
}
.index-center{width:1200px;margin:0 auto 50px;min-height:400px;height:auto!important;height:400px;}
.index-center:after{content:".";display:block;height:0;clear:both;overflow:hidden;visibility:hidden;}
.index-center-list{
  width:100%;
  height:auto;
  padding:55px 0 10px 0;
}
.index-center-list header{
  padding:6px 0;
  height:22px;
  line-height:22px;
  overflow:hidden;
  border-bottom:3px solid #777;
}
.index-center-list header span{
  float: left;
  font-size: 20px;
  height: 20px;
  line-height: 20px;
  font-weight: 900;
  padding-left: 10px;
  border-left: 3px solid #009e4d;
}
.index-center-list header i{
  float:right;
  cursor:pointer;
  font-size: 14px;
}
.list-content{
  padding-top:5px;
  overflow:hidden;
  text-align: center;
}
.list-content :nth-child(5n) {
  margin-right:0;
}
.list-content :nth-child(5n+1) {
  margin-left:0;
}
.list-content :nth-child(1) {
  margin-left:0;
}
.list-content a{
  float:left;
  width:224px;
  margin:24px 10px 0 10px;
  height: auto;
  overflow: hidden;
}
.list-content dl{
  border:1px solid #ededed;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}
.list-content a:hover dl{
  border:1px solid #009e4d;
  box-shadow: 0 0 50px 1px #d1cece;
}
.list-content a dl img{
  -webkit-transition: all .3s linear;
  -moz-transition: all .3s linear;
  transition: all .3s linear;
}
.list-content a:hover dl img{
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  transform: scale(1.05);
}
.list-content dl :nth-child(1){
  overflow: hidden;
  height:222px;
}
.list-content dl :nth-child(1) img{
  width:100%;
  height:100%;
}
.list-content dl :nth-child(2) {
  font-size: 14px;
  line-height:34px;
  height:34px;
  padding:0 15px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

.list-content dl :nth-child(3){
  line-height: 34px;
  color:#009e4d;
}
.list-content dl :nth-child(3) i{
  color:#009e4d;
  font-size:16px;
  line-height:30px;
}
.list-content dl :nth-child(3) span{
  color:#009e4d;
  font-size:22px;
  padding: 0;
}
</style>
