<template lang="pug">
	.menu(:class="['menu_type_' + type, isMenuOpened ? 'menu_open' : '']" ref="menu")
		.menu__wrapper
			router-link.l(:to="$ml.get('lang_url') + '/'")
				img.l__img.l__img_0(src="@/assets/img/logo_black.svg" alt="Logo")
				img.l__img.l__img_1(src="@/assets/img/logo_white.svg" alt="Logo")
			.menu__outer
				
				.menu__container
					.menu__bg(:style="{backgroundImage: 'url(\"' + require('@/assets/img/menu_about_black.jpg') + '\")'}")
					.menu__bg(:style="{backgroundImage: 'url(\"' + require('@/assets/img/menu_projects_black.jpg') + '\")'}")
					.menu__bg(:style="{backgroundImage: 'url(\"' + require('@/assets/img/menu_services_black.jpg') + '\")'}")
					.menu__bg(:style="{backgroundImage: 'url(\"' + require('@/assets/img/menu_contacts_black.jpg') + '\")'}")
				nav.nav
					router-link.menu__row(:to="$ml.get('lang_url') + '/about/'" @click.native="onMenuClick")
						span
							.word {{ $ml.get('menu.about') }}
					router-link.menu__row(:to="$ml.get('lang_url') + '/cases/'" @click.native="onMenuClick")
						span
							.word {{ $ml.get('menu.projects') }}
					router-link.menu__row(:to="$ml.get('lang_url') + '/services/'" @click.native="onMenuClick")
						span
							.word {{ $ml.get('menu.services') }}
					router-link.menu__row(:to="$ml.get('lang_url') + '/contacts/'" @click.native="onMenuClick")
						span
							.word {{ $ml.get('menu.contacts') }}
				.lang(data-aos="custom-fade" data-aos-delay="1500")
					.lang__current(v-text="$ml.get('title')")
					.lang__dropdown
						.lang__item(v-if="$ml.get('lang') != 'en'")
							button.lang__text(@click="changeLang('en')" aria-label="En") En
						.lang__item(v-if="$ml.get('lang') != 'ua'")
							button.lang__text(@click="changeLang('ua')" aria-label="Ua") Ua
						.lang__item(v-if="$ml.get('lang') != 'ru'")
							button.lang__text(@click="changeLang('ru')" aria-label="Ru") Ru
				.social(data-aos="custom-fade" data-aos-delay="1000")
					a.social__item(v-if="contacts.acf && contacts.acf.url_facebook" :href="contacts.acf ? contacts.acf.url_facebook : ''" target="_blank" rel="nofollow") .Facebook
					a.social__item(v-if="contacts.acf && contacts.acf.url_instagram" :href="contacts.acf ? contacts.acf.url_instagram : ''" target="_blank" rel="nofollow") .Instagram
					a.social__item(v-if="contacts.acf && contacts.acf.url_behance" :href="contacts.acf ? contacts.acf.url_behance : ''" target="_blank" rel="nofollow") .Behance
		.menu__langs
			button(:class="{'active': $ml.get('lang') === 'en'}" @click="changeLang('en')" aria-label="En") En
			button(:class="{'active': $ml.get('lang') === 'ua'}" @click="changeLang('ua')" aria-label="Ua") Ua
			button(:class="{'active': $ml.get('lang') === 'ru'}" @click="changeLang('ru')" aria-label="Ru") Ru
		.menu__social
			a(v-if="contacts.acf && contacts.acf.url_facebook" :href="contacts.acf ? contacts.acf.url_facebook : ''" target="_blank" rel="nofollow") .Facebook
			a(v-if="contacts.acf && contacts.acf.url_instagram" :href="contacts.acf ? contacts.acf.url_instagram : ''" target="_blank" rel="nofollow") .Instagram
			a(v-if="contacts.acf && contacts.acf.url_behance" :href="contacts.acf ? contacts.acf.url_behance : ''" target="_blank" rel="nofollow") .Behance
</template>

