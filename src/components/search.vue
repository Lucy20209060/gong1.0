<template>
  <div class="search">

    <tIndexHeader v-on:message="recieveMessage"></tIndexHeader>

    <section class="classify-title-wrap">
      <p>
        <router-link class="pointer" tag="span" :to="{path:'/classify',query:{type:'search'}}">全部商品 > </router-link>

        <a href="javascript:;" @click="tapKeyWord">{{keywords}}</a>
        <a href="javascript:;" 
          v-for="(item,index) in searchArr" 
          key="index"
          @click="tapCalssChian(index)">
           > {{item.name}}
        </a>
      </p>
      <div class="classify-list">
        <P v-if="subClass.length!=0">
          <i>分类：</i>
          <span class="classify-list-span1">
            <a href="javascript:;" 
            v-for="(item2,index) in subClass" key="index" v-text="item2.name" 
            @click="selectClassFun(item2.name,item2.id)"></a>
          </span>
        </P>
        <P v-if="siteSign==1">
          <i>地区：</i>
          <span>
          	<a href="javascript:;"
          	v-for="(item1,index) in siteList" key="index" v-text="item1.region" 
          	@click="selectSiteFun(item1.region,item1.id)"></a>
          </span>
        </P>
        <!-- <p class="classify-more-wrap">
        <b class="iconfont">更多 &#xe609;</b>
        </p> -->
      </div>
    </section>

    <section class="list-content"  v-if="searchList.length!=0">
      <a v-for="(item,index) in searchList" key="index" v-bind:href="http+'/#/goodsDetails?id='+item.goods_id" target="_blank">
        <dl>
          <dt><img v-lazy="imgPre + item.image.image_url" /></dt>
          <dd v-text="item.goods_name">商品名称</dd>
          <!-- <dd v-text="item.goods_remark">商品描述</dd> -->
          <dd v-if="item.price != -1"><i>￥</i><span v-text="item.price">价格</span></dd>
          <dd class="classify-no-price" v-if="item.price == -1">认证可见</dd>
        </dl>
      </a>
    </section>

    <section class="list-content list-nocontent" v-if="searchList.length==0">
      <p><img src="/static/images/kongb.png"></p>
      <p>暂无搜索结果~</p>
    </section>

    <section id="classify-page-wrap" v-if="totalPage>=2">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next"
          :page-count="totalPage">
        </el-pagination>
    </section>

    <IndexFooter></IndexFooter>

  </div>
</template>

