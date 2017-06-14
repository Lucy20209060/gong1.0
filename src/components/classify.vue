<template>
  <div class="classify">
   
    <tIndexHeader v-on:messages2="recieveMessages2"></tIndexHeader>

    <section class="classify-title-wrap">
      <p>
        <a href="javascript:;" @click="allgoods">全部商品</a>
        
        <!-- 分类路径 -->
        <a href="javascript:;" 
          v-for="(item,index) in classChain"
          key="index" 
          @click="tapClassChain(index)"> 
          > {{item.name}}
        </a>

      </p>
      <div class="classify-list">

        <P v-if="subcategorie.length !=0">
          <i>分类：</i>
          <span class="classify-list-span1">
            <a href="javascript:;" 
              v-for="(item4,index) in subcategorie"
              key="index"
              @click="selectClassFun(item4.name,item4.id)"
              v-text="item4.name">
            </a>
          </span>
        </P>

        <P v-if="siteStatus==1">
          <i>地区：</i>
          <span class="classify-list-span2">
            <a href="javascript:;"
              v-for="(item5,index) in siteList" 
              key="index" 
              @click="selectSiteFun(item5.region,item5.id)"
              v-text="item5.region">
            </a>
          </span>
        </P>
        <!-- <p class="classify-more-wrap">
          <b class="iconfont">更多 &#xe609;</b>
        </p> -->
      </div>
    </section>

    <section class="classify-site-banner-wrap"  v-if="showSiteBanner == 1">
      <img v-lazy="imgPre + siteImage">
    </section>

    <section class="list-content" v-if="category.goods_list != 0 ">
      <a v-for="(item5,index5) in category.goods_list" key="index5" v-bind:href="http+'/#/goodsDetails?id='+item5.goods_id" target="_blank">
        <dl>
          <dt><img v-lazy="imgPre + item5.image.image_url" /></dt>
          <dd v-text="item5.goods_name">商品名称</dd>
          <!-- <dd v-text="item5.goods_remark">商品描述</dd> -->
          <dd v-if="item5.price != -1"><i>￥</i><span v-text="item5.price">价格</span></dd>
          <dd class="classify-no-price" v-if="item5.price == -1">认证可见</dd>
        </dl>
      </a>
    </section>

    <section class="list-content" v-if="category.goods_list == 0 ">
      <p class="list-content-p1"><img src="/static/images/kongb.png"></p>
      <p class="list-content-p2">无相关分类商品 ~ </p>
    </section>

    <section id="classify-page-wrap" v-if="pageInfo.totalPage >= 2">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          layout="prev, pager, next"
          :page-count="pageInfo.totalPage">
        </el-pagination>
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
export default {
  name: 'classify',
  data () {
    return {
      imgPre:this.$store.state.img.imgPre,
      http:'',
      
      
      pageInfo:{
        currentPage:1,
        totalPage:1
      },

      category:[],      // 详细内容
      subcategorie:[],  // 子菜单
      classChain:[],    // 分类链
      siteList:[],      // 地区
      subStatus:1,      // 子菜单状态 0隐藏 1显示
      siteStatus:1,     // 地区状态 0隐藏 1显示
      showSiteBanner:0, // 地区banner状态 0不显示 1显示
      classGoodsId:'',  // 分类id
      siteId: '',       // 地区id
      siteImage:''      // 地区banner图片路径
    }
  },
  mounted(){
    if(!window.location.origin){
      this.http = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }else{
      this.http = window.location.origin;
    }
  },
  watch:{
    'classChain':{
      handler(curVal,oldVal){
        // 第一个分类是地区 则显示 banner
        if(curVal.length>0){
          
          if(curVal[0].type == 'site'){
            this.showSiteBanner = 1;
          }

        }else{
          return false;
        }
        // 格式化 地区id 分类id
        this.siteId = '';
        this.classGoodsId = '';
        this.siteStatus = 1; // 显示地区

        for(let i in curVal){
          if(curVal[i].type =='site'){
            this.siteId = curVal[i].id;
            this.siteStatus = 0;         // 存在地区 不显示地区
          }else if(curVal[i].type =='undefined'){
            this.classGoodsId = curVal[i].id;
          }
        }
        // console.log('监听数据变化')
        this.getClassifyList();
      }
    }
  },
  created(){
    // console.log(this.$store.state.orderMsg)
    this.getSite();
    
    // 点击首页分类进入 地域进入默认 桐庐
    if(this.$route.query.name=='地域'){
      this.$route.query.name='桐庐'
    }

    this.classChain = []; // 清空分类链 格式化

    if(this.$route.query.type == 'site'){ //地区 直接推入

      this.classChain.push({
        name:this.$route.query.name,
        id:this.$route.query.id,
        type:this.$route.query.type
      });

      this.siteStatus = 0;

    }else if(this.$route.query.type == 'search'){
      this.allgoods();
    }else{ // 其他分类 将父分类 推入
      const _this = this;
      $.ajax({
        type: "get",
        url: this.$store.state.apilink+"?s=api/goods/searchcategory",
        data:{
          id:this.$route.query.id,
          site_id:'',
          page:1,
          show_site_image:0
        },
        dataType: "json",
        success:function(res){
          const breadCrumb = res.data.breadcrumb;
          for(let i in breadCrumb){
              _this.classChain.push({
                name:breadCrumb[i].name,
                id:breadCrumb[i].id,
                type:'undefined'
              });
          }
        }
      });
    }
    this.pageInfo.currentPage = 1;
  },
  methods:{

    // 点击分类链中的关键字 删除之后的数据
    tapClassChain(index){
      let ClassChain = this.classChain;
      this.classChain.splice(index+1,ClassChain.length);
    },

    // 子组件传过来的信息
    recieveMessages2(value){
      // console.log('子组件传过来的信息')
      this.classChain = []; // 清空分类链 格式化

      let navNum = value.split(',')[0],
          navType = value.split(',')[1],
          navName = value.split(',')[2];

      if(navType == 'site'){ //地区 直接推入

        this.classChain.push({
          name:navName,
          id:navNum,
          type:navType
        });

      }else{ // 其他分类 将父分类 推入
        this.siteStatus = 1;      // 格式化状态
        this.showSiteBanner = 0;
        const _this = this;
        $.ajax({
          type: "get",
          url: this.$store.state.apilink+"?s=api/goods/searchcategory",
          data:{
            id:navNum,
            site_id:'',
            page:1,
            show_site_image:0
          },
          dataType: "json",
          success:function(res){
            const Breadcrumb = res.data.breadcrumb;
            for(let i in Breadcrumb){
                _this.classChain.push({
                  name:Breadcrumb[i].name,
                  id:Breadcrumb[i].id,
                  type:'undefined'
                });
            }
          }
        });
      }
      this.pageInfo.currentPage = 1;
    },

    // 点击子分类关键字
    selectClassFun(a,b){
      // a-分类名,b-id
      this.classChain.push({
        name: a,
        id: b,
        type:'undefined'
      });
      this.subStatus = 0; //  隐藏子分类
    },

    // 点击地区站点关键字
    selectSiteFun(a,b){
      // a-地区名,b-id
      this.classChain.push({
        name: a,
        id: b,
        type:'site'
      });
      this.siteStatus = 0; //  隐藏地区分类
    },

    //点击分页
    handleCurrentChange(val){
      this.pageInfo.currentPage = val;
      this.getClassifyList();
    },

    // 点击 全部商品
    allgoods(){
      this.classChain=[];//清空数组
      this.classGoodsId = '';
      this.siteId = '';
      this.pageInfo.currentPage = 1;
      this.showSiteBanner = 0;

      this.subStatus = 1;    
      this.siteStatus = 1;

      this.getClassifyList();
    },
    // 获取类目列表
    getClassifyList(){
      let _this = this;
      $.ajax({
          type: "get",
          url: this.$store.state.apilink+"?s=api/goods/searchcategory",
          data:{
            id:_this.classGoodsId, //  类目ID
            site_id:_this.siteId,
            page:_this.pageInfo.currentPage,
            show_site_image:_this.showSiteBanner
          },
          dataType: "json",
          success:function(res){
            _this.category = res.data;
            // console.log(res.data)
            _this.subcategorie = res.data.subcategories;
            _this.pageInfo.currentPage = Number(res.data.pagination.page);
            _this.pageInfo.totalPage = Number(res.data.pagination.pagetotal);

            if(res.data.site_image){
              _this.siteImage = res.data.site_image;
            }

            
          }
      }); 
    },
    // 获取站点列表
    getSite(){
      const _this = this;
      $.ajax({
        type: "post",
        url: this.$store.state.apilink+"?s=api/site/getlist",
        dataType: "json",
        success:function(res){
          _this.siteList = res.data;
        }
      });
    }
  },
  components: {
    tIndexHeader,IndexFooter,fixedNav
  }
}

