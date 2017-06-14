<template>
	<div class="w-help">
		<mine-header></mine-header>
		<div class="helpContent">
			<div class="menuarea">
				<help-menu></help-menu>
			</div>
			<div class="contentarea">
				<router-view></router-view>
			</div> <!-- tzjadd -->
		</div>
		<indexFooter></indexFooter>
	</div>
</template>

<script>
import mineHeader from '@/components/common/mine_header'
import indexFooter from '@/components/common/index_footer'
import helpMenu from '@/components/common/helpMenu'

export default {
  name: 'help',
  data () {
    return {
      msg: ''
    }
  },
  components:{
  	mineHeader,
  	helpMenu,
  	indexFooter
  }
}
</script>

<style scoped>
	.w-help{
		background-color: #f5f5f5;
	}
	.w-help .helpContent{
		width:1200px;
		margin:10px auto;
		display: flex;
		justify-content: space-between;
	}
	.w-help .menuarea{
		width: 160px;
	}
	.w-help .contentarea{
		width: 980px;
		padding: 20px;
		background: #fff;
		font-size: 14px;
		line-height: 25px;
	}

</style>
