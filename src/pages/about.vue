<template lang="pug">
div
	main.content(ref="content")
		.about
			.poster(data-aos="custom-fade")
				.poster__bg
					video(:src="poster.video" muted loop playsinline ref="video" :autoplay="width < 1200 ? true : false")
				.poster__content
					.play(data-aos="circle")
						.play__line
						button.play__btn(@click="playVideo()" @mouseover="isPlaying = true" @mouseleave="isPlaying = false" aria-label="Play")
							.play__label
								.play__text
									span {{ $ml.get('about.play') }}
									span {{ $ml.get('about.play') }}
									span {{ $ml.get('about.play') }}
							.play__icon(data-aos="fade-in" data-aos-delay="500")
								img(src="@/assets/img/play.svg" alt="Play")
							.play__label
								.play__text
									span {{ $ml.get('about.video') }}
									span {{ $ml.get('about.video') }}
									span {{ $ml.get('about.video') }}
							<svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<circle class="play__c1" cx="111" cy="111" r="110" stroke="#DEDEDE" stroke-opacity="0.23" fill="none" />
								<circle class="play__c2" cx="111" cy="111" r="110" stroke="#DEDEDE" stroke-opacity="0.5" fill="none" />
							</svg>
					.poster__title(:data-cut-lines="poster.title" data-aos="title-fade" data-aos-delay="500") {{ poster.title }}
					.quote(data-aos="custom-fade" data-aos-delay="1000")
						.quote__text {{ poster.description }}
						.quote__bottom
							.quote__title {{ poster.author }}
							.quote__subtitle {{ poster.position }}
			.team(ref="team")
				.team__wrapper
					.team__heading
						.team__title-container
							.team__title(data-aos="title-fade" :data-cut-lines="$ml.get('about.our_team')" ) {{ $ml.get('about.our_team') }}
						//- .team__nav.nav
						//- 	button.nav__prev(type="button")
						//- 		img(src="@/assets/img/arrow-left-gray.svg")
						//- 	button.nav__next(type="button")
						//- 		img(src="@/assets/img/arrow-right-gray.svg")
						.filters.filters_desk(data-aos="custom-fade" data-aos-delay="200" v-if="positions.length != 0")
							button.filters__item(:class="{'filters__item_active': activeFilter === -1}" @click="activeFilter = -1, onClickFilter()" aria-label="All")
								.filters__line
									span .
									span {{ $ml.get('about.all') }}
								.filters__line
									span .
									span {{ $ml.get('about.all') }}
							button.filters__item(v-for="(filter, f) in positions" :class="{'filters__item_active': activeFilter === filter.id}" @click="activeFilter = filter.id, onClickFilter()" :aria-label="filter.name")
								.filters__line
									span .
									span {{ filter.name }}
								.filters__line
									span .
									span {{ filter.name }}
						swiper.filters.filters_mob(data-aos="custom-fade" data-aos-delay="200" v-if="positions.length != 0" :options="{slidesPerView: 'auto', spaceBetween: 10, slidesOffsetAfter: 20, nested: true}")
							swiper-slide
								button.filters__item(:class="{'filters__item_active': activeFilter === -1}" @click="activeFilter = -1, onClickFilter()" aria-label="All")
									.filters__line
										span .
										span {{ $ml.get('about.all') }}
									.filters__line
										span .
										span {{ $ml.get('about.all') }}
							swiper-slide(v-for="(filter, f) in positions" :key="f")
								button.filters__item( :class="{'filters__item_active': activeFilter === filter.id}" @click="activeFilter = filter.id, onClickFilter()" :aria-label="filter.name")
									.filters__line
										span .
										span {{ filter.name }}
									.filters__line
										span .
										span {{ filter.name }}
				.team__container(:class="{hidden: !alreadyClone}" v-if="desk && team.length != 0 && positions.length != 0 && isShowTeam" data-width="1200" )
					.team__line(data-aos="custom-fade" data-aos-delay="200")
						.text(v-for="(member, i) in filterTeam(activeFilter)" :key="i" v-if="i < Math.ceil(filterTeam(activeFilter).length / 2)" )
							.text__label {{ member.title.rendered }}
							.text__image(:style="{backgroundImage: 'url(' + member.acf.photo.url + ')'}" )
							.text__case
								.text__white {{ member.title.rendered }}
							.text__position {{ getPositions(member.position[0]) }}
							.text__poscont
								.text__poswhite {{ getPositions(member.position[0]) }}
					.team__line(data-aos="custom-fade" data-aos-delay="200")
						.text(v-for="(member, i) in filterTeam(activeFilter)" :key="i" v-if=" i >= Math.ceil(filterTeam(activeFilter).length / 2)")
							.text__label {{ member.title.rendered }}
							.text__image(:style="{backgroundImage: 'url(' + member.acf.photo.url + ')'}")
							.text__case
								.text__white {{ member.title.rendered }}
							.text__position {{ getPositions(member.position[0]) }}
							.text__poscont
								.text__poswhite {{ getPositions(member.position[0]) }}
				.team__container(:class="{hidden: !alreadyClone}" v-if="!desk  && team.length != 0 && positions.length != 0 && isShowTeam" data-width="960")
					.team__line(data-aos="custom-fade" data-aos-delay="200")
						.text(v-for="(member, i) in filterTeam(activeFilter)" :key="i" v-if="i < Math.ceil(filterTeam(activeFilter).length / 3)")
							.text__label {{ member.title.rendered }}
							.text__image(:style="{backgroundImage: 'url(' + member.acf.photo.url + ')'}" )
							.text__case
								.text__white {{ member.title.rendered }}
							.text__position {{ getPositions(member.position[0]) }}
					.team__line(data-aos="custom-fade" data-aos-delay="200")
						.text(v-for="(member, i) in filterTeam(activeFilter)" :key="i" v-if=" i >= Math.ceil(filterTeam(activeFilter).length / 3) && i < Math.ceil(filterTeam(activeFilter).length / 3) * 2 " )
							.text__label {{ member.title.rendered }}
							.text__image(:style="{backgroundImage: 'url(' + member.acf.photo.url + ')'}")
							.text__case
								.text__white {{ member.title.rendered }}
							.text__position {{ getPositions(member.position[0]) }}
					.team__line(data-aos="custom-fade" data-aos-delay="200" v-if="Math.ceil(filterTeam(activeFilter).length / 3) * 2 != filterTeam(activeFilter).length")
						.text(v-for="(member, i) in filterTeam(activeFilter)" :key="i" v-if=" i >= Math.ceil(filterTeam(activeFilter).length / 3) * 2" )
							.text__label {{ member.title.rendered }}
							.text__image(:style="{backgroundImage: 'url(' + member.acf.photo.url + ')'}")
							.text__case
								.text__white {{ member.title.rendered }}
							.text__position {{ getPositions(member.position[0]) }}
			.slider(data-aos="custom-fade" data-aos-delay="200")
				swiper(@slideChange="onSlideChange" :options="{autoplay: {delay: 7000}, speed: 1500, effect: 'fade', fadeEffect: {crossFade: true}, navigation: {nextEl: '.arrow_right', prevEl: '.arrow_left'}}"  ref="slider")
					swiper-slide(v-for="(slide, index) in photos" :key="index")
						.slider__bg(:style="{backgroundImage: 'url(\"' + slide.url + '\")'}")
				button.arrow.arrow_left(aria-label="Previous")
					img.arrow__img(src="@/assets/img/arrow_left.svg" alt="Previous")
					<svg class="arrow__circle" width="55"  height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="27.5" cy="27.5" r="27" stroke="white" stroke-opacity="0.25"/>
					<circle class="arrow__circle_white" cx="27.5" cy="27.5" r="27" stroke="white" stroke-opacity="1"/>
					</svg>
					//- .arrow__number.arrow__number_prev {{ (active-1) < 10 ? '0' + (active-1) : (active-1) }}
				button.arrow.arrow_right(aria-label="Next")
					img.arrow__img(src="@/assets/img/arrow_right.svg" alt="Next")
					<svg  class="arrow__circle" width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="27.5" cy="27.5" r="27" stroke="white" stroke-opacity="0.25"/>
					<circle class="arrow__circle_white" cx="27.5" cy="27.5" r="27" stroke="white" stroke-opacity="1"/>
					</svg>
					//- .arrow__number.arrow__number_next {{ (active+1) < 10 ? '0' + (active+1) : (active+1) }}
				.slider__info
					.slider__active {{ active < 10 ? '0' + active : active }}
					.slider__total {{ total < 10 ? '0' + total : total }}
			.clients
				.clients__title(data-aos="custom-fade" data-aos-delay="200") {{ $ml.get('about.our_clients') }}
				.clients__list(v-if="width > 1200")
					.card(v-for="(card, index) in clients" :key="index" data-aos="custom-fade" :data-aos-delay="200 + (index*50)")
						img.card__img(:src="card.logo.url" alt="Client logo")
				slick.clients__slider(v-if="width <= 1200 && clients.length" :options="{variableWidth: true, rows: 4, infinite: false, arrows: false}" data-aos="custom-fade" data-aos-delay="200")
					.clients__slide(v-for="(card, index) in clients" :key="index")
						.card
							img.card__img(:src="card.logo.url" alt="Client logo")
		block-footer(:type='2')
		block-header(:type='1')
		block-menu(:type='1')
		block-cookie(v-if="!isCookie")
		.modal(:class="{'modal_active': isVideoOpen}")
			button.modal__close(@click="closeVideo()" aria-label="Close")
			.modal__inner
				.modal__frame(v-if="isVideoOpen" v-html="videoString.replace('[[link]]', poster.video_vimeo)")
	block-preloader(v-if="!isPreloader")
