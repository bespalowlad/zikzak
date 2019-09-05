<template lang="pug">
	.calc(:class="{'calc_active': modalCalc}")
		.calc__close(@click="closeModal")
			img(src="@/assets/img/close.svg" alt="Close")
		.calc__container
			.calc__modal.modal
				.modal__close(@click="closeModal")
					img(src="@/assets/img/close-grey.svg" alt="Close")
				.modal__container
					.modal__content
						.modal__title {{ $ml.get('calc.calc') }}
						form.modal__form.form(@submit.prevent="onSubmit()")
							.form__line(:class="{'errorfield': !nameValid}")
								input(type="text" id="name" v-model="formdata_name" @click="iosFocus($event)")
								label(for="name" :class="{full: formdata_name != ''}") {{ $ml.get('calc.name') }}
								.form__error {{ $ml.get('calc.enter_name') }}
							.form__line(:class="{'errorfield': !phoneValid}")
								input( type="tel" id="phone" v-model="formdata_phone" @click="iosFocus($event)")
								label(for="phone" :class="{full: formdata_phone != ''}") {{ $ml.get('calc.phone') }}
								.form__error {{ $ml.get('calc.enter_phone') }}
							.form__line
								input(type="email" id="email" v-model="formdata_email" @click="iosFocus($event)")
								label(for="emai" :class="{full: formdata_email != ''}" ) {{ $ml.get('calc.email') }}
								.form__error {{ $ml.get('calc.email') }}
							.form__line
								input(type="text" id="location" v-model="formdata_location" @click="iosFocus($event)")
								label(for="location" :class="{full: formdata_location != ''}") {{ $ml.get('calc.object_location') }}
								.form__error {{ $ml.get('calc.object_location') }}
							.form__line
								input(type="text" id="size" v-model="formdata_square" @click="iosFocus($event)")
								label(for="size" :class="{full: formdata_square != ''}") {{ $ml.get('calc.size') }}
								.form__error {{ $ml.get('calc.size') }}
							.form__line.form__line_white-space
								.form__radio
									label(for="office") {{ $ml.get('calc.office') }}
									input(type="radio" name="type" id="office" value="office" v-model="formdata_object_type")
								.form__radio
									label(for="apartments") {{ $ml.get('calc.apartments') }}
									input(type="radio" name="type" id="apartments" value="apartments" v-model="formdata_object_type")
								.form__radio
									label(for="house") {{ $ml.get('calc.house') }}
									input(type="radio" name="type" id="house" value="house" v-model="formdata_object_type")
								.form__radio
									label(for="other") {{ $ml.get('calc.other') }}
									input(type="radio" name="type" id="other" value="other" v-model="formdata_object_type")
							.form__line.form__line_urgency
								.form__title {{ $ml.get('calc.urgency') }}
								.form__urgency.urgency(ref="urgency")
									//- .urgency__before
								.form__counter 0%
							button.form__btn(type="submit" aria-label="Send request") 
								span {{ $ml.get('calc.send_request') }}
								span {{ $ml.get('calc.send_request') }}
		modal-thanks(:modalShow="isSuccess")
</template>

