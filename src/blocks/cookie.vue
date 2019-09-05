<template lang="pug">
    .cookie(data-aos="custom-fade" ref="cookie" :class="{'cookie_white': color}")
        .cookie__text {{ $ml.get('cookie.text') }} <router-link :to="$ml.get('lang_url') + '/terms-of-use/'">{{ $ml.get('cookie.cookie') }}</router-link>.
        .cookie__right
            button.cookie__btn(@click="setCookie()" aria-label="Got it!")
                span {{ $ml.get('cookie.got_it') }}
                span {{ $ml.get('cookie.got_it') }}
        button.cookie__close(@click="setCookie()" aria-label="Got it!")
</template>

<script>

	export default {
        name: 'cookie',
        props: {
            color: {
                type: Boolean,
                default: false
            }
        },
		data: function(){
			return {

			}
        },
        methods: {
            setCookie() {
                this.$refs.cookie.classList.add('cookie_hide');
                setTimeout(() => {
                    this.$store.dispatch('SET_COOKIES');
                }, 1000);
            }
        }
	}

</script>

<style lang="scss" scoped>
    .cookie {
        position: fixed;
        bottom: 9px;
        right: 9px;
        background-color: #1c1c1c;
        z-index: 1;
        padding: 15px 19px;
        padding-right: 46px;
        padding-bottom: 13px;
        width: 335px;

        &_white {
            background-color: #F5F5F3;

            .cookie__text {
                color: rgba(0, 0, 0, .7);

                a {
                    color: rgba(0, 0, 0, .9);
                }
            }

            .cookie__btn {
                color: #000;
            }

            .cookie__close {
                background: url('../assets/img/close_cookie_black.svg') no-repeat center center;
            }
        }

        &_hide {
            transition: transform 1s ease, opacity 1s ease !important;
            transform: translate3d(0, 20px, 1px) !important;
            opacity: 0 !important;
        }

        &__right {
            text-align: right;
        }

        &__text {
            font-size: 13px;
            color: rgba(255, 255, 255, .7);

            a {
                color: rgba(255, 255, 255, .9);
                text-decoration: underline;
                margin-left: 3px;
                // display: inline-block;
                transition: opacity .5s ease;

                @media screen and (min-width: 1200px) {
                    &:hover {
                        opacity: .7;
                    }
                }
            }
        }

        &__btn {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #fff;
            margin-top: 11px;
            overflow: hidden;
            position: relative;

            span {

                &:nth-child(1) {
                    transform: translate3d(0, 0, 1px) rotate(0.001deg);
                    display: inline-block;
                }

                &:nth-child(2) {
                    transform: translate3d(0, 100%, 1px) rotate(6deg);
                    transform-origin: 0 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    visibility: hidden;
                    transition: transform 0s ease, visibility 0s step-end;
                }
            }

            @media screen and (min-width: 1200px) {
                &:hover {
                    span {
                        &:nth-child(1) {
                            opacity: 0;
                            transition: opacity .5s ease;
                        }

                        &:nth-child(2) {
                            transform: translate3d(0, 0, 1px) rotate(0.001deg);
                            transition: transform 1s ease, visibility 0s step-start;
                            visibility: visible;
                        }
                    }
                }
            }
        }

        &__close {
            position: absolute;
            width: 20px;
            height: 20px;
            background: url('../assets/img/close_cookie.svg') no-repeat center center;
            top: 7px;
            right: 7px;
            transition: opacity .5s ease;

            @media screen and (min-width: 1200px) {
                &:hover {
                    opacity: .7;
                }
            }
        }
    }

    @media screen and (max-width: 650px) {
        .cookie {
            width: calc(100% - 44px);
            right: 22px;
            text-align: center;
            padding-left: 24px;
            padding-right: 30px;

            &__right {
                text-align: center;
            }
        }
    }
</style>