</script>

<style scoped>
.classify-no-price{
  color: #009e4d;
  line-height: 36px;
}
.classify-site-banner-wrap{
  width: 1200px;
  height: 300px;
  margin: 20px auto 0;
}
.classify-site-banner-wrap img{
  width: 100%;
  height: 100%;
}
.index-fixed-nav{
    position: fixed;
    width: 40px;
    height: 150px;
    top: 50%;
    left: 50%;
    z-index: 9999;
    margin: -74px 0 0 630px;
}
#classify-page-wrap{
  text-align: center;
  padding: 30px 60px;
}
.classify-title-wrap{
  font-size: 14px;
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
  position: relative;
  /*border-top: 1px solid #d8d8d8;*/
}
.classify-list .classify-list-span1:after{
  border-bottom: 1px solid #d8d8d8;
  position: absolute;
  content: '';
  width: 100%;
  height: 1px;
  bottom: -2px;
  left: 0;
  z-index: 999;
}
.classify-list>p span a{
  margin-right: 20px;
}
.classify-list>p span a:hover{
  color: #009e4d;
}
.classify-list .active{
  color: #009e4d;
}
.classify-list>p{
  line-height: 40px;
  font-size: 14px;
  padding: 0 20px;
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
  height: 40px;
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
.list-content dl dt{
  overflow: hidden;
  height: 222px;
}
.list-content dl :nth-child(1) img{
  width:100%;
  height:100%;
  -webkit-transition: all .3s linear;
  -moz-transition: all .3s linear;
  transition: all .3s linear;
}
.list-content a:hover dl img{
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  transform: scale(1.05);
}
.list-content dl :nth-child(2) {
  font-size: 14px;
  line-height:34px;
  height: 34px;
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
/*.list-content dl :nth-child(3) {
  color:#999;
  font-size:14px;
  line-height:26px;
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
}*/
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
.list-content-p1{
  margin: 160px 0 0;
}
.list-content-p1 img{
  width: 110px;
  height: auto;
  margin-bottom: 20px;
}
</style>