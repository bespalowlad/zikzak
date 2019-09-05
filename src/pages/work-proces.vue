<template lang="pug">
div
	main.content(ref="content")
		block-header
		block-menu
		.proces
			.services
				.services__wrapper
					.services__title(data-aos="title-fade" :data-cut-lines="what_we_do.title")
					.services__list
						.services__section(v-for="(row, index) in what_we_do.block" :key="index" data-aos="custom-fade" data-aos-delay="300")
							.services__header {{ row.title }}
							.services__text(v-if="mobile")
								.services__col
									ul.services__items
										li.services__item(v-for="(item, i) in row.col1" :key="i" v-text="item.item")
								.services__col
									ul.services__items
										li.services__item(v-for="(item, i) in row.col2" :key="i" v-text="item.item")
								.services__col
									ul.services__items
										li.services__item(v-for="(item, i) in row.col3" :key="i" v-text="item.item")

							.services__mobile-slider(v-else)
								slick.slider-list(v-if="what_we_do.block && what_we_do.block.length" ref="mobileSlick" :options="mobileSlickOptions")
									.services__col
										ul.services__items
											li.services__item(v-for="(item, i) in row.col1" :key="i" v-text="item.item")
									.services__col
										ul.services__items
											li.services__item(v-for="(item, i) in row.col2" :key="i" v-text="item.item")
									.services__col
										ul.services__items
											li.services__item(v-for="(item, i) in row.col3" :key="i" v-text="item.item")

				.steps
					.steps__title(data-aos="title-fade" :data-cut-lines="steps.title")
					.steps__wrapper
						.steps__slider
							slick.slider(v-if="steps.slider && steps.slider.length" ref="slick" :options="slickOptions" data-aos="custom-fade")
								.slider__slide(v-for="(slide, index) in steps.slider" :key="index")
									.slider__description
										.slider__counter.counter(data-aos="fade")
											.counter__curr-slide .{{ index < 10 ? '0'+(index+1) : (index+1) }}
											.counter__separator
											.counter__count-slide {{ steps.slider.length < 10 ? '0'+steps.slider.length : steps.slider.length }}
										.slider__project(data-aos="custom-fade" data-aos-delay="300") {{ slide.title }}
										.slider__text(data-aos="custom-fade" data-aos-delay="600") {{ slide.description }}
									.slider__img
										.slider__effect(:style="{backgroundImage: 'url(\"' + slide.photo + '\")'}")
				.find-out(:style="{backgroundImage: 'url(\"' + require('@/assets/uploads/find-out-bg.jpg') + '\")'}" data-aos="custom-fade")
					.find-out__content
						.find-out__wrapper
							.find-out__title( data-aos="title-fade" data-aos-delay="500" :data-cut-lines="$ml.get('case.calculate')" )
							.find-out__circle( data-aos="circle")
								.find-out__line
								button.circle(type="button" @click="openModal" aria-label="Find out the cost")
									.circle__inner
										.circle__text
											.circle__span(:data-cut-lines="$ml.get('case.find_out')" data-aos="title-fade" data-aos-delay="1000")
											.circle__dot
											.circle__span(:data-cut-lines="$ml.get('case.the_cost')" data-aos="title-fade" data-aos-delay="1000")
										.circle__text
											.circle__span(:data-cut-lines="$ml.get('case.find_out')")
											.circle__dot
											.circle__span(:data-cut-lines="$ml.get('case.the_cost')")
									<svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg">
										<circle class="circle__c1" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.2" fill="none" />
										<circle class="circle__c2" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.5" fill="none" />
									</svg>
							.find-out__mob
								.find-out__line
								button.find-out__btn(type="button" @click="openModal" data-aos="fade" data-aos-delay="700" aria-label="Find out the cost")
									span {{ $ml.get('case.find_out') }}
									.find-out__dot
									span {{ $ml.get('case.the_cost') }}
		block-footer
		calc-modal
		block-cookie(v-if="!isCookie")
	block-preloader(v-if="!isPreloader")
</template>

