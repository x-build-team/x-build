!function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){i(5),i(2),i(3),t.exports=i(4)},function(t,e,i){},function(t,e,i){},function(t,e,i){},function(t,e){!function(t,e){"use strict";var i={};!function(){var r=e.querySelector('meta[name="viewport"]'),n=e.querySelector('meta[name="hotcss"]'),o=t.devicePixelRatio||1,a=540,s=0;if(o=o>=3?3:o>=2?2:1,n){var l=n.getAttribute("content");if(l){var d=l.match(/initial\-dpr=([\d\.]+)/);d&&(o=parseFloat(d[1]));var u=l.match(/max\-width=([\d\.]+)/);u&&(a=parseFloat(u[1]));var h=l.match(/design\-width=([\d\.]+)/);h&&(s=parseFloat(h[1]))}}e.documentElement.setAttribute("data-dpr",o),i.dpr=o,e.documentElement.setAttribute("max-width",a),i.maxWidth=a,s&&(e.documentElement.setAttribute("design-width",s),i.designWidth=s);var c=1/o,m="width=device-width, initial-scale="+c+", minimum-scale="+c+", maximum-scale="+c+", user-scalable=no";r?r.setAttribute("content",m):((r=e.createElement("meta")).setAttribute("name","viewport"),r.setAttribute("content",m),e.head.appendChild(r))}(),i.px2rem=function(t,e){return e||(e=parseInt(i.designWidth,10)),320*parseInt(t,10)/e/20},i.rem2px=function(t,e){return e||(e=parseInt(i.designWidth,10)),20*t*e/320},i.mresize=function(){var r=e.documentElement.getBoundingClientRect().width||t.innerWidth;if(i.maxWidth&&r/i.dpr>i.maxWidth&&(r=i.maxWidth*i.dpr),!r)return!1;e.documentElement.style.fontSize=20*r/320+"px",i.callback&&i.callback()},i.mresize(),t.addEventListener("resize",function(){clearTimeout(i.tid),i.tid=setTimeout(i.mresize,33)},!1),t.addEventListener("load",i.mresize,!1),setTimeout(function(){i.mresize()},333),t.hotcss=i}(window,document)},function(t,e,i){"use strict";i.r(e);var r=class{constructor(t){t=t||new Object,this.loader=t.loader||document.getElementById("xl-load"),this.wrapper=t.wrapper||document.getElementById("xl-wrapper"),this.attr=t.attr||"data-src",this.prior=t.prior||"prior",this.sequence=t.sequence||!0,this.loadImg=t||null,this.beforeLoading=t.beforeLoading||null,this.afterLoading=t.afterLoading||null,this.nextTickLoading=t.nextTickLoading||null,this.percent=0,this.el=document.querySelectorAll(`img[${this.attr}]`),this.priorArray=new Array,this.othersArray=new Array,this.init()}init(){return this.wrapper.style.display="none",this.el.forEach(t=>{t.hasAttribute(this.prior)?this.priorArray.push(t):this.othersArray.push(t)}),this.beforeLoading&&this.beforeLoading(this),this.priorLoad(),this}load(t,e,i){t.forEach(t=>{t.src=t.getAttribute(this.attr),t.onload=(()=>{e(t)}),t.onerror=(()=>{i(t)})})}priorLoad(){let t=0,e=this,i=()=>{t++,this.percent=(t/this.priorArray.length).toFixed(2),this.nextTickLoading&&this.nextTickLoading(this.percent),t>=this.priorArray.length&&(this.wrapper.style.display="block",this.loader&&(this.loader.style.display="none"),this.afterLoading&&this.afterLoading(this),e.othersLoad())};this.load(this.priorArray,t=>{t.removeAttribute(this.attr),i()},t=>{i()})}othersLoad(){if(this.loadImg&&this.othersArray.forEach(t=>{t.style.backgroundImage=`url(${this.loadImg})`}),this.sequence){let t=this.othersArray,e=0,i=this,r=function(){if(e<t.length){let n=t[e];n.src=n.getAttribute(i.attr),n.onload=(()=>{n.removeAttribute(i.attr),n.style.backgroundImage=null,e++,r()}),n.onerror=(()=>{n.style.backgroundImage=null,e++,r()})}};r()}else this.othersArray.forEach(t=>{t.src=t.getAttribute(this.attr),t.removeAttribute(this.attr)})}};var n=class{constructor(t){this.name=t?t.name:"animate",this.delay=t?t.delay:"delay",this.duration=t?t.duration:"duration",this.throttling=!0,this.interval=50,this.scrollTop=0,this.el=[],this.methods=t?t.methods:null;let e=this;window.onload=function(){e.init()}}init(){let t=this;document.querySelectorAll(`[${this.name}]`).forEach(t=>{this.el.push({el:t,excluted:!1,height:t.offsetHeight,offset:t.getAttribute("offset")||0,name:t.getAttribute(this.name),delay:t.getAttribute(this.delay),duration:t.getAttribute(this.duration)||1e3,animateEnter:t.getAttribute("animate-enter"),animateLeave:t.getAttribute("animate-leave"),offsetTop:this.getOffsetTop(t)}),t.style.visibility="hidden",t.removeAttribute(this.name)}),this.animated(),this.addEvent(window,"scroll",function(){t.throttling&&(t.throttling=!1,this.setTimeout(()=>{t.throttling=!0},t.interval),t.animated())})}animated(){this.scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,this.el.forEach(t=>{!t.excluted&&t.offsetTop<=this.scrollTop+window.innerHeight-t.height/2-t.offset&&(t.excluted=!0,setTimeout(()=>{t.animateEnter&&this.methods[t.animateEnter](t),t.el.style.cssText+=`\n            visibility: visible;\n            -webkit-animation-duration: ${t.duration/1e3}s;\n            animation-duration: ${t.duration/1e3}s;\n            -webkit-animation-fill-mode: both;\n            animation-fill-mode: both;\n          `,t.el.classList.add(t.name),setTimeout(()=>{t.animateLeave&&this.methods[t.animateLeave](t)},t.duration)},t.delay))})}getOffsetTop(t){let e=t.offsetTop,i=t.offsetParent;for(;null!=i;)e+=i.offsetTop,i=i.offsetParent;return e}addEvent(t,e,i){t.attachEvent?t.attachEvent("on"+e,function(){i.call(t)}):t.addEventListener(e,i,!1)}};i(1);console.log("Documentation: https://codexu.github.io/"),new r({nextTickLoading:function(t){new n}})}]);