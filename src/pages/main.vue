<template lang="pug">
	div
		main.content(ref="content")
			.main
				.poster
					template(v-if="main.acf && main.acf.poster && getProjectsByIds(main.acf.poster.projects).length")
						slick.slider.slider_no-init.slider_no-effect(:options="slickOptions" ref="slider" @beforeChange="onSlideChange" @init="onSliderInit")
							div.slider__slide(v-for="(slide, index) in getProjectsByIds(main.acf.poster.projects)" :key="index")
								.slider__bg(:style="{backgroundImage: 'url(\"' + (windowW < 450 ? slide.acf.preview.image_1.url : slide.acf.preview.image_3.url) + '\")'}")
								.slider__outer
									.slider__row
										.slider__inner
											.counter
												.counter__current .{{ (index+1) < 10 ? '0' + (index+1) : (index+1) }}
												.counter__divider
												.counter__total {{ getProjectsByIds(main.acf ? main.acf.poster.projects : []).length < 10 ? '0' + getProjectsByIds(main.acf ? main.acf.poster.projects : []).length : getProjectsByIds(main.acf ? main.acf.poster.projects : []).length }}
											.slider__title(:data-cut-lines="slide.title.rendered")
									.slider__row
										.slider__inner
											.slider__text(v-html="slide.acf.content_short")
											router-link.open(data-aos="custom-fade" data-aos-delay="1500" :to="$ml.get('lang_url') + '/cases/' + slide.slug + '/'")
												.open__inner
													.open__word(v-text="$ml.get('main.open')")
													.open__dot
													.open__word(v-text="$ml.get('main.case')")
									.circle
										.circle__line
										router-link.circle__outer(:to="$ml.get('lang_url') + '/cases/' + slide.slug + '/'")
											.circle__inner
												.circle__text
													.circle__span(:data-cut-lines="$ml.get('main.open')")
													.circle__dot
													.circle__span(:data-cut-lines="$ml.get('main.case')")
												.circle__text
													.circle__span(:data-cut-lines="$ml.get('main.open')")
													.circle__dot
													.circle__span(:data-cut-lines="$ml.get('main.case')")
											<svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg">
												<circle class="circle__c1" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.24" fill="none" />
												<circle class="circle__c2" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.5" fill="none" />
											</svg>
					.caption(data-aos="custom-fade" data-aos-delay="500")
						.caption__inner
							.caption__label(v-text="$ml.get('main.next')")
							.caption__titles(v-if="main.acf && getProjectsByIds(main.acf.poster.projects).length")
								.caption__title(v-for="(slide, index) in getProjectsByIds(main.acf.poster.projects)" :key="index" :class="{'caption__title_active': index === (activeSlide + 1 >= count ? 0 : activeSlide + 1)}" :data-cut-lines="slide.title.rendered") {{ slide.title.rendered }}
						.caption__arrows
							button.arrow.arrow_left(aria-label="Previous")
								img(src="@/assets/img/arrow-left-gray.svg" alt="Previous")
								img(src="@/assets/img/arrow-left-white.svg" alt="Previous")
							button.arrow.arrow_right(aria-label="Next")
								img(src="@/assets/img/arrow-right-gray.svg" alt="Next")
								img(src="@/assets/img/arrow-right-white.svg" alt="Next")
					.bottom
						.social(data-aos="custom-fade" data-aos-delay="1000")
							a.social__item(v-if="contacts.acf && contacts.acf.url_facebook" :href="contacts.acf ? contacts.acf.url_facebook : ''" target="_blank" rel="nofollow") .Facebook
							a.social__item(v-if="contacts.acf && contacts.acf.url_instagram" :href="contacts.acf ? contacts.acf.url_instagram : ''" target="_blank" rel="nofollow") .Instagram
							a.social__item(v-if="contacts.acf && contacts.acf.url_behance" :href="contacts.acf ? contacts.acf.url_behance : ''" target="_blank" rel="norefnofollowerrer") .Behance
						.lang(data-aos="custom-fade" data-aos-delay="1500")
							.lang__current(v-text="$ml.get('title')")
							.lang__dropdown
								.lang__item(v-if="$ml.get('lang') != 'en'")
									button.lang__text(@click="changeLang('en')" aria-label="En") En
								.lang__item(v-if="$ml.get('lang') != 'ua'" )
									button.lang__text(@click="changeLang('ua')" aria-label="Ua") Ua
								.lang__item(v-if="$ml.get('lang') != 'ru'")
									button.lang__text(@click="changeLang('ru')" aria-label="Ru") Ru
					router-link.view-all(:to="$ml.get('lang_url') + '/cases/'" data-aos="view-all")
						.view-all__inner
							.view-all__span(v-text="$ml.get('main.view_all_cases')")
							.view-all__span(v-text="$ml.get('main.view_all_cases')")
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
						<defs>
						<filter id="blur">
							<feGaussianBlur id="blur_el" ref="blur" in="SourceGraphic" stdDeviation="0" />
						</filter>
						</defs>
					</svg>
				block-header(:type="2" :isFixed="true")
				block-menu(:type='2')
				block-cookie(v-if="!isCookie" :color="false")
		block-preloader(v-if="!isPreloader")
