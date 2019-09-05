<template lang="pug">
	.nopage
		<canvas id="canv"></canvas>
		.nopage__maps
			.nopage__line
			.circle
				.circle__container
					.circle__inner
						.circle__text
							.circle__span(data-aos="custom-fade")
								span
									img(src="@/assets/img/4.svg" alt="4")
								span
									img(src="@/assets/img/0.svg" alt="0")
								span 
									img(src="@/assets/img/4.svg" alt="4")
							.circle__span(data-cut-lines="Page Not Found" data-aos="title-fade") {{ $ml.get('nopage.not_found') }}
					<svg viewBox="0 0 222 222" version="1.1" xmlns="http://www.w3.org/2000/svg">
						//- <circle class="circle__c1" cx="111" cy="111" r="110" stroke="#EFEEEB" stroke-opacity="0.09" fill="none" />
						<circle class="circle__c2" cx="111" cy="111" r="110" stroke="#484847" fill="none" stroke-width="1" />
					</svg>
					router-link.circle__link(:to="$ml.get('lang_url') + '/'") {{ $ml.get('nopage.back') }}
			
	
</template>

<script>
var c;
var $;

var w;
var h;

var intLines = 1;
// var init = function() {
// 	$.lineWidth = 0.2;
// 	$.fillStyle = 'black';
// 	$.fillRect(0, 0, w, h);
// };
// var draw = function(a, b, t) {

//   $.lineWidth = 0.2;
//   $.fillStyle = 'black';
//   $.fillRect(0, 0, w, h);
//   for (var i = 0; i < intLines; i++) {
//     $.strokeStyle = 'white';
//     $.beginPath();
// 	$.moveTo(-0, h / 2);
	
//     for (var j = 0; j < w; j += 10) {
// 	  $.lineTo(60 * Math.sin(i / 10) + j + 0.05 * j * j, Math.floor(h / 2 + j / 2 * Math.sin(j / 50 - t / 100 - i / 18) +(i * 0.9) * Math.sin(j / 5 - (i + t) / 5)));
// 	//   $.lineTo(100);
//     };
//     $.stroke();
//   }
// }

let anim;

var draw = function() {
	$.lineWidth = 1;
	$.fillStyle = '#1c1c1c';
	$.fillRect(0, 0, w, h);
	$.strokeStyle = '#404040';
    $.beginPath();
	$.moveTo(-0, h / 2);
	
	if(st < w*2) {
		for (var i = 0; i < w / 10; i++ ) {
			
			$.lineTo(st, h/2);
		}
	} else {
		for (var i = 0; i < intLines; i++) {
			for (var j = 0; j < w; j += 10) {
				$.lineTo(60 * Math.sin(i / 10) + j + 0.05 * j * j, Math.floor(h / 2 + j / 2 * Math.sin(j / 50 - t / 100 - i / 18) +(i * 0.9) * Math.sin(j / 5 - (i + t) / 5)));
			};
		}
		

	}
	$.stroke();
}

var t = 0;
var st = 0
var run = function() {
	t += 2; 
	st += 10;
	draw();
};


	import AOS from 'aos';

	export default {
		name: 'nopage',
		metaInfo: function() {
			let th = this;

			return {
				title: '404'
			}
		},
		data: function(){
			return {
			}
		},
		created() {
		},
		computed: {
		},
		methods: {
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
		},
		mounted() {
			c = document.getElementById('canv');
			$ = c.getContext('2d');

			w = c.width = window.innerWidth;
			h = c.height = window.innerHeight;

			

			this.cutLines();

			function line(){
				run();
				anim = requestAnimationFrame(line);
			}
			
			anim = requestAnimationFrame(line)
			// setInterval(run, 50);
			this.$nextTick(() => {
				AOS.refreshHard();
				// AOS.init({
				// 	once: true,
				// 	disabled: 'mobile',
				// 	duration: 1000,
				// 	offset: 0
				// });
			});

			
		},
		beforeDestroy() {
			window.cancelAnimationFrame(anim);
		},
		components: {
		
		},
		watch: {

		}
			
	}

