<template lang="pug">
	.main
		block-preloader
</template>

<script>

	import blockPreloader from '@/blocks/preloader.vue';

	let windowW = window.innerWidth;

	export default {
		name: 'preloader',
		data: function(){
			return {
				
			}
		},
		components: {
			'block-preloader': blockPreloader
		}
	}

</script>

<style lang="scss" scoped>

</style>