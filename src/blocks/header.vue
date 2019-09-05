<template lang="pug">
	header.h(:class="['h_type_' + type, isMenuOpened ? 'h_fixed_super' : '']" ref="header")
		.h__content
			router-link.l(:to="$ml.get('lang_url') + '/'" @click.native="onMenuClick")
				img.l__img.l__img_0(src="@/assets/img/logo_black.svg" alt="Logo")
				img.l__img.l__img_1(src="@/assets/img/logo_white.svg" alt="Logo")
			.m
				span.m__i(v-text="$ml.get('main.kyiv_ukraine')")
				a.m__i(v-if="contacts.acf && contacts.acf.for_clients.length" :href="'tel:' + (contacts.acf ? getPhone(contacts.acf.for_clients)[0].item : '')") {{ contacts.acf ? getPhone(contacts.acf.for_clients)[0].item : '' }}
				button.b(:class="{'b_active': isMenuOpened}" @click="toggleMenu()" ref="b" aria-label="Menu")
					.b__bg
					.b__t Architecture & Design
					.b__e
					.b__els
</template>

<script>


	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	

	let isFixed = false;
	let lastY = 0;
	let dir = 0;
	let h;

	import {mapState} from 'vuex';

	export default {
		name: 'block-header',
		props: {
			type: {
				type: Number,
				default: 0
			},
			isFixed: {
				type: Boolean,
				default: false
			}
		},
		data: function(){
			return {
				isMenuOpen: false
			}
		},
		computed: {
			...mapState([
				'contacts',
				'isMenuOpened'
			])
		},
		created() {
			if (isSafari && !this.isFixed) {
				window.addEventListener('scroll', this.onScrollSafari);
			} else {
				window.addEventListener('scroll', this.onScroll);
			}
		},
		mounted() {
			// h = document.querySelector('.h');
			this.$nextTick(() => {
				h = this.$refs.header;
			});
			if (window.innerWidth <= 1200) return;
		},
		methods: {
			onMenuClick() {
				if (this.$route.name != 'main') return;
				
				let b = document.querySelector('.b');
				let m = document.querySelector('.menu');
				m.classList.remove('menu_open');
				setTimeout(() => {
					this.$store.dispatch('TOGGLE_MENU', false);
				}, 200);

				let bw = b.offsetWidth;
				let bh = b.offsetHeight;
				m.style.transform = 'scale(' + (bw/m.offsetWidth) + ', ' + (bh/m.offsetHeight) + ')';
			},
			onScrollSafari() {
				let y = window.scrollY;
				dir = y > lastY ? 1 : 0;
				if (y > 88 && !dir && !isFixed) {
					h.classList.remove('h_fixed_hide');
					h.classList.add('h_fixed_show');
					isFixed = true;
				}
				if (y > 88 && dir && isFixed) {
					h.classList.remove('h_fixed_show');
					h.classList.add('h_fixed_hide');
					isFixed = false;
				}

				if (y <= 0 && isFixed) {
					isFixed = false;
					h.classList.remove('h_fixed_hide');
					h.classList.remove('h_fixed_show');
				}

				if (y >= document.body.clientHeight - window.innerHeight && !dir) {
					h.classList.remove('h_fixed_show');
					h.classList.add('h_fixed_hide');
					isFixed = false;
				}
				lastY = y;
			},
			onScroll() {
				let y = window.scrollY;
				dir = y > lastY ? 1 : 0;
				if (y > 88 && !dir && !isFixed) {
					h.classList.remove('h_fixed_hide');
					h.classList.add('h_fixed_show');
					isFixed = true;
				}
				if (y > 88 && dir && isFixed) {
					h.classList.remove('h_fixed_show');
					h.classList.add('h_fixed_hide');
					isFixed = false;
				}

				if (y === 0 && isFixed) {
					isFixed = false;
					h.classList.remove('h_fixed_hide');
					h.classList.remove('h_fixed_show');
				}
				lastY = y;
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
			getPhone(arr) {
				return arr.filter(item => item.item.indexOf('@') === -1);
			},
			toggleMenu() {
				if (this.isMenuOpened) {
					let m = document.querySelector('.menu');
					let bw = this.$refs.b.offsetWidth;
					let bh = this.$refs.b.offsetHeight;
					m.style.transform = 'scale(' + (bw/m.offsetWidth) + ', ' + (bh/m.offsetHeight) + ')';
					this.$store.dispatch('TOGGLE_MENU', false);
				} else {
					let m = document.querySelector('.menu');
					m.style.transform = 'scale(1, 1)';
					this.$store.dispatch('TOGGLE_MENU', true);
				}
			}
		},
		beforeDestroy() {
			this.$store.dispatch('TOGGLE_MENU', false);
			if (isSafari && !this.isFixed) {
				window.removeEventListener('scroll', this.onScrollSafari);
			} else {
				window.removeEventListener('scroll', this.onScroll);
			}
			isFixed = false;
			lastY = 0;
			dir = 0;
		},
		watch: {
			isMenuOpened() {
				if (!this.isMenuOpened) {
					isFixed = false;
				}
			}
		}
	}

</script>

<style lang="scss" scoped>

	

	.b {
		height: 70px;
		float: right;
		color: #fff;
		text-transform: uppercase;
		width: 359px;
		position: relative;
		text-align: left;
		padding-left: 45px;
		margin-left: 0;
		z-index: 1;

		&__bg {
			background-color: #1C1C1C;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}

		&__els {
			&:before,
			&:after {
				content: "";
				display: block;
				position: absolute;
				width: 45px;
				height: 1px;
				background-color: #fff;
				right: 33px;
				transition: transform .5s ease;
			}

			&:before {
				top: 31px;
			}

			&:after {
				top: 38px;
			}
		}

		&__t {
			font-size: 10px;
			letter-spacing: 4px;
			position: relative;
		}

		@media screen and (min-width: 1200px) {
			&:hover {
				.b__els {
					&:before {
						transform: translate3d(0, 3px, 1px);
					}

					&:after {
						transform: translate3d(0, -4px, 1px);
					}
				}
			}
		}

		&_active {
			.b__els {
				&:before {
					transform: translate3d(0, 3px, 1px);
				}
				
				&:after {
					transform: translate3d(0, -4px, 1px);
				}
			}

			.b__bg {
				opacity: 0;
				transition: opacity 0s ease 1s;
			}

			@media screen and (min-width: 1200px) {
				&:hover {
					.b__els {
						&:before {
							transform: translate3d(0, 3px, 1px) rotate(-48deg) scale(.6);
						}

						&:after {
							transform: translate3d(0, -4px, 1px) rotate(48deg) scale(.6);
						}
					}
				}
			}
		}
	}

	.m {
		float: right;
		margin-top: 9px;
		font-size: 14px;
		width: 670px;


		&__i {
			margin-left: 54px;
			display: inline-block;
			vertical-align: middle;
			margin-top: 26px;
			transition: opacity .5s ease;
			font-size: 14px;

			&:nth-child(1) {
				margin-left: 0;
			}
		}

		a.m__i {
			font-size: 13px;

			@media screen and (min-width: 1200px) {
				&:hover {
					opacity: .7;
				}
			}
		}
	}

	.l {
		transition: opacity .5s ease;
		margin-top: 26px;
		display: block;
		width: 93px;
		float: left;

		&__img {
			width: 100%;
			display: none;
		}

		@media screen and (min-width: 1200px) {
			&:hover {
				opacity: .7;
			}
		}
	}

	.h {
		position: absolute;
		padding-left: 66px;
		padding-right: 9px;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 3;
		height: 88px;
		transition: opacity .5s ease;

		&__content {
			height: 100%;
			transform: translateZ(1px);
		}

		&:before {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			margin-left: -66px;
			width: calc(100% + 75px);
			margin-bottom: -88px;
			transition: opacity .5s ease;
			opacity: 0;
			will-change: opacity;
		}

		&_fixed_show {
			position: fixed;
			top: -88px;
			transform: translate3d(0, 100%, 1px);
			transition: transform .5s ease, opacity .5s ease;
		}

		&_fixed_hide {
			position: fixed;
			top: -88px;
			transform: translate3d(0, 0, 1px);
			transition: transform .5s ease, opacity .5s ease;
		}

		&_fixed_super {
			position: fixed !important;
			top: -88px !important;
			transform: translate3d(0, 100%, 1px) !important;
			// background: none !important;

			&:before {
				opacity: 0 !important;
			}

			.m__i {
				opacity: 0;
			}

			.l {
				opacity: 0;
			}
		}

		&_type_0 {
			.l__img_0 {
				display: block;
			}

			&:before {
				background-color: #F5F5F3;
			}

			&.h_fixed_show,
			&.h_fixed_hide {
				&:before {
					opacity: 1;
				}
			}
		}

		&_type_1 {
			.l__img_1 {
				display: block;
			}

			.m__i {
				color: #fff;
			}

			.b {
				color: #1C1C1C;

				&__bg {
					background-color: #F5F5F3;
				}

				&__els {
					&:before,
					&:after {
						background-color: #1C1C1C;
					}
				}
			}

			&:before {
				background-color: #1C1C1C;
			}

			&.h_fixed_show,
			&.h_fixed_hide {
				&:before {
					opacity: 1;
				}
			}
		}

		&_type_2 {
			.l__img_1 {
				display: block;
			}

			.m__i {
				color: #fff;
			}

			.b {
				color: #F5F5F3;

				&__els {
					&:before,
					&:after {
						background-color: #F5F5F3;
					}
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {

		.b {
			margin-left: 0;

			&_active {
				.b__els {
					&:before {
						transform: translate3d(0, 3px, 1px);
					}

					&:after {
						transform: translate3d(0, -4px, 1px);
					}
				}
			}
		}

		.m {
			margin-top: 8px;
			width: auto;
			&__i {
				display: none;
			}
		}

		.h {
			padding-left: 31px;
			padding-right: 8px;
		}
	}

	@media screen and (max-width: 650px) {

		.l {
			width: 78px;
			margin-top: 25px;
		}

		.b {
			width: 215px;
			height: 67px;
			padding-left: 29px;

			&__els {
				&:before,
				&:after {
					right: 25px;
				}

				&:before {
					top: 28px;
				}

				&:after {
					top: 35px;
				}
			}

			&__t {
				font-size: 8px;
				letter-spacing: 3px;
				white-space: normal;
				width: 91px;
				text-align: right;
				line-height: 12px;
			}
		}

		.m {
			margin-top: 5px;
		}

		.h {
			padding-right: 5px;
			padding-left: 28px;
			height: 76px;

			&_fixed_show,
			&_fixed_hide {
				top: -76px;
			}

			&_fixed_super {
				top: -76px !important;
			}

			&:before {
				margin-bottom: -76px;
			}
		}
	}

	@media screen and (max-width: 400px) {
		.h {
			padding-left: 22px;
		}
	}

	@media screen and (max-width: 350px) {

		.b {
			width: 187px;
			padding-left: 21px;

			&__els {
				&:before,
				&:after {
					right: 11px;
				}
			}
		}

		.h {
			padding-left: 14px;
		}
	}
</style>