</script>

<style lang="scss" scoped>
	.nopage {
		width: 100%;
		height: 100%;
		background: #1c1c1c;
		position: relative;
		// overflow: scroll;
	}
	html:not(.no-js) [data-aos=circle] {
		.nopage__line {
			transform-origin: 0 0;
			transform: scaleX(0);
			transition: transform 2s ease;
			transition-delay: 1s;
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
		.nopage__line {
			transform: none;
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

	.circle {
		// width: 222px;
		// height: 222px;
		width: 100%;
		height: 100%;
		// margin-top: -111px;
		// margin-bottom: -80px;
		// border-radius: 50%;
		// border: 1px solid rgba(#EFEEEB, .09);
		// margin-left: 280px;
		display: block;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;

		&:before {
			content: '';
			height: 100%;
			display: inline-block;
			vertical-align: middle;
		}

		&__container {
			width: 280px;
			height: 280px;
			position: relative;
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			text-align: center;

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}

		}

		svg {
			position: absolute;
			top: 0;
			left: 0;
			transform: rotate(180deg);

			.circle__c2 {
				stroke-dasharray: 700;
				stroke-dashoffset: 700;
				// transition: stroke-dashoffset 1s ease;
				animation: stroke 2s forwards 1s ease;

				@keyframes stroke {
					0% {
						stroke-dashoffset: 700;
					} 
					100% {
						stroke-dashoffset: 0;
					}
				}

			}
		}

		&__text {
			height: 47px;
			transform: translate(-3px, 0);

			&:nth-child(1) {
				/deep/ .circle__span {
					> .line {
						> .line {
							// transform: translate3d(0, 0, 1px) rotate(0.001deg);
							will-change: transform;
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
							will-change: transform;
							opacity: 0;
							transform: translate3d(0, 30px, 1px) rotate(6deg);
						}
					}
				}
			}
		}

		&__span {
			font-size: 12px;
			line-height: 20px;
			font-weight: 400;
			letter-spacing: 6px;
			text-transform: uppercase;
			color: #fff;


			span {
				font: 32px/25px 'Fatum', Arial, Helvetica, sans-serif;
				color: #fff;
				font-weight: 400;
				-webkit-text-stroke: 2px #000;
				padding: 0 10px;
				display: inline-block;


				&:last-child {
					letter-spacing: 0;
					transform: translate(-3px, -13px);
				}

				&:nth-child(1) {
					transform: translateY(-7px);
				}

				&:nth-child(2) {
					// padding: 0 5px;
				}
				// text-transform: uppercase;
			}

			&:nth-child(1) {
				margin-top: -58px;

				span {
					padding: 0 12px;
				}
			}

			&:nth-child(2) {
				max-width: 90%;
				margin: 0 auto;
				text-align: center;
				margin-top: 62px;
				padding-left: 2px;

			}
		}

		&__inner {
			display: inline-block;
			vertical-align: middle;
			padding-left: 5px;
		}

		&__link {
			font-weight: 700;
			font-size: 13px;
			line-height: 18px;
			letter-spacing: 4px;
			text-transform: uppercase;
			color: #fff;
			// border-bottom: 1px solid rgba(255, 255, 255, 0.62);
			position: absolute;
			top: 117%;
			left: 50%;
			transform: translate(-50%, 2%);
			white-space: nowrap;
			padding-bottom: 4px;

			&:before {
				position: absolute;
				top: 100%;
				left: 0;
				width: 100%;
				content: '';
				height: 1px;
				background-color: #fff;
				opacity: 0.62;
				transform: scaleX(0);
				transform-origin: 0 0;
			}

			&:after {
				content: "";
				position: absolute;
				background-color: #fff;
				opacity: 0.62;
				height: 1px;
				width: 100%;
				bottom: 0;
				left: 0;
				transform-origin: 100% 0;
			}

			@media screen and(min-width: 1200px) {
				&:hover {
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


</style>