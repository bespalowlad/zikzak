<template lang="pug">
	main.content(ref="content")
		.contacts
			.contacts__cell
				.contacts__inner
					.contacts__column
						.contacts__img(:style="{backgroundImage: 'url(\"' + (contacts.acf ? contacts.acf.photo.url : '') + '\")'}" data-aos="custom-fade")
					.contacts__column
						.contacts__title(:data-cut-lines="contacts.acf ? contacts.acf.title : ''" data-aos="title-fade" data-aos-delay="500")
						.contacts__content
							.contacts__row(data-aos="custom-fade" data-aos-delay="700")
								.contacts__col
									.contacts__prop {{ $ml.get('contacts.for_clients') }}
									.contacts__val
										span(v-for="(item, index) in contacts.acf ? contacts.acf.for_clients : []")
											a(:href="(item.item.indexOf('@') > -1 ? 'mailto:' : 'tel:') + item.item") {{ item.item }}
								.contacts__col.contacts__col_desktop
									.contacts__prop {{ $ml.get('contacts.office') }}
									.contacts__val.contacts__val_underline
										span
											a(:href="contacts.acf ? contacts.acf.contacts_address.maps : ''" target="_blank" rel="nofollow") {{ contacts.acf ? contacts.acf.contacts_address.text : '' }}
								.contacts__col.contacts__col_mobile
									.contacts__prop {{ $ml.get('contacts.for_contractors') }}
									.contacts__val
										span(v-for="(item, index) in contacts.acf ? contacts.acf.for_contractors : []")
											a(:href="(item.item.indexOf('@') > -1 ? 'mailto:' : 'tel:') + item.item") {{ item.item }}
							.contacts__maps(data-aos="circle")
								.contacts__line
								a.circle.circle_desktop(:href="contacts.acf ? contacts.acf.contacts_address.maps : ''" target="_blank" rel="nofollow")
									.circle__inner
										.circle__text
											.circle__span(:data-cut-lines="$ml.get('main.open')" data-aos="title-fade" data-aos-delay="2000") {{ $ml.get('main.open') }}
											.circle__dot
											.circle__span(:data-cut-lines="$ml.get('contacts.maps')" data-aos="title-fade" data-aos-delay="2000") {{ $ml.get('contacts.maps') }}
										.circle__text
											.circle__span(:data-cut-lines="$ml.get('main.open')") {{ $ml.get('main.open') }}
											.circle__dot
											.circle__span(:data-cut-lines="$ml.get('contacts.maps')") {{ $ml.get('contacts.maps') }}
									<svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg">
										<circle class="circle__c1" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.09" fill="none" />
										<circle class="circle__c2" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.5" fill="none" />
									</svg>
							.contacts__row(data-aos="custom-fade" data-aos-delay="900")
								.contacts__col.contacts__col_desktop
									.contacts__prop {{ $ml.get('contacts.for_contractors') }}
									.contacts__val
										span(v-for="(item, index) in contacts.acf ? contacts.acf.for_contractors : []")
											a(:href="(item.item.indexOf('@') > -1 ? 'mailto:' : 'tel:') + item.item") {{ item.item }}
								.contacts__col.contacts__col_mobile.contacts__col_full
									.contacts__prop {{ $ml.get('contacts.office') }}
									.contacts__val.contacts__val_underline
										span
											a(:href="contacts.acf ? contacts.acf.contacts_address.maps : ''" target="_blank" rel="nofollow") {{ contacts.acf ? contacts.acf.contacts_address.text : '' }}
								a.circle.circle_mobile(:href="contacts.acf ? contacts.acf.contacts_address.maps : ''" target="_blank" rel="nofollow")
									.circle__inner
										.circle__span {{ $ml.get('main.open') }}
										.circle__dot
										.circle__span {{ $ml.get('contacts.maps') }}
							.social(data-aos="custom-fade" data-aos-delay="1100")
								a.social__link(v-if="contacts.acf && contacts.acf.url_facebook" :href="contacts.acf ? contacts.acf.url_facebook : ''" target="_blank" rel="nofollow") .Facebook
								a.social__link(v-if="contacts.acf && contacts.acf.url_instagram" :href="contacts.acf ? contacts.acf.url_instagram : ''" target="_blank" rel="nofollow") .Instagram
								a.social__link(v-if="contacts.acf && contacts.acf.url_behance" :href="contacts.acf ? contacts.acf.url_behance : ''" target="_blank" rel="nofollow") .Behance
		block-footer(:type='1')
		block-header(:type='1' :isFixed="true")
		block-menu(:type='1')
		block-cookie(v-if="!isCookie" :color="true")
		block-preloader(v-if="!isPreloader")
