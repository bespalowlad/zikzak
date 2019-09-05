<template lang="pug">
div
	main.content(ref="content")
		.cases
			.cases__head.head
				.head__container
					.head__title
						span(data-aos="title-fade" data-aos-delay="200" :data-cut-lines="projectsPage.acf ? projectsPage.acf.title : ''")
					.head__info.info(data-aos="custom-fade" data-aos-delay="300")
						.info__number {{ projectsPage.acf ? projectsPage.acf.projects_count : '' }}
						.info__label
							span {{ $ml.get('cases.realized') }}
							span .{{ $ml.get('cases.ideas') }}
						.info__text {{ projectsPage.acf ? projectsPage.acf.description : '' }}
			.cases__filters.filters(v-if="mob" :class="{'filters_show': getCategories.length > 0}" data-aos="fade-up" data-aos-delay="500")
				swiper(:options="{ slidesPerView: 'auto', spaceBetween: 10, slidesOffsetAfter: 20}")
					swiper-slide
						button.filters__filter(type="button" :class="{filters__filter_active: activeFilter == -1}" @click="setFilter(-1)" aria-label="All projects")
							span .
							span {{ $ml.get('cases.all_projects') }}
					swiper-slide( v-for="(c, index) in getCategories" :key="index" )
						button.filters__filter( type="button" :class="{filters__filter_active: activeFilter == c.id}" @click="setFilter(c.id)" :aria-label="c.name")
							span .
							span {{ c.name }}
			.cases__filters.filters(v-else :class="{'filters_show': getCategories.length > 0}"  data-aos="fade-up" data-aos-delay="500" ref="filters")
				button.filters__filter(type="button" :class="{filters__filter_active: activeFilter == -1}" @click="setFilter(-1)" aria-label="All projects")
					.filters__line
						span .
						span {{ $ml.get('cases.all_projects') }}
					.filters__line
						span .
						span {{ $ml.get('cases.all_projects') }}
				button.filters__filter(v-for="(c, index) in getCategories" :key="index" type="button" :class="{filters__filter_active: activeFilter == c.id}" @click="setFilter(c.id)" :aria-label="c.name")
					.filters__line
						span .
						span {{ c.name }}
					.filters__line
						span .
						span {{ c.name }}
			.cases__line(data-aos="line")
			.cases__list.list.list_( v-if="desk")
				.list__item( v-for="(item, i) in Math.ceil(filterCases(activeFilter).length / 3)")
					.item__block(v-for="(block, j) in filterCases(activeFilter).slice(i*3, i*3 + 3)"  data-aos="custom-fade" :data-aos-delay="i == 0 ? 800 : 100" )
						router-link.item__img(:style="{'background-image': 'url('+ (block.acf.preview ? block.acf.preview.image_1.url : '') +')'}" :to="$ml.get('lang_url') + '/cases/' + block.slug + '/'" v-if="j == 1")
							.item__hover
								.item__inner
									.item__word
										span {{ $ml.get('main.open') }}
									.item__line
									.item__word
										span {{ $ml.get('main.case') }}
						router-link.item__img(:style="{'background-image': 'url('+ (block.acf.preview ? block.acf.preview.image_2.url : '') +')'}" :to="$ml.get('lang_url') + '/cases/' + block.slug + '/'" v-else)
							.item__hover
								.item__inner
									.item__word
										span {{ $ml.get('main.open') }}
									.item__line
									.item__word
										span {{ $ml.get('main.case') }}
						router-link.item__info(:to="$ml.get('lang_url') + '/cases/' + block.slug + '/'")
							.item__name(v-html="block.title.rendered")
							.item__square 
								span {{ block.acf.square }} 
								span {{ $ml.get('cases.sq_m') }}
			.cases__list.list(v-if="tablet")
				.list__item(v-for="(item, i) in Math.ceil(filterCases(activeFilter).length / 2)")
					.item__block(v-for="(block, j) in filterCases(activeFilter).slice(i*2, i*2 + 2)"  data-aos="custom-fade" :data-aos-delay="i == 0 ? 800 : 100")
						router-link.item__img(:style="{'background-image': 'url('+ (block.acf.preview ? block.acf.preview.image_1.url : '') +')'}" :to="$ml.get('lang_url') + '/cases/' + block.slug + '/'" v-if="i % 2 == 0")
						router-link.item__img(:style="{'background-image': 'url('+ (block.acf.preview ? block.acf.preview.image_2.url : '') +')'}" :to="$ml.get('lang_url') + '/cases/' + block.slug + '/'" v-else)
						router-link.item__info(:to="$ml.get('lang_url') + '/cases/' + block.slug + '/'")
							.item__name(v-html="block.title.rendered")
							.item__square 
								span {{ block.acf.square }} 
								span {{ $ml.get('cases.sq_m') }}
			.cases__list.list(v-if="mob")
				.item__block( v-for="(block, j) in filterCases(activeFilter)" data-aos="custom-fade" :data-aos-delay="j == 0 ? 800 : 100")
					router-link.item__img( :style="{ 'background-image': 'url('+ (block.acf.preview ? block.acf.preview.image_1.url : '') +')' }" :to="$ml.get('lang_url') + '/cases/' + block.slug + '/'" v-if="(j+1) % 3 == 0" )
					router-link.item__img( :style="{ 'background-image': 'url('+ (block.acf.preview ? block.acf.preview.image_2.url : '') +')' }" :to="$ml.get('lang_url') + '/cases/' + block.slug + '/'" v-else )
					router-link.item__info(:to="$ml.get('lang_url') + '/cases/' + block.slug + '/'")
						.item__name(v-html="block.title.rendered")
						.item__square 
							span {{ block.acf.square }} 
							span {{ $ml.get('cases.sq_m') }}
			block-header
			block-menu
			block-cookie(v-if="!isCookie")
		block-footer(:type='2')
	block-preloader(v-if="!isPreloader")
	
