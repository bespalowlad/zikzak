<template lang="pug">
div
	.content(ref="content")
		main.terms
			.terms__container
				h1.terms__title {{ $route.name === 'terms' ? 'Terms of use' : 'Privacy Policy' }}
				.terms__body(v-html="$route.name === 'terms' ? (terms.acf ? terms.acf.content : '') : (privacy.acf ? privacy.acf.content : '')")
			block-header
			block-menu
			block-footer(:type='2')
	block-preloader(v-if="!isPreloader")
	
</template>

<script>
	// import smoothscroll from 'smoothscroll-polyfill';

	import blockHeader from '@/blocks/header.vue';
	import blockFooter from '@/blocks/footer.vue';
	// import Calc from '@/blocks/calc.vue';
	import BlockPreloader from '@/blocks/preloader.vue';
	import BlockMenu from '@/blocks/menu.vue';
	import {mapState, mapGetters} from 'vuex';
	import AOS from 'aos';

	// import 'swiper/dist/css/swiper.css';
	// import { swiper, swiperSlide } from 'vue-awesome-swiper';
	// import blockCookie from '@/blocks/cookie.vue';




	export default {
		name: 'Terms',
		metaInfo: function() {
			let th = this;

			return {
				title: th[th.$route.name].yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data: function(){
			return {
			}
		},
		created() {
			if (this.terms.isEmpty) this.$store.dispatch('GET_TERMS');
			if (this.privacy.isEmpty) this.$store.dispatch('GET_PRIVACY');

			if (!this.projects.length) this.$store.dispatch('GET_PROJECTS');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');

			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');

			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE');
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE');
			if (!this.team.length) this.$store.dispatch('GET_TEAM');
		},
		computed: {
			...mapState([
				'projects',
				'categories',
				'positions',
				'main',
				'about',
				'contacts',
				'services',
				'team',
				'isPreloader',
				'isCookie',
				'projectsPage',
				'terms',
				'privacy'
			])
		},
		methods: {
			getTitle() {
				let obj = this[this.$route.name].yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
			},
		},
		mounted() {
			this.$nextTick(()=> {
				// AOS.refreshHard();
				AOS.init({
					once: true,
					disabled: 'mobile',
					duration: 500,
					offset: 0
				});
			})

			if (!this.terms.isEmpty && !this.privacy.isEmpty) {
				this.$refs.content.classList.add('show');
			}
			
		},
		components: {
			'block-header': blockHeader,
			'block-footer': blockFooter,
			'block-preloader': BlockPreloader,
			'block-menu': BlockMenu
		},
		watch: {
			isPreloader() {
				AOS.refreshHard();
			},
			terms() {
				if (!this.terms.isEmpty && !this.privacy.isEmpty) {
					this.$refs.content.classList.add('show');
				}
			},
			privacy() {
				if (!this.terms.isEmpty && !this.privacy.isEmpty) {
					this.$refs.content.classList.add('show');
				}
			}
		}
	}

</script>

<style lang="scss" scoped>

	.content {
		opacity: 0;
		transition: opacity .5s ease .5s;
		
		/deep/ .h {
			opacity: 0;
		}

		&.show {
			opacity: 1;
			transition: opacity .5s ease;

			/deep/ .h {
				opacity: 1;
			}
		}
	}
	
	.terms {
		min-height: 100vh;
		padding-top: 136px;

		&__container {
			width: 77.3%;
			margin: 0 auto;
		}

		&__title {
			font: 700 43px/59px 'Avanti', sans-serif;
			color: #1c1c1c;
		}

		&__body {
			margin-top: 18px;
			padding-bottom: 130px;

			/deep/ p {
				font: 400 16px/26px 'Fatum', sans-serif;
				color: rgba(#1c1c1c, .6);
				max-width: 62%;
				margin-bottom: 26px;
			}

			/deep/ h2 {
				font: 700 28px/52px 'Avanti', sans-serif;
				color: #1c1c1c;
				margin-top: 58px;

			}

			/deep/ strong {
				font-family: 'Avanti', Arial, Helvetica, sans-serif;
				font-size: 18px;
				line-height: 28px;
				color: #1C1C1C;
				display: inline-block;
				// max-width: 50%;
				margin-top: 13px;
			}

			/deep/ ul {
				margin-top: 21px;
				margin-bottom: 43px;
			}

			/deep/ li {
				font: 400 16px/22px 'Fatum', sans-serif;
				color: #1c1c1c;
				position: relative;
				padding-left: 23px;
				margin-bottom: 18px;
				max-width: 50%;

				&:before {
					position: absolute;
					content: '';
					width: 12.45px;
					height: 12.45px;
					top: 4px;
					left: -1px;
					border-radius: 50%;
					border: 1px solid #d2d2d0;
					background-color: #1c1c1c;
					box-shadow: inset 0px 0px 0px 4px #f5f5f3;

				}
			}
		}
	}

	@media(max-width: 1200px) {
		.terms {
			padding-top: 137px;

			&__container {
				width: 91.8%;
			}

			&__title {
				font-size: 40px;
				line-height: 42px;
			}
			&__body {
				margin-top: 21px;
				padding-bottom: 137px;

				/deep/ p {
					max-width: 100%;
					margin-bottom: 15px;
				}

				/deep/ h2 {
					margin-top: 46px;
				}

				/deep/ strong {
					font-size: 18px;
					line-height: 25px;
					margin-top: 5px;
					// max-width: 75%;
				}

				/deep/ ul {
					margin-bottom: 52px;
				}

				/deep/ li {
					max-width: 77%;

					&:before {
						top: 6px;
					}
				}
			}
		}
	}

	@media(max-width: 650px) {
		.terms {
			padding-top: 104px;

			&__container {
				width: 86.5%;
			}

			&__title {
				font-size: 36px;
				line-height: 38px;
			}

			&__body {
				margin-top: 19px;
				

				/deep/ h2 {
					margin-top: 36px;
				}

				/deep/ strong {
					max-width: 100%;
				}

				/deep/ ul {
					margin-top: 16px;
					margin-bottom: 23px;
				}

				/deep/ li {
					max-width: 100%;
					line-height: 21px;
					margin-bottom: 14px;
				}
			}
		}
	}

	@media(max-width: 375px) {
		.terms {
			&__container {
				width: 88%;
			}

			&__body {
				margin-top: 20px;
				padding-bottom: 130px;

				/deep/ h2 {
					margin-top: 38px;
				}
			}
		}
	}

	@media(max-width: 320px) {
		.terms {
			&__container {
				width: 91%;
			}

			&__body {
				/deep/ h2 {
					margin-top: 32px;
				}
			}
		}
	}

</style>