</template>

<script>

	import blockHeader from '@/blocks/header.vue';
	import blockFooter from '@/blocks/footer.vue';
	import AOS from 'aos';
	import {mapState} from 'vuex';
	import blockPreloader from '@/blocks/preloader.vue';
	import blockMenu from '@/blocks/menu.vue';
	import blockCookie from '@/blocks/cookie.vue';

	let windowW = window.innerWidth;

	export default {
		name: 'Contacts',
		metaInfo: function() {
			let th = this;

			return {
				title: th.contacts.yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data: function(){
			return {
				
			}
		},
		beforeCreate() {
			// document.documentElement.classList.add('black');
		},
		created() {
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');

			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (!this.projects.length) this.$store.dispatch('GET_PROJECTS');

			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE');
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');
			if (!this.team.length) this.$store.dispatch('GET_TEAM');
		},
		computed: {
			...mapState([
				'main',
				'contacts',
				'projects',
				'about',
				'services',
				'categories',
				'positions',
				'team',
				'projectsPage',
				'isCookie',
				'isPreloader'
			])
		},
		mounted() {

			this.$nextTick(() => {
				this.cutLinesOnResize();
				this.$refs.content.classList.add('show');
				// AOS.refreshHard();
				// AOS.init({
				// 	once: true,
				// 	disabled: 'mobile',
				// 	duration: 1000,
				// 	offset: 0
				// });
			});

			window.addEventListener('resize', this.resizeHandler);
			window.addEventListener('orientationchange', this.resizeHandler);
		},
		methods: {
			getTitle() {
				let obj = this.contacts.yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
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
				let newWindowW = window.innerWidth;
				if (newWindowW != windowW) {
					window.scrollTo(0, 0);
				}
				setTimeout(() => {
					let newWindowWidth = window.innerWidth;
					if (newWindowWidth != windowW) {
						this.cutLinesOnResize();
					}
					windowW = newWindowWidth;
				}, 1000);
			}
		},
		components: {
			'block-header': blockHeader,
			'block-footer': blockFooter,
			'block-preloader': blockPreloader,
			'block-menu': blockMenu,
			'block-cookie': blockCookie
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('orientationchange', this.resizeHandler);
			// document.documentElement.classList.remove('black');
		},
		watch: {
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
	
	.content {
		opacity: 0;
		transition: opacity .6s ease .4s;
		
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

	.contacts {
		// overflow: scroll;
	}

	html:not(.no-js) .circle [data-aos=title-fade].aos-animate /deep/ > .line > .line {
		transform:translate3d(0,0,1px) rotate(0.001deg);
	}

	html:not(.no-js) [data-aos=circle] {
		.contacts__line {
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
		.contacts__line {
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
		.contacts__line {
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

	.social {
		margin-top: 54px;

		&__link {
			font-size: 14px;
			color: #F5F5F3;
			margin-right: 33px;
			
			@media screen and (min-width: 1200px) {
				transition: opacity .5s ease;

				&:hover {
					opacity: .6;
				}
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.circle {
		width: 222px;
		height: 222px;
		margin-top: -111px;
		margin-bottom: -80px;
		border-radius: 50%;
		// border: 1px solid rgba(#EFEEEB, .09);
		margin-left: 280px;
		display: block;
		text-align: center;
		position: relative;
		z-index: 1;

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

	.contacts {
		display: table;
		min-height: 100vh;
		min-height: calc(var(--vh, 1vh) * 100);
		background-color: #1C1C1C;
		// padding: 154px 0;
		font-size: 0;
		width: 100%;
		text-align: center;

		&__inner {
			display: inline-block;
			vertical-align: middle;
			width: 100%;
		}

		&__wrapper {
			// max-width: 1600px;
			// margin: auto;
		}

		&__cell {
			display: table-cell;
			vertical-align: middle;
		}

		&__line {
			width: calc(100% + 54px);
			height: 1px;
			background-color: rgba(#DEDEDE, .06);
			margin-top: 21px;
			margin-left: -54px;
			position: relative;

			&:before {
				content: "";
				display: block;
				width: 1px;
				height: 1px;
				background: #EFEEEB;
				opacity: 0;
				position: absolute;
				left: 446px;
				top: 0;
			}
		}

		&__val {
			span {
				display: block;
				font-size: 14px;
				// color: rgba(#fff, .45);
				color: rgba(#fff, .8);
				margin-bottom: 5px;
				line-height: 21px;
			}

			a {
				color: inherit;
				opacity: .6;
				position: relative;
				display: inline-block;

				@media screen and (min-width: 1200px) {
					transition: opacity .5s ease;

					&:after {
						content: "";
						display: block;
						width: 100%;
						height: 1px;
						background: rgba(#fff, .8);
						margin-top: -4px;
						transition: transform .5s ease;
						transform: scaleX(0);
						transform-origin: 0 0;
					}

					&:hover {
						opacity: 1;

						&:after {
							transform: scaleX(1);
						}
					}
				}
			}

			&_underline {
				a {
					text-decoration: underline;

					&:after {
						display: none;
					}
				}
			}
		}

		&__row {
			// margin-bottom: 32px;
		}

		&__prop {
			font-weight: 700;
			font-size: 11px;
			text-transform: uppercase;
			color: #fff;
			letter-spacing: 2px;
			margin-bottom: 14px;
		}

		&__col {
			display: inline-block;
			vertical-align: top;
			max-width: 38%;
			margin-right: 58px;

			&_mobile {
				display: none;
			}
		}

		&__title {
			font: 700 54px/1 'Avanti', Arial, Helvetica, sans-serif;
			color: #fff;
			margin-left: -135px;
			margin-bottom: 56px;
		}

		&__column {
			display: inline-block;
			vertical-align: middle;
			text-align: left;

			&:nth-child(1) {
				width: calc(100% - 599px);
			}

			&:nth-child(2) {
				width: 599px;
				// padding-top: 54px;
				padding-left: 54px;
				margin-top: -5vh;
			}
		}

		&__img {
			// height: calc(100vh - 154px - 154px);
			// max-height: 554px;
			background-size: cover;
			background-position: center 70%;
			// height: 75vh;

			height: 61.5vh;

			// height: 67vh;
			// max-height: none;
		}
	}

	@media screen and (min-width: 1600px) {
		.contacts {
			&__img {
				height: 66.5vh;
			}

			&__column {
				&:nth-child(2) {
					margin-top: -4.4vh;
				}
			}
		}
	}

	@media screen and (min-width: 1200px) and (max-height: 650px) {
		.contacts {
			&__title {
				margin-bottom: 36px;
			}

			&__column {
				&:nth-child(2) {
					margin-top: 3vh;
				}
			}
		}

		.social {
			margin-top: 33px;
		}
	}

	@media screen and (min-width: 1200px) and (max-height: 550px) {

		.circle {
			margin-bottom: -91px;
		}

		.contacts {
			&__img {
				height: 65vh;
			}

			&__title {
				margin-bottom: 26px;
			}

			&__line {
				margin-top: 12px;
			}

			&__column {
				&:nth-child(2) {
					margin-top: 2.4vh;
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {

		.social {
			margin-top: 41px;
		}

		.circle {
			margin-left: 213px;
			margin-bottom: -76px;

			&__text {
				&:nth-child(2) {
					display: none;
				}
			}
		}

		.contacts {

			&__col {
				margin-right: 48px;
				max-width: 43%;

				&:nth-child(2) {
					margin-right: 0;
				}
			}

			&__title {
				font-size: 40px;
				margin-left: -101px;
				margin-bottom: 48px;
			}

			&__img {
				height: 505px;
			}

			&__column {

				&:nth-child(1) {
					width: calc(100% - 462px);
				}

				&:nth-child(2) {
					width: 462px;
					padding-top: 58px;
					padding-left: 52px;

					padding-bottom: 130px;
    				padding-top: 130px;
				}
			}

			&__line {
				&:before {
					left: 378px;
				}
			}
		}
	}

	@media screen and (max-width: 650px) {

		.social {
			margin-top: 35px;
		}

		.circle {
			&_desktop {
				display: none;
			}

			&__dot {
				background-color: #EFEEEB;
			}

			&_mobile {
				width: auto;
				height: auto;
				margin: auto;
				display: inline-block;
				border: none;
				border-bottom: 1px solid rgba(#F5F5F3, .81);
				border-radius: 0;
				margin-top: 4px;
				padding-bottom: 0px;

				.circle__span {
					display: inline-block;
					vertical-align: top;
					font-size: 9px;
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

			&__inner {
				padding-left: 0;
			}
		}

		.contacts {
			display: block;
			padding: 0;
			padding-bottom: 94px;

			&__content {
				margin-bottom: 88px;
			}

			&__maps {
				display: none;
			}

			&__prop {
				margin-bottom: 11px;
			}

			&__col {
				max-width: 100%;
				width: 50%;
				margin-right: 0;
				padding-right: 15px;
				margin-bottom: 22px;

				&_desktop {
					display: none;
				}

				&_mobile {
					display: inline-block;
				}

				&_full {
					width: 55%;
					display: block;
					margin-bottom: 0;
				}
			}

			&__title {
				margin-left: 0;
				font-size: 43px;
				margin-bottom: 26px;
			}

			&__val {
				span {

				}
			}

			&__img {
				height: 150px;
				background-position: center 75%;
			}

			&__cell {
				display: block;
			}

			&__column {
				display: block;
				width: 100%;

				&:nth-child(1) {
					width: 100%;
				}

				&:nth-child(2) {
					width: 100%;
					padding: 0 28px;
					padding-top: 0;
					margin-top: -16px;
				}
			}
		}
	}

	@media screen and (max-width: 400px) {

		.social {
			margin-top: 30px;
		}

		.circle {
			margin-top: 3px;
		}

		.contacts {
			padding-bottom: 92px;

			&__content {
				margin-bottom: 50px;
			}

			&__col {
				&_full {
					width: 60%;
				}
			}

			&__prop {
				margin-bottom: 14px;
			}

			&__img {
				height: 122px;
			}

			&__column {
				&:nth-child(2) {
					padding: 0 22px;
				}
			}
		}
	}

	@media screen and (max-width: 350px) {

		.social {
			margin-top: 32px;	
		}

		.contacts {
			padding-bottom: 93px;

			&__content {
				margin-bottom: 53px;
			}

			&__title {
				margin-bottom: 24px;
			}

			&__col {
				width: 100%;
				display: block;

				&_desktop {
					display: none;
				}

				&_full {
					max-width: 65%;
				}
			}

			&__column {
				&:nth-child(2) {
					padding: 0 13px;
				}
			}
		}
	}

</style>