<script>
import tIndexHeader from '@/components/common/index_header'
import IndexFooter from '@/components/common/index_footer'
export default {
  name: 'search',
  data () {
    return {
    	imgPre:this.$store.state.img.imgPre,
  		siteList:[],
      http:'',

  		keywords:this.$route.query.key, // 搜索的关键字
      searchArr:[],                   // 搜索路径数组
      subClass:[],                    // 子分类
      siteId:'',                      // 地区id
      classId:'',                     // 分类id
      siteSign:1,                     // 地区显示标志 0-隐藏 1-显示
  		searchList:[],                  // 商品信息
  		currentPage:1,                  // 当前页
  		totalPage:1                     // 总页数
  		
    }
  },
  watch:{
    'searchArr':{
      handler(curVal,oldVal){
        // 格式化 地区id 分类id
        this.siteId = '';
        this.classId = '';
        this.siteSign = 1;

        for(let i in curVal){
          if(curVal[i].type =='site'){
            this.siteId = curVal[i].id;
            this.siteSign = 0;          // 链路中有地区 则隐藏 地区
          }else{
            this.classId = curVal[i].id;
          }
        }
        // console.log('监听数据变化');
        // console.log(curVal);
        this.getSearchList();
      }
    }
  },
  created(){
    this.getSearchList();
    this.getSiteList();

  },
  mounted(){
    if(!window.location.origin){
      this.http = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }else{
      this.http = window.location.origin;
    }
  },
  methods:{
    // 点击链路上的 分类
    tapCalssChian(index){
      let searchArr = this.searchArr;
      this.searchArr.splice(index+1,searchArr.length);
    },
    // 点击链路上的 关键字
    tapKeyWord(){
      this.searchArr = [];
      this.siteId = '';
      this.classId = '';
      this.siteSign = 1;
      this.getSearchList();
    },
    // 点击 地区
    selectSiteFun(a,b){
      this.searchArr.push({
        name:a,
        id:b,
        type:'site'
      });
      this.siteSign = 0;
    },
    // 点击 分类
    selectClassFun(a,b){
      // a-name , b-id
      this.searchArr.push({
        name:a,
        id:b,
        type:'class'
      });
    },
    // 分页
  	handleCurrentChange(val){
      this.currentPage = val;
      this.getSearchList();
    },

    // 搜索页 从子组件传过来的关键字
  	recieveMessage(value){
      this.searchArr = [];    // 搜索先清除关键字后的 链路数组
  		this.keywords = value;
      this.classId = '';
      this.siteId = '';
      this.currentPage = 1;
      this.getSearchList();
  	},

    // 获取搜索的内容
  	getSearchList(){
  		const _this = this;
  		$.ajax({
  			type: "get",
  			url: this.$store.state.apilink+"?s=api/goods/searchcategory",
  			data:{
  				q:_this.keywords,
  				id:_this.classId,
  				site_id: _this.siteId,
  				page: _this.currentPage

  			},
  			dataType: "json",
  			success:function(res){
          // console.log(res);
  				_this.searchList = res.data.goods_list;
  				_this.subClass = res.data.subcategories;
  				_this.currentPage = res.data.pagination.page;
  				_this.totalPage = res.data.pagination.pagetotal;
  			}
  		});
  	},

    // 获取地区
  	getSiteList(){
  		const _this = this;
  		$.ajax({
	        type: "post",
	        url: _this.$store.state.apilink+"?s=api/site/getlist",
	        dataType: "json",
	        success:function(res){
	          _this.siteList = res.data;
	          // console.log(res.data)
	        }
	    });
  	}
  },

  components: {
    tIndexHeader,IndexFooter
  }
}

</script>

<style scoped>
.classify-no-price{
  color: #009e4d;
  line-height: 36px;
}
.active{
	color: #009e4d;
}
.active2{
	color: #009e4d;
}
#classify-page-wrap{
  text-align: center;
  padding: 30px 60px;
}
.classify-title-wrap{
  font-size: 14px;
}
.pointer{
  color: #333;
}
.classify-list>p i{
  color: #999;
  float: left;
  width: 5%;
}
.classify-list>p span{
  color: #333;
  float: left;
  width: 94.9%;
}
.classify-list>p span a{
  margin-right: 20px;
}
.classify-list>p span a:hover{
  color: #009e4d;
}
.classify-list>p{
  line-height: 40px;
  font-size: 14px;
  height: 40px;
  padding: 0 20px;
  position: relative;
}
.classify-list .classify-list-span1:after{
  border-bottom: 1px solid #d8d8d8;
  position: absolute;
  content: '';
  width: 92%;
  height: 1px;
  bottom: -2px;
  left: 6.5%;
  z-index: 999;
}
.classify-list{
  border: 1px solid #d8d8d8;
}
.classify-more-wrap b{
  font-size: 14px;
  font-weight: 100;
}
.classify-list .classify-more-wrap{
  text-align: center;
  height: 25px;
  line-height: 26px;
  background: #efefef;
  cursor: pointer;
}
.classify-title-wrap p{
  line-height: 40px;
  color: #666;
}
.classify-title-wrap{
  width: 1200px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}

.list-content{
  padding:5px 0 20px;
  overflow:hidden;
  margin: 0 auto;
  width: 1200px;
  text-align: center;
  min-height:500px;
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
  width:219px;
  margin:25px 13px 0 13px;
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
}
.list-content dl :nth-child(1){
  width:100%;
  height: 218px;
  overflow: hidden;
}
.list-content a dl img{
  -webkit-transition: all .3s linear;
  -moz-transition: all .3s linear;
  transition: all .3s linear;
  width:100%;
  height:auto;
}
.list-content a:hover dl img{
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  transform: scale(1.05);
}
.list-content dl :nth-child(2) {
  font-size: 14px;
  line-height:34px;
  height:34px;
  padding:0 15px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box; 
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
  line-height: 40px;
}
.list-nocontent{
	padding-top: 70px;
}
.list-nocontent p img{
  width: 110px;
  height:auto;
  margin-bottom: 20px;
}
</style>