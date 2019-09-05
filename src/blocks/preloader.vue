<template lang="pug">
	.preloader(:class="['preloader_active_' + activeStep, isPreloader ? 'preloader_hide' : '']")
		.preloader__inner
			<svg viewBox="0 0 278 278" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<circle class="circle__c1" cx="139" cy="139" r="137" stroke="#484847" stroke-opacity="0.25" fill="none" />
				<circle class="circle__c2" cx="139" cy="139" r="137" stroke="#ffffff" stroke-opacity="0.16" fill="none" />
			</svg>
			.preloader__logo
				img(src="@/assets/img/logo_preloader.svg" alt="Preloader")
			.preloader__block-1
				span Architecture
			.preloader__block-2
				span & Design
</template>

<script>

	import AOS from 'aos';

	let interval;

	export default {
		name: 'block-preloader',
		data: function(){
			return {
				activeStep: 0,
				isPreloader: false
			}
		},
		mounted() {
			this.$nextTick(() => {

				setTimeout(() => {
					this.activeStep = 1;
				});

				interval = setInterval(() => {
					this.activeStep = this.activeStep < 3 ? this.activeStep + 1 : 0;
				}, 2500);

				setTimeout(() => {
					document.querySelector('.preloader .circle__c2').classList.add('back');
					document.querySelector('.preloader .circle__c1').classList.add('back');

					let els = document.querySelectorAll('[data-aos]');
					for (let i = 0; i < els.length; i++) {
						els[i].classList.remove('aos-animate');
						els[i].classList.remove('aos-init');
					}

					setTimeout(() => {
						document.querySelector('.content').classList.add('show');
						let sl = document.querySelector('.slider_no-effect');
						if (sl) sl.classList.remove('slider_no-effect');
						this.isPreloader = true;
						this.activeStep = -100;
						clearInterval(interval);
						setTimeout(() => {
							this.$store.dispatch('SET_PRELOADER', true);
						}, 1000);
					}, 2000);
				}, 6500);
			});
		}
	}

</script>

<style lang="scss" scoped>

	svg {
		width: 278px;
		height: 278px;
		display: block;
		transform: rotate(180deg);

		.circle__c1{
			stroke-dasharray: 862;
			stroke-dashoffset: 862;
			transition: stroke-dashoffset 2s ease;

			&.back {
				stroke-dashoffset: -862 !important;
				transition: stroke-dashoffset 2s ease !important;
			}
		}

		.circle__c2 {
			stroke-dasharray: 862;
			stroke-dashoffset: 862;
			// animation: circle 4s linear infinite;
			// transform-origin: 50% 50%;

			// @keyframes circle {
			// 	from {
			// 		transform: rotate(0);
			// 	}

			// 	to {
			// 		transform: rotate(360deg);
			// 	}
			// }

			&.back {
				stroke-dashoffset: -862 !important;
				transition: stroke-dashoffset 2s ease !important;
			}
		}
	}

	.preloader {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #1C1C1C;
		font-size: 0;
		text-align: center;
		z-index: 1000;
		transform: translateZ(2px);

		&_hide {
			opacity: 0;
			pointer-events: none;
			transition: opacity 1.5s ease;
		}

		&__logo {
			width: 90px;
			height: 31px;
			position: absolute;
			top: calc(50% - 16px);
			left: calc(50% - 44px);
			overflow: hidden;
			padding-top: 2px;

			img {
				// transition: transform 1.5s ease .5s, opacity .5s ease;
				transition: transform 1.5s ease .5s;
				// opacity: 0;
				transform: translate3d(0, 40px, 1px) rotate(10deg);
				transform-origin: 0 0;
				margin-bottom: 2px;
			}
		}

		&__block-1,
		&__block-2 {
			position: absolute;
			height: 12px;
			width: 100%;
			top: calc(50% - 5px);
			left: 0;
			overflow: hidden;

			span {
				font-size: 12px;
				line-height: 1;
				color: #EFEEEB;
				text-align: center;
				text-transform: uppercase;
				letter-spacing: 6px;
				display: block;
				transform-origin: 0 0;
				// transition: transform 1.5s ease .5s, opacity .5s ease;
				transition: transform 1.5s ease .5s;
				// opacity: 0;
				transform: translate3d(0, 15px, 1px) rotate(10deg);
				transform-origin: 0 0;
			}
		}

		&__block-1 {
			span {
				// transition-delay: 2.5s;
			}
		}

		&__block-2 {
			span {
				// transition-delay: 4.5s;
			}
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
			text-align: center;
			position: relative;
		}

		&_active_1 {
			svg {
				.circle__c1 {
					stroke-dashoffset: 0;
				}

				.circle__c2 {
					stroke-dashoffset: 0;
					transition: stroke-dashoffset 5.5s ease 1s;
				}
			}

			.preloader__logo {
				img {
					// opacity: 1;
					// transition: transform 1.5s ease 1s;
					transition: transform 1.5s ease .5s;
					transform: translate3d(0, 0, 1px) rotate(0.001deg);
				}
			}

		}

		&_active_2 {
			svg {
				.circle__c1 {
					stroke-dashoffset: 0;
				}

				.circle__c2 {
					stroke-dashoffset: 0;
					transition: stroke-dashoffset 8.5s ease 1s;
					// transition: opacity 1s ease 1s;
				}
			}

			.preloader__block-1 {
				span {
					// opacity: 1;
					// transition: transform 1.5s ease 1s opacity 0s linear;
					transition: transform 1.5s ease 1s;
					transform: translate3d(0, 0, 1px) rotate(0.001deg);
				}
			}

		}

		&_active_3 {
			svg {
				.circle__c1 {
					stroke-dashoffset: 0;
				}

				.circle__c2 {
					stroke-dashoffset: 0;
					transition: stroke-dashoffset 8.5s ease 1s;
					// transition: opacity 1s ease 1s;
				}
			}

			.preloader__block-2 {
				span {
					// opacity: 1;
					// transition: transform 1.5s ease 1s opacity 0s linear;
					transition: transform 1.5s ease 1s;
					transform: translate3d(0, 0, 1px) rotate(0.001deg);
				}
			}
		}
	}

	
	
	@media screen and (max-width: 1200px) {

	}

	@media screen and (max-width: 650px) {

	}

	@media screen and (max-width: 400px) {

	}

	@media screen and (max-width: 350px) {

	}



</style>