<script>
	import noUiSlider from 'nouislider';
	import 'nouislider/distribute/nouislider.css';
	import { mapState } from 'vuex';
	import $api from '@/components/api.js';
	import ModalThanks from '@/blocks/thanks.vue';

	let main;
	let slider;
	let before;
	let circle;
	let counter;
	let minR = 118;
	let midR = 244;
	let maxR = 215;
	let minG = 174;
	let midG = 199;
	let maxG = 82;
	let minB = 83;
	let midB = 33;
	let maxB = 82;
	let R;
	let G;
	let B;

	export default {
		name: 'calc',
		data: function(){
			return {
				modal: true,
				formdata_name: '',
				nameValid: true,
				formdata_phone: '',
				phoneValid: true,
				formdata_email: '',
				formdata_location: '',
				formdata_square: '',
				formdata_object_type: '',
				formdata_urgency: '',
				isSuccess: false,
				scroll: ''
			}
		},
		props: {
			modalShow: Boolean
		},
		computed: {
			...mapState([
				'modalCalc'
			])
		},
		mounted() {
			main = document.querySelector('#app');
			this.$nextTick(() => {
				counter = document.querySelector('.form__counter');
			});
			this.checkModal();
		},
		watch: {
			modalCalc() {
				this.checkModal();
			}
		
		},
		components: {
			'modal-thanks': ModalThanks
		},
		methods: {
			onSubmit(){
				let isValid = true,
					formData = new FormData();

				if(!this.formdata_name) {
					this.nameValid = false;
					isValid = false;
				} else {
					this.nameValid = true;
					formData.append('formdata_name', this.formdata_name);
				}
				
				if(!this.formdata_phone) {
					this.phoneValid = false;
					isValid = false;
				} else {
					this.phoneValid = true;
					formData.append('formdata_phone', this.formdata_phone);
				}

				formData.append('formdata_email', this.formdata_email);
				formData.append('formdata_location', this.formdata_location);
				formData.append('formdata_square', this.formdata_square);
				formData.append('formdata_object_type', this.formdata_object_type);
				formData.append('formdata_urgency', this.formdata_urgency);


				if (!isValid) return;

				$api.sendForm(formData, resp => {
					if (resp.data.status == 'mail_sent') { 
						this.onSuccess();
					}
				});
				
			},
			onSuccess(){
				this.isSuccess = true;
				setTimeout(() => {
					this.formdata_name = '';
					this.formdata_phone = '';
					this.formdata_email = '';
					this.formdata_location = '';
					this.formdata_square = '';
					this.formdata_object_type = '';
					this.formdata_urgency = '';
					this.nameValid = true;
					this.phoneValid = true;
				}, 500);
				
				setTimeout(() => {
					this.isSuccess = false;
					this.closeModal();

				}, 3000);
			},
			initSlider() {
					let s = this.$refs.urgency;
					
					slider = noUiSlider.create(s, {
						start: 0,
						step: 1,
						range: {
							'min': 0,
							'max': 100
						},
						orientation: 'horizontal'

					})
					this.createBefore();
					slider.on('update', (e) => {

						
						let scale = 1 - (e[0] / 100).toFixed(3);
						before.style.transform = scale > 0 ? 'scaleX('+ scale +')' : 'scaleX(0)';

						if(e[0] <= 50) {
							let cof = (e[0] / 50).toFixed(1);
							R = ((midR - minR) * cof + minR).toFixed(0);
							G = ((midG - minG) * cof + minG).toFixed(0);
							B = ((midB - minB) * cof + minB).toFixed(0);
							
						} else {
							let cof = (e[0] / 100).toFixed(1);
							R = (( maxR - midR) * cof + midR).toFixed(0);
							G = (( maxG - midG) * cof + midG).toFixed(0);
							B = (( maxB - midB) * cof + midB).toFixed(0);
						}
						circle.style.background = 'rgb('+R+','+G+','+B+')';
						circle.style.borderColor = 'rgb('+R+','+G+','+B+')';
						counter.innerText = (Number(e[0])).toFixed(0) + '%';
						this.formdata_urgency = (Number(e[0])).toFixed(0);
					})
				
			},
			createBefore() {
				before = document.createElement('div');
				before.classList.add('urgency__before');
				let parent = document.querySelector('.noUi-base');
				let sibling = document.querySelector('.noUi-origin');
				let circleParent = document.querySelector('.noUi-handle');
				circle = document.createElement('div');
				circleParent.append(circle);
				circle.classList.add('circle');
				parent.insertBefore(before, sibling);

			},
			closeModal() {
				this.$store.commit('SET_MODALCALC', false);
			},
			checkModal() {
				if(this.modalCalc == true) {

					this.scroll = window.pageYOffset;
					document.body.style.height = '100vh';
					main.style.marginTop = -this.scroll + 'px';
					this.$nextTick(function() {
						this.initSlider();
						
					})
				} else {
					document.body.style.height = 'auto';
					main.style.marginTop = 0;
					window.scrollTo(0, this.scroll);
				}
			},
			iosFocus(e) {
				if(window.system == 'ios') {
					console.log('THIS IS IOS');
					let inputs = document.querySelectorAll('input');
					inputs.forEach((input) => {
						input.classList.remove('focus-input');
					})
					e.target.classList.add('focus-input');
				}
			}
		},
		beforeDestroy() {
			if (slider) slider.destroy();
			slider = null;
		}
	}

