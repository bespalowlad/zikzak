<template lang="pug">
	div
</template>

<script>

	export default {
		name: 'redirect-page',
		data: function(){
			return {

			}
		},
		created() {
			this.$router.push({path: (this.$ml.get('lang_url') + '/404/')})
		}
	}

</script>

<style lang="scss" scoped>
	div {
		width: 100%;
		height: 100%;
		background-color: #1c1c1c;
	}
</style>