<script>

	import {mapState} from 'vuex';

	let els;
	let bgs;
	let currentHover = 0;

	export default {
		name: 'block-menu',
		data: function(){
			return {
				
			}
		},
		props: {
			type: {
				type: Number,
				default: 0
			}
		},
		computed: {
			...mapState([
				'contacts',
				'isMenuOpened'
			])
		},
		mounted() {
			if (window.innerWidth <= 1200) return;

			els = document.querySelectorAll('.menu__row');
			bgs = document.querySelectorAll('.menu__bg');
			for (let i = 0; i < els.length; i++) {
				els[i].addEventListener('mouseenter', () => {
					bgs[currentHover].classList.remove('menu__bg_active');
					bgs[i].classList.add('menu__bg_active');
					currentHover = i;
				}, false);

				els[i].addEventListener('mouseleave', () => {
					bgs[i].classList.remove('menu__bg_active');
				}, false);
			}

			let b = document.querySelector('.b');
			let m = this.$refs.menu;
			let bw = b.offsetWidth;
			let bh = b.offsetHeight;
			m.style.transform = 'scale(' + (bw/m.offsetWidth) + ', ' + (bh/m.offsetHeight) + ')';
		},
		methods: {
			onMenuClick() {
				let b = document.querySelector('.b');
				let m = this.$refs.menu;
				m.classList.remove('menu_open');
				setTimeout(() => {
					this.$store.dispatch('TOGGLE_MENU', false);
				}, 200);

				let bw = b.offsetWidth;
				let bh = b.offsetHeight;
				m.style.transform = 'scale(' + (bw/m.offsetWidth) + ', ' + (bh/m.offsetHeight) + ')';
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
			}
		},
		beforeDestroy() {
			
		}
	}
</script>