</script>

<style lang="scss" scoped>
	.focus-input {
		& + label {
			transform: scale(0.7) translate3d(0,6px,1px)!important;
		}
	}

	.calc {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.88);
		overflow-y: scroll;
		z-index: 4;
		pointer-events: none;
		transition: opacity .3s ease, visibility .3s step-end;
		opacity: 0;
		visibility: hidden;

		&_active {
			pointer-events: all;
			opacity: 1;
			visibility: visible;
			transition: opacity .3s ease, visibility 0s step-start;

			.calc__modal {
				transform: translate3d(1px, 1px, 1px);
				opacity: 1;
			}
		}

		&__close {
			position: fixed;
			top: 36px;
			right: 36px;
			cursor: pointer;
			img {
				max-width: 16px;
			}
		}

		&:before {
			content: '';
			height: 100%;
			display: inline-block;
			vertical-align: middle;

		}

		&__container {
			width: 100%;
			display: inline-block;
			vertical-align: middle;
		}

		&__modal {
			margin: 0 auto;
			width: 942px;
			height: 716px;
			background-color: #f5f5f3;
			transform: translate3d(1px, 50px, 1px);
			position: relative;
			transition: opacity 1s ease, transform 1s ease;
			opacity: 0;

			&:before  {
				// content: '';
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}
		}

		.modal {
			&__container {
				width: 100%;
				display: inline-block;
				vertical-align: middle;
				padding-top: 82px;

			}

			&__content {
				text-align: center;

			}

			&__title {
				font: 700 38px/38px 'Avanti',sans-serif;
				color: #1c1c1c;
				max-width: 300px;
				margin: 0 auto;
				padding-left: 2px;
			}

			&__form {
				width: 359px;
				margin: 0 auto;
				padding-top: 16px;
			}

			&__close {
				display: none;
			}

			.form {
				&__line {
					width: 100%;
					display: table;
					margin-top: -12px;
					
					&_white-space {
						white-space: nowrap;
					}

					&_urgency {
						display: block;
						text-align: left;
						margin-top: 30px;
						
					}

					&:nth-child(6) {
						margin-top: 4px;
						text-align: left;
						display: block;
					}

					label {
						display: table-header-group;
						width: 100%;
						text-align: left;
						font: 400 14px/20px 'Fatum', sans-serif;
						color: #1c1c1c;
						transform-origin: top left;
						transition: all .3s ease;
						transform: translate3d(0,100%, 1px) scale(1);
						pointer-events: none;
					}

					input {
						display: table-footer-group;
						width: 100%;
						background-color: transparent;
						border: 0;
						border-bottom: 1px solid  rgba(183, 183, 183, 0.35);
						font: 400 14px/22px 'Fatum', sans-serif;
						color: #1c1c1c;
						transition: border-color .3s ease;
						// margin-top: 4px;
						margin-bottom: -4px;
						padding-bottom: 6px;
						height: 30px;
						&:focus {
							// border-color: #dc4242;
							& + label {
								// color: #dc4242;
								transform: scale(0.7) translate3d(0,6px,1px);
							}

							
						}

						&:active {
							& + label {
								transform: scale(0.7) translate3d(0, 6px, 1px);
							}
						}
					}

					
				}

				&__error {
					float: right;
					font: 400 10px/22px 'Fatum', sans-serif;
					color: #dc4242;
					transition: opacity .3s ease;
					pointer-events: none;
					opacity: 0;
					// display: none;
					display: inline;
					// width: 100%;
					// text-align: right;

				}

				&__fantom {
					// width: 100%;
					// text-align: right;
					float: right;
					font: 400 10px/22px 'Fatum', sans-serif;
					display: none;
					display: inline;
					opacity: 0;
					pointer-events: none;
				}

				&__radio {
					display: inline-block;
					vertical-align: top;
					margin-right: 60px;

					&:nth-child(1) {
						margin-right: 55px;
					}

					&:nth-child(2) {
						margin-right: 55px; 
					}

					&:nth-child(3) {
						margin-right: 70px;
					}

					&:last-child {
						margin-right: 0;
					}

					label {
						display: block;
						pointer-events: all;
						cursor: pointer;
					}

					input {
						display: block;
						margin: 0 auto;
						width: 13px;
						height: 13px;
						border-radius: 50%;
						border: 1px solid #474747; 
						margin-top: 26px;
						cursor: pointer;

						&:checked {
							background-color: #474747;
							box-shadow: inset 0 0 0 2px #f5f5f3;
						}
					}
				}

				&__urgency {
					width: 66%;
					height: 1px;
					position: relative;
					display: inline-block;
					vertical-align: top;
					margin-top: 13px;
					


					// &:before {
					// 	position: absolute;
					// 	top: -10px;
					// 	left: 0px;
					// 	width: 3px;
					// 	height: 3px;
					// 	background-color: #76ae53;
					// 	border-radius: 50%;
					// 	content: ''
					// }
					
					// &:after {
					// 	position: absolute;
					// 	top: -10px;
					// 	right: 0px;
					// 	width: 3px;
					// 	height: 3px;
					// 	background-color: #D75252;
					// 	border-radius: 50%;
					// 	content: ''
					// }

				}

				/deep/ .urgency {
					&__before {
						position: absolute;
						top: 0;
						right: 0;
						width: 100%;
						height: 1px;
						background-color: #bfbfbf;
						z-index: 2;
						transform-origin: top right;
					}
				}

				&__title {
					display: inline-block;
					font: 400 14px/22px 'Fatum', sans-serif;
					color: #1c1c1c;
					padding-left: 1px;
					margin-right: 20px;
					vertical-align: top;
				}
				&__counter {
					float: right;
					font: 400 14px/22px 'Fatum', sans-serif;
					margin-top: 1px;
				}

				&__btn {
					display: block;
					margin: 0 auto;
					// border-bottom: 1.5px solid #1c1c1c;
					font: 700 11px/18px 'Fatum', sans-serif;
					color: #1c1c1c;
					letter-spacing: 2px;
					text-transform: uppercase;
					padding: 0 5px;
					margin-top: 35px;
					transform: translateX(11px);
					overflow: hidden;
					position:relative;

					span{
						transform-origin: 0 0;

						&:nth-child(1) {
							transform: translate3d(0, 0, 1px) rotate(0.001deg);
						}

						&:nth-child(2) {
							position: absolute;
							top: 0;
							left: 5px;
							transform: translate3d(0, 25px, 1px) rotate(6deg);
						}
					}

					&:after {
						content: "";
						display: block;
						position: absolute;
						background: rgba(#1C1C1C, .62);
						height: 1.5px;
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
						height: 1.5px;
						width: 100%;
						bottom: 0;
						left: 0;
						transform-origin: 0 0;
						transform: scaleX(0)
					}
				}
			}
		}

		.full {
			transform: scale(0.7) translate3d(0,6px,1px)!important;
		}

		.errorfield {
			.form {
				&__error {
					opacity: 1!important;
				}

				
			}

			label {
				color:#DC4242!important;
			}
		}

		/deep/ .noUi-base {
			height: 1px;
			background-image: linear-gradient(90deg, #77AE53 0%, #F4C721 50%, #d75252 100%)!important;
			cursor: pointer;
		}

		/deep/ .noUi-target {
			border: 0!important;
		}

		/deep/ .noUi-origin {
			// right: 0!important;
		}

		/deep/ .noUi-handle {
			box-shadow: none!important;
			border: 0;
			background: transparent;
			cursor: pointer;
			outline: none!important;

			.circle {
				width: 11px;
				height: 11px;
				background-color: pink;
				position: absolute;
				left: 50%;
				transform: translate(-50%, 0);
				box-shadow: inset 0 0 0 2px #fff;
				cursor: pointer;
				outline: none!important;
				border-radius: 50%;
				border: 1px solid #fdfdfd;
				top: 1px;


			}

			&:before {
				display: none;
			}

			&:after {
				display: none;
			}
		}

		

		
	}

	@media(max-width: 1200px) {
		.calc {
			&__modal {
				width: 820px;
			}
		}
	}

	@media(max-width: 960px) {
		.calc {
			&__modal {
				width: 596px;
				height: 762px;
				transform: translate(0px, 1px);
			}

			&__close {
				display: none;
			}

			.modal {
				&__container {
					padding-top: 97px;
				}

				&__close {
					display: block;
					position: absolute;
					top: 32px;
					right: 32px;
					cursor: pointer;

					img {
						max-width: 16px;
					}
				}

				.form {

					&__btn {
						transform: translateX(15px);
						margin-top: 52px;
					}

					&__urgency {
						margin-top: 12px;
					}
				}
			}
		}
	}

	@media(max-width: 650px) {
		.calc {
			&__modal {
				width: 86.5%;
				height: 603px;
				transform: translate(0, 0);
			}

			.modal {

				&__container {
					padding-top: 46px;
				}
				&__title {
					max-width: 100%;
					font-size: 26px;
					line-height: 28px;
					padding-left: 0;
				}

				&__form {
					width: 269px;
				}

				&__close {
					top: 15px;
					right: 17px;
					img {
						max-width: 12px;
					}
				}

				.form {
					

					&__line {
						&:nth-child(6) {
							margin-top: -9px;
						}

						&_urgency {
							margin-top: 26px;
						}
					}
					&__radio {
						&:nth-child(1) {
							margin-right: 23px;
						}

						&:nth-child(2) {
							margin-right: 26px;
						}

						&:nth-child(3) {
							margin-right: 41px;
						}
					}

					&__title {
						float: left;
						padding-left: 0px;
					}

					&__counter {
						margin-top: -42px;
					}

					&__urgency {
						width: 100%;
						margin-top: 18px;

						// &:before {
						// 	top: -9px;
						// 	left: 0px;
						// }

						// &:after {
						// 	top: -9px;
						// }
					}

					&__btn {
						margin-top: 49px;
						transform: translate(0,0);
						padding: 0;
					}
				}
			}

			/deep/ .noUi-handle {
				// width: 15px!important;
				// height: 15px!important;
				// top: -7px;
				// left: -7px;

				.circle {
					width: 15px;
					height: 15px;
					top: -1px;
				}
				
			}
		}
	}

	@media(max-width: 375px) {
		.calc {
			&__modal {
				width: 88%;
				height: 587px;
				transform: translate(0px, 1px);
			}

			.modal {
				&__container {
					padding-top: 37px;
				}

				&__close {
					top: 10px;
					right: 13px;
				}
			}
		}
	}

	@media(max-width: 320px) {
		.calc {
			&__modal {
				height: 581px;
				width: 292px;
				transform: translate(0,0);
			}

			.modal {
				&__container {
					padding-top: 34px;
				}

				&__form {
					width: 252px;
				}

				&__close {
					top: 6px;
					right: 10px;
					img {
						max-width: 10px;
					}
				}

				.form {
					&__radio {
						&:nth-child(1) {
							margin-right: 19px;
						}

						&:nth-child(2) {
							margin-right: 18px;
						}

						&:nth-child(3) {
							margin-right: 35px;
						}
					}

					&__btn {
						margin-top: 51px;
						line-height: 16px;
					}
				}
			}
		}
	}

	.can-hover {
		.calc {
			.form {
				&__btn {
					&:hover {
						span {
							&:nth-child(1) {
								transition: opacity .5s ease;
								opacity: 0;
								transform: translate3d(0, 0, 1px) rotate(0.001deg);
							}

							&:nth-child(2) {
								transition: transform 1s ease;
								transform: translate3d(0, 0, 1px) rotate(0.001deg);
							}
						}

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
		}
	}

	.os-ios {
		.calc {
			.modal {
				.form__line {
					input {
						&:focus {
							& + label {
								transform: translate3d(0,100%, 1px) scale(1);
							}
							
						}

						&:active {
							& + label {
								transform: translate3d(0,100%, 1px) scale(1);
							}

						}
					}
				}
			}
		}
	}



	



</style>