</template>

<script>

	import blockHeader from '@/blocks/header.vue';
	import Slick from 'vue-slick';
	import {mapState, mapGetters} from 'vuex';
	import blockPreloader from '@/blocks/preloader.vue';
	import blockMenu from '@/blocks/menu.vue';
	import blockCookie from '@/blocks/cookie.vue';
	import AOS from 'aos';

	let blur;
	let slider;
	let request;
	let deviation = 0;
	let step = 3.5;

	function loop() {
		if (deviation >= 30) {
			step = -3.5;
		}

		if (deviation <= 0 && step < 0) {
			cancelAnimationFrame(request);
			deviation = 0;
			step = 3.5;
			blur.setAttribute('stdDeviation', '0, ' + deviation);
			slider.style.transform = 'translate(' + deviation*0.01 + 'px, 0)';
			slider.classList.remove('slider_active');
			return;
		}
		blur.setAttribute('stdDeviation', '0, ' + deviation);
		slider.style.transform = 'translate(' + deviation*0.01 + 'px, 0)';
		deviation += step;

		request = requestAnimationFrame(loop);
	}

	function change() {
		cancelAnimationFrame(request);
		request = requestAnimationFrame(loop);
	}

	let windowW = window.innerWidth;

	export default {
		name: 'Main',
		metaInfo: function() {
			let th = this;

			return {
				title: th.main.yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data: function(){
			return {
				activeSlide: -1,
				count: 0,
				windowW: window.innerWidth,
				slickOptions: {
					fade: true,
					cssEase: 'ease',
					prevArrow: '.arrow_left',
					nextArrow: '.arrow_right',
					autoplay: true,
					autoplaySpeed: 7000,
					speed: 1000,
					pauseOnFocus: false,
					pauseOnHover: false
				}
			}
		},
		mounted() {

			this.check();

			this.$nextTick(() => {
				blur = this.$refs.blur;
			});

			window.addEventListener('resize', this.resizeHandler);
			window.addEventListener('orientationchange', this.resizeHandler);
		},
		created() {
			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');
			if (!this.projects.length) this.$store.dispatch('GET_PROJECTS');

			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE');
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');
			if (!this.team.length) this.$store.dispatch('GET_TEAM');

			
			
		},
		computed: {
			...mapState([
				'main',
				'about',
				'services',
				'categories',
				'positions',
				'projects',
				'team',
				'contacts',
				'projectsPage',
				'isPreloader',
				'isCookie'
			]),
			...mapGetters([
				'getProjectsByIds'
			])
		},
		methods: {
			getTitle() {
				let obj = this.main.yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
			},
			changeLang: (code) => {
				localStorage.setItem('lang', code);
				let currentUrl = window.location.pathname;
				if (code != window.config.langDefault) {
					var langCode = currentUrl.split('/')[1];
					if (langCode == 'ua' || langCode == 'ru' || langCode == 'en') {
						currentUrl = currentUrl.replace('/' + langCode + '/', '/'+code+'/');
					} else {
						currentUrl = '/' + code + currentUrl;
					}
				} else {
					currentUrl = currentUrl.replace('/ua/', '/');
					currentUrl = currentUrl.replace('/ru/', '/');
					currentUrl = currentUrl.replace('/en/', '/');
				}
				window.location.replace(currentUrl);
			},
			onSliderInit() {
				if (!this.isPreloader) {
					this.$nextTick(() => {
						this.$refs.slider.pause();
					});
				} else {
					this.cutLinesOnResize();
					this.$refs.slider.$el.classList.remove('slider_no-effect');
					this.$refs.slider.$el.classList.remove('slider_no-init');
				}
			},
			check() {
				if (!this.main.isEmpty && !this.contacts.isEmpty && this.projects.length) {
					this.count = this.main.acf.poster.projects.length;

					this.$nextTick(() => {
						if (this.$refs.slider && this.isPreloader) {
							this.$refs.content.classList.add('show');
							this.$refs.slider.$el.classList.remove('slider_no-effect');
							this.$refs.slider.$el.classList.remove('slider_no-init');
						}
					});
				}
			},
			onSlideChange(event, slick, currentSlide, nextSlide) {
				this.activeSlide = nextSlide;
				slider = this.$refs.slider.$el;
				slider.classList.add('slider_active');
				change();
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
			resizeHandler() {
				let newWindowW = window.innerWidth;
				this.windowW = newWindowW;
				if (newWindowW != windowW) {
					window.scrollTo(0, 0);
				}
				setTimeout(() => {
					let newWindowW = window.innerWidth;
					if (newWindowW != windowW) {
						this.cutLinesOnResize();
					}
				}, 1000);
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('orientationchange', this.resizeHandler);
		},
		components: {
			'block-header': blockHeader,
			Slick,
			'block-preloader': blockPreloader,
			'block-menu': blockMenu,
			'block-cookie': blockCookie
		},
		watch: {
			contacts() {
				this.check();
			},
			projects() {
				this.check();
			},
			main() {
				this.check();
			},
			isPreloader() {
				this.cutLinesOnResize();
				AOS.refreshHard();

				this.activeSlide = 0;
				if (this.$refs.slider) {
					this.$refs.slider.play();
					this.$refs.slider.$el.classList.remove('slider_no-init');
					setTimeout(() => {
						this.$refs.content.classList.add('show');
					}, 100);
				}
			}
		}
	}

</script>

<style lang="scss">
	@import '@/assets/sass/ui.scss';
</style>

<style lang="scss" scoped>

	/deep/ .slick-slider {
		height: 100%;
	}

	/deep/ .slick-slide > div {
		height: 100%;
	}

	.slide {
		height: 100%;
	}

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
	

	// html:not(.no-js) .circle [data-aos=title-fade].aos-animate /deep/ > .line > .line {
	// 	transform:translate3d(0,0,1px) rotate(0.001deg);
	// }

	// html:not(.no-js) [data-aos=circle] {
	// 	.circle__line {
	// 		transform-origin: 0 0;
	// 		transform: scaleX(0);
	// 		transition: transform 2s ease;
	// 	}

	// 	.circle__inner {
	// 		opacity: 0;
	// 		transition: opacity 1s ease;
	// 		transition-delay: 1s;
	// 	}

	// 	svg {
	// 		opacity: 0;
	// 		transition: opacity .5s ease;
	// 		transition-delay: .5s;

	// 		.circle__c1 {
	// 			stroke-dasharray: 700;
	// 			stroke-dashoffset: 700;
	// 			transition: stroke-dashoffset 1s ease;
	// 			transition-delay: 1s;
	// 		}
	// 	}
	// }
	// html:not(.no-js) [data-aos=circle].aos-animate{
	// 	.circle__line {
	// 		transform: none;
	// 	}
		
	// 	.circle__inner {
	// 		opacity: 1;
	// 	}

	// 	svg {
	// 		opacity: 1;

	// 		.circle__c1 {
	// 			stroke-dashoffset: 0;
	// 		}
	// 	}
	// }

	html:not(.no-js) [data-aos=open] {
		.open__inner {
			&:before {
				transform: none;
			}
		}
	}


	html:not(.no-js) [data-aos=view-all] {
		.view-all__inner {
			transform: translate3d(0, 32px, 1px) rotate(6deg);
			transition: transform 1s ease 2.5s;
			// opacity: 0;
		}
	}

	html:not(.no-js) [data-aos=view-all].aos-animate{
		.view-all__inner {
			transform: none;
			
			// transition: transform 1s ease 2.5s, opacity 1s ease 2.5s;
			// opacity: 1;
		}

		@keyframes fade {
			from {
				transform: translate3d(0, 32px, 1px) rotate(6deg);
			}

			to {
				transform: translate3d(0, 3px, 1px) rotate(0.001deg);
			}
		}

		&:after {
			transform: none;
		}
	}

	html:not(.no-js) [data-aos=view-all].aos-final {
		.view-all__inner {
			transform: translate3d(0, 32px, 1px) rotate(6deg);
			transition: transform .6s ease 0s !important;
			// opacity: 0;
		}
	}

	

	

	.main {
		// overflow: scroll;
		// overflow: hidden;
		background-color: #1C1C1C;
	}

	.open {
		display: none;
	}

	.view-all {
		display: block;
		position: absolute;
		top: calc(50% - 18px);
		right: 0;
		padding-right: 29px;
		font: 700 11px/1 'Fatum', Arial, Helvetica, sans-serif;
		color: #fff;
		text-transform: uppercase;
		letter-spacing: 3px;
		padding-bottom: 4px;
		z-index: 1;
		height: 17px;
		overflow: hidden;
		padding-top: 3px;

		&:after {
			content: "";
			display: block;
			width: 100%;
			height: 1px;
			background-color: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			transform: scaleX(0);
			transition: transform 1s ease 2s;
			transform-origin: 0 0;
		}

		&__span {
			margin-top: -3px;

			&:nth-child(1) {
				transform: translate3d(0, 3px, 1px) rotate(0.001deg);

			}

			&:nth-child(2) {
				position: absolute;
				top: 3px;
				left: 0;
				transform: translate3d(0, 32px, 1px) rotate(6deg);
			}
		}

		@media screen and (min-width: 1200px) {
			&:hover {
				.view-all__span {

					&:nth-child(1) {
						transition: opacity .5s ease;
						opacity: 0;
					}

					&:nth-child(2) {
						transition: transform 1s ease;
						transform: translate3d(0, 3px, 1px) rotate(0.001deg);
					}
				}
			}
		}
	}

	.social {
		margin-right: 50px;
		display: inline-block;
		vertical-align: bottom;
		font-size: 14px;
		line-height: 1;
		color: #fff;
		opacity: .9;

		&__item {
			margin-left: 33px;
			
			@media screen and (min-width: 1200px) {
				transition: opacity .5s ease;

				&:hover {
					opacity: .5;
				}
			}

			&:first-child {
				margin-left: 0;
			}
		}
	}

	.bottom {
		position: absolute;
		right: 66px;
		bottom: 42px;
		z-index: 1;
	}

	.lang {
		font-size: 14px;
		line-height: 1;
		color: #fff;
		opacity: .9;
		display: inline-block;
		vertical-align: bottom;
		padding: 0 10px;
		margin-right: -10px;
		margin-left: -10px;
		position: relative;
		cursor: default;

		&__item {
			overflow: hidden;
			padding: 0 10px;
			margin: 8px 0;
		}

		&__text {
			transform: translate3d(0, 20px, 1px) rotate(10deg);
			transform-origin: 0 0;
			transition: transform 1s ease, opacity .5s ease;
			display: block;
			color: inherit;

			@media screen and (min-width: 1200px) {
				&:hover {
					opacity: .5;
				}
			}
		}

		&__dropdown {
			position: absolute;
			bottom: 100%;
			left: 0;
			width: 100%;
			padding-bottom: 2px;
			// background: #fff;
		}

		&:hover {
			.lang__text {
				transform: translate3d(0, 0, 1px) rotate(0.001deg);
			}
		}
	}

	.circle {
		height: 222px;
		margin-top: -111px;
		margin-bottom: -111px;
		position: absolute;
		top: calc(50% - 2px);
		left: 0;
		width: 100%;
		opacity: 0;
		transition: opacity .5s ease;

		&__line {
			height: 1px;
			background-color: rgba(#fff, .2);
			margin-top: 111px;
			transform-origin: 0 0;
			transform: scaleX(0);

			&:before {
				content: "";
				display: block;
				width: 1px;
				height: 1px;
				background: #EFEEEB;
				margin-left: 177px;
				transition: opacity .5s ease 2.5s;
				opacity: 0;
			}
		}

		&__c1 {
			stroke-dasharray: 700;
			stroke-dashoffset: 700;
		}

		&__inner {
			display: inline-block;
			vertical-align: middle;
		}

		svg {
			width: 222px;
			height: 222px;
			transform: rotate(180deg);
			position: absolute;
			top: 0;
			left: 0;

			.circle__c2 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset 1s ease;
			}
		}

		&__dot {
			width: 1px;
			height: 1px;
			// background-color: #EFEEEB;
			margin: 7px auto 7px;
		}

		&__span {
			font-size: 13px;
			font-weight: 700;
			letter-spacing: 4px;
			text-transform: uppercase;
			color: #fff;
			// display: none;
		}

		&__text {
			height: 47px;

			&:nth-child(1) {
				/deep/ .circle__span {
					> .line {
						overflow: hidden;

						> .line {
							transform: translate3d(0, 30px, 1px) rotate(6deg);
							opacity: 0;
							transition: transform 0 ease .5s, opacity .5s;
						}
					}
				}
			}

			&:nth-child(2) {
				margin-top: -47px;

				/deep/ .circle__span {
					> .line {
						overflow: hidden;

						> .line {
							transform: translate3d(0, 30px, 1px) rotate(6deg);
							visibility: hidden;
						}
					}
				}
			}

			// &:nth-child(1) {
			// 	/deep/ .circle__span {
			// 		> .line {
			// 			overflow: hidden;

			// 			> .line {
							
			// 				// transform: translate3d(0, 100%, 1px) rotate(6deg);
			// 				// transform: translate3d(0, 25px, 1px) rotate(6deg);
			// 				transform: translate3d(0, 0px, 1px) rotate(0.001deg);
			// 				will-change: transform;
			// 			}
			// 		}
			// 	}

			// 	.circle__dot {
			// 		opacity: 0;
			// 	}
			// }

			// &:nth-child(2) {
			// 	margin-top: -47px;

			// 	/deep/ .circle__span {
			// 		// opacity: 0;
			// 		> .line {
			// 			overflow: hidden;

			// 			> .line {
			// 				will-change: transform;
			// 				transform: translate3d(0, 25px, 1px) rotate(6deg); // y 25px
			// 			}
			// 		}
			// 	}

			// 	.circle__dot {
			// 		opacity: 0;
			// 	}
			// }
		}
		
		&__outer {
			margin-left: 66px;
			width: 222px;
			height: 222px;
			display: block;
			position: relative;
			text-align: center;
			margin-top: -111px;

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}

			@media screen and (min-width: 1200px) {
				&:hover {
					svg {
						.circle__c2 {
							stroke-dashoffset: 0;
						}
					}

					.circle__text {
						transition: opacity .5s ease;
						
						&:nth-child(1) {
							opacity: 0 !important;
						}

						&:nth-child(2) {
							/deep/ .circle__span {
								> .line > .line {
									opacity: 1;
									transition: transform 1.2s ease, visibility 0s step-start;
									transform: translate3d(0, 0, 1px) rotate(0.001deg);
									visibility: visible;
								}
							}
						}
					}
				}
			}
		}
	}

	// /deep/ .swiper-slide-active .circle__text:nth-child(1) {
	// 	opacity: 1;
	// }

	// .slider /deep/ .swiper-slide-active .circle__text:nth-child(1) .circle__span {
	// 	display: none;
	// }

	// .swiper-slide-active .circle__text:nth-child(1) .circle__span {
	// 	display: none;
	// }

	// /deep/ .swiper-slide-active .circle__text:nth-child(1) .circle__span > .line > .line {
	// 	transition: transform 1.2s ease, visibility 0s step-start;
	// 	transform:translate3d(0,0,1px) rotate(0.001deg);
	// }

	.counter {
		font-size: 10px;
		line-height: 1;
		letter-spacing: 3px;
		color: #fff;
		margin-left: 6px;
		margin-bottom: 24px;
		opacity: 0;
		transition: opacity .5s ease 1.5s;
		position: relative;

		&__current {
			display: inline-block;
			vertical-align: middle;
		}

		&__total {
			display: inline-block;
			vertical-align: middle;
			opacity: .35;
		}

		&__divider {
			display: inline-block;
			vertical-align: middle;
			height: 1px;
			width: 41px;
			background-color: rgba(#F0EFED, .2);
			margin: -3px 6px 0;
		}
	}

	.arrow {
		height: 30px;
		width: 64px;
		margin-right: 14px;

		@media screen and (min-width: 1200px) {
			transition: opacity .5s ease, transform .5s ease;

			&:hover {
				opacity: .5;

				&.arrow_left {
					transform: translate(-5px, 0);
				}

				&.arrow_right {
					transform: translate(5px, 0);
				}
			}
		}

		&:last-child {
			margin-right: 0;
		}

		img {
			width: 64px;

			&:nth-child(2) {
				display: none;
			}
		}
	}

	.caption {
		position: absolute;
		bottom: 9px;
		left: 9px;
		background-color: #F5F5F3;
		width: 653px;
		height: 133px;
		z-index: 1;
		padding: 0 58px;
		font-size: 0;

		&__titles {
			position: relative;
			height: 26px;
			overflow: hidden;
			width: 100%;
		}

		&__arrows {
			display: inline-block;
			vertical-align: middle;
			width: 205px;
			padding-left: 63px;
		}

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}
		
		&__inner {
			display: inline-block;
			vertical-align: middle;
			max-width: 332px;
			width: 100%;
		}

		&__label {
			color: #363636;
			font-size: 10px;
			letter-spacing: 4px;
			text-transform: uppercase;
			margin-bottom: 10px;
		}

		&__title {
			font: 700 26px/1 'Avanti', Arial, Helvetica, sans-serif;
			color: #1C1C1C;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: absolute;
			top: 0;
			left: 0;
			transition: opacity .5s ease, transform 0s linear .5s;
			transform: translate3d(0, 30px, 1px) rotate(10deg);
			transform-origin: 0 0;
			opacity: 0;

			&_active {
				opacity: 1;
				transform: translate3d(0, 0, 1px) rotate(0.001deg);
				transition: opacity 0s ease, transform 1s ease .5s;
			}
		}
	}

	.slider {
		height: 100%;
		width: 100%;
		opacity: 0;

		&__slide {
			height: 100%;
		}
		
		&_active {
			filter: url('#blur');
		}

		&.slick-initialized {
			opacity: 1;
		}

		/deep/ &__title {
			font: 700 113px/1 'Avanti', Arial, Helvetica, sans-serif;
			color: #fff;
			max-width: 600px;
			margin-bottom: 20px;

			>.line {
				overflow: hidden;

				> .line {
					transform-origin: 0 0;
					opacity: 0;
					will-change: transform;
					transform: translate3d(0, 120%, 1px) rotate(8deg);
				}

				&:nth-child(1) {
					> .line {
						transition: transform 0s linear 1s, opacity .5s ease 1s;
					}
				}

				&:nth-child(2) {
					> .line {
						transition: transform 0s linear 1s, opacity .5s ease 1s;
					}
				}
			}
		}

		&_no-effect {
			/deep/ .slider__bg {
				transform: scale(1.5) !important;
				filter: blur(7px) !important;
			}
		}

		&_no-init {

			/deep/ .counter {
				opacity: 0 !important;
			}

			/deep/ .slider__title {
				>.line {

					> .line {
						opacity: 0 !important;
						transform: translate3d(0, 100%, 1px) rotate(8deg) !important;
					}
				}
			}

			/deep/ .circle {
				&__text:nth-child(1) {
					.line > .line {
						transition: none !important;
						opacity: 0 !important;
						transform: translate3d(0, 25px, 1px) rotate(8deg) !important;
					}
				}
				
				&__text:nth-child(2) {
					.line > .line {
						transition: none !important;
						opacity: 0 !important;
						transform: translate3d(0, 25px, 1px) rotate(8deg) !important;
					}
				}

				&__line {
					transform: scaleX(0) !important;

					&:before {
						opacity: 0 !important;
						// transition: opacity .5s ease 2.5s;
					}
				}

				svg {
					.circle__c1 {
						stroke-dashoffset: 700 !important;
					}
				}

				
			}

			/deep/ .slider__text {
				transform:translate3d(0,30px,1px) scaleY(1.3) rotate(1deg) !important;
				opacity: 0 !important;
			}
		}

		&__text {
			color: #fff;
			font-size: 18px;
			line-height: 28px;
			max-width: 427px;
			margin-top: 25px;
			margin-left: 9px;

			transition: opacity .5s ease .5s, transform 0s ease 1s;
			transform:translate3d(0,30px,1px) scaleY(1.3) rotate(1deg);
			opacity: 0;
			transform-origin:0 0;
		}

		&__row {
			display: table-row;
			width: 100%;
			height: 50%;

			&:nth-child(1) {
				.slider__inner {
					vertical-align: bottom;
				}
			}

			&:nth-child(2) {
				.slider__inner {
					vertical-align: top;
				}
			}
		}

		&__inner {
			display: table-cell;
			padding-left: 17.5%;
		}

		&__outer {
			height: 100%;
			// margin-top: calc(var(--vh, 1vh) * -100);
			display: table;
			width: 100%;
			position: relative;
			z-index: 2;
		}

		&__bg {
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-size: cover;
			background-position: center;
			transform: scale(1.7);
			// filter: blur(4px);
			transition: transform 1s ease, filter .5s ease;

			&:before { 
				content: "";
				position: absolute;
				display: block;
				height: 100%;
				width: 100%;
				top: 0;
				left: 0;
				background: url('../assets/img/1.png') no-repeat center center;
				background-size: cover;
				mix-blend-mode: color-dodge;
			}

			&:after {
				content: "";
				display: block;
				height: 100%;
				width: 100%;
				background-color: rgba(0,0,0, .15);
				// margin-top: -100vh;
			}
		}
	}
	
	/deep/ .slick-current {
		z-index: 1;

		.slider__bg {
			transform: scale(1) rotate(0.001deg);
			// filter: blur(0px);
		}

		.slider__title {

			> .line {
				&:nth-child(1) {
					> .line {
						transition: opacity 0s linear, transform 1s ease 1s;
					}
				}

				&:nth-child(2) {
					> .line {
						transition: opacity 0s linear, transform 1s ease 1.1s;
					}
				}
			}

			> .line > .line {
				// transition: opacity 0s linear, transform 1s ease .5s;
				transform: translate3d(0, 0, 1px) rotate(0.001deg);
				opacity: 1;
			}
		}

		.slider__text {
			transform: translate3d(0, 0, 1px) rotate(0.001deg);
			opacity: 1;
			transition: transform 1s ease 1s, opacity 1s ease 1.5s;
		}

		.circle {
			opacity: 1;
			transition: opacity 0s ease;
		}

		.circle__line {
			transform: none;
			transition: transform 2s ease 1.5s;

			&:before {
				transition: opacity .5s ease 3.5s;
				opacity: 1;
			}
		}
		
		.circle__inner {
			opacity: 1;
		}

		// .circle {

		// 	/deep/ .circle__text:nth-child(1) {
		// 		opacity: 1;
		// 		.line > .line {
		// 			transform: translate3d(0, 0, 1px) rotate(0.001deg);
		// 			transition: transform 1s ease 1s, opacity .5s ease;
		// 		}
		// 	}

		// 	// /deep/ .circle__text:nth-child(2) { // .circle__dot
		// 	// 	opacity: 1;
		// 	// 	transition: opacity .5s ease 1s;
		// 	// 	// .line > .line {
		// 	// 	// 	transform: translate3d(0, 0, 1px) rotate(0.001deg);
		// 	// 	// 	transition: transform 1s ease 1s, opacity .5s ease;
		// 	// 	// }
		// 	// }
		// }

		svg {
			opacity: 1;

			.circle__c1 {
				stroke-dashoffset: 0;
				transition: stroke-dashoffset 1s ease;
				transition-delay: 2.5s;
			}
		}

		.open__word {
			transform: translate3d(0, 0, 1px) rotate(0.001deg);
		}

		.open__dot {
			transform: translate3d(0, 0, 1px) rotate(0.001deg);
		}

		.open__inner {
			&:before {
				transform: none;
			}
		}

		.counter {
			opacity: 1;
		}

		.circle__text:nth-child(1) .circle__span > .line > .line {
			transition: transform 1.2s ease 2.3s, opacity 0s linear 2.3s;
			opacity: 1;
			transform:translate3d(0,0,1px) rotate(0.001deg);
		}
	}

	.poster {
		height: 100vh;
		height: calc(var(--vh, 1vh) * 100);
		background-color: #1C1C1C;
		position: relative;

		&__cover {
			transform: scale(1.7);
			filter: blur(5px);
			transition: transform 1s ease, filter 1s ease, visibility 1s step-end;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-size: cover;
			background-position: center;
			visibility: visible;

			&_active {
				transform: scale(1);
				filter: blur(0);
				visibility: hidden;
			}
		}

		&__cover2 {
			transform: scale(1.5);
			filter: blur(0);
			transition: transform 1s ease, filter 1s ease, visibility 1s step-end, opacity 1s ease;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-size: cover;
			background-position: center;
			visibility: visible;
			opacity: 1;

			&_active {
				transform: scale(1);
				filter: blur(5px);
				visibility: hidden;
				opacity: 0;
			}
		}
	}

	.effect {
		display: block;
		width: 100%;
		height: 100vh;
		will-change: transform;
		margin-top: -100vh;
		transform: scale(1.2);
		// opacity: 0 !important;
	}

	.effect2 {
		display: block;
		width: 100%;
		height: 100vh;
		will-change: transform;
		transform: scale(1);
		// opacity: 0 !important;
	}

	@media screen and (max-width: 1200px) {
		.slider {
			&__inner {
				padding-left: 78px;
				padding-right: 50px;
			}
		}

		.circle {
			&__outer {
				float: right;
				margin-right: -29px;
			}

			&__line {
				&:before {
					margin-right: 83px;
					margin-left: auto;
					float: right;
				}
			}
		}

		.view-all {
			right: auto;
			padding-right: 0;
			left: 0;
			padding-left: 88px;
			top: auto;
			bottom: 201px;
		}

		.caption {
			width: 631px;
			padding: 0 68px;
			padding-right: 63px;

			&__inner {
				max-width: 295px;
			}
		}

		.social {
			display: none;
		}

		.lang {
			display: none;
		}
	}

	@media screen and (max-width: 650px) {
		.circle {
			height: 0;
			margin-top: 0;

			&__line {
				margin-top: 0;

				&:before {
					display: none;
				}
			}

			&__outer {
				display: none;
			}
		}

		.slider {
			&__title {
				font-size: 58px;
				text-align: center;
				width: 100%;
				max-width: none;
				line-height: 48px;
				margin-bottom: 14px;

				/deep/ > .line {
					&:first-child {
						padding-top: 10px;
					}

					&:last-child {
						padding-bottom: 10px;
					}
				}
			}

			&__inner {
				padding-left: 28px;
				padding-right: 28px;
			}

			&__text {
				text-align: center;
				margin-left: auto;
				margin-top: 18px;
				line-height: 26px;
			}

			&__bg {
				&:before {
					background-image: url('../assets/img/main_mob.png');
				}

				&:after {
					background-color: rgba(0, 0, 0, 0.5);
				}
			}
		}

		.counter {
			text-align: center;
			margin-left: auto;
		}

		.view-all {
			display: none;
		}

		.arrow {

			margin-right: 0;

			img {
				display: none;
				width: 50px;

				&:nth-child(2) {
					display: block;
				}
			}
		}

		.caption {
			background: none;
			height: auto;
			padding-left: 20px;
			padding-right: 20px;
			padding-bottom: 6px;
			width: 100%;

			&__inner {
				max-width: 215px;
			}

			&__arrows {
				padding-left: 12px;
				position: relative;
				top: 10px;
				width: auto;
				float: right;
				text-align: right;
				padding-right: 2px;
			}

			&__label {
				color: #fff;
				font-size: 8px;
				letter-spacing: 3px;
				margin-bottom: 2px;
			}

			&__title {
				color: #fff;
				font-size: 18px;
			}
		}

		.open {
			display: block;
			text-align: center;
			margin-top: 17px;

			&__inner {
				display: inline-block;
				white-space: nowrap;
				padding-bottom: 2px;
				position: relative;
				overflow: hidden;

				&:before {
					content: "";
					display: block;
					position: absolute;
					width: 100%;
					height: 1px;
					background-color: #fff;
					bottom: 0;
					left: 0;
					transform: scaleX(0);
					transition: transform 1s ease 1s;
					transform-origin: 0 0;
				}
			}

			&__word {
				font: 700 11px/1 'Fatum', Arial, Helvetica, sans-serif;
				color: #fff;
				text-transform: uppercase;
				letter-spacing: 3px;
				display: inline-block;
				vertical-align: middle;
				transform: translate3d(0, 25px, 1px) rotate(8deg);
				transition: transform 1s ease 1.5s;
			}

			&__dot {
				display: inline-block;
				vertical-align: middle;
				width: 1px;
				height: 1px;
				background-color: #fff;
				margin: -3px 7px 0 5px;
				transform: translate3d(0, 25px, 1px) rotate(8deg);
				transition: transform 1s ease 1.5s;
			}
		}
	}

	@media screen and (max-width: 400px) {
		.caption {
			padding-left: 13px;
			padding-bottom: 2px;

			&__arrows {
				padding-left: 0px;
				top: 12px;
			}
		}

		.slider {
			&__inner {
				padding-left: 22px;
				padding-right: 22px;
			}
		}

		.arrow {
			width: 54px;

			img {
				width: 43px;
			}
		}
	}

	@media screen and (max-width: 350px) {
		.slider {
			&__inner {
				padding-left: 13px;
				padding-right: 13px;
			}

			&__row {
				&:nth-child(1) {
					height: 54%;
				}

				&:nth-child(2) {
					height: 46%;
				}
			}

			&__text {
				line-height: 23px;
				font-size: 17px;
				margin-top: 16px;
				padding: 0 10px;
			}
		}

		.circle {
			margin: 0;
			height: 0;
			top: 54%;

			&__line {
				margin-top: 0;
			}
		}

		.counter {
			margin-bottom: 4px;

			&__divider {
				width: 30px;
			}
		}

		.open {
			margin-top: 15px;
		}

		.caption {
			padding-left: 5px;
			padding-bottom: 0;
			bottom: 7px;

			&__inner {
				max-width: 195px;
			}

			&__arrows {
				top: 14px;
				text-align: right;
			}
		}

		.arrow {
			width: 38px;
			height: 25px;
			margin-left: 10px;

			&:first-child {
				margin-left: 0;
			}

			img {
				width: 100%;
			}
		}
	}
</style>