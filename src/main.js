import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from './components/store.js';

//Pages
import Main from './pages/main.vue';
import OneCase from './pages/one-case.vue';
import Contacts from './pages/contacts.vue';
import About from './pages/about.vue';
import Cases from './pages/cases.vue';
import WorkProces from './pages/work-proces.vue';
import Preloader from './pages/preloader.vue';
import Nopage from './pages/nopage.vue';
import Terms from './pages/terms.vue';
import Redirect from './pages/redirect.vue';
import './components/lang.js';
import AOS from 'aos';
import Meta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(Meta);

window.scrollTasks = [];







var browserDetecter = function() {

    var browser = 'unknown';
    var os = 'unknown';

    var ios = !!navigator.platform.match(/iPhone|iPod|iPad/);
    if(ios) {
        os = 'ios';
    }

    var is_chrome = !!window.chrome && !is_opera;
    if (is_chrome) {
        browser = 'chrome';
    }
    var is_explorer= typeof document !== 'undefined' && !!document.documentMode;
    if (is_explorer) {
        browser = 'ie';
    }
    var is_firefox = typeof window.InstallTrigger !== 'undefined';
    if (is_firefox) {
        browser = 'firefox';
    }
    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (is_safari) {
        browser = 'safari';
    }
    var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if (is_opera) {
        browser = 'is_opera';
    }

    if (window.navigator.userAgent.indexOf("Edge") > -1) {
        browser = 'edge';
    }

    window.browser = browser;
    window.system = os
    document.body.classList.add('browser-' + browser);
    document.body.classList.add('os-' + os);
};
browserDetecter();


function getScrollbarWidth() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
  
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  
    return scrollbarWidth;
  
}

if (getScrollbarWidth()) {
    document.documentElement.classList.add('custom-scroll');
}