<script>
	import blockHeader from '@/blocks/header.vue';
	import blockFooter from '@/blocks/footer.vue';

	import Slick from 'vue-slick';

	import {mapState} from 'vuex';
	import Calc from '@/blocks/calc.vue';
	import AOS from 'aos';
	import BlockPreloader from '@/blocks/preloader.vue';
	import blockMenu from '@/blocks/menu.vue';
	import blockCookie from '@/blocks/cookie.vue';

	let windowW = window.innerWidth;

	export default {
		name: 'WorkProces',
		metaInfo: function() {
			let th = this;

			return {
				title: th.services.yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data() {
			return {
				slickOptions: {
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: false,
					fade: true,
					prevArrow: '<button type="button" class="slick-prev"><div class="slick-arrow__image"></div></button>',
					nextArrow: '<button type="button" class="slick-next"><div class="slick-arrow__image"></div></button>'
				},
				mobile: document.documentElement.clientWidth > 640,
				mobileSlickOptions: {
					slidesToShow: 2,
					slidesToScroll: 1,
					autoplay: false,
					infinite: true,
					responsive: [
						{
							breakpoint: 375,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
							} 
						}
					]
				},
				what_we_do: {},
				steps: {}
			}
		},
		components: {
			'block-header': blockHeader,
			'block-footer': blockFooter,
			'block-preloader': BlockPreloader,
			'block-menu': blockMenu,
			'block-cookie': blockCookie,
			Slick,
			'calc-modal': Calc
		},
		created() {
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE')
			else {
				this.what_we_do = this.services.acf.what_we_do;
				this.steps = this.services.acf.steps;
				this.start();
			}

			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');
			if (!this.projects.length) this.$store.dispatch('GET_PROJECTS');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');

			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');
			if (!this.team.length) this.$store.dispatch('GET_TEAM');
		},
		mounted() {

			window.addEventListener('resize', this.resizeHandler);
			window.addEventListener('orientationchange', this.resizeHandler);
		},
		computed: {
			...mapState([
				'services',
				'main',
				'contacts',
				'projects',
				'about',
				'categories',
				'positions',
				'team',
				'projectsPage',
				'isCookie',
				'isPreloader'
			])
		},
		methods: {
			getTitle() {
				let obj = this.services.yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
			},
			openModal() {
				this.$store.commit('SET_MODALCALC', true);
			},
			start() {
				this.$nextTick(() => {
					this.cutLinesOnResize();
					this.$refs.content.classList.add('show');
				});
			},
			detectedDevice() {
				if(document.documentElement.clientWidth > 640) { 
					this.mobile = true;
				} else {
					this.mobile = false;
					this.reInit();
				}
			},

			reInit() {
				this.$nextTick(() => {
					try {
						this.$refs.mobileSlick.reSlick();
					} catch (err) {

					}
				})
			},
			cutLines() {
				let els = document.querySelectorAll('[data-cut-lines]:not(.aos-init)');
				for (let i = 0; i < els.length; i++) {
					let el = els[i];
					el.innerHTML = el.getAttribute('data-cut-lines');
					var instance = new SplitType(el, {split: 'lines'});
					for (let a = 0; a < instance.lines.length; a++) {
						let e = instance.lines[a];
						let ins = new SplitType(e, {split: 'lines'});
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
						let ins = new SplitType(e, {split: 'lines'});
					}
				}
			},
			resizeHandler() {
				this.detectedDevice();
				let newWindowW = window.innerWidth;
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
		watch: {
			services() {
				this.what_we_do = this.services.acf.what_we_do;
				this.steps = this.services.acf.steps;
				this.start();
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
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('orientationchange', this.resizeHandler);
		}
	}
</script>

<style lang="scss" scoped>

	html:not(.no-js) .slider[data-aos=custom-fade] {
		/deep/ .slick-arrow {
			opacity: 0;
			transform: translate3d(0, 30px, 1px);
			transition: opacity 1s ease 2s, transform 1s ease 2s;
		}
	}

	html:not(.no-js) .slider[data-aos=custom-fade].aos-animate {
		/deep/ .slick-arrow {
			opacity: 1;
			transform: none;
		}
	}

	html:not(.no-js) .circle [data-aos=title-fade].aos-animate /deep/ > .line > .line {
		transform:translate3d(0,0,1px) rotate(0.001deg);
	}

	html:not(.no-js) [data-aos=circle] {
		.find-out__line {
			transform-origin: 0 0;
			transform: scaleX(0);
			transition: transform 2s ease;
			transition-delay: 1s;

			&:before {
				opacity: 0;
			}
		}

		.circle__inner {
			opacity: 0;
			transition: opacity 1s ease;
			transition-delay: 2s;
		}

		svg {
			opacity: 0;
			transition: opacity .5s ease;
			transition-delay: 1s;

			.circle__c1 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset 1s ease;
				transition-delay: 1.5s;
			}
		}
	}
	html:not(.no-js) [data-aos=circle].aos-animate{
		.find-out__line {
			transform: none;

			&:before {
				transition: .5s ease 3s !important;
				opacity: 1;
			}
		}
		
		.circle__inner {
			opacity: 1;
		}

		svg {
			opacity: 1;

			.circle__c1 {
				stroke-dashoffset: 0;
			}
		}
	}

	html:not(.no-js) [data-aos=circle].aos-final {
		.find-out__line {
			transform-origin: 0 0;
			transform: scaleX(0);
			transition: transform .6s ease;
			transition-delay: 0s;
		}

		.circle__inner {
			opacity: 0;
			transition: opacity .6s ease;
			transition-delay: 0s;
		}

		svg {
			opacity: 0;
			transition: opacity .5s ease;
			transition-delay: 0s;

			.circle__c1 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset .6s ease;
				transition-delay: 0s;
			}
		}
	}

	.circle {
		width: 222px;
		height: 222px;
		// margin-top: -111px;
		// margin-bottom: -80px;
		border-radius: 50%;
		// border: 1px solid rgba(#EFEEEB, .09);
		// margin-left: 280px;
		display: block;
		text-align: center;
		position: relative;
		z-index: 1;
		margin: 0 auto;
		margin-top: -111px;

		svg {
			position: absolute;
			top: 0;
			left: 0;
			transform: rotate(180deg);

			.circle__c2 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset 1s ease;
			}
		}

		&__text {
			height: 47px;

			&:nth-child(1) {
				/deep/ .circle__span {
					> .line {
						> .line {
							// transform: translate3d(0, 0, 1px) rotate(0.001deg);
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
							opacity: 0;
							transform: translate3d(0, 30px, 1px) rotate(6deg);
							visibility: hidden;
						}
					}
				}
			}
		}

		&_mobile {
			display: none;
		}

		&__dot {
			width: 1px;
			height: 1px;
			background-color: #EFEEEB;
			margin: 9px auto 9px;
			border-radius: 50%;
		}

		&__span {
			font-size: 13px;
			font-weight: 700;
			letter-spacing: 4px;
			text-transform: uppercase;
			color: #fff;
		}

		&__inner {
			display: inline-block;
			vertical-align: middle;
			padding-left: 5px;
		}

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
						opacity: 0;
					}

					&:nth-child(2) {
						/deep/ .circle__span {
							> .line > .line {
								opacity: 1;
								transition: transform 1.2s ease, opacity 1.2s ease, visibility 0s step-start;
								transform: translate3d(0, 0, 1px) rotate(0.001deg);
								visibility: visible;
							}
						}
					}
				}
			}
		}
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

	.proces {
		margin-top: 145px;
	}

	.services {

		&__wrapper {
			width: 100%;
			max-width: 1600px;
			margin: auto;
			padding-left: 163px;
			padding-bottom: 78px;
		}

		&__title {
			font-family: 'Avanti';
			font-weight: 700;
			font-size: 54px;
			line-height: 59px;
			margin-bottom: 56px;
		}

		&__list {
			display: flex;
			flex-direction: column;

			& > * {
				&:not(:last-child) {
					margin-bottom: 56px;
				}
			}
		}

		&__section {
			&:nth-child(3n) {
				.services__items {
					padding-right: 21px;
				}

				.services__item {
					margin-bottom: 5px;
				}
			}
		}

		&__header {
			font-family: 'Fatum';
			font-weight: 700;
			font-size: 14px;
			line-height: 22px;
			letter-spacing: 1px;
			text-transform: uppercase;
			padding-bottom: 14px;
			margin-bottom: 18px;
			border-bottom: 1px solid #DEDEDE;
			opacity: 0.8;
		}

		&__text {
			display: flex;
			align-items: flex-start;
		}

		&__col {
			width: 33%;
			// max-width: 306px;
			max-width: 23.96%;
			margin-right: 44px;

			&:nth-child(2n) {
				margin-right: 12px;
			}
		}

		&__item {
			margin-bottom: 8px;
			font-family: 'Fatum';
			font-size: 14px;
			line-height: 22px;
			opacity: 0.6;
		}
	}

	.steps {

		&__wrapper {
			width: 100%;
			max-width: 1600px;
			margin: auto;
			padding: 0 0 90px 90px;
		}
		
		&__title {
			font-family: 'Avanti';
			font-weight: 700;
			font-size: 54px;
			line-height: 53px;
			text-align: center;
			margin-bottom: 61px;
		}
	}

	.slider {
		
		&__slide {
			display: flex !important;
			align-items: flex-start;
		}

		&__img {
			height: 474px;
			width: calc(100% - 575px);
			overflow: hidden;
		}

		&__effect {
			width: 100%;
			height: 100%;
			background-position: center;
			background-size: cover;
			transform: scale(1.4);
			filter: blur(4px);
			transition: transform 1s ease, filter .5s ease;
			will-change: transform;
		}

		&__description {
			background-color: #fff;
			width: 575px;
			height: 411px;
			padding: 43px 0 0 75px;
			margin-top: 20px;
		}

		&__project {
			font-family: 'Avanti';
			font-weight: 700;
			font-size: 26px;
			margin-bottom: 21px;
		}

		&__text {
			font-family: 'Fatum';
			font-size: 16px;
			line-height: 26px;
			max-width: 90%;
			color: rgba(28, 28, 28, 0.6);
		}
		
		/deep/ .slick-arrow {
			font-size: 0;
			height: 15px;
			width: 59px;
			position: absolute;
			z-index: 1;
			bottom: 94px;

			&__image {
				transition: .5s opacity ease, transform .5s ease;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				width: 100%;
				height: 100%;
			}

			@media screen and (min-width: 1200px) {
				&:hover {
					
					.slick-arrow__image {
						opacity: 0.6;
					}

					&.slick-prev {
						.slick-arrow__image {
							transform: translate(-5px, 0);
						}
					}

					&.slick-next {
						.slick-arrow__image {
							transform: translate(5px, 0);
						}
					}
				}
			}
		}

		/deep/ .slick-next {
			.slick-arrow__image {
				background-image: url('../assets/img/arrow-right-gray.svg');
			}

			left: 147px;
		}

		/deep/ .slick-prev {
			.slick-arrow__image {
				background-image: url('../assets/img/arrow-left-gray.svg');
			}
			left: 73px;
		}
	}

	.slider {
		/deep/ .slick-current {
			.slider__effect {
				transform: scale(1);
				filter: blur(0px);
			}
		}
	}

	.counter {
		display: flex;
		align-items: center;
		font-family: 'Fatum';
		font-size: 10px;
		line-height: 21px;
		letter-spacing: 3px;
		text-transform: uppercase;
		margin-bottom: 33px;

		&__curr-slide {
			margin-right: 4px;
		}

		&__separator {
			height: 1px;
			width: 41px;
			background: rgba(28, 28, 28, 0.07);
			margin-bottom: 3px;
		}

		&__count-slide {
			margin-left: 4px;
			opacity: 0.35;
		}
	}

	.find-out {
		height: 449px;
		background-size: cover;
		background-position: center;
		text-align: center;

		&__title {
			color: #fff;
			font: 700 34px/37px 'Avanti', Arial, Helvetica, sans-serif;
			max-width: 320px;
			margin: 0 auto;

			margin-top: 0px;
			margin-bottom: 70px;
		}

		&__sq {
			font-size: 11px;
			line-height: 1;
			letter-spacing: 2px;
			text-transform: uppercase;
			margin-top: 11px;
			margin-left: 6px;
			color: #fff;
			font-family: 'Fatum';
			font-weight: 700;
			font-size: 11px;
			line-height: 25px;
			text-align: center;
			letter-spacing: 3px;
			text-transform: uppercase;
			padding-bottom: 4px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.65);

			span {
				margin-right: 10px;
			}
		}

		&__row {
			table-layout: fixed;
			width: 100%;
			text-align: center;
			font-size: 0;
			margin-top: 148px;
		}

		&__col {
			display: inline-block;
			vertical-align: top;
			width: 20%;

			&:nth-child(2) {
				width: 46.4%;
			}
		}

		&__content {
			height: 100%;
			margin-top: -460px;
			position: relative;

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}
		}

		&__wrapper {
			display: inline-block;
			vertical-align: middle;
			width: 100%;
			padding-bottom: 10px;
		}

		&__circle {
			position: relative;
		}

		&__line {
			width: calc(100% + 54px);
			height: 1px;
			background-color: rgba(#DEDEDE, 0.2);
			margin-top: 0;
			// margin-left: -54px;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translate(0, -50%);

			// &:before {
			// 	content: "";
			// 	display: block;
			// 	width: 1px;
			// 	height: 1px;
			// 	background: #EFEEEB;
			// 	opacity: 0;
			// 	position: absolute;
			// 	left: 446px;
			// 	top: 0;
			// }
		}

		&:before {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			// background-color: rgba(0,0,0,.45);
			background: url('../assets/img/open_case.png'), rgba(0, 0, 0, 0.12);
			background-size: cover, cover;
			background-position: center, center;
		}

		&__btn {
			width: auto;
			margin: 0 auto;
			padding: 10px 0;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 3px;
			text-transform: uppercase;
			white-space: nowrap;
			display: none;
			position: relative;
			// border-bottom: 1px solid rgba(0,0,0,.09);
			&:after {
				content: "";
				display: block;
				position: absolute;
				background: rgba(#fff, .62);
				height: 1px;
				width: 100%;
				bottom: 4px;
				left: 0;
				transform-origin: 100% 0;
			}

			&:before {
				content: "";
				display: block;
				position: absolute;
				background: rgba(#fff, .62);
				height: 1px;
				width: 100%;
				bottom: 4px;
				left: 0;
				transform-origin: 0 0;
				transform: scaleX(0)
			}

			span {
				display: inline-block;
				vertical-align: middle;
			}
		}

		&__icon {
			margin-left: 10px;
			margin-top: -1px;
		}

		&__label,
		&__icon {
			display: inline-block;
			vertical-align: middle;
		}

		&__label {
			color: #fff;
		}

		&__mob {
			display: none;
		}
	}

	@media screen and (max-width: 1200px) {
		.proces {
			margin-top: 136px;
		}

		.services {

			&__wrapper {
				padding: 0 0 34px 31px;
			}

			&__title {
				font-size: 40px;
				line-height: 42px;
				margin-bottom: 30px;
			}

			&__header {
				padding-bottom: 12px;
				margin-bottom: 11px;
			}

			&__list {

				& > * {
					&:not(:last-child) {
						margin-bottom: 23px;
					}
				}
			}

			&__col {
				margin-right: 42px;
				// max-width: none;
				max-width: 28.08%;

				&:nth-child(2n) {
					margin-right: 43px;
				}

				&:last-child {
					margin-right: 0;
				}
			}

			&__section {
				&:nth-child(3n) {

					.services__col {
						&:last-child {
							.services__items {
								padding-right: 25px;
							}
						}
					}
					.services__items {
						padding-right: 44px;
					}

					.services__item {
						margin-bottom: 8px;
					}
				}
			}
		}

		.steps {

			&__wrapper {
				padding: 0 31px 65px 31px;
			}

			&__title {
				font-size: 40px;
				line-height: 42px;
				margin-bottom: 42px;
				padding-right: 8px;
				text-align: center;
			}

			&__slider {
				width: calc(100% + 31px);
			}
		}

		.slider {

			&__description {
				margin-top: 14px;
				width: 395px;
				padding: 42px 41px 112px 42px;
				height: auto;
				min-height: 460px;
				// min-height: 411px;
				height: 460px;
			}

			&__img {
				width: calc(100% - 395px);
				height: 426px;
			}

			&__counter {
				margin-bottom: 23px;
			}

			&__project {
				font-size: 18px;
				padding-left: 2px;
				margin-bottom: 18px;
			}

			&__text {
				padding-left: 4px;
			}

			/deep/ .slick-arrow {
				bottom: 16px;
			}

			/deep/ .slick-next {
				left: 117px;
			}

			/deep/ .slick-prev {
				left: 44px;
			}
		}

		.counter {

			&__count-slide {
				margin-left: 10px;
			}
		}

		.find-out {
			height: 341px;

			&__row {
				margin-top: 98px;
			}

			&__col {
				width: 37%;
			}

			&__content {
				margin-top: -341px;
			}

			&__wrapper {
				padding-bottom: 32px;
			}

			&__title {
				font-size: 26px;
				line-height: 28px;
				// margin-bottom: 10px;
				// margin-top: 0;
				max-width: 250px;
				margin-top: 38px;
				margin-bottom: 50px;
			}

			&__icon {
				margin-left: 3px;
			}

			&__sq {
				font-size: 11px;
				line-height: 25px;
				margin-left: 0;

				span {
					margin-right: 2px;
				}
			}
		}

		/deep/ .slick-slide {
			top: auto!important;
			bottom: 0!important
		}

		
	}

	// @media screen and (orientation: landscape) {
	// 	.services {
	// 		&__col {
	// 			max-width: none;
	// 		}
	// 	}
	// }

	@media screen and (max-width: 960px) {
		.services {
			&__col {
				// max-width: 207px;
				max-width: 28.08%;
			}
		}
	}

	@media screen and (max-width: 640px) {
		.proces {
			margin-top: 103px;
		}

		.services {

			&__item {
				padding-right: 20px;
			}

			&__wrapper {
				padding: 0 0 33px 28px;
			}

			&__title {
				font-size: 36px;
				line-height: 38px;
				margin-bottom: 31px;
			}

			&__list {

				& > * {
					&:not(:last-child) {
						margin-bottom: 33px;
					}
				}
			}

			&__section {
				&:nth-child(2n) {
					margin-bottom: 11px;
				}

				&:nth-child(3n) {
					.services__col {
						.services__items {
							padding-right: 42px !important;
						}

						.services__item {
							line-height: 21px;
							margin-bottom: 11px;
						}
					}
				}
			}

			&__header {
				padding-bottom: 10px;
				margin-bottom: 9px;
			}

			&__col {
				max-width: none;
				width: 205px !important;
				
			}

			&__mobile-slider {
				position: relative;

				&:before {
					content: '';
					width: 67px;
					height: 100%;
					background: linear-gradient(270deg, #F5F5F3 8.93%, rgba(245, 245, 243, 0.51) 59%, rgba(245, 245, 243, 0) 106.58%);
					position: absolute;
					z-index: 1;
					top: 0;
					right: 0;
				}
			}
		}

		.slider-list {

			/deep/ .slick-arrow {
				height: 30px;
				width: 34px;
				font-size: 0;
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
				transition: .3s opacity ease;
				position: absolute;
				z-index: 1;
				top: -47px;
			}

			/deep/ .slick-next {
				background-image: url('../assets/img/arrow-left-small.svg');
				right: 28px;
			}

			/deep/ .slick-prev {
				background-image: url('../assets/img/arrow-right-small.svg');
				right: 72px;
			}

			/deep/ .slick-slide {
				// margin: 0 20px;
				margin-right: 38px !important;
			}

			/deep/ .slick-list {
				// margin: 0 -20px;
				margin-right: -38px !important;
			}

			/deep/ .slick-disabled {
				opacity: .4;
				cursor: default;
			}
		}

		.steps {

			&__title {
				font-size: 36px;
				line-height: 38px;
				text-align: left;
				padding-left: 30px;
				margin-bottom: 49px;
			}

			&__wrapper {
				padding: 0 0 0 30px;
				background: #fff;
				padding-top: 25px;
			}

			&__slider {
				width: 100%;
				margin-top: -50px;
			}
		}

		.slider {

			&__slide {
				flex-direction: column;
			}

			&__description {
				width: 100%;
				order: 2;
				margin-top: 0;
				padding: 23px 28px 86px 0;
				height: auto;
			}

			&__img {
				width: 100%;
				order: 1;
				height: 226px;
			}

			&__counter {
				margin-bottom: 14px;
			}

			&__project {
				margin-bottom: 16px;
				padding-left: 0;
			}

			&__text {
				padding-left: 0;
			}

			/deep/ .slick-arrow {
				bottom: 48px;
			}

			/deep/ .slick-next {
				left: 73px;
			}

			/deep/ .slick-prev {
				left: 0;
			}
		}

		.find-out {
			height: 320px;
			background-repeat: no-repeat;
			background-position: right top;

			&__content {
				margin-top: -320px;
			}

			

			&__row {
				margin-top: 62px;
			}

			&__col {
				width: 60%;
			}

			&__title {
				margin-bottom: 12px;
			}

			&__mob {
				display: block;
				position: relative;
			}

			&__btn {
				display: inline-block;
				color: #fff;

				.find-out__dot {
					height: 1px;
					width: 1px;
					background: #EFEEEB;
					border-radius: 50%;
					display: inline-block;
					vertical-align: middle;
					margin: 0 6px;
				}
			}

			&__circle {
				display: none;
			}

			&__wrapper {
				padding-bottom: 130px;
			}

			&__line {
				bottom: 100%;
				top: auto;
			}
		}
	}

	@media screen and (max-width: 375px) {
		.services {

			&__wrapper {
				padding: 0 0 31px 22px;
			}

			&__title {
				margin-bottom: 26px;
			}

			&__list {

				& > * {
					&:not(:last-child) {
						margin-bottom: 29px;
					}
				}
			}

			&__section {
				&:nth-child(2n) {
					margin-bottom: 2px;
				}
			}

			&__col {
				max-width: none;
				width: 205px !important;
			}
		}

		.slider-list {
			/deep/ .slick-next {
				right: 23px;
			}

			/deep/ .slick-prev {
				right: 67px;
			}

			/deep/ .slick-list {
				margin-right: -50px !important;
			}

			/deep/ .slick-slide {
				margin-right: 50px !important;
			}
		}

		.steps {

			&__title {
				padding-left: 23px;
			}

			&__wrapper {
				padding-left: 22px;
			}
		}

		.slider {

			&__img {
				height: 209px;
			}

			&__description {
				padding: 25px 22px 86px 0;
			}
		}

		.find-out {
			height: 308px;

			&__content {
				margin-top: -308px;
			}

			&__row {
				margin-top: 61px;
			}

			&__col {
				width: 70%;
			}

			&__title {
				margin-bottom: 10px;
			}
			
			&__wrapper {
				padding-bottom: 125px;
			}
		}
	}

	@media screen and (max-width: 320px) {
		.services {
			&__wrapper {
				padding: 0 0 33px 14px;
			}

			&__title {
				margin-bottom: 29px;
			}

			&__list {
				& > * {
					&:not(:last-child) {
						margin-bottom: 36px;
					}
				}
			}

			&__section {
				&:nth-child(2n) {
					margin-bottom: 17px;
				}

				&:nth-child(3n) {
					.services__header {
						margin-bottom: 15px;
					}

					.services__item {
						line-height: 21px;
						margin-bottom: 11px;
					}

					/deep/ .slick-arrow {
						top: -53px;
					}
				}
			}

			&__mobile-slider {
				width: calc(100% + 50px);

				&:before {
					right: 50px;
				}
			}
		}

		.slider-list {
			/deep/ .slick-next {
				right: 65px;
			}

			/deep/ .slick-prev {
				right: 109px;
			}
		}

		.steps {

			&__wrapper {
				padding-left: 14px;
			}

			&__title {
				padding-left: 14px;
			}
		}

		.slider {

			&__description {
				padding-bottom: 91px;
				padding: 21px 15px 83px 0;
			}

			&__img {
				height: 180px;
			}

			&__counter {
				margin-bottom: 16px;
			}

			/deep/ .slick-arrow {
				bottom: 44px;
			}
		}

		.find-out {
			height: 301px;

			&__content {
				margin-top: -301px;
			}

			&__row {
				margin-top: 53px;
			}

			&__col {
				width: 78%;
			}
		}
	}
</style>

