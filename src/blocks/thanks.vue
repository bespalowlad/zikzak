<template lang="pug">
    .thanks(:class="{'thanks_active': modalShow}")
        .thanks__container
            .thanks__modal.modal
                .modal__container
                    .modal__content
                        .modal__title {{ $ml.get('calc.thanks') }}
                        .modal__text {{ $ml.get('calc.sended') }}
                        button.modal__btn(type="button" @click="modal = false" aria-label="Close")
                            span {{ $ml.get('calc.good') }}
                            span {{ $ml.get('calc.good') }}
</template>

<script>

	export default {
		name: 'thanks',
		data: function(){
			return {

			}
        },
        props: {
            modalShow: Boolean
        }
	}

</script>

<style lang="scss" scoped>
    .thanks {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.88);
        opacity: 0;
        transform: translate3d(0, 50px, 1px);
        z-index: 2;
        pointer-events: none;
        transition: opacity .5s ease, transform .5s ease;

        &_active {
            opacity: 1;
            pointer-events: all;
            transform: translate3d(0, 0, 1px);
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
            width: 943px;
            height: 541px;
            background-image: url('../assets/uploads/thanks-modal.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;

            &:before  {
                content: '';
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
            }

            &__content {
                text-align: center;
            }

            &__title {
                font: 700 54px/59px 'Avanti', sans-serif;
                color: #363636;
                padding-bottom: 16px;

            }

            &__text {
                font: 400 16px/26px 'Fatum', sans-serif;
                max-width: 40%;
                margin: 0 auto;
                color: #1c1c1c;
                opacity: 0.6;
                padding-bottom: 13px;
            }

            &__btn {
                font: 700 11px/25px 'Fatum',sans-serif;
                color: #1c1c1c;
                text-transform: uppercase;
                letter-spacing: 2px;
                // border-bottom: 1px solid #1c1c1c;
                margin-bottom: 5px;
                padding-top: 5px;
                transform: translateY(-4px);
                margin-right: 3px;
                position: relative;
                overflow: hidden;

                span{
                    &:nth-child(2) {
                        position: absolute;
                        top: 5px;
                        left: 0;
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

    @media(max-width: 1200px) {
        .thanks {
            &__modal {
                width: 90%;
            }
        }
    }

    @media(max-width: 960px) {
        .thanks {
            &__modal {
                width: 78%;
                height: 483px;
                transform: translate(-1px, 1px);
            }

            .modal {
                &__title {
                    font-size: 40px;
                    line-height: 42px;
                    padding-left: 4px;
                }

                &__text {
                    max-width: 65%;
                    padding-left: 15px;
                    padding-bottom: 14px;
                }

                &__btn {
                    margin-right: 0;
                    margin-left: 10px;
                    line-height: 21px;
                }
            }
        }
    }

    @media(max-width: 650px) {
        .thanks {
            &__modal {
                width: 86.5%;
                transform: translate(0px, 0px);
                height: 237px;
            }

            .modal {
                &__title {
                    font-size: 36px;
                    line-height: 38px;
                    padding-left: 0;
                    padding-bottom: 18px;
                }

                &__text {
                    max-width: 88%;
                    padding-left: 0;
                }

                &__btn {
                    transform: translateY(-1px);
                }
            }
        }
    }

    @media(max-width: 375px) {
        .thanks {
            &__modal {
                height: 266px;
                width: 88%;
                transform: translate(-1px, 0);
            }

            .modal {
                &__title {
                    padding-left: 18px;
                }

                &__text {
                    max-width: 85%;
                    padding-bottom: 17px;
                }

                &__btn {
                    transform: translateY(-6px);
                    margin-left: 3px;
                }
            }
        }
    }

    @media(max-width: 320px) {
        .thanks {
            &__modal {
                width: 292px;
                height: 251px;
                transform: translate(0px, -1px);
            }

            .modal {
                &__text {
                    max-width: 88%;
                    padding-bottom: 6px;
                    padding-left: 3px;
                }

                &__title {
                    padding-left: 0;
                    padding-right: 1px;
                }

                &__btn {
                    transform: translateY(4px);
                }
            }
        }
    }

    .can-hover {
        .thanks {
            .modal {
                &__btn {
                    &:hover {
                        span {
							&:nth-child(1) {
								transition: opacity .5s ease;
								opacity: 0;
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



</style>