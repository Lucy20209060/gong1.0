<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.el-dialog--small {
    width: 500px ! important;
}
#classify-page-wrap .el-pager li {
    min-width:40px;
    height: 40px;
    line-height: 40px;
}
#classify-page-wrap .el-pagination button,#classify-page-wrap .el-pagination span{
    min-width: 40px;
    height: 40px;
    line-height: 40px;
}
.details-imgs-wrap p{
  line-height: 0;
}
.w-order-detail .el-tabs__item{
  height: 32px;
  line-height: 26px;
  color:#333;
}
.w-order-detail .waitfill .el-tab-pane{
  border: 0;
}
.w-order-detail .el-tabs__header{
  /*display: inline-block;*/
  border-bottom: 0;
  margin: 0 0 30px;
}
.w-order-detail .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    /*border: 1px solid #d8d8d8;*/
    border-bottom-color: #fff;
    border-radius: 4px 4px 0 0;
}
</style>
