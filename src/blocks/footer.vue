<template lang="pug">
	footer.footer(data-aos="fade" :class="['footer_type_' + type]")
		.footer__links
			router-link.footer__link(:to="$ml.get('lang_url') + '/privacy-policy/'") .{{ $ml.get('main.privacy_policy') }}
			router-link.footer__link(:to="$ml.get('lang_url') + '/terms-of-use/'") .{{ $ml.get('main.terms_of_use') }}
		.footer__copy Company 2019 All Rights Reserved
		.footer__dev Devised by <a href="https://ribs.one/" target="_blank" rel="nofollow">RIBS</a>
</template>

<script>

	export default {
		name: 'block-footer',
		props: {
			type: {
				type: Number,
				default: 0
			}
		},
		data: function(){
			return {
				isBlack: true
			}
		}
	}

</script>

<style lang="scss" scoped>
	.footer {
		height: 58px;
		margin-top: -58px;
		color: rgba(255, 255, 255, .65);
		padding: 0 66px;
		text-align: center;
		table-layout: fixed;
		width: 100%;
		font-size: 0;
		position: relative;

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}

		&__link {
			margin-right: 14px;
			transition: opacity .5s ease;
			color: rgba(#fff, .9);
			opacity: .75;

			@media screen and (min-width: 1200px) {
				&:hover {
					opacity: 1;
				}
			}
		}

		&__links {
			text-align: left;
		}

		&__container {
			display: table-row;
		}

		&__links,
		&__copy,
		&__dev {
			display: inline-block;
			vertical-align: middle;
			width: calc(100% / 3);
			font-size: 15px;
		}

		&__dev {
			text-align: right;
			font-size: 10px;
			letter-spacing: 4px;
			color: rgba(#FFFFFF, .65);
			text-transform: uppercase;

			a {
				display: inline-block;
				color: #fff;

				@media screen and (min-width: 1200px) {
					&:after {
						content: "";
						display: block;
						height: 1px;
						background-color: #fff;
						width: calc(100% - 4px);
						margin-top: -2px;
						transform: scaleX(0);
						transition: transform .5s ease;
						transform-origin: 0 0;
					}

					&:hover {
						&:after {
							transform: scaleX(1);
						}
					}
				}
			}
		}

		&_type_1 {
			.footer__link {
				color: rgba(#fff, .9);
				opacity: .75;

				@media screen and (min-width: 1200px) {
					&:hover {
						opacity: 1;
					}
				}
			}
		}

		&_type_2 {
			color: rgba(#1C1C1C, .65);

			.footer__link {
				color: rgba(#1C1C1C, .9);
			}
			
			.footer__dev {
				color: rgba(#1C1C1C, .65);

				a {
					color: rgba(#1C1C1C, .9);

					&:after {
						background-color: rgba(#1C1C1C, .9);
					}
				}
			}
		}
	}
	
	@media screen and (max-width: 1200px) {
		.footer {
			height: 90px;
			margin-top: -90px;

			&__link {
				margin: 0 5px;
			}

			&__links,
			&__copy,
			&__dev {
				display: block;
				width: 100%;
				text-align: center;
				font-size: 14px;
			}

			&__dev {
				font-size: 11px;
				margin-top: 12px;
			}

			&__copy {
				margin-top: 11px;
			}

			&:before {
				display: none;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.footer {
			margin-top: -94px;
			height: 94px;
			padding: 0 28px;

			&_type_1 {
				text-align: left;

				.footer__copy,
				.footer__dev,
				.footer__links {
					text-align: left;
				}

				.footer__link {
					margin: auto;
					margin-right: 10px;
				}
			}
		}
	}

	@media screen and (max-width: 400px) {
		.footer {
			margin-top: -92px;
			height: 92px;
			padding: 0 22px;
		}
	}

	@media screen and (max-width: 350px) {
		.footer {
			margin-top: -93px;
			height: 93px;
			padding: 0 14px;
		}
	}



</style>