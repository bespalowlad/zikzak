<template lang="pug">
div
	main.content(ref="content")
		.content__wrapper
			.content__year(data-aos="custom-fade") {{ page.acf ? page.acf.year : '' }}
			.content__ct
				.content__title(:data-cut-lines="page.title ? page.title.rendered : ''" data-aos="title-fade")
				.content__cols(data-aos="custom-fade" data-aos-delay="300")
					.content__col
						.item
							.item__param {{ $ml.get('case.customer') }}
							.item__val {{ page.acf ? page.acf.customer : '' }}
						.item
							.item__param {{ $ml.get('case.size') }}
							.item__val {{ page.acf ? page.acf.square : '' }} {{ $ml.get('cases.sq_m') }}
					.content__col
						.item(v-if="page.acf && page.acf.location")
							.item__param {{ $ml.get('case.location') }}
							.item__val {{ page.acf ? page.acf.location : '' }}
						.item(v-if="page.acf && page.acf.status")
							.item__param {{ $ml.get('case.status') }}
							.item__val {{ page.acf ? page.acf.status : '' }}
				.share.share_top(data-aos="custom-fade" data-aos-delay="300")
					.share__label {{ $ml.get('case.share') }}:
					a.share__item(target="_blank" rel="nofollow" :href="encodeURI('https://www.facebook.com/sharer/sharer.php?u=' + url)")
						img(src="@/assets/img/fb.svg" alt="Facebook share")
					a.share__item(target="_blank" rel="nofollow" :href="encodeURI('https://twitter.com/intent/tweet?url=' + url + '&text=' + (page.title ? page.title.rendered : ''))")
						img(src="@/assets/img/tw.svg" alt="Twitter share")
		.img(:style="{backgroundImage: 'url(\"' + (page.acf ? page.acf.image_4.url : '') + '\")'}" data-aos="custom-fade" data-aos-delay="500")
		.text(data-aos="custom-fade" v-html="page.acf ? page.acf.content : ''")
		.gallery
			.card(v-for="(card, index) in page.acf ? page.acf.photos : []" :class="{'card_size_2': card.acf_fc_layout === 'type_2'}")
				template(v-if="card.acf_fc_layout === 'type_1'")
					.card__img(:style="{backgroundImage: 'url(\"' + card.image.url + '\")'}" data-aos="custom-fade")
				template(v-if="card.acf_fc_layout === 'type_2'")
					.card__img(:style="{backgroundImage: 'url(\"' + card.image_left.url + '\")'}" data-aos="custom-fade")
					.card__img(:style="{backgroundImage: 'url(\"' + card.image_right.url + '\")'}" data-aos="custom-fade" :data-aos-delay="width() > 1200 ? 200 : 0")
				template(v-if="card.acf_fc_layout === 'type_3'")
					.text(data-aos="custom-fade" v-html="card.text")
				template(v-if="card.acf_fc_layout === 'type_4'")
					.vr(data-aos="custom-fade" :id="'vr'+index" :data-image="card.image360")
		.share(data-aos="custom-fade")
			.share__label {{ $ml.get('case.share') }}:
			a.share__item(target="_blank" rel="nofollow" :href="encodeURI('https://www.facebook.com/sharer/sharer.php?u=' + url)")
				img(src="@/assets/img/fb.svg" alt="Facebook share")
			a.share__item(target="_blank" rel="nofollow" :href="encodeURI('https://twitter.com/intent/tweet?url=' + url + '&text=' + (page.title ? page.title.rendered : ''))")
				img(src="@/assets/img/tw.svg" alt="Twitter share")
		button.calc-block(:style="{backgroundImage: 'url(\"' + (page.acf ? page.acf.image_4.url : '') + '\")'}" data-aos="custom-fade" @click="openModal" aria-label="Find out the cost")
			.calc-block__content
				.calc-block__title(:data-cut-lines="$ml.get('case.calculate')" data-aos="title-fade")
				button.calc-block__btn(aria-label="Find out the cost")
					.calc-block__border
						.calc-block__label {{ $ml.get('case.find_out') }} {{ $ml.get('case.the_cost') }}
						img.calc-block__icon(src="@/assets/img/plus.svg" alt="Icon plus")
		.next(:style="{backgroundImage: 'url(\"' + (next.acf ? next.acf.image_4.url : '') + '\")'}" data-aos="custom-fade")
			.next__content(data-aos="circle")
				.next__label {{ $ml.get('main.next') }}
				.next__line
				.next__row
					.next__col
					.next__col
						.next__title(:data-cut-lines="next.title ? next.title.rendered : ''" data-aos="title-fade") {{ next.title ? next.title.rendered : '' }}
						.next__line.next__line_mobile
						.next__sq {{ next.acf ? next.acf.square : '' }} {{ $ml.get('cases.sq_m') }}
					.next__col
						router-link.circle.next__circle(:to="$ml.get('lang_url') + '/cases/' + next.slug + '/'")
							.circle__inner
								.circle__text
									.circle__span(:data-cut-lines="$ml.get('main.open')" data-aos="title-fade" data-aos-delay="1000")
									.circle__dot
									.circle__span(:data-cut-lines="$ml.get('main.case')" data-aos="title-fade" data-aos-delay="1000")
								.circle__text
									.circle__span(:data-cut-lines="$ml.get('main.open')")
									.circle__dot
									.circle__span(:data-cut-lines="$ml.get('main.case')")
							<svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<circle class="circle__c1" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.09" fill="none" />
								<circle class="circle__c2" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.5" fill="none" />
							</svg>
						router-link.circle.circle_mobile(:to="$ml.get('lang_url') + '/cases/' + next.slug + '/'")
							.circle__inner
								.circle__span {{ $ml.get('main.open') }}
								.circle__dot
								.circle__span {{ $ml.get('main.case') }}
		router-link.back(:to="$ml.get('lang_url') + '/cases/'" ref="back")
			.back__overflow
				.back__text <img class="back__img" src="@/assets/img/back.svg" alt="Back"> {{ $ml.get('case.back') }}
				.back__text <img class="back__img" src="@/assets/img/back.svg" alt="Back"> {{ $ml.get('case.back') }}
		block-footer
		calc-modal
		block-cookie(v-if="!isCookie")
		block-header
		block-menu
	block-preloader(v-if="!isPreloader")