<style lang="scss" scoped>

	.social {
		margin-right: 56px;
		// display: inline-block;
		// vertical-align: bottom;
		font-size: 14px;
		line-height: 1;
		color: #fff;
		opacity: .9;
		margin-top: -5px;
		// float: right;
		// position: relative;
		position: absolute;
		bottom: 39px;
		right: 0;


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

	.lang {
		font-size: 14px;
		line-height: 1;
		color: #fff;
		opacity: .9;
		font-family: 'Fatum', sans-serif;
		// display: inline-block;
		// vertical-align: bottom;
		padding: 0 10px;
		// margin-right: -10px;
		// margin-left: -10px;
		position: relative;
		cursor: default;
		margin-top: -54px;
		margin-left: 46px;
		display: inline-block;
		position: absolute;
		bottom: 39px;
		left: 0;

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

	.l {
		position: absolute;
		top: 17px;
		left: 57px;
		width: 93px;
		opacity: 0;
		transition: opacity .2s ease;
		z-index: 1;

		&__img {
			width: 93px;
		}
	}
	.word {
		display: inline-block;
		transform: translate3d(0, 100%, 1px) rotate(6deg);
		transition: transform 0s linear .5s;
	}

	.nav {
		height: 100%;
		counter-reset: section;
	}

	.menu {
		position: fixed;
		top: 9px;
		left: 9px;
		width: calc(100% - 18px);
		height: calc(100% - 18px);
		background-color: #1C1C1C;
		// border: 9px solid #fff;
		// opacity: 0;
		pointer-events: none;
		transition: transform .7s ease, visibility .7s step-end;
		z-index: 2;
		visibility: hidden;
		// overflow: hidden;
		transform: scale(0);
		transform-origin: 100% 0;

		&:after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: -9px;
			left: -9px;
			border: 9px solid #fff;
			pointer-events: none;
			opacity: 0;
			transition: opacity .2s ease;
		}

		&__wrapper {
			width: 100%;
			height: 100%;
			position: relative;
		}

		&__outer {
			height: 100%;
			opacity: 0;
			transition: opacity .2s ease;
			overflow: hidden;
		}
		
		&__container {
			width: 100%;
			height: 100%;
			margin-bottom: calc(-100vh + 18px);
			opacity: 1;
			overflow: hidden;
		}

		&__bg {
			&:after {
				content: "";
				display: block;
				// position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		&_type_0 {
			background-color: #1C1C1C;
			

			&:after {
				border-color: #F5F5F3;
			}

			.menu__bg:after {
				background-color: rgba(0, 0, 0, .63);
			}

			.menu__row {
				color: #fff;
				border-color: rgba(#fff, .08);
				&:after {
					color: #fff;
				}
			}

			.l__img_0 {
				display: none;
			}

			.lang {
				color: #fff;
			}

			.social {
				color: #fff;
			}
		}

		&_type_1 {
			background-color: #F5F5F3;
			
			&:after {
				border-color: #1C1C1C;
			}

			.menu__bg:after {
				background-color: rgba(255, 255, 255, .85);
			}

			.menu__row {
				color: #1C1C1C;
				border-color: rgba(0,0,0, .1);
				&:after {
					color: #1c1c1c;
				}
			}

			.l__img_1 {
				display: none;
			}
			.lang {
				color: #1c1c1c;
			}

			.social {
				color: #1c1c1c;
			}
		}

		&_type_2 {
			background-color: #1C1C1C;
			
			&:after {
				border-color: #F5F5F3;
			}

			.menu__bg:after {
				background-color: rgba(0, 0, 0, .63);
			}

			.menu__row {
				color: #fff;
				border-color: rgba(#fff, .08);

				&:after {
					color: #fff;
				}
			}

			.l__img_0 {
				display: none;
			}

			.lang {
				color: #fff;
			}

			.social {
				color: #fff;
			}
		}

		&__social,
		&__langs {
			display: none;
		}

		&_open {
			pointer-events: all;
			visibility: visible;
			transform: none;
			transition: transform .7s ease, visibility 0s step-start;

			.l {
				opacity: 1;
				transition: opacity .5s ease .5s;
			}

			.word {
				transition: transform .7s ease .5s;
				transform: none;
			}

			&:after {
				opacity: 1;
				transition: opacity .5s ease .5s;
			}

			.menu__outer {
				opacity: 1;
				transition: opacity .5s ease .5s;
			}
		}

		&__bg {
			background-size: cover;
			background-position: center;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			margin-bottom: calc(-100vh + 18px);
			opacity: 0;
			transform: scale(1.2);
			transition: opacity 1.2s ease, transform 1.2s ease, visibility 1.2s step-end, filter .6s ease;
			visibility: hidden;
			filter: blur(3px);

			&_active {
				opacity: 1;
				transform: scale(1);
				transition: opacity 1.2s ease, transform 1.2s ease, visibility 0s step-start, filter .6s ease;
				visibility: visible;
				filter: blur(0);
			}
		}

		&__row {
			text-align: center;
			display: block;
			height: 25%;
			border-bottom: 1px solid rgba(#fff, .08);
			font: 700 65px/1 'Avanti', Arial, Helvetica, sans-serif;
			color: #fff;
			position: relative;

			&:last-child {
				border-bottom: none;
			}

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}

			&:after {
				counter-increment: section;
				content: '.0' counter(section);
				font: 400 10px/21px 'Fatum', sans-serif;
				letter-spacing: 3px;
				text-transform: uppercase;
				color: #fff;
				top: 16%;
				left: 50%;
				transform: translate(-50%, 0);
				position: absolute;
				opacity: 0;
				transition: opacity .5s ease;
			}

			span {
				display: inline-block;
				vertical-align: middle;
				transition: opacity .5s ease;
				opacity: .3;
				overflow: hidden;
			}

			@media screen and (min-width: 1200px) {
				&:hover {
					span {
						opacity: 1;
					}

					&:after {
						opacity: 1;
					}
				}

				
			}
		}
	}

	@media screen and (max-width: 1200px) {
		.lang {
			display: none;
		}

		.social {
			display: none;
		}

		.l {
			top: -33px;
			left: 22px;
		}
		.menu {
			padding: 50px 0;

			&_type_2,
			&_type_0 {
				.menu__social {
					a {
						color: rgba(255, 255, 255, .9);
					}
				}

				.menu__langs {
					button {
						color: rgba(255, 255, 255, .9);
					}
				}
			}

			&__container {
				display: none;
			}

			&__item {
				height: calc(25% - 25px);
			}

			&__row {
				span {
					display: inline-block;
					position: relative;
					top: 6px;
				}
			}

			&__langs,
			&__social {
				display: block;
				position: absolute;
				left: 0;
				width: 100%;
				text-align: center;
				opacity: 0;
				transition: opacity .2s ease;
			}

			&__social {
				bottom: 25px;

				a {
					margin: 0 16px;
					font-size: 14px;
					// color: rgba(255, 255, 255, .9);
					display: inline-block;
					vertical-align: middle;
					color: #1C1C1C;
				}
			}

			&_open {
				.menu__langs,
				.menu__social {
					opacity: 1;
					transition: opacity .5s ease 1s;
				}
			}

			&__langs {
				bottom: 57px;
				z-index: 1;
				
				button {
					margin: 0 10px;
					font-size: 14px;
					display: inline-block;
					vertical-align: middle;
					color: #1C1C1C;
					opacity: .5;

					&.active {
						opacity: 1;
					}
				}
			}
		}
	}

	@media screen and (max-width: 650px) {
		.l {
			width: 78px;
			top: -18px;
			left: 23px;

			&__img {
				width: 78px;
			}
		}
		.menu {
			padding: 34px 0 68px;
			// border-width: 5px;

			width: calc(100% - 10px);
			height: calc(100% - 10px);
			top: 5px;
			left: 5px;

			&:after {
				top: -5px;
				left: -5px;
				border-width: 5px;
			}

			&__social {
				bottom: 21px;
			}

			&__langs {
				bottom: 60px;
			}

			&__row {
				font-size: 36px;

				span {
					top: 2px;
				}
			}
		}
	}

	@media screen and (max-width: 400px) {
		.menu {
			padding: 72px 0 92px;

			&__langs {
				bottom: 56px;
			}

			&__social {
				bottom: 17px;
			}

			
		}

		.l {
			left: 17px;
			top: -56px;
		}
	}

	@media screen and (max-width: 350px) {
		.menu {
			padding: 68px 0 77px;

			&__langs {
				bottom: 43px;
			}

			&__social {
				bottom: 12px;
			}
		}

		.l {
			left: 9px;
			top: -52px;
		}
	}
</style>