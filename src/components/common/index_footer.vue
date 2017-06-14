<template>
    <div class="index-footer">
      <div>©2017 杭州安厨电子商务有限公司 版权所有 浙ICP备13026319号-1</div>
    </div>
</template>

<script>
export default {
  name: 'index-footer',
  data () {
    return {
      msg: ''
    }
  },
}

</script>
<style type="text/css">
  .index-footer{
    text-align:center;
    padding-top:170px;
    font-size:14px;
    background:#fff;
    line-height: 80px;
    background: #fff url(/static/images/footer-img.png) no-repeat 50% 30%;
    background-size: 50%;
  }
  .index-footer div{
    background: #fff;
  }
</style>