</template>

<script>

	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	
	import smoothscroll from 'smoothscroll-polyfill';

	import blockHeader from '@/blocks/header.vue';
	import blockFooter from '@/blocks/footer.vue';
	// import Calc from '@/blocks/calc.vue';
	import BlockPreloader from '@/blocks/preloader.vue';
	import BlockMenu from '@/blocks/menu.vue';
	import {mapState, mapGetters} from 'vuex';
	import AOS from 'aos';

	import 'swiper/dist/css/swiper.css';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import blockCookie from '@/blocks/cookie.vue';

	// import case1 from '@/assets/uploads/case1.jpg';
	// import case2 from '@/assets/uploads/case2.jpg';
	// import case3 from '@/assets/uploads/case3.jpg';
	// import case4 from '@/assets/uploads/case4.jpg';
	// import case5 from '@/assets/uploads/case5.jpg';
	// import case6 from '@/assets/uploads/case6.jpg';
	// import caseHor from '@/assets/uploads/cases-test-hor.jpg';
	// import caseVer from '@/assets/uploads/cases-test-ver.jpg';



	let request;
	let isFixed = false;
	let docH;
	let windowH = window.innerHeight;
	let windowW = window.innerWidth;
	let btn;
	let offset;
	let isRuning;
	let lastY;
	let dir = 1;
	let isShow = true;

	function loop() {
		docH = document.body.clientHeight;
		if (window.scrollY >= docH - offset - windowH + 9 && isFixed) {
			isFixed = false;
			btn.classList.add('filters_static');
			btn.classList.remove('filters_fixed');
		}
		if (window.scrollY < docH - offset - windowH + 9 && !isFixed) {
			isFixed = true;
			btn.classList.remove('filters_static');
			btn.classList.add('filters_fixed');
		}
		request = requestAnimationFrame(loop);
	}



	export default {
		name: 'One-case',
		metaInfo: function() {
			let th = this;

			return {
				title: th.projectsPage.yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data: function(){
			return {
				activeFilter: -1,
				desk: window.innerWidth > 960,
				tablet: window.innerWidth <= 960 && window.innerWidth > 650,
				mob: window.innerWidth <= 650,
			}
		},
		created() {
			if (!this.projects.length) this.$store.dispatch('GET_PROJECTS');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');

			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');

			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE');
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE');
			if (!this.team.length) this.$store.dispatch('GET_TEAM');

			if (window.innerWidth > 1200) {
				if (isSafari) {
					window.addEventListener('scroll', this.onScrollSafari);
				} else {
					window.addEventListener('scroll', this.onScroll);
				}
			}
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
				'projectsPage'
			]),
			...mapGetters([
				'getCategories'
			])
		},
		methods: {
			getTitle() {
				let obj = this.projectsPage.yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
			},
			onScroll() {
				let y = window.scrollY;
				dir = y > lastY ? 1 : 0;
				if (y > 88 && !dir && !isShow) {
					btn.classList.remove('filters_novisible');
					isShow = true;
				}
				if (y > 88 && dir && isShow) {
					btn.classList.add('filters_novisible');
					isShow = false;
				}
				lastY = y;
			},
			onScrollSafari() {
				let y = window.scrollY;
				dir = y > lastY ? 1 : 0;
				if (y > 88 && y < (docH - windowH) && !dir && !isShow) {
					btn.classList.remove('filters_novisible');
					isShow = true;
				}
				if (y > 88 && dir && isShow) {
					btn.classList.add('filters_novisible');
					isShow = false;
				}
				lastY = y;
			},
			setFilter(id) {
				let list = document.querySelector('.cases__list');
				let line = document.querySelector('.cases__line');
				line.classList.remove('line-scalef');
				line.classList.remove('line-scales');
				line.classList.add('line-fade');
				list.classList.remove('fade-in');
				list.classList.add('fade-out');
				window.scroll({ top: 0, behavior: 'smooth'});
				setTimeout(() => {
					
					this.activeFilter = id;
				}, 1000);
				setTimeout(() => {
					line.classList.remove('line-fade');
					if(line.classList.contains('line-sclaef')) {
						line.classList.remove('line-scalef');
						line.classList.add('line-scales');
					} else {
						line.classList.remove('line-scales');
						line.classList.add('line-scalef');
					}
				}, 2000);
			},
			onPostHover() {
				document.querySelector('.item__img').classList.remove('item__img_color');
				let els = document.querySelectorAll('.item__img');
				for (let i = 0; i < els.length; i++) {
					els[i].removeEventListener('mouseenter', this.onPostHover, false);
				}
			},
			check() {
				if (!this.projects.length || !this.categories.length || this.projectsPage.isEmpty) return;

				if (window.innerWidth > 1200) {
					this.$nextTick(() => {
						btn = this.$refs.filters;
						windowH = window.innerHeight;
						windowW = window.innerWidth;
						offset = 90;
						btn.style.bottom = offset + 'px';

						if (window.innerWidth <= 1200) {
							cancelAnimationFrame(request);
							isRuning = false;
						}

						if (window.innerWidth > 1200 && !isRuning) {
							request = requestAnimationFrame(loop);
							isRuning = true;
						}
						// request = requestAnimationFrame(loop);
						// isRuning = true;
						this.$refs.content.classList.add('show');
						if (window.innerWidth > 1200) {
							document.querySelector('.item__img').classList.add('item__img_color');
							let els = document.querySelectorAll('.item__img');
							for (let i = 0; i < els.length; i++) {
								els[i].addEventListener('mouseenter', this.onPostHover, false);
							}
						}

					});
				} else {
					this.$refs.content.classList.add('show');
				}

			},
			cutLines() {
				let els = document.querySelectorAll('[data-cut-lines]:not(.aos-init)');
				for (let i = 0; i < els.length; i++) {
					let el = els[i];
					el.innerHTML = el.getAttribute('data-cut-lines');
					var instance = new SplitType(el, {split: 'lines'});
					for (let a = 0; a < instance.lines.length; a++) {
						let e = instance.lines[a];
						new SplitType(e, {split: 'lines'});
					}
				}
			},
			cutLinesOnResize() {
				let els = document.querySelectorAll('[data-cut-lines]');
				for (let i = 0; i < els.length; i++) {
					let el = els[i];
					el.innerHTML = el.getAttribute('data-cut-lines');
					var instance = new SplitType(el, {split: 'lines'});
					for (let a = 0; a < instance.lines.length; a++) {
						let e = instance.lines[a];
						new SplitType(e, {split: 'lines'});
					}
				}
			},
			filterCases(filter) {
				
				if (filter === -1) return this.projects;
				return this.projects.filter(item => item.cases_category.indexOf(filter) > -1);
			},
			getWidth() {
				this.desk = window.innerWidth > 960? true : false;
				this.tablet = window.innerWidth <= 960 && window.innerWidth > 650 ? true : false;
				this.mob = window.innerWidth <= 650 ? true : false;
			},
			resizeHandler() {

				this.getWidth();

				let newWindowW = window.innerWidth;
				if (newWindowW != windowW) {
					window.scrollTo(0, 0);
				}
				setTimeout(() => {
					let newWindowW = window.innerWidth;
					if (newWindowW != windowW) {
						this.cutLinesOnResize();
					}
					// btn = document.querySelector('.filters');
					btn = this.$refs.filters;
					docH = document.body.clientHeight;
					windowH = window.innerHeight;
					windowW = newWindowW;
					offset = 90;
					btn.style.bottom = offset + 'px';

					if (window.innerWidth <= 1200) {
						cancelAnimationFrame(request);
						isRuning = false;
					}

					if (window.innerWidth > 1200 && !isRuning) {
						request = requestAnimationFrame(loop);
						isRuning = true;
					}
				}, 1000);
			}
		},
		mounted() {
			smoothscroll.polyfill();

			this.$nextTick(() => {
				this.cutLinesOnResize();
				
				// AOS.refreshHard();
				// AOS.init({
				// 	once: true,
				// 	disabled: 'mobile',
				// 	duration: 1000,
				// 	offset: 0
				// });
			})
			// let els = document.querySelectorAll('[data-cut-lines]:not(.aos-init)');
			// for (let i = 0; i < els.length; i++) {
			// 	let el = els[i];
			// 	var instance = new SplitType(el, {split: 'lines'});
			// 	for (let a = 0; a < instance.lines.length; a++) {
			// 	let e = instance.lines[a];
			// 	let ins = new SplitType(e, {split: 'lines'});
			// 	}
			// }

			if( !(matchMedia('(hover: none)').matches) ) {
				document.body.classList.add('can-hover');
			}

			this.check();

			window.addEventListener('resize', this.resizeHandler);
			window.addEventListener('orientationchange', this.resizeHandler);
		},
		components: {
			'block-header': blockHeader,
			'block-footer': blockFooter,
			'block-preloader': BlockPreloader,
			'block-menu': BlockMenu,
			'block-cookie': blockCookie,
			swiper,
			swiperSlide
		},
		watch: {
			projects() {
				this.check();
			},
			categories() {
				this.check();
			},
			projectsPage() {
				this.check();
			},
			isPreloader() {
				this.cutLinesOnResize();
				// AOS.init({
				// 	once: true,
				// 	disabled: 'mobile',
				// 	duration: 1000,
				// 	offset: 0
				// });
				AOS.refreshHard();
				this.$refs.content.classList.add('show');
			},
			activeFilter() {
				let list = document.querySelector('.cases__list');
				list.classList.remove('fade-out');
				list.classList.add('fade-in');
			}
		},
		beforeDestroy() {
			isRuning = null;
			isFixed = false;
			cancelAnimationFrame(request);

			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('orientationchange', this.resizeHandler);
			
			if (isSafari) {
				window.removeEventListener('scroll', this.onScrollSafari);
			} else {
				window.removeEventListener('scroll', this.onScroll);
			}
			isShow = false;
			lastY = 0;
			dir = 0;

			let els = document.querySelectorAll('.item__img');
			for (let i = 0; i < els.length; i++) {
				els[i].removeEventListener('mouseenter', this.onPostHover, false);
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

	.fade-out {
		animation: fade-out 1s forwards ease;

		@keyframes fade-out {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}
	}

	.fade-in {
		animation: fade-in 1s forwards ease;

		@keyframes fade-in {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	}


	html:not(.no-js) [data-aos=line] {
		transform: scaleX(0);
	}

	html:not(.no-js) [data-aos=line].aos-animate {
		transform: none;
		transition: transform 2s ease 1s;
	}

	.cases {
		padding-top: 145px;
		min-height: 100vh;
		position: relative;
		padding-bottom: 117px;
		&__head {
			width: 100%;
			padding: 0 9px 0 66px;
		}

		&__line {
			width: 100%;
			height: 1px;
			transform: scaleX(0);
			background-color: #dedede;
			margin-top: 121px;
			// transform: scaleX(0.8);
			transform-origin: 0 0;
			// transition: transform 1.5s ease;
			// animation: line 1.5s ease 1s forwards;

			// @keyframes line {
			// 	0% {
			// 		transform: scaleX(0);
			// 	}

			// 	100% {
			// 		transform: scaleX(1);
			// 	}
			// }
		}

		&__list {
			// margin-top: 120px;
			margin-top: -1px;
			width: 100%;
			// border-top: 1px solid #dedede;
			
		}

		.head {
			font-size: 0;
			&__title {
				display: inline-block;
				vertical-align: top;
				max-width: calc(100% - 680px);
				padding-left: 7.1%;

				span {
					font: 700 54px/59px 'Avanti', sans-serif;
					color: #1c1c1c;
					max-width: 570px;
					display: block;
					letter-spacing: -0.45px;
				}
			}

			&__info {
				// display: inline-block;
				// vertical-align: top;
				width: 670px;
				padding-left: 0px;
				padding-top: 18px;
				float: right;
			}

			.info {
				&__number {
					display: inline-block;
					vertical-align: bottom;
					font: 700 54px/42px 'Avanti', sans-serif;
					color: #d0cfcb;
					text-transform: uppercase;
					letter-spacing: 3px;
				}

				&__label {
					display: inline-block;
					vertical-align: bottom;
					margin-left: 4px;

					span {
						display: block;
						font: 400 9px/16px 'Fatum', sans-serif;
						color: #1c1c1c;
						letter-spacing: 3px;
						text-transform: uppercase;

						&:first-child {
							margin-left: 6px;
							line-height: 14px;
						}
					}
				}

				&__text {
					font: 400 14px/22px 'Fatum', sans-serif;
					color: #1c1c1c;
					opacity: .6;
					margin-top: 12px;
					padding-left: 2px;
					max-width: 406px;
				}
			}
		}

		.list {
			&__item {
				width: 100%;
				padding-bottom: 2px;

				&:after {
					content: '';
					display: table;
					clear: both;
				}

				

				&:nth-child(1) {
					.item__block {
						&:nth-child(1) {
							.item__img {
								// filter: grayscale(0);
							}
						}
					}
					.item {
						&__block {
							display: block;
							&:nth-child(1) {
								width: 100%;

								.item {
									&__img {
										width: 61.25%;
										// height: 35.3vw;
										
										background-size: cover;
										background-position: center;
										display: inline-block;
										vertical-align: top;

										&_color {
											filter: grayscale(0);
										}

										&:after {
											padding-top: 57.55%;
										}
									}

									&__info {
										display: inline-block;
										vertical-align: top;
										padding-left: 29px;
										padding-top: 25px;
									}

									&__name {
										font-size: 19px;
									}

									&__square {
										padding-top: 3px;
									}

									
								}
							}

							&:nth-child(2) {
								float: right;
								margin-top: -13.9vw;
								margin-right: 4.6vw;
								width: 29.6%;
								margin-top: -200px;
								.item {
									&__img {
										// width: 29.6%;
										width: 100%;
										// height: 38.8vw;
										// padding-top: 130.9%
										background-size: cover;
										background-position: center;

										&:after {
											padding-top: 130.9%;
										}
									}

									&__info {
										margin-top: 16px;
										padding-left: 0px;
									}
								}
							}

							&:nth-child(3) {
								margin-left: 6.25%;
								margin-top: 4.6vw;
								width: 43%;
								margin-top: 66px;


								.item {
									&__img {
										width: 100%;
										// height: 24.75vw;
										background-size: cover;
										background-position: center;

										&:after {
											padding-top: 57.3%;
										}
									}

									&__info {
										margin-top: 16px;
										margin-left: 0px;
									}
									
								}



							}

						}
					}
				}

				&:nth-child(2n) {
					padding-bottom: 55px;
					.item {
						&__block {
							&:nth-child(1) {
								text-align: right;

								.item {

									&__img {
										&:after {
											padding-top: 57.6%;
										}
									}
									&__info {
										display: inline-block;
										width: 61.25%;
										text-align: left;
										padding-left: 0;
										padding-top: 16px;
									}

									&__name {
										font-size: 14px;
									}
								}
							}

							&:nth-child(2) {
								float: left;
								margin-right: 0;
								margin-left: 4.6%;
								// margin-top: -24vw;
								margin-top: -345px;

								.item {
									&__info {
										margin-top: 16px;
										padding-left: 0;
									}
								}
							}

							&:nth-child(3) {
								text-align: right;
								margin-left: 0;
								// margin-right: 6.3vw;
								// margin-top: 3.8vw;
								margin-top: 57px;
								width: 100%;
								padding-right: 6.3%;

								.item {
									&__img {
										display: inline-block;
										width: 45.9%;
										// margin-right: 6.3%; 
										// padding-top: 57.35%;
									}

									&__info {
										display: inline-block;
										width: 45.9%;
										text-align: left;
										margin-top: 14px;
									}
								}
							}
						}

						
					}
				}
				
			}
		}

		.item {
			overflow: hidden;

			&__hover {
				visibility: hidden;
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				text-align: center;
				// z-index: 1;
				transition: opacity .5s ease, z-index .5s step-end, visibility .5s step-end;
				// backface-visibility: hidden;
				opacity: 0;

				&:before {
					content: "";
					display: block;
					width: 100%;
					height: 1px;
					background-color: rgba(255, 255, 255, .3);
					margin-left: -100%;
					transform-origin: 0 0;
					transition: transform 0s linear .5s;
					
				}
			}

			&__inner {
				display: inline-block;
				width: 83px;
				margin-top: -20px;
			}

			&__word {
				overflow: hidden;
				font-size: 11px;
				letter-spacing: 2px;
				text-transform: uppercase;
				color: #fff;
				font-weight: 700;

				span {
					display: block;
					transform: translate3d(0, 15px, 1px) rotate(6deg);
					transform-origin: 0 0;
					transition: transform 0s linear .5s;
					
				}
			}

			&__line {
				width: 100%;
				height: 1px;
				background: #fff;
				margin: 3px 0 6px;
				transform: scaleX(0);
				transform-origin: 0 0;
				transition: transform 0 linear .5s;
			}

			&__block {
				display: block;
				&:nth-child(1) {
					width: 100%;

					.item {
						&__img {
							width: 61.25%;
							// height: 35.3vw;
							
							background-size: cover;
							background-position: center;
							display: inline-block;
							vertical-align: top;

							&:after {
								padding-top: 57.55%;
							}
						}

						&__info {
							display: inline-block;
							vertical-align: top;
							padding-left: 29px;
							padding-top: 25px;
						}

						&__name {
							font-size: 19px;
						}

						&__square {
							padding-top: 3px;
						}

						
					}
				}

				&:nth-child(2) {
					float: right;
					margin-top: -13.9vw;
					margin-right: 4.6vw;
					width: 29.6%;
					margin-top: -280px;
					.item {
						&__img {
							// width: 29.6%;
							width: 100%;
							// height: 38.8vw;
							// padding-top: 130.9%
							background-size: cover;
							background-position: center;

							&:after {
								padding-top: 130.9%;
							}
						}

						&__info {
							margin-top: 16px;
							padding-left: 0px;
							text-align: left;
						}
					}
				}

				&:nth-child(3) {
					margin-left: 6.25%;
					margin-top: 123px;
					width: 43%;
					margin-top: 66px;


					.item {
						&__img {
							width: 100%;
							// height: 24.75vw;
							background-size: cover;
							background-position: center;

							&:after {
								padding-top: 57.25%;
							}
						}

						&__info {
							margin-top: 16px;
							margin-left: 0px;
						}
						
					}



				}

			}

			&__info {
				display: block;
			}

			&__img {
				filter: grayscale(1);
				display: block;
				transition: filter .5s ease;
				position: relative;
				overflow: hidden;

				&:after {
					content: '';
					display: block;
					background-color: rgba(0, 0, 0, .25);
					opacity: 0;
					transition: opacity .5s ease;
					
				}
			}

			&__name {
				font: 700 14px/22px 'Fatum', sans-serif;
				color: #363636;
				text-transform: uppercase;
				letter-spacing: 1px;
			}

			&__square {
				padding-top: 1px;
				span {
					font: 400 11px/25px 'Fatum', sans-serif;
					color: #1c1c1c;
					text-transform: uppercase;
					letter-spacing: 2px;
					opacity: .7;
				}
			}

			// &__hover {
			// 	width: 100%;
			// 	height: 100%;
			// 	position: relative;
			// }

			
		}

		&__filters {
			// position: fixed;
			// bottom: 27px;
			left: 9px;
			background-color: #fff;
			padding: 11px 40px 26px 22px;
			z-index: 1;
			// max-width: 247px;

		}

		.filters {
			position: fixed;
			bottom: 9px;
			left: 9px;
			opacity: 0;
			transition: transform 1s ease, opacity 1s ease;
			transform: translate3d(0, 30px, 1px);

			&_novisible {
				opacity: 0 !important;
				transform: translate3d(0, 30px, 1px) !important;
				transition: transform 1s ease, opacity 1s ease !important;
			}

			&_show {
				opacity: 1;
				transform: none;
			}

			&__line {
				padding-right: 5px;
				&:nth-child(2) {
					position: absolute;
					top: 0;
					left: 0;
					transform: translate3d(0, 25px, 1px) rotate(6deg);
					visibility: hidden;
				}
			}

			&_static {
				position: absolute;
				bottom: 500px;
			}

			&_fixed {
				position: fixed;
				bottom: 9px !important;
			}

			&__filter {
				font: 400 9px/9px 'Fatum', sans-serif;
				color: #1c1c1c;
				opacity: 0.5;
				text-transform: uppercase;
				letter-spacing: 3px;
				display: block;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				margin-top: 16px;

				span {
					text-align: left;
					white-space: nowrap;
					transition: transform .3s ease;
					display: inline-block;

					&:first-child {
						transform: scaleX(0);
						left: 5px;
						position: relative;
						margin-right: 2px;
					}
				}

				&_active {
					opacity: 1;
					span {
						&:first-child {
							transform: none;
						}

						&:nth-child(2) {
							transform: translateX(4px);
						}
					}
				}
			}
		}
		

		
	}

	
	.line-fade {
		animation: line-out 1s forwards ease;

		@keyframes line-out {
			0% {
				transform: scaleX(1);
			}

			100% {
				transform: scaleX(0);
			}
		}
	}

	.line-scalef {
		animation: line 1s forwards ease;

	}

	.line-scales {
		animation: line 1s forwards ease;
	}

	@media screen and (max-width: 1200px) {
		.cases {
			.item__img:after {
				background: none;

				
			}

			&__head {
				padding: 0;
				margin: 0 auto;
				width: 80%;
			}

			.head {
				&__title {
					max-width: 50%;
					width: 50%;
					padding-left: 0;
				}

				&__info {
					width: 50%;
					float: none;
					display: inline-block;
					vertical-align: top;
				}
			}

			
		}
	}

	@media(max-width: 960px) {
		.cases {
			padding-top: 138px;
			&__head {
				width: 92%;
			}


			.head {
				&__title {
					span {
						font-size: 40px;
						line-height: 42px;
						letter-spacing: 0.1px;
					}
					
				}

				&__info {
					padding-left: 48px;
					padding-top: 5px;
				}
			}

			&__filters {
				position: static;
				width: 706px;
				margin: 0 auto;
				margin-top: 48px;
				padding: 11px 5px 11px 5px;
			}

			.filters {
				position: static;
				text-align: justify;
				white-space: nowrap;
				left: 0;
				&__filter {
					display: inline-block;
					margin-right: 35px;
					margin-top: 0;
					line-height: 18px;

					// &:nth-child(1) {
					// 	margin-right: 34px;
					// }

					// &:nth-child(2) {
					// 	margin-right: 30px;
					// }

					// &:nth-child(3) {
					// 	margin-right: 36px;
					// }

					// &:last-child {
					// 	margin-right: 0;
					// }
				}
			}

			&__line {
				display: none;
			}

			&__list {
				width: 92%;
				margin: 0 auto;
				transform: translateX(1px);
				margin-top: 23px;
			}



			.list {
				&__item {
					width: 100%;
					font-size: 0;
					padding-bottom: 29px;

					&:nth-child(1) {
						.item {
							&__block {
								width: 49%;
								display: inline-block;
								vertical-align: top;
								float: none;
								margin: 0;
								margin-right: 2%;

								&:nth-child(1) {
									width: 49%;
									margin-right: 2%;
									margin-left: 0;
									margin-top: 0;
									float: none;

									.item {
										&__img {
											width: 100%;
											float: none;


											&:after {
												padding-top: 64.6%;
											}
										}

										&__info {
											padding-left: 0;
											padding-top: 12px;
											margin-top: 0;
										}

										&__name {
											font-size: 14px;
										}

										&__square {
											padding-top: 0;
										}
									}
								}

								&:nth-child(2) {
									width: 49%;
									margin-right: 0;
									margin-left: 0;
									margin-top: 0;
									float: none;

									.item {
										&__img {
											width: 100%;
											float: none;

											&:after {
												padding-top: 64.6%;
											}
										}

										&__info {
											padding-left: 0;
											padding-top: 12px;
											margin-top: 0;
										}

										&__square {
											padding-top: 0;
										}
									}
								}

								

								// &:nth-child(1) {
								// 	width: 50%;
								// 	float: none;
								// }

								
							}

							&__img {
								width: 100%;
								filter: grayscale(0);
								&:after {
									padding-top: 62.5%;
									opacity: .7;
								}
							}

							&__info {
								padding-top: 12px;
								margin-top: 0;
							}

							&__square {
								padding-top: 0;
							}
						}
					}

					&:nth-child(2n) {
						padding-bottom: 30px;
						.item {
							&__block {
								width: 49%;
								display: inline-block;
								vertical-align: top;
								float: none;
								margin: 0;
								margin-right: 2%;

								&:nth-child(1) {
									width: 49%;
									margin-right: 2%;
									margin-left: 0;
									margin-top: 0;
									float: none;
									text-align: left;

									.item {
										&__img {
											width: 100%;
											float: none;


											&:after {
												padding-top: 130.5%;
											}
										}

										&__info {
											padding-left: 0;
											padding-top: 12px;
											margin-top: 0;
										}

										&__square {
											padding-top: 0;
										}
									}
								}

								&:nth-child(2) {
									width: 49%;
									margin-right: 0;
									margin-left: 0;
									margin-top: 0;
									float: none;

									.item {
										&__img {
											width: 100%;
											float: none;

											&:after {
												padding-top: 130.5%;
											}
										}

										&__info {
											padding-left: 0;
											padding-top: 12px;
											margin-top: 0;
										}

										&__square {
											padding-top: 0;
										}
									}
								}

								

								// &:nth-child(1) {
								// 	width: 50%;
								// 	float: none;
								// }

								
							}

							&__img {
								width: 100%;
								&:after {
									padding-top: 130.5%;
								}
							}

							&__square {
								padding-top: 0;
							}
						}
					}
				}
			}

			.item {
				&__block {
					width: 49%;
					display: inline-block;
					vertical-align: top;
					float: none;
					margin: 0;
					margin-right: 2%;

					&:nth-child(1) {
						width: 49%;
						margin-right: 2%;
						margin-left: 0;
						margin-top: 0;
						float: none;

						.item {
							&__img {
								width: 100%;
								float: none;


								&:after {
									padding-top: 64.6%;
								}
							}

							&__info {
								padding-left: 0;
								padding-top: 12px;
								margin-top: 0;
							}

							&__name {
								font-size: 14px;
							}

							&__square {
								padding-top: 0;
							}
						}
					}

					&:nth-child(2) {
						width: 49%;
						margin-right: 0;
						margin-left: 0;
						margin-top: 0;
						float: none;

						.item {
							&__img {
								width: 100%;
								float: none;

								&:after {
									padding-top: 64.6%;
								}
							}

							&__info {
								padding-left: 0;
								padding-top: 12px;
								margin-top: 0;
							}

							&__square {
								padding-top: 0;
							}
						}
					}

					

					// &:nth-child(1) {
					// 	width: 50%;
					// 	float: none;
					// }

					
				}

				&__img {
					width: 100%;
					filter: grayscale(0);
					&:after {
						padding-top: 62.5%;
						opacity: .7;
					}
				}

				&__info {
					padding-top: 12px;
					margin-top: 0;
				}

				&__square {
					padding-top: 0;
				}
			}
		}
	}

	@media(max-width: 650px) {
		.cases {
			padding-top: 103px;
			&__head {
				width: 86.5%;
			}

			.head {
				&__title {
					display: block;
					width: 100%;
					max-width: 100%;
					span {
						font-size: 36px;
						line-height: 38px;
						max-width: 90%;
					}
				}

				&__info {
					display: block;
					width: 100%;
					padding-left: 0;
					padding-top: 21px;
				}

				.info {
					&__number {
						font-size: 45px;
					}

					&__label {
						margin-left: 5px;
						padding-bottom: 1px;
						span {
							font-size: 9px;
							
							&:first-child {
								line-height: 10px;
							}

							&:nth-child(2) {
								margin-left: 1px;
							}
						}
					}

					&__text {
						font-size: 15px;
						line-height: 22px;
						max-width: 91%;
						padding-left: 0;
						padding-top: 4px;
					}
				}
			}

			&__filters {
				position: relative;
				margin-top: 42px;
				width: 86.5%;
				padding: 11px 0px 11px 10px;

				
			}

			.filters {
				position: relative;
				margin-top: 42px;
				width: 86.5%;
				padding: 11px 0px 11px 10px;

				&:after {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 10%;
					height: 100%;
					content: '';
					background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0.51) 59%, rgba(255, 255, 255, 0) 106.58%);
					z-index: 1;
					pointer-events: none;
				}
				&__filter {
					margin: 0!important;
					white-space: nowrap;
					line-height: 18px;
					
					// max-width: 180px!important;

					// span {
					// 	display: inline;
					// }
				}
			}

			/deep/ .swiper-wrapper {

				.swiper-slide{
					// max-width: 180px!important;
					width: auto!important;
				}

				// .swiper-slide {
				// 	&:nth-child(1) {
				// 		max-width: 100px!important;
				// 	}

				// 	&:nth-child(2) {
				// 		max-width: 100px!important;
				// 	}

				// 	&:nth-child(3) {
				// 		max-width: 150px!important;
				// 	}

				// 	&:nth-child(4) {
				// 		max-width: 250px!important;
				// 	}
				// }
			}

			&__list {
				margin-top: 12px;
				width: 86.5%;
				transform: translateX(0);
			}

			.item {
				&__block {
					width: 100%;
					padding-bottom: 23px;
					&:nth-child(1) {
						width: 100%;
						.item {
							&__img {
								&:after {
									padding-top: 65.4%;
								}
							}

							&__info {
								padding-top: 11px;
								text-align: left;
							}
						}
						

					}

					&:nth-child(2) {
						width: 100%;
						.item {
							&__img {
								width: 100%;
								&:after {
									padding-top: 64%;
								}
							}

							&__info {
								padding-top: 11px;
								text-align: left;
							}
						}
					}

					&:nth-child(3n) {
						width: 100%;
						margin: 0;
						.item {
							&__img {
								width: 100%;
								&:after {
									padding-top: 130.1%;
								}
							}

							&__info {
								padding-top: 10px;
								margin-top: 0;
								text-align: left;
							}
						}
					}
				}

				&__img {
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
					&:after {
						padding-top: 65.4%;
					}
				}

				&__info {
					padding-top: 11px;
				}



			}

			

			
		}
	}

	@media(max-width: 375px) {
		.cases {
			&__head {
				width: 88.2%;
			}

			.head {
				&__title {
					span {
						max-width: 100%;
						line-height: 40px;
						letter-spacing: 0;
					}
				}

				&__info {
					padding-top: 17px;
				}

				.info {
					&__text {
						max-width: 98%;
					}
				}

			}

			&__filters {
				width: 88.2%;
				margin-top: 38px;
			}

			&__list {
				width: 88.2%;
			}

			.item {
				&__block {
					&:nth-child(1) {
						.item {
							&__img {
								&:after {
									padding-top: 65%;
								}
							}

							&__info {
								padding-top: 10px;
							}
						}
					}

					&:nth-child(3n) {
						.item {
							&__img {
								&:after {
									padding-top: 131%;
								}
							}
						}
					}
				}

				&__img {
					&:after {
						padding-top: 65%;
					}
				}

				&__info {
					padding-top: 10px;
				}
			}
		}
	}

	@media(max-width: 320px) {
		.cases {
			&__head {
				width: 91.2%;
			}

			.head {
				&__title {
					span {
						line-height: 39px;
						max-width: 100%;
					}
				}

				&__info {
					padding-top: 19px;
				}
			}

			&__filters {
				width: 91.2%;
				margin-top: 31px;
				padding:11px 0px 10px 10px;
			}

			.filters {
				&__filter {
					line-height: 21px;
				}
			}

			&__list {
				width: 91.2%;
			}

			.item {
				&__block {
					&:nth-child(1) {
						.item {
							&__img {
								&:after {
									padding-top: 64.5%;
								}
							}

							&__info {
								padding-top: 11px;
							}
						}
					}

					&:nth-child(2) {
						.item {
							&__img {
								&:after {
									padding-top: 64.5%;
								}
							}

							&__info {
								padding-top: 11px;
							}
						}
					}

					&:nth-child(3n) {
						padding-bottom: 25px;
						.item {
							&__img {
								&:after {
									padding-top: 130.1%;
								}
							}
						}
					}
				}

				
				&__img {
					&:after {
						padding-top: 64.5%;
					}
				}

				&__info {
					padding-top: 11px;
				}
			}
		}
	}

	.can-hover {
		.cases {
			

			.filters {
				&__filter {
					&:hover {
						// opacity: 1;
						
						.filters {
							&__line {
								&:nth-child(1) {
									transition: opacity .5s ease;
									opacity: 0;
								}

								&:nth-child(2) {
									visibility: visible;
									transition: transform 1s ease, visibility 0s step-start;
									transform: translate3d(0, 0, 1px) rotate(0.001deg);
								}
							}
						}
					}
				}
			}
		}
	}


	@media screen and (min-width: 1200px) {
		.item {
			&__img {
				&:hover {
					filter: grayscale(0);

					&:after {
						opacity: .7;
					}
					
				}

				&:hover {
					// .item__img:after {
					// 	opacity: 1;
					// }

					.item__hover {
						opacity: 1;
						visibility: visible;
						z-index: 1;
						// transition: opacity 0s linear;
						transition: opacity 0s linear, z-index 0s step-start, visibility 0s step-start;
					}

					.item__hover:before {
						transform: translate3d(100%, 0, 1px);
						transition: transform 1s ease;
					}

					.item__word span {
						transform: translate3d(0, 0, 1px) rotate(0.001deg);
						transition: transform 1s ease .7s;
					}

					.item__line {
						transition: transform .5s ease .5s;
						transform: scaleX(1);
					}
				}
			}
		}
	}

</style>