</template>

<script>

	import blockHeader from '@/blocks/header.vue';
	import blockFooter from '@/blocks/footer.vue';
	import 'swiper/dist/css/swiper.css';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import Slick from 'vue-slick';
	import {mapState, mapGetters} from 'vuex';
	import blockPreloader from '@/blocks/preloader.vue';
	import blockMenu from '@/blocks/menu.vue';
	import AOS from 'aos';
	import blockCookie from '@/blocks/cookie.vue';

	let windowW = window.innerWidth;

	let image;
	let cont;
	let white;
	let poscont;
	let poswhite;

	export default {
		name: 'About',
		metaInfo: function() {
			let th = this;

			return {
				title: th.about.yoast_meta ? th.getTitle() : 'Zikzak architects'
			}
		},
		data: function(){
			return {
				width: window.innerWidth,
				active: 1,
				total: 0,
				poster: {},
				photos: [],
				clients: [],
				activeFilter: -1,
				desk: window.innerWidth > 1200,
				alreadyClone: false,
				isVideoOpen: false,
				isPlaying: false,
				isShowTeam: true,
				videoString: '<iframe src="[[link]]" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
			}
		},
		created() {
			if (this.about.isEmpty) this.$store.dispatch('GET_ABOUT_PAGE')
			else {
				this.poster = this.about.acf.poster;
				this.photos = this.about.acf.photos;
				this.clients = this.about.acf.clients.list;
			}

			if (!this.team.length) this.$store.dispatch('GET_TEAM');


			if (this.main.isEmpty) this.$store.dispatch('GET_MAIN_PAGE');
			if (this.contacts.isEmpty) this.$store.dispatch('GET_CONTACTS_PAGE');
			if (!this.projects.length) this.$store.dispatch('GET_PROJECTS');
			if (this.projectsPage.isEmpty) this.$store.dispatch('GET_PROJECTS_PAGE');
			if (this.services.isEmpty) this.$store.dispatch('GET_SERVICES_PAGE');
			if (!this.categories.length) this.$store.dispatch('GET_CATEGORIES');
			if (!this.positions.length) this.$store.dispatch('GET_POSITIONS');
		},
		methods: {
			getTitle() {
				let obj = this.about.yoast_meta.find(item => item.property === 'og:title');
				return obj ? obj.content : '';
			},
			onClickFilter() {
				this.isShowTeam = false;
				setTimeout(() => {
					this.isShowTeam = true;
					setTimeout(() => {
						this.clonePersons();
					});
				})
			},
			closeVideo() {
				this.isVideoOpen = false;
				if (this.width < 1200) this.$refs.video.play();
			},
			playVideo() {
				this.isVideoOpen = true;
				this.$refs.video.pause();
			},
			onSlideChange() {
				this.active = this.slider.realIndex+1;
			},
			onClick(t) {
				let line = t.closest('.team__line');
				let lines = document.querySelectorAll('.team__line');
				for (let i = 0; i < lines.length; i++) {
					lines[i].style.animationPlayState = 'running';
					// lines[i].style.zIndex = '0';
				}
				let ts = document.querySelector('.text_active');
				if (ts != undefined) ts.classList.remove('text_active');
				line.style.animationPlayState = 'paused';
				// line.style.zIndex = '1';
				t.classList.add('text_active');
			},
			onClickTest(e) {
				let t = e.target;
				let line = t.closest('.team__line');
				let lines = document.querySelectorAll('.team__line');
				for (let i = 0; i < lines.length; i++) {
					lines[i].style.animationPlayState = 'running';
					lines[i].style.zIndex = '0';
				}
				let ts = document.querySelector('.text_active');
				if (ts != undefined) ts.classList.remove('text_active');
				line.style.animationPlayState = 'paused';
				line.style.zIndex = '1';
				t.classList.add('text_active');
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
				let t = this;
				this.getWidth();
				setTimeout(() => {
					let newWindowW = window.innerWidth;

					this.width = newWindowW;
					if (newWindowW != windowW) {
						window.scrollTo(0, 0);
					}

					if (newWindowW != windowW) {
						this.cutLinesOnResize();
					}
					windowW = newWindowW;
					t.clonePersons();
				}, 1000);
				
			},
			clonePersons() {
				let lines = document.querySelectorAll('.team__line');
				for (let a = 0; a < lines.length; a++) {
				// lines.forEach((line, j) => {
					let line = lines[a];
					let j = a;

					let ww = window.innerWidth;
					let lineArr = Array.from(line.children);
					let elementary = Math.ceil((ww * 2) / line.clientWidth);
					if(line.clientWidth > 0) {
						if(line.clientWidth < ww * 2) {
							for(var k = 0; k < elementary; k++) {
								for(var i = 0; i < lineArr.length; i++) {
									if(line.clientWidth < ww) {
										line.append(lineArr[i].cloneNode(true));
										this.alreadyClone = true;
									} else if(line.clientWidth < ww * 2){
										Array.from(line.children).forEach((item) =>{
											line.append(item.cloneNode(true));
										})
									}
								}
							}
							this.alreadyClone = true;
						} else {
							Array.from(line.children).forEach((item) =>{
								line.append(item.cloneNode(true));
								this.alreadyClone = true;
							})
						}

						line.classList.add('paused');
						line.style.animationDuration = line.children.length * 1.5 + j * 5 + 's';
						setTimeout(() => {
							line.classList.remove('paused');
						});
					}
					
					

				// })
				}

			},
			getWidth() {
				this.desk = window.innerWidth > 1200 ? true : false;
			},
			moveImage(e) {
				let image = e.target.children;
				console.log(image);
			}
		},
		updated() {
			if(!this.isPreload && this.alreadyClone == false && this.team.length != 0 && this.positions.length != 0) {
				this.$nextTick(() => {
					this.clonePersons();
				})
			}
		},
		mounted() {
			this.getWidth();

			this.$nextTick(() => {
				this.cutLinesOnResize();
				AOS.refreshHard();
				AOS.init({
					once: true,
					disabled: 'mobile',
					duration: 1000,
					offset: 0
				});
				if(!this.isPreload && !this.alreadyClone && this.team.length != 0 && this.positions.length != 0) {
					this.clonePersons();
				}

				this.total = this.slider.slides.length;
				this.$refs.content.classList.add('show');
			});

		},
		computed: {
			slider() {
				return this.$refs.slider.swiper;
			},
			...mapState([
				'main',
				'about',
				'services',
				'categories',
				'positions',
				'projects',
				'team',
				'contacts',
				'projectsPage',
				'isCookie',
				'isPreloader'
			]),
			...mapGetters([
				'getPositions',
				'filterTeam'
			])
		},
		components: {
			'block-header': blockHeader,
			'block-footer': blockFooter,
			'block-preloader': blockPreloader,
			'block-menu': blockMenu,
			'block-cookie': blockCookie,
			swiper,
			swiperSlide,
			Slick
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeHandler);
			window.removeEventListener('orientationchange', this.resizeHandler);
		},
		watch: {
			about() {
				this.poster = this.about.acf.poster;
				this.photos = this.about.acf.photos;
				this.clients = this.about.acf.clients.list;
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
			},
			activeFilter() {

				this.clonePersons();
			},
			isPlaying() {
				if (this.width < 1200) return;

				if (this.isPlaying) {
					this.$refs.video.play();
				} else {
					this.$refs.video.pause();
				}
			},
			alreadyClone() {
				if(this.alreadyClone == true) {
					document.addEventListener('click', (e) => {
						if (e.target && e.target.classList.contains('text') && e.target.closest('.text') != null) {  
							this.onClick(e.target);
						} else if(e.target && !e.target.classList.contains('text') && e.target.closest('.text') == null) {
							let lines = document.querySelectorAll('.team__line');
							for (let i = 0; i < lines.length; i++) {
								lines[i].style.animationPlayState = 'running';
							}
							let ts = document.querySelector('.text_active');
							if (ts != undefined) ts.classList.remove('text_active');
						}
					}, false);
					// document.addEventListener('mouseenter', (e) => {
					// 	console.log(e.target);
					// 	if(e.target && e.target.classList.contains('text') && e.target.closest('.text') != null) {
					// 		image = Array.from(e.target.children).find(item => item.className == 'text__image');
					// 		cont = Array.from(e.target.children).find(item => item.className == 'text__case');
					// 		white = cont.children[0];
					// 		console.log(image);
					// 	}
					// }, false);
					document.addEventListener('mousemove', (e) => {
						if(e.target && e.target.classList.contains('text') && e.target.closest('.text') != null) {
							image = Array.from(e.target.children).find(item => item.className == 'text__image');
							cont = Array.from(e.target.children).find(item => item.className == 'text__case');
							poscont = Array.from(e.target.children).find(item => item.className == 'text__poscont');
							white = cont.children[0];
							poswhite = poscont.children[0];
							let cX = e.clientX;
							let cY = e.clientY;
							let rect = image.getBoundingClientRect();
							let X = cX - (rect.left + rect.right) / 2 + 'px'; 
							let Y = cY - (rect.top + rect.bottom) / 2 + 'px';
							let wX = -(cX - (rect.left + rect.right) / 2) + 'px';
							image.style.transform = 'translate3d('+X+',' + Y + ', 1px)';
							image.style.transition = 'transform .1s linear, opacity .8s ease';
							cont.style.transform = 'translate3d('+X+',' + 0 + ', 1px)';
							cont.style.transition = 'transform .1s linear';
							poscont.style.transform = 'translate3d('+X+',' + 0 + ', 1px)';
							poscont.style.transition = 'transform .1s linear';
							white.style.transform = 'translate3d('+wX+', ' + 0 + ', 1px)';
							white.style.transition = 'transform .1s linear, opacity .1s ease';
							poswhite.style.transform = 'translate3d('+wX+', ' + 0 + ', 1px)';
							poswhite.style.transition = 'transform .1s linear, opacity .1s ease';


						}
					}, false);
					// document.addEventListener('mouseleave', (e) => {
					// 	if(e.target && e.target.classList.contains('text') && e.target.closest('.text') != null) {
					// 		image.setAttribute('style', '');
					// 		cont.setAttribute('style', '');
					// 		white.setAttribute('style', '');
					// 		console.log('CLEAN');
					// 		console.log(white);
					// 	}
					// })
				}
			}
		}
	}