</template>

<script>

	import blockHeader from '@/blocks/header.vue';
	import blockFooter from '@/blocks/footer.vue';
	import Calc from '@/blocks/calc.vue';
	import {mapState, mapGetters} from 'vuex';
	import AOS from 'aos';
	import BlockPreloader from '@/blocks/preloader.vue';
	import blockMenu from '@/blocks/menu.vue';
	import blockCookie from '@/blocks/cookie.vue';

	let request;
	let isFixed = false;
	let docH;
	let windowH = window.innerHeight;
	let windowW = window.innerWidth;
	let btn;
	let bottomEl;
	let offset;
	let isRuning;
	// let deltaY = 0;
	// let blur;
	// let c;

	function loop() {
		docH = document.body.clientHeight;
		if (window.scrollY >= docH - offset - windowH + 9 && isFixed) {
			isFixed = false;
			btn.classList.add('back_static');
			btn.classList.remove('back_fixed');
		}
		if (window.scrollY < docH - offset - windowH + 9 && !isFixed) {
			isFixed = true;
			btn.classList.remove('back_static');
			btn.classList.add('back_fixed');
		}
		request = requestAnimationFrame(loop);

		// blur.setAttribute('stdDeviation', '0, ' + deltaY/100);
		// document.body.style.transform = 'translate(0, ' + deltaY*0.01 + 'px)';
	}

	export default {
		name: 'One-case',
		metaInfo: function() {
			let th = this;

			return {
				title: th.page.yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data: function(){
			return {
				url: window.location.href,
				page: {
					isEmpty: true
				},
				next: {}
			}
		},
		created() {
			if (!this.projects.length) {
				this.$store.dispatch('GET_PROJECTS');
			} else {
				this.page = this.getProjectBySlug(this.$route.params.slug);
				this.next = this.getNextProject(this.$route.params.slug);
			}

			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');

			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE');
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');
			if (!this.team.length) this.$store.dispatch('GET_TEAM');
		},
		computed: {
			...mapState([
				'projects',
				'main',
				'contacts',
				'about',
				'services',
				'categories',
				'positions',
				'team',
				'projectsPage',
				'isCookie',
				'isPreloader'
			]),
			...mapGetters([
				'getProjectBySlug',
				'getNextProject'
			])
		},
		mounted() {
			if( !(matchMedia('(hover: none)').matches) ) {
				document.body.classList.add('can-hover');
			}
			this.start();

			window.addEventListener('resize', this.resizeHandler);
			window.addEventListener('orientationchange', this.resizeHandler);

		},
		methods: {
			getTitle() {
				let obj = this.page.yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
			},
			start() {
				if (!this.projects.length) return;

				this.page = this.getProjectBySlug(this.$route.params.slug);
				this.next = this.getNextProject(this.$route.params.slug);
				this.$nextTick(() => {

					this.cutLinesOnResize();

					if (window.innerWidth > 1200) {
						// btn = document.querySelector('.back');
						// bottomEl = document.querySelector('.next');
						btn = this.$refs.back.$el;
						bottomEl = document.querySelector('.next');
						docH = document.body.clientHeight;
						windowH = window.innerHeight;
						windowW = window.innerWidth;
						offset = bottomEl.offsetHeight + 90;
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
					}
					// AOS.refreshHard();

					this.$refs.content.classList.add('show');


					let vrs = document.querySelectorAll('.vr');
					for (let i = 0; i < vrs.length; i++) {
						let e = vrs[i];
						let id = e.getAttribute('id');
						let img = e.getAttribute('data-image');
						new VRView.Player('#'+id, {
							// image: img,
							image: 'https://ribs.pro/zikzak/test_new_360.jpg',
							// poster: img,
							poster: 'https://ribs.pro/zikzak/test_new_360.jpg',
							is_stereo: false,
							is_vr_off: true
						});
					}

				});
			},
			openModal() {
				this.$store.commit('SET_MODALCALC', true);
			},
			width() {
				return window.innerWidth;
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
				if (newWindowW != windowW) {
					window.scrollTo(0, 0);
				}
				setTimeout(() => {
					let newWindowW = window.innerWidth;
					if (newWindowW != windowW) {
						this.cutLinesOnResize();
					}
					// btn = document.querySelector('.back');
					btn = this.$refs.back.$el;
					bottomEl = document.querySelector('.next');
					docH = document.body.clientHeight;
					windowH = window.innerHeight;
					windowW = newWindowW;
					offset = bottomEl.offsetHeight + 90;
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
		components: {
			'block-header': blockHeader,
			'block-footer': blockFooter,
			'block-preloader': BlockPreloader,
			'block-menu': blockMenu,
			'block-cookie': blockCookie,
			'calc-modal': Calc
		},
		beforeDestroy() {
			cancelAnimationFrame(request);
			isRuning = null;
			isFixed = false;
			btn.classList.remove('back_fixed');
			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('orientationchange', this.resizeHandler);
		},
		watch: {
			projects() {
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
		}
	}

</script>

<style lang="scss" scoped>

	.share {
		text-align: center;
		margin-top: 21px;

		&__label {
			display: inline-block;
			vertical-align: top;
			font-size: 11px;
			letter-spacing: 3px;
			text-transform: uppercase;
			margin-right: -6px;
		}

		&__item {
			display: inline-block;
			vertical-align: top;
			margin-left: 26px;
			
			@media screen and (min-width: 1200px) {
				transition: opacity .5s ease;

				&:hover {
					opacity: .7;
				}
			}
		}

		&_top {
			float: right;
			margin-top: -38px;
			margin-right: 94px;
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

	html:not(.no-js) .circle [data-aos=title-fade].aos-animate /deep/ > .line > .line {
		transform:translate3d(0,0,1px) rotate(0.001deg);
	}

	html:not(.no-js) [data-aos=circle] {
		.next__line {
			transform-origin: 0 0;
			transform: scaleX(0);
			transition: transform 2s ease;
			transition-delay: .5s;

			&:before {
				opacity: 0;
			}
		}

		// .circle__inner {
		// 	opacity: 0;
		// 	transition: opacity 1s ease;
		// 	transition-delay: 2s;
		// }

		svg {
			opacity: 0;
			transition: opacity .5s ease;
			transition-delay: 1s;

			.circle__c1 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset 1s ease;
				transition-delay: 1s;
			}
		}
	}
	html:not(.no-js) [data-aos=circle].aos-animate{
		.next__line {
			transform: none;

			&:before {
				opacity: 1;
			}
		}
		
		// .circle__inner {
		// 	opacity: 1;
		// }

		svg {
			opacity: 1;

			.circle__c1 {
				stroke-dashoffset: 0;
			}
		}
	}

	.circle {
		display: block;
		font-size: 0;
		position: relative;

		&_mobile {
			display: none;
		}

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
							// will-change: transform;
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
							// will-change: transform;
							opacity: 0;
							transform: translate3d(0, 30px, 1px) rotate(6deg);
							visibility: hidden;
							transition: transform 0s ease, opacity 0s ease, visibility .5s step-end;
						}
					}
				}
			}
		}

		&__dot {
			width: 1px;
			height: 1px;
			// background-color: #EFEEEB;
			margin: 6px auto 8px;
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

	.next {
		height: 469px;
		background-size: cover;
		background-position: center;
		text-align: center;

		&__line {
			background-color: rgba(255, 255, 255, .17);
			height: 1px;

			&:before {
				content: "";
				display: block;
				width: 1px;
				height: 1px;
				background: #EFEEEB;
				float: right;
				margin-right: calc(26.8% - 112px);
				transition: .5s ease 2.5s;
				opacity: 0;
			}

			&_mobile {
				display: none;
			}
		}

		&__circle {
			width: 222px;
			height: 222px;
			// border: 1px solid rgba(255, 255, 255, .17);
			border-radius: 50%;
			margin-top: -111px;
		}

		&__title {
			color: #fff;
			font: 700 34px/1 'Avanti', Arial, Helvetica, sans-serif;
			margin-top: 11px;

			/deep/ .line > .line {
				padding: 2px 0;
			}
		}

		&__sq {
			font-size: 11px;
			line-height: 1;
			letter-spacing: 2px;
			text-transform: uppercase;
			margin-top: 9px;
			color: #fff;
		}

		&__row {
			table-layout: fixed;
			width: 100%;
			text-align: center;
			font-size: 0;
		}

		&__col {
			display: inline-block;
			vertical-align: top;
			width: 26.8%;

			&:nth-child(2) {
				width: 46.4%;
			}
		}

		&__label {
			font-size: 11px;
			color: #fff;
			letter-spacing: 2px;
			text-transform: uppercase;
			margin-top: 201px;
			// border-bottom: 1px solid rgba(255, 255, 255, .17);
			padding-bottom: 17px;
		}

		&__content {
			height: 100%;
			margin-top: -469px;

			&:before {
				content: "";
				display: table;
			}
		}

		&:before {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.45);
		}
	}

	.calc-block {
		height: 303px;
		background-size: cover;
		background-position: center center;
		position: relative;
		max-width: 1600px;
		width: 77.36%;
		margin: 86px auto 90px;
		overflow: hidden;
		display: block;
		text-align: left;

		@media screen and (min-width: 1200px) {
			&:hover {
				.calc-block__border {
					&:after {
						transition: transform .5s ease;
						transform: scaleX(0);
					}

					&:before {
						transform: scaleX(1);
						transition: transform .5s ease .5s;
					}
				}
			}
		}

		&__border {
			position: relative;
			display: inline-block;
			padding-bottom: 4px;
			margin-bottom: -1px;
			margin-left: 9px;

			&:after {
				content: "";
				display: block;
				position: absolute;
				background: rgba(#1C1C1C, .62);
				height: 1px;
				width: 100%;
				bottom: 0;
				left: 0;
				transform-origin: 100% 0;
			}

			&:before {
				content: "";
				display: block;
				position: absolute;
				background: rgba(#1C1C1C, .62);
				height: 1px;
				width: 100%;
				bottom: 0;
				left: 0;
				transform-origin: 0 0;
				transform: scaleX(0)
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

		&__btn {
			position: absolute;
			top: 0;
			left: 29px;
			transform: rotate(-90deg) translateX(-100%);
			transform-origin: 0 0;
			width: 303px;
			font-size: 11px;
			font-weight: 700;
			letter-spacing: 3px;
			text-transform: uppercase;
			white-space: nowrap;
			border-bottom: 1px solid rgba(0,0,0,.09);
			// height: 50px;

			// &:after {
			// 	content: "";
			// 	display: block;
			// 	position: absolute;
			// 	width: 100%;
			// 	height: 1px;
			// 	background-color: rgba(0,0,0,.09);
			// 	bottom: 16px;
			// 	left: 0;
			// }

			
		}

		&__title {
			font: 700 34px/38px 'Avanti', Arial, Helvetica, sans-serif;
			display: inline-block;
			vertical-align: middle;
			// width: calc(100% - 180px);
			width: calc(100% - 160px);
			margin-left: 118px;
		}

		&:before {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.02);
		}

		&__content {
			background-color: rgba(255, 255 ,255, .94);
			height: 100%;
			width: 490px;
			margin-top: -303px;
			
			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}
		}

		&__dot {
			width: 1px;
			height: 1px;
			background-color: #EFEEEB;
			margin: 6px auto 8px;
		}

		&__span {
			font-size: 13px;
			font-weight: 700;
			letter-spacing: 4px;
			text-transform: uppercase;
			color: #fff;
		}

		
	}

	.gallery {
		width: 77.36%;
		margin: 75px auto 0;
		max-width: 90%;
	}

	.card {
		font-size: 0;
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}

		&__img {
			width: 100%;
			background-size: cover;
			background-position: center;

			&:before {
				content: "";
				display: block;
				padding-top: 57.18%;
			}
		}

		.vr {
			position: relative;
			background: #1C1C1C;

			&:before {
				content: "";
				display: block;
				padding-top: 57.18%;
			}

			/deep/ iframe {
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				position: absolute;
			}
		}

		&_size_2 {
			.card__img {
				width: calc(50% - 10px);
				display: inline-block;
				vertical-align: top;

				&:before {
					padding-top: 135.2%;
				}

				&:nth-child(2) {
					margin-left: 20px;
				}
			}
		}
	}

	.back {
		position: fixed;
		bottom: 9px;
		left: 9px;
		width: 131px;
		height: 60px;
		background-color: rgba(#fff, .96);
		white-space: nowrap;
		text-align: center;
		display: block;

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}

		&_static {
			position: absolute;
			bottom: 500px;
		}

		&_fixed {
			position: fixed;
			bottom: 9px !important;
		}

		&__img {
			display: inline-block;
			vertical-align: middle;
			margin-top: -2px;
			margin-right: 4px;
		}

		&__overflow {
			overflow: hidden;
			display: inline-block;
			vertical-align: middle;
			margin-right: 5px;
			margin-top: 2px;
		}

		&__text {
			font-size: 11px;
			letter-spacing: 3px;
			text-transform: uppercase;
			display: block;

			&:nth-child(1) {
				transform: translate3d(0, 0, 1px) rotate(0.001deg);
			}

			&:nth-child(2) {
				margin-top: -16px;
				transform: translate3d(0, 30px, 1px) rotate(12deg);
				visibility: hidden;
			}
		}

		@media screen and (min-width: 1200px) {
			&:hover {
				.back__text {
					&:nth-child(1) {
						opacity: 0;
						transition: opacity .5s ease;
					}

					&:nth-child(2) {
						transform: translate3d(0, 0, 1px) rotate(0.001deg);
						transition: transform 1.2s ease;
						visibility: visible;
					}
				}
			}
		}
	}

	.text {
		max-width: 620px;
		margin: 76px auto 75px;
		font-size: 16px;

		/deep/ h6,
		/deep/ b,
		/deep/ strong {
			margin: 0;
			font: 700 18px/28px 'Avanti', Arial, Helvetica, sans-serif;
			max-width: 85%;
		}

		/deep/ p {
			line-height: 26px;
			color: rgba(#1C1C1C, .6);
			margin: 12px 0;
			font-size: inherit;
		}

	}

	.img {
		width: 100%;
		padding-top: 41.8%;
		background-size: cover;
		background-position: center;
		margin-top: 97px;
		margin-bottom: 77px;
	}

	.item {
		margin-bottom: 22px;

		&__param {
			font-weight: 700;
			font-size: 11px;
			letter-spacing: 2px;
			text-transform: uppercase;
		}

		&__val {
			margin-top: 4px;
			font-size: 14px;
			color: rgba(#1C1C1C, .6);
		}
	}

	.content {
		padding-top: 150px;
		position: relative;

		&__cols {
			margin-top: 31px;
			padding-left: 2px;
		}

		&__col {
			display: inline-block;
			vertical-align: top;
			margin-right: 56px;

			&:last-child {
				margin-right: 0;
			}
		}

		&__ct {
			width: calc(100% - 100px);
		}

		&__year {
			width: 97px;
			font-size: 11px;
			letter-spacing: 2px;
			padding-top: 2px;
			line-height: 16px;
		}

		&__ct,
		&__year {
			display: inline-block;
			vertical-align: top;
		}

		&__wrapper {
			padding: 0 66px;
		}

		&__title {
			font: 700 54px/48px 'Avanti', Arial, Helvetica, sans-serif;
			line-height: 1;
			max-width: 80%;
			margin-top: -7px;

			/deep/ .line > .line {
				padding: 4px 0;
			}
		}

		&__content {
			// max-width: 1600px;
			// margin: auto;
		}
	}

	@media screen and (max-width: 1200px) {

		.share {
			&_top {
				margin-right: 0;
			}
		}

		.back {
			width: 106px;
			height: 50px;
			bottom: 8px;
			left: 8px;
			display: none;

			&__text {
				font-size: 9px;
			}
		}

		.next {
			height: 357px;

			&__col {
				width: 34.5%;

				&:nth-child(2) {
					width: 31%;
				}
			}

			&__sq {
				font-size: 9px;
			}

			&__title {
				font-size: 26px;
				margin-top: 12px;
			}

			&__label {
				font-size: 9px;
				margin-top: 111px;
				padding-bottom: 10px;
			}

			&__content {
				margin-top: -357px;
			}

			&__line {
				&:before {
					margin-right: calc(34.5% - 112px);
				}
			}
		}

		.calc-block {
			max-width: none;
			width: calc(100% - 62px);
			margin: 58px auto 63px;
			height: 261px;

			&__btn {
				width: 261px;
				left: 26px;
			}

			&__content {
				margin-top: -261px;
				width: 367px;
			}

			&__title {
				margin-left: 86px;
				font-size: 26px;
				line-height: 27px;
				width: calc(100% - 140px);
			}
		}

		.card {
			margin-bottom: 14px;

			/deep/ .text {
				padding-left: 0;
				padding-right: 0;
				// max-width: 100%;
				margin-left: 0;
			}
			
			&_size_2 {
				.card__img {
					width: calc(50% - 7px);

					&:nth-child(2) {
						margin-left: 14px;
					}
				}
			}
		}

		.gallery {
			max-width: none;
			width: calc(100% - 62px);
			margin: 53px auto 58px;
		}

		.text {
			margin-left: 31px;
			margin-top: 51px;
			margin-bottom: 53px;

			/deep/ p {
				margin: 14px 0;
			}
		}

		.img {
			margin-top: 35px;
			margin-bottom: 35px;
		}

		.content {
			padding-top: 122px;

			&__year {
				display: block;
				width: 100%;
				padding-top: 0;
				font-size: 9px;
			}

			&__ct {
				display: block;
				width: 100%;
			}

			&__wrapper {
				padding: 0 31px;
			}

			&__title {
				max-width: 100%;
				font-size: 32px;
				line-height: 34px;
				margin-top: 4px;
			}

			&__cols {
				margin-top: 25px;
				margin-left: 0;
				padding-left: 0;
			}
		}
	}

	@media screen and (max-width: 650px) {

		.share {
			&_top {
				float: none;
				margin-top: 0;
				text-align: left;
				margin-bottom: 20px;
			}

			&__label {
				font-size: 9px;
				letter-spacing: 2px;
			}
		}

		.circle {
			width: auto;
			height: auto;
			margin: auto;
			display: inline-block;
			border: none;
			border-bottom: 1px solid rgba(#F5F5F3, .81);
			border-radius: 0;
			margin-top: 15px;
			padding-bottom: 2px;
			display: none;

			&_mobile {
				width: auto;
				height: auto;
				margin: auto;
				display: inline-block;
				border: none;
				border-bottom: 1px solid rgba(#F5F5F3, .81);
				border-radius: 0;
				margin-top: 15px;
				// padding-bottom: 0px;

				.circle__span {
					display: inline-block;
					vertical-align: top;
					font-size: 11px;
					letter-spacing: 3px;
				}

				.circle__dot {
					display: inline-block;
					vertical-align: top;
					margin-left: 4px;
					margin-right: 8px;
					margin-top: 7px;
				}
			}

			&__span {
				display: inline-block;
				vertical-align: top;
				font-size: 11px;
				letter-spacing: 3px;
			}

			&__dot {
				display: inline-block;
				vertical-align: top;
				margin-left: 4px;
				margin-right: 8px;
				margin-top: 7px;
				background-color: #fff;
			}
		}

		.circle {
			&__text {
				height: auto;

				&:nth-child(2) {
					display: none;
				}
			}

			svg {
				display: none;
			}
		}

		.next {
			height: 334px;

			&__sq {
				margin-top: 13px;
			}

			&__line {
				display: none;

				&:before {
					display: none;
				}

				&_mobile {
					display: block;
				}
			}

			&__title {
				margin-top: 6px;
				// border-bottom: 1px solid rgba(255, 255, 255, .17);
				padding: 0 28px 8px;
			}

			&__col {
				&:nth-child(1) {
					display: none;
				}

				&:nth-child(2) {
					width: 100%;
					display: block;
				}

				&:nth-child(3) {
					display: block;
					width: 100%;
				}
			}

			&__label {
				margin-top: 59px;
				border-bottom: none;
				padding-bottom: 0;
			}

			&__content {
				margin-top: -334px;
			}
		}

		.calc-block {
			width: calc(100% - 56px);
			background: none !important;
			height: auto;
			margin: 42px auto 56px;

			&__icon {
				margin-left: 2px;
				margin-top: -2px;
			}

			&__border {
				margin-left: 0;
				margin-bottom: 0;
			}

			&__btn {
				position: static;
				transform: none;
				margin-top: 18px;
				border-bottom: none;
				height: auto;
				left: 0;
				margin-left: auto;
				margin-right: auto;
				max-width: 100%;

				&:after {
					display: none;
				}
			}

			&__title {
				margin-left: 0;
				width: 100%;
				line-height: 29px;
			}

			&:before {
				display: none;
			}

			&__content {
				margin-top: 0;
				background: none;
				width: 100%;
				text-align: center;
				padding: 0 10%;

				&:before {
					display: none;
				}
			}
		}

		.card {
			&_size_2 {
				.card__img {
					width: 100%;
					margin-bottom: 14px;

					&:nth-child(2) {
						margin-left: 0;
						margin-bottom: 0;
					}
				}
			}
		}

		.gallery {
			margin: 34px auto;
			width: calc(100% - 56px);
		}

		.text {
			margin-top: 33px;
			margin-bottom: 34px;
			width: 100%;
			margin-left: 0;
			padding: 0 28px;

			&__title {
				max-width: 100%;
				line-height: 26px;
			}

			&__text {
				/deep/ p {
					margin: 17px 0;
				}
			}
		}

		.img {
			margin: 14px 0 33px;
			padding-top: 59.5%;
		}

		.content {
			padding-top: 88px;

			&__col {
				margin-right: 38px;
			}

			&__cols {
				margin-top: 32px;
			}

			&__wrapper {
				padding: 0 28px;
			}

			&__title {
				max-width: 85%;
				line-height: 31px;
				margin-top: 6px;
			}
		}
	}

	@media screen and (max-width: 400px) {

		.next {
			height: 319px;

			&__sq {
				margin-top: 8px;
			}

			&__title {
				padding: 0 28px 4px;
			}

			&__content {
				margin-top: -319px;
			}

			&__label {
				margin-top: 52px;
			}
		}

		.calc-block {
			margin-bottom: 52px;
		}

		.card {

			&__img {
				&:before {
					padding-top: 56.8%;
				}
			}

			.vr {
				&:before {
					padding-top: 56.8%;
				}
			}

			&_size_2 {
				.card__img {
					&:before {
						padding-top: 135%;
					}
				}
			}
		}

		.gallery {
			width: calc(100% - 44px);
			margin: 31px auto;
		}

		.text {
			padding: 0 22px;
			margin-top: 42px;
			margin-bottom: 31px;

			&__text {
				/deep/ p {
					margin: 15px 0;
				}
			}

			&__title {
				line-height: 25px;
			}
		}

		.img {
			margin-top: 20px;
			padding-top: 54.2%;
			margin-bottom: 42px;
		}

		.content {
			padding-top: 93px;

			&__cols {
				margin-top: 25px;
			}

			&__title {
				margin-top: 9px;
			}

			&__wrapper {
				padding: 0 22px;
			}
		}
	}

	@media screen and (max-width: 350px) {

		.next {
			height: 283px;

			&__label {
				margin-top: 41px;
			}

			&__content {
				margin-top: -283px;
			}
		}

		.calc-block {
			margin: 37px auto 41px;

			&__content {
				padding: 0;
			}
		}

		.card {
			margin-bottom: 11px;

			&_size_2 {
				.card__img {
					margin-bottom: 11px;
				}
			}
		}

		.gallery {
			width: calc(100% - 28px);
			margin: 28px auto;
		}

		.text {
			margin-top: 37px;
			margin-bottom: 28px;
			padding: 0 14px;
		}

		.img {
			margin-top: 12px;
			margin-bottom: 37px;
		}

		.item {
			&:last-child {
				margin-bottom: 20px;
			}
		}

		.content {
			padding-top: 92px;

			&__cols {
				margin-top: 28px;
				margin-bottom: 14px;
			}

			&__title {
				margin-top: 9px;
			}

			&__wrapper {
				padding: 0 14px;
			}
		}
	}

</style>