!function(t,e){"function"==typeof define&&define.amd?define(e):"undefined"!=typeof exports?module.exports=e():e()}(0,function(){window.SplitType=function(E,p,l){if(p.addEventListener&&Function.prototype.bind){var r="splitType"+1*new Date,o={},a=0,L=Array.prototype.push,k=Array.prototype.slice,h=Object.keys,s=(Object.prototype.hasOwnProperty,Object.defineProperty),f=(Object.defineProperties,Object.getOwnPropertyDescriptor),M=p.createDocumentFragment.bind(p),A=p.createTextNode.bind(p),n={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",split:"lines, words, chars",position:"relative",absolute:!1,tagName:"div",DEBUG:!1};return s(y,"defaults",{get:function(){return n},set:function(t){n=i(n,t)}}),y.prototype.split=function(t){this.revert(),this.lines=[],this.words=[],this.chars=[];var e=[E.pageXoffset,E.pageYoffset];t!==l&&(this.settings=i(this.settings,t)),B(this.elements,function(t){(function(t){var e,n,i,s,l=this.settings,r=l.tagName,o="B"+1*new Date+"R",p=l.split,a=-1!==p.indexOf("lines"),h=-1!==p.indexOf("words"),f=-1!==p.indexOf("chars"),c="absolute"===l.position||!0===l.absolute,d=N("div"),u=[],y=[];if(s=a?N("div"):M(),d.innerHTML=t.innerHTML.replace(/<br\s*\/?>/g," "+o+" "),e=d.textContent.replace(/\s+/g," ").trim().split(" ").map(function(t){if(t===o)return s.appendChild(N("br")),null;if(f){var e=t.split("").map(function(t){return N(r,{class:l.charClass+" "+l.splitClass,style:"display: inline-block;",textContent:t})});L.apply(y,e)}return h||a?(i=N(r,{class:l.wordClass+" "+l.splitClass,style:"display: inline-block; position:"+(h?"relative":"static;"),children:f?e:null,textContent:f?null:t}),s.appendChild(i)):B(e,function(t){s.appendChild(t)}),s.appendChild(A(" ")),i},this).filter(function(t){return t}),t.innerHTML="",t.appendChild(s),L.apply(this.words,e),L.apply(this.chars,y),c||a){var g,m,C,b,w,v,x,O,T,j,H,S=[];x=D(t).nodes=t.getElementsByTagName(r),O=t.parentElement,T=t.nextElementSibling,j=E.getComputedStyle(t),H=j.textAlign,c&&(b={left:s.offsetLeft,top:s.offsetTop,width:s.offsetWidth},v=t.offsetWidth,w=t.offsetHeight,D(t).cssWidth=t.style.width,D(t).cssHeight=t.style.height),B(x,function(t){if(t!==s){var e,n=t.parentElement===s;a&&n&&((e=D(t).top=t.offsetTop)!==m&&(m=e,S.push(g=[])),g.push(t)),c&&(D(t).top=e||t.offsetTop,D(t).left=t.offsetLeft,D(t).width=t.offsetWidth,D(t).height=C=C||t.offsetHeight)}}),O.removeChild(t),a&&(s=M(),u=S.map(function(t){return s.appendChild(n=N(r,{class:l.lineClass+" "+l.splitClass,style:"display: block; text-align:"+H+"; width: 100%;"})),c&&(D(n).type="line",D(n).top=D(t[0]).top,D(n).height=C),B(t,function(t){h?n.appendChild(t):f?k.call(t.children).forEach(function(t){n.appendChild(t)}):n.appendChild(A(t.textContent)),n.appendChild(A(" "))}),n}),t.replaceChild(s,t.firstChild),L.apply(this.lines,u)),c&&(t.style.width=t.style.width||v+"px",t.style.height=w+"px",B(x,function(t){var e="line"===D(t).type,n=!e&&"line"===D(t.parentElement).type;t.style.top=n?0:D(t).top+"px",t.style.left=e?b.left+"px":(n?D(t).left-b.left:D(t).left)+"px",t.style.height=D(t).height+"px",t.style.width=e?b.width+"px":D(t).width+"px",t.style.position="absolute"})),T?O.insertBefore(t,T):O.appendChild(t)}}).call(this,t),D(t).isSplit=!0},this),this.isSplit=!0,E.scrollTo.apply(E,e),B(this.elements,function(t){for(var e,n,i=D(t).nodes||[],s=0,l=i.length;s<l;s++)e=i[s],void 0,(n=e&&e[r])&&(delete e[n],delete o[n])})},y.prototype.revert=function(){this.isSplit&&(this.lines=this.words=this.chars=null),B(this.elements,function(t){D(t).isSplit&&D(t).html&&(t.innerHTML=D(t).html,t.style.height=D(t).cssHeight||"",t.style.width=D(t).cssWidth||"",this.isSplit=!1)},this)},y}function c(t){return null!==t&&"object"==typeof t}function d(t){return c(t)&&"number"==typeof t.length&&0<t.length}function u(t){return c(t)&&/^(1|3|11)$/.test(t.nodeType)}function B(t,e,n){for(var i=Object(t),s=d(i)?i:function(t){return c(t)&&"[object Object]"===Object.prototype.toString.call(t)}(i)?h(i):[i],l=parseInt(s.length)||0,r=0;r<l;r++)e.call(n,s[r],r,i)}function i(n,i){return n=Object(n),i=Object(i),Object.getOwnPropertyNames(n).reduce(function(t,e){return s(t,e,f(i,e)||f(n,e))},{})}function D(t,e,n){var i,s={};return c(t)&&(i=t[r]||(t[r]=++a),s=o[i]||(o[i]={})),n===l?e===l?s:s[e]:e!==l?s[e]=n:void 0}function N(t,n){var i=p.createElement(t);return n===l||B(n,function(t){var e=n[t];if(null!==e)switch(t){case"textContent":i.textContent=e;break;case"innerHTML":i.innerHTML=e;break;case"children":B(e,function(t){u(t)&&i.appendChild(t)});break;default:i.setAttribute(t,e)}}),i}function y(t,e){if(!(this instanceof y))return new y(t,e);this.isSplit=!1,this.settings=i(n,e),this.elements=function(t){var e,n,i,s,l,r,o=[];if(function(t){return"string"==typeof t}(t)&&(t="#"===(e=t.trim())[0]&&!/[^\w]/.test(n=e.slice(1))?p.getElementById(n):p.querySelectorAll(e)),e||u(t))return u(t)?[t]:k.call(t);if(d(t))for(l=0,i=t.length;l<i;l++)if(d(t[l]))for(r=0,s=t[l].length;r<s;r++)u(t[l][r])&&o.push(t[l][r]);else u(t[l])&&o.push(t[l]);return o}(t),this.elements.length&&(this.originals=this.elements.map(function(t){return D(t).html=D(t).html||t.innerHTML}),this.split())}}(window,document)});



let langCode = '';
if (window.config.activeLang != window.config.langDefault) {
	langCode = '/:lang'
}

const routesList = [
    {path : langCode+'/', name: 'main', component: Main },
    {path : langCode+'/contacts/', name: 'contacts', component: Contacts },
    {path : langCode+'/about/', name: 'About', component: About },
    {path : langCode+'/cases/', name: 'cases', component: Cases},
    {path : langCode+'/cases/:slug/', name: 'onecase', component: OneCase },
    {path : langCode+'/services/', name: 'services', component: WorkProces },
    {path : langCode+'/preloader/', name: 'preloader', component: Preloader },
    {path : langCode+'/404/', name: 'nopage', component: Nopage },
    {path : langCode+'/terms-of-use/', name: 'terms', component: Terms},
    {path : langCode+'/privacy-policy/', name: 'privacy', component: Terms},
    {path : langCode+'/*/', name: '404', component: Redirect},
    {path : '/*/', name: 'notfound', component: Redirect}
];


const router = new VueRouter({
	mode: 'history',
    routes: routesList,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
});

let isFirst = true;
router.beforeEach((to, from, next) => {
    if (isFirst) {
        isFirst = false;
        next();
        return;
    }
    let c = document.querySelector('.content');
    if (c) {
        c.classList.remove('show');
    }
    let els = document.querySelectorAll('.aos-animate');
    for (let i = 0; i < els.length; i++) {
        els[i].classList.add('aos-final');
    }
    setTimeout(() => {
        next();
    }, 700);
});

var setVh = function() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVh();
window.addEventListener('resize', function() {
	setVh();
});

new Vue({
	el: "#app",
	router: router,
    store: store,
    created() {
        AOS.init({
            once: true,
            duration: 1000,
            offset: 0
        });
    }
});

// window.addEventListener('scroll', () => {
//     window.scrollTasks.forEach(item => {
//         item.func();
//     });
// });