</script>


<style lang="scss" scoped>

	.modal {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #1C1C1C;
		padding: 65px;
		z-index: 3;
		visibility: hidden;
		opacity: 0;
		transition: opacity 1s ease, visibility 1s step-end;

		&__frame {
			width: 100%;
			height: 100%;

			/deep/ iframe {
				width: 100%;
				height: 100%;
			}
		}

		&_active {
			visibility: visible;
			opacity: 1;
			transition: opacity 1s ease, visibility 0s step-start;

			.modal__inner {
				transform: none;
			}
		}

		&__close {
			position: absolute;
			width: 30px;
			height: 30px;
			top: 20px;
			right: 20px;
			background: url('../assets/img/close.svg') no-repeat center center;
			transition: opacity .5s ease;
			z-index: 1;

			&:hover {
				opacity: .7;
			}
		}

		&__inner {
			width: 100%;
			height: 100%;
			background-color: #1c1c1c;
			transition: transform 1s ease;
			transform: translate3d(0, 50px, 1px) rotate(3deg) scaleY(1.2);
			transform-origin: 0 0;
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

	.hidden {
		opacity: 0;
	}

	html:not(.no-js) .circle [data-aos=title-fade].aos-animate /deep/ > .line > .line {
		transform:translate3d(0,0,1px) rotate(0.001deg);
	}

	html:not(.no-js) [data-aos=circle] {
		.play__line {
			transform-origin: 0 0;
			transform: scaleX(0);
			transition: transform 2s ease;
			transition-delay: 1s;
		}

		svg {
			opacity: 0;
			transition: opacity .5s ease;
			transition-delay: 1s;

			.play__c1 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset 1s ease;
				transition-delay: 1.5s;
			}
		}
	}
	html:not(.no-js) [data-aos=circle].aos-animate{
		.play__line {
			transform: none;
		}
		
		.circle__inner {
			opacity: 1;
		}

		svg {
			opacity: 1;

			.play__c1 {
				stroke-dashoffset: 0;
			}
		}

		.play__text span {
			// &:nth-child(3) {
			// 	opacity: 0;
			// }
			&:nth-child(2) {
				// opacity: 1;
			}
		}

		.play__btn {
			&:after {
				transform: none;
				transition: transform 1s ease 1s;
			}
		}
	}

	html:not(.no-js) [data-aos=circle].aos-init {
		.play__text span {
			&:nth-child(1){
				opacity: 1;
				transform: translate3d(0, 0, 1px) rotate(0.001deg);
				transition: transform 1.2s ease 1s, opacity 0s linear 0.2s;
				animation: hide 0s forwards 2s ease;

				@keyframes hide {
					0% {
						opacity: 1;
					}

					100% {
						opacity:0;
					}
				}
			}
			&:nth-child(2) {
				// transform: translate3d(0, 0, 1px) rotate(0.001deg);
				// transition: transform 1.2s ease 1s, opacity 0s linear 0.2s;
				visibility: hidden;
				animation: show 0s forwards 2s ease;

				@keyframes show {
					0% {
						visibility: hidden;
					}

					100% {
						visibility: visible;
					}
				}
			}
		}
	}

	.filters {
		display: inline-block;
		vertical-align: top;
		margin-top: 39px;
		margin-left: 37px;
		overflow: hidden;
		
		&_mob {
			display: none;
		}

		&__line {
			&:nth-child(2) {
				position: absolute;
				top: 0;
				left: 0;
				transform: translate3d(0, 25px, 1px) rotate(6deg);
				visibility: hidden;
				padding-left: 5px;
			}
		}

		&__item {
			display: inline-block;
			vertical-align: top;
			font: 9px/1 'Fatum', Arial, Helvetica, sans-serif;
			color: #1C1C1C;
			text-transform: uppercase;
			letter-spacing: 3px;
			margin-right: 30px;
			opacity: .65;
			transition: opacity .5s ease , transform .5s ease;
			white-space: nowrap;
			position: relative;
			overflow: hidden;
			padding-left: 5px;

			// &:nth-child(2) {
			// 	margin-right: 0;
			// }

			span {
				display: inline-block;

				&:nth-child(1) {
					opacity: 0;
					transition: opacity .5s ease;
				}

				&:nth-child(2) {
					transition: transform .5s ease;
					transform: translate3d(-10px, 0, 1px);
				}
			}

			&_active {
				opacity: 1;
				transform: translate3d(-5px, 0 , 1px);

				span {
					&:nth-child(1) {
						opacity: 1;
					}

					&:nth-child(2) {
						transform: translate3d(0, 0, 1px);

					}
				}
			}

			@media(min-width: 1200px) {
				&:hover {
					.filters {
						&__line {
							&:nth-child(1) {
									transition: opacity .5s ease;
									opacity: 0;
								}

								&:nth-child(2) {
									visibility: visible;
									transition: transform 1s ease, visibility 0s step-start;
									transform: translate3d(0, 0, 1px) rotate(0.001deg);
								}
						}
					}
				}
				
			}
		}
	}

	.quote {
		position: absolute;
		bottom: 67px;
		right: 120px;
		max-width: 355px;
		text-align: left;
		color: #fff;

		&__text {
			font-size: 16px;
			line-height: 26px;
		}

		&__title {
			font-weight: 700;
			font-size: 10px;
			line-height: 18px;
			text-transform: uppercase;
			letter-spacing: 2px;
		}

		&__subtitle {
			font-size: 10px;
			line-height: 18px;
			text-transform: uppercase;
			letter-spacing: 2px;
		}

		&__bottom {
			text-align: right;
			margin-top: 8px;
			margin-right: -2px;
		}
	}

	.play {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;

		&__icon {
			margin: 6px 0 2px;
		}

		&__label {
			color: #F5F5F3;
			font-weight: 700;
			font-size: 13px;
			letter-spacing: 4px;
			text-transform: uppercase;
		}

		&__text {
			position: relative;
			display: inline-block;
			vertical-align: top;
			overflow: hidden;

			span {
				&:nth-child(2) {
					position: absolute;
					top: 0;
					left: 0;
					// transform: translate3d(0, 25px, 1px) rotate(6deg);
					opacity: 1;
					// transition: opacity .5s ease;

				}

				// &:nth-child(3) {
				// 	position: absolute;
				// 	top: 0;
				// 	left: 0;
				// 	transform: translate3d(0, 25px, 1px) rotate(6deg);
				// }

				&:nth-child(1) {
					display: inline-block;
					transform: translate3d(0, 25px, 1px) rotate(6deg);
					opacity: 0;
					transition: opacity 0s ease;
				}

				&:nth-child(3) {
					display: inline-block;
					transform: translate3d(0, 25px, 1px) rotate(6deg);
					opacity: 0;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					transition: opacity 0s ease, transform 1.2s ease;
					// color: red;
					// z-index: 10;
				}
			}
		}

		&__line {
			height: 1px;
			background-color: rgba(#DEDEDE, .23);
		}

		svg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			transform: rotate(180deg);

			.play__c2 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				transition: stroke-dashoffset 1s ease;
			}
		}

		&__btn {
			display: block;
			width: 222px;
			height: 222px;
			border-radius: 50%;
			margin: -111px auto 0;
			padding-top: 2px;
			position: relative;

			@media screen and (min-width: 1200px) {
				&:hover {
					svg {
						.play__c2 {
							stroke-dashoffset: 0;
						}
					}

					.play {
						&__label {
							.play {
								&__text {
									span {
										&:nth-child(2) {
											// transform: translate3d(0, 0, 1px) rotate(0.001deg)!important;
											// transition: transform 1.2s ease!important;
											opacity: 0;
											transition: opacity .5s ease;
											// visibility: hidden;
										}

										&:nth-child(3) {
											transform: translate3d(0, 0, 1px) rotate(0.001deg);
											// transition: transform 1.2s ease;
											opacity: 1;
										}

										&:nth-child(1) {
											// opacity: 0;
											// opacity: 0;
											// visibility: hidden;
											// transition: opacity 1.2s ease!important;
										}
									}
								}
							}
						}
						
						
						
						
						
					}
				}
			}
		}
	}

	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		transition: opacity .5s ease;
		opacity: 0;
	}

	.arrow {
		position: absolute;
		top: calc(50% - 27px);
		z-index: 1;
		text-align: center;
		width: 82px;

		@media screen and (min-width: 1200px) {
			&:hover {
				.arrow__number {
					opacity: 1;
				}

				.arrow__circle_white {
					stroke-dasharray: 170 170;
					stroke-dashoffset: 0;
				}
			}
		}

		&__number {
			font-size: 11px;
			letter-spacing: 2px;
			position: absolute;
			color: #fff;
			top: 3px;
			transition: opacity .5s ease;
			opacity: 0;

			&_prev {
				left: -16px;
			}

			&_next {
				left: 83px;
			}
		}

		&__img {
			transition: opacity .5s ease;
		}

		&__circle {
			display: block;
			width: 55px;
			height: 55px;
			// border: 1px solid rgba(#fff, .25);
			// border-radius: 50%;
			margin: -40px auto 0;
			position: relative;
			transition: opacity .5s ease;

			&_white {
				stroke-dasharray: 170 170;
				stroke-dashoffset: 170;
				transition: stroke-dasharray 1s ease, stroke-dashoffset 1s ease;
			}
		}

		&_left {
			left: 66px;

			.arrow__circle {
				left: -23px;
			}
		}

		&_right {
			right: 66px;

			.arrow__circle {
				right: -23px;
			}
		}

		/deep/ &.swiper-button-disabled {
			cursor: default;
			pointer-events: none;
			
			.arrow__number {
				opacity: 0;
				transition: none;
			}

			.arrow__circle {
				opacity: .4;
			}

			.arrow__img {
				opacity: .4;
			}
		}

		&_disabled {
			.arrow__number {
				opacity: 0;
			}

			.arrow__circle {
				opacity: .4;
			}

			.arrow__img {
				opacity: .4;
			}
		}
	}

	.slider {
		background-color: #1c1c1c;
		position: relative;

		&__info {
			display: none;
		}

		&__bg {
			padding-top: 44.51%;
			background-size: cover;
			background-position: center;
			position: relative;
			transform: scale(1.4);
			filter: blur(4px);
			transition: transform 1s ease, filter .5s ease;
			will-change: transform;

			&:before {
				content: "";
				width: 100%;
				height: 100%;
				display: block;
				background: url('../assets/img/slider.png') no-repeat center center;
				background-size: cover;
				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}

	.slider {
		/deep/ .swiper-slide-active {
			.slider__bg {
				transform: scale(1);
				filter: blur(0px);
			}
		}
	}

	.card {
		display: inline-block;
		vertical-align: top;
		width: 20%;
		height: 101px;
		background-color: rgba(#F0F0F0, .74);
		border: 1px solid #F5F5F3;
		text-align: center;

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}

		&__img {
			display: inline-block;
			vertical-align: middle;
			max-height: 68%;
			max-width: 80%;
		}
	}

	.clients {
		width: 77.36%;
		margin: 103px auto;
		max-width: 90%;

		&__title {
			font: 700 54px/1 'Avanti', Arial, Helvetica, sans-serif;
			color: #363636;
		}

		&__list {
			font-size: 0;
			margin-top: 54px;
		}
	}

	.text {
		// padding: 0 25px;
		// padding-right: 50px;
		display: inline-block;
		vertical-align: top;
		font: 700 34px/1 'Avanti', Arial, Helvetica, sans-serif;
		color: #363636;
		position: relative;
		backface-visibility: hidden;
		z-index: 1;
		cursor: pointer;
		margin: 0 25px;
		padding: 15px 0;

		&__position {
			position: absolute;
			top: 57px;
			left: 0;
			font: 14px/1 'Fatum', Arial, Helvetica, sans-serif;
			color: #1c1c1c;
			opacity: 0;
			pointer-events: none;
		}

		&__label {
			position: relative;
			pointer-events: none;
			z-index: 1;
		}

		&__case {
			position: absolute;
			width: 204px;
			height: 278px;
			// left: calc(50% - 102px);
			top: -85px;
			left: 0;
			overflow: hidden;
			pointer-events: none;
			transform: translateZ(1px);
			z-index: 1;
			// margin-top: -65%;
			// margin-left: calc(50% - 102px);
		}

		&__poscont {
			position: absolute;
			width: 204px;
			height: 278px;
			// left: calc(50% - 102px);
			top: -85px;
			left: 0;
			overflow: hidden;
			pointer-events: none;
			transform: translateZ(1px);
			z-index: 1;
		}

		&__image {
			position: absolute;
			width: 204px;
			height: 278px;
			left: calc(50% - 102px);
			left: 0;
			top: -100px;
			background-size: cover;
			background-position: center;
			opacity: 0;
			transition: opacity .5s ease;
			pointer-events: none;
			transform: translate3d(0,50px,1px) scaleY(1.2) rotate(2deg);
			visibility: hidden;
			transition: opacity .8s ease, transform .8s ease, visibility .8s step-end;
			pointer-events: none;
			z-index: 1;


			// &_active {
			// 	transform: translate3d(0,0,1px) scale(1) rotate(0deg);
			// 	pointer-events: none;
			// 	transition: transform .1s ease;
			// }
		}

		&__white {
			color: #fff;
			// margin-top: 100px;
			// margin-left: -120px;
			transition: opacity .5s ease 0;
			opacity: 0;
			z-index: 1;
			pointer-events: none;
			position: absolute;
			top: 100px;
			left: 0;
			// margin-left: calc(50% - 102px + 25px);
			max-width: 204px;
			white-space: nowrap;
			// overflow: hidden;
			// transform: translate3d(50%, 0, 1px);


		}

		&__poswhite {
			color: #fff;
			// margin-top: 100px;
			// margin-left: -120px;
			transition: opacity .5s ease 0;
			opacity: 0;
			z-index: 1;
			pointer-events: none;
			position: absolute;
			top: 142px;
			left: 0;
			// margin-left: calc(50% - 102px + 25px);
			max-width: 204px;
			white-space: nowrap;
			font: 14px/1 'Fatum', Arial, Helvetica, sans-serif;
		}

		@media screen and (min-width: 1200px) {
			&:hover {
				.text__image {
					opacity: 1;
					transform: translate3d(0,0,1px) scaleY(1) rotate(0.001deg);
					visibility: visible;
					transition: opacity .8s ease, transform .8s ease, visibility 0s step-start;
				}

				.text__position {
					opacity: .6;
				}

				.text__white {
					opacity: 1;
					transition: opacity .1s ease;
				}

				.text__poswhite {
					opacity: 1;
					transition: opacity .1s ease;
				}
			}
		}

		&_active {
			.text__image {
				opacity: 1;
				transform: translate3d(0,0,1px) scaleY(1) rotate(0.001deg);
				visibility: visible;
				transition: opacity .8s ease, transform .8s ease, visibility 0s step-start;
			}

			.text__position {
				opacity: .6;
			}

			.text__white {
				opacity: 1;
				transition: opacity .5s ease;
			}

			.text__poswhite {
				opacity: 1;
				transition: opacity .5s ease;
			}
		}
	}

	.team {
		// width: 77.36%;
		margin: auto;
		height: 436px;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
			-ms-user-select: none; /* Internet Explorer/Edge */
				user-select: none;
		position: relative;
		// cursor: pointer;
		// cursor: none;

		&__wrapper {
			width: 77.36%;
			margin: auto;
		}

		&__container {
			margin-top: 55px;
			margin-top: 40px;
			transition: opacity .5s ease;
			position: relative;
		}

		&:before {
			content: "";
			display: table;
		}

		&__heading {
			margin-top: 101px;
			position: relative;
			white-space: nowrap;
			// z-index: 2;
		}

		&__nav {
			display: none;
		}

		&__title {
			font: 700 54px/1 'Avanti', Arial, Helvetica, sans-serif;
			color: #363636;
			display: inline-block;
			vertical-align: top;
			float: left;
		}

		&__line {
			white-space: nowrap;
			display: inline-block;
			vertical-align: top;
			margin-bottom: 7px;
			position: relative;
			backface-visibility: hidden;
			will-change: transform;

			&.paused {
				animation-play-state: paused !important;
			}

			&:nth-child(1) {
				animation: line 10s linear infinite;

				.text {
					// &__image {
					// 	top: -94px;
					// }

					// &__case {
					// 	top: -94px;
					// }

					// &__white {
					// 	margin-top: 94px;
					// }
				}
			}

			&:nth-child(2) {
				animation: line 15s linear infinite;

				.text {
					// &__image {
					// 	top: -150px;
					// }

					// &__case {
					// 	top: -150px;
					// }

					// &__white {
					// 	margin-top: 150px;
					// }
				}
			}

			&:nth-child(3) {
				animation: line 20s linear infinite;
				display: none;

				.text {
					// &__image {
					// 	top: -94px;
					// }

					// &__case {
					// 	top: -94px;
					// }

					// &__white {
					// 	margin-top: 94px;
					// }
				}
			}

			@keyframes line {
				from {
					transform: translate3d(0, 0, 1px);
				}

				to {
					transform: translate3d(-50%, 0, 1px);
				}
			}

			@media screen and (min-width: 1200px) {
				&:hover {
					z-index: 1;
					animation-play-state: paused !important;
				}
			}
		}
	}

	.poster {
		padding-top: 47.36%;
		background-color: #000;
		position: relative;
		min-height: 600px;

		&__bg {
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-size: cover;
			background-position: center;
			// opacity: .5;

			&:after {
				content: "";
				display: block;
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(0, 0, 0, .5);

			}
		}

		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			text-align: center;
			padding-top: 10.1%;
		}

		&__title {
			font: 700 54px/59px 'Avanti', Arial, Helvetica, sans-serif;
			color: #fff;
			max-width: 678px;
			margin: auto;
			position: relative;
			pointer-events: none;
		}
	}

	.about {
		margin-bottom: 126px;
		overflow: hidden;
	}

	@media screen and (max-width: 1200px) {

		.modal {
			padding: 32px;
		}

		.text {
			font-size: 26px;
			// z-index: 3;

			&_active {
				.text__image {
					opacity: 1;
					visibility: visible;
				}
			}

			&__image {
				width: 173px;
				height: 235px;
			}

			&__case {
				width: 173px;
				height: 235px;
			}

			&__poscont {
				width: 173px;
				height: 235px;
			}

			&__white {
				// margin-left: -120px;
				max-width: 173px;
			}

			&__poswhite {
				max-width: 173px;
			}

			&__position {
				top: 43px;
			}
		}

		.filters {
			display: block;
			margin-left: 0px;
			margin-top: 26px;
			white-space: nowrap;
			overflow: hidden;

			&__item {
				margin-right: 24px;
			}

			&_mob {
				display: none;
			}
		}

		.team {
			height: 376px;

			&:after {
				position: absolute;
				content: '';
				width: 15%;
				height: 100%;
				right: 0;
				bottom: 0;
				background: linear-gradient(270deg, #F5F5F3 0%, rgba(245, 245, 243, 0.74) 49.37%, rgba(245, 245, 243, 0.1) 93.86%);
				z-index: 1;
				pointer-events: none;
			}

			&__line {
				margin-bottom: 5px;

				&:nth-child(1) {
					// .text__image {
					// 	top: -54px;
					// }

					// .text___case {
					// 	top: -54px;
					// }

					// .text__white {
					// 	margin-top: 54px;
					// 	// margin-left: -50px;
					// }
				}

				&:nth-child(2) {
					// .text__image {
					// 	top: -100px;
					// }

					// .text__case {
					// 	top: -100px;
					// }

					// .text__white {
					// 	margin-top: 100px;
					// 	// margin-left: -50px;
					// }
				}

				&:nth-child(3) {
					display: block;

					// .text__image {
					// 	top: -146px;
					// }

					// .text__case {
					// 	top: -146px;
					// }

					// .text__white {
					// 	margin-top: 146px;
					// 	// margin-left: -50px;
					// }
				}
			}

			&__container {
				margin-top: 7px;

				
			}

			&__heading {
				margin-top: 80px;
			}

			&__wrapper {
				width: 100%;
				padding: 0 32px;
			}

			&__title {
				font-size: 36px;
				display: block;
				float: none;
			}
		}

		.play {
			&__icon {
				margin: 6px 0 7px;
			}
		}

		.quote {
			top: calc(50% + 172px);
			bottom: auto;
			right: 31px;
		}

		.poster {
			height: 100vh;
			padding-top: 0;
			font-size: 0;

			&__content {
				padding-top: 0;
				display: inline-block;
				position: relative;
				height: auto;
			}

			&__title {
				font-size: 40px;
				position: absolute;
				bottom: 50%;
				width: 490px;
				left: calc(50% - 245px);
				margin-bottom: 123px;
				font-size: 40px;
				line-height: 42px;
			}

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}
		}

		.slider {
			&__bg {
				padding-top: 49%;
			}

			&__info {
				display: block;
				position: absolute;
				width: 100%;
				text-align: center;
				left: 0;
				bottom: 21px;
				color: #fff;
				font-size: 11px;
				letter-spacing: 2px;
				z-index: 1;
			}

			&__total {
				display: inline-block;
				vertical-align: middle;
			}

			&__active {
				display: inline-block;
				vertical-align: middle;

				&:after {
					content: "/";
				}
			}

		}

		.arrow {
			top: calc(50% - 25px);
			height: 50px;

			&__img {
				position: absolute;
				top: calc(50% - 7px);
			}

			&__number {
				display: none;
			}

			&__circle {
				width: 47px;
				height: 47px;
				margin-top: -2px;
			}

			&_right {
				.arrow__circle {
					margin-right: -11px;
				}

				.arrow__img {
					right: -15px;
				}
			}

			&_left {
				.arrow__circle {
					margin-left: -11px;
				}

				.arrow__img {
					left: -15px;
				}
			}
		}

		.clients {
			max-width: none;
			width: 100%;
			padding: 0 32px;
			margin-top: 79px;

			&__title {
				font-size: 36px;
			}
		}

		.card {
			width: 220px;
			height: 103px;
		}

		/deep/ .slick-slider {
			overflow: visible;
			margin-top: 41px;
			margin-bottom: 163px;

			.slick-list {
				overflow: visible;
			}

			.slick-arrow {
				position: absolute;
				top: -61px;
				z-index: 1;
				height: 30px;
				width: 34px;
				font-size: 0;
				transition: opacity .5s ease;

				&.slick-next {
					right: 0;
					background: url('../assets/img/arrow-right-gray.svg') no-repeat center center;
					background-size: 100% auto;
				}

				&.slick-prev {
					right: 42px;
					background: url('../assets/img/arrow-left-gray.svg') no-repeat center center;
					background-size: 100% auto;
				}

				&.slick-disabled {
					opacity: .5;
				}
			}
		}
	}

	@media screen and (max-width: 650px) {

		.modal {
			padding: 24px;
		}

		.poster {
			&__title {
				width: 360px;
				left: calc(50% - 180px);
				font-size: 36px;
				line-height: 38px;
				margin-bottom: 39px;
			}
		}

		.play {
			top: calc(50% + 17px);

			&__btn {
				width: auto;
				border-radius: 0;
				height: auto;
				margin-top: -19px;
				border: none;
				padding-bottom: 4px;
				// border-bottom: 1px solid #fff;
				
				&:after {
					content: "";
					display: block;
					position: absolute;
					width: 100%;
					transform: scaleX(0);
					height: 1px;
					left: 0;
					bottom: -1px;
					background-color: #fff;
					transform-origin: 0 0;
					transition: transform .5s ease;
				}
			}

			&__label {
				display: inline-block;
				vertical-align: top;
				font-size: 11px;
				letter-spacing: 3px;
			}

			&__icon {
				display: inline-block;
				vertical-align: top;
				width: 7px;
				margin: 0 7px;

				img {
					width: 100%;
				}
			}
		}

		.quote {
			top: calc(50% + 101px);
			width: 360px;
			text-align: center;
			right: auto;
			left: calc(50% - 180px);

			&__bottom {
				text-align: center;
				margin-top: 16px;
			}
		}

		.team {
			height: 332px;

			&__title {
				padding: 0 28px;
			
			}

			// &__title-container {
			// 	max-width: 65%;
			// }

			&__nav {
				display: block;
				float: right;
				margin-top: -22px;
				margin-right: 26px;

				/deep/ .swiper-button-disabled {
					opacity: .5!important;
					pointer-events: none!important;
				}

				.nav {
					&__next {
						display: inline-block;
						margin-left: 10px;
						transition: opacity .3s ease;

						img {
							max-width: 33px;
						}
						
					}

					&__prev {
						display: inline-block;
						transition: opacity .3s ease;
						
						img {
							max-width: 33px;
						}
					}
				}
			}

			&__line {
				margin-bottom: 2px;

				&:nth-child(1) {
					.text__image {
						top: -46px;
					}

					.text__case {
						top: -46px;
					}

					.text__white {
						margin-top: 46px;
						// margin-left: -50px;
					}
				}

				&:nth-child(2) {
					.text__image {
						top: -89px;
					}

					.text__case {
						top: -89px;
					}

					.text__white {
						margin-top: 89px;
					}
				}

				&:nth-child(3) {
					.text__image {
						top: -132px;
					}

					.text__case {
						top: -132px;
					}

					.text__white {
						margin-top: 132px;
					}
				}
			}

			&__wrapper {
				padding: 0;
			}

			&__heading {
				margin-top: 62px;
			}
		}

		.filters {
			margin-top: 23px;
			padding: 0 28px;

			&_mob {
				display: block;
			}

			&_desk {
				display: none;
			}

			/deep/ .swiper-slide {
				width: auto!important;
			}

			
		}

		.text {
			&__image {
				width: 148px;
				height: 201px;
				display: none !important;
			}

			&__case {
				width: 148px;
				height: 201px;
				display: none !important;
			}

			&__white {
				display: none !important;
			}
			
			&__poscont {
				display: none!important;
			}

			&__poswhite {
				display: none!important;
			}

		}

		.clients {
			padding: 0 28px;
			margin-top: 106px;
		}

		/deep/ .slick-slider {
			margin-top: 28px;
			margin-bottom: 129px;

			.slick-arrow {
				top: -54px;
			}
		}

		.card {
			height: 88px;
			width: 188px;
		}

		.arrow {
			&__circle {
				margin-top: 0;
			}
		}
	}

	@media screen and (max-width: 400px) {

		.modal {
			padding: 22px;
		}

		.poster {
			&__title {
				margin-bottom: 35px;
				width: 330px;
				left: calc(50% - 165px);
			}
		}

		.quote {
			width: 330px;
			left: calc(50% - 165px);
			top: calc(50% + 92px);
		}

		.team {
			height: 323px;

			&__title {
				padding: 0px 22px;
			}

			&__heading {
				margin-top: 57px;
			}

			&__line {
				&:nth-child(1) {
					.text__image {
						top: -46px;
					}

					.text__case {
						top: -46px;
					}

					.text__white {
						margin-top: 46px;
					}
				}

				&:nth-child(2) {
					.text__image {
						top: -89px;
					}

					.text__case {
						top: -89px;
					}

					.text__white {
						margin-top: 89px;
					}
				}

				&:nth-child(3) {
					.text__image {
						top: -132px;
					}

					.text__case {
						top: -132px;
					}

					.text__white {
						margin-top: 132px;
					}
				}
			}
		}

		.slider {
			&__bg {
				padding-top: 60%;
			}

			&__info {
				bottom: 15px;
			}
		}

		.arrow {
			&_right {
				right: 55px;
			}

			&_left {
				left: 55px;
			}
		}

		.clients {
			padding: 0 22px;
			margin-top: 57px;
		}

		.text {
			&__image {
				width: 158px;
				height: 215px;
			}
		}
	}

	@media screen and (max-width: 350px) {

		.modal {
			padding: 16px;
		}

		.play {
			top: calc(50% + 33px);
		}

		.poster {
			&__title {
				width: 294px;
				left: calc(50% - 147px);
				margin-bottom: 15px;
			}
		}

		.quote {
			width: 294px;
			left: calc(50% - 147px);
			top: calc(50% + 82px);
		}

		.team {
			height: 306px;

			&__heading {
				margin-top: 49px;
			}

			&__title {
				padding: 0 12px;
			}
		}

		.filters {
			padding: 0 14px;
		}

		.arrow {
			&_right {
				right: 48px;
			}

			&_left {
				left: 48px;
			}

			&__img {
				width: 50px;
			}
		}

		.clients {
			padding: 0 13px;
			margin-top: 47px;
		}

		/deep/ .slick-slider {
			margin-top: 23px;

			.slick-arrow {
				top: -49px;
			}
		}

		.card {
			width: 147px;
			height: 68px;
		}

		.text {
			&__image {
				width: 157px;
				height: 214px;
			}
		}
	}
</style>