//TypeIt (https://cdn.jsdelivr.net/npm/typeit@5.10.7/dist/typeit.min.js)
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.TypeIt=t()}(this,function(){"use strict";function e(e){var t=e.getBoundingClientRect();return!(t.right>window.innerWidth||t.bottom>window.innerHeight)&&!(t.top<0||t.left<0)}function t(e,t){return Math.abs(Math.random()*(e+t-(e-t))+(e-t))}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=document.createElement("style");i.id=t,i.appendChild(document.createTextNode(e)),document.head.appendChild(i)}function n(e,t){return 0===e.indexOf(t)}function s(e){return Array.isArray(e)?e.slice(0):e.split("<br>")}window.TypeItDefaults={strings:[],speed:100,deleteSpeed:null,lifeLike:!0,cursor:!0,cursorChar:"|",cursorSpeed:1e3,breakLines:!0,startDelay:250,startDelete:!1,nextStringDelay:750,loop:!1,loopDelay:!1,html:!0,autoStart:!0,callback:!1,beforeString:!1,afterString:!1,beforeStep:!1,afterStep:!1,afterComplete:!1};var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},h=function(){function o(e,t,i,n,s){r(this,o),this.id=t,this.typeit=s,this.autoInit=n,this.element=e,this.timeouts=[],this.hasStarted=!1,this.isFrozen=!1,this.isComplete=!1,this.hasBeenDestroyed=!1,this.queue=[],this.isInTag=!1,this.stringsToDelete="",this.inlineStyles={base:"display:inline;position:relative;font:inherit;color:inherit;line-height:inherit;"},this.setOptions(i,window.TypeItDefaults,!1),this.prepareTargetElement(),this.prepareDelay("nextStringDelay"),this.prepareDelay("loopDelay"),this.prepareDOM(),this.prepareStrings(),this.options.startDelete&&this.stringsToDelete&&(this.insert(this.stringsToDelete),this.queue.push([this.delete]),this.insertSplitPause(1)),this.generateQueue(),this.options.strings.length&&this.options.strings[0]&&this.autoInit&&this.init()}return a(o,[{key:"prepareStrings",value:function(){this.options.strings=s(this.options.strings).map(function(e){return e.replace(/<\!--.*?-->/g,"")})}},{key:"prepareDOM",value:function(){this.element.innerHTML='\n      <span style="'+this.inlineStyles.base+'" class="ti-wrapper">\n        <span style="'+this.inlineStyles.base+'" class="ti-container"></span>\n      </span>\n      ',this.element.setAttribute("data-typeitid",this.id),this.elementContainer=this.element.querySelector(".ti-container"),this.elementWrapper=this.element.querySelector(".ti-wrapper"),i("\n        ."+this.elementContainer.className+":before {\n          content: '.';\n          display: inline-block;\n          width: 0;\n          visibility: hidden;\n        }\n      ")}},{key:"reset",value:function(){return new o(this.element,this.id,this.options,this.autoInit,this.typeit)}},{key:"contents",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===e?this.options.html?this.elementContainer.innerHTML:this.elementContainer.innerText:(this.elementContainer[this.options.html?"innerHTML":"innerText"]=e,e)}},{key:"prepareDelay",value:function(e){var t=this.options[e];if(t){var i=Array.isArray(t),n=i?null:t/2;this.options[e]={before:i?t[0]:n,after:i?t[1]:n,total:i?t[0]+t[1]:t}}}},{key:"generateQueue",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t=null===t?[this.pause,this.options.startDelay]:t,this.queue.push(t),this.options.strings.forEach(function(t,i){if(e.queueString(t),i+1!==e.options.strings.length){if(e.options.breakLines)return e.queue.push([e.break]),void e.insertSplitPause(e.queue.length);e.queueDeletions(t),e.insertSplitPause(e.queue.length,t.length)}})}},{key:"queueDeletions",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t="string"==typeof e?e.length:e,i=0;i<t;i++)this.queue.push([this.delete,1])}},{key:"queueString",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e){if(e=s(e),document.implementation.createHTMLDocument("").body.innerHTML=e,t&&(e=this.rake(e)[0]),this.options.html&&n(e[0],"<")&&!n(e[0],"</")){var i=e[0].match(/\<(.*?)\>/),o=document.implementation.createHTMLDocument("");o.body.innerHTML="<"+i[1]+"></"+i[1]+">",this.queue.push([this.type,o.body.children[0]])}else this.queue.push([this.type,e[0]]);e.splice(0,1),t&&this.queue[this.queue.length-1].push("first-of-string"),e.length?this.queueString(e,!1):this.queue[this.queue.length-1].push("last-of-string")}}},{key:"insertSplitPause",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.queue.splice(e,0,[this.pause,this.options.nextStringDelay.before]),this.queue.splice(e-t,0,[this.pause,this.options.nextStringDelay.after])}},{key:"init",value:function(){if(!this.hasStarted){if(this.cursor(),this.options.autoStart)return this.hasStarted=!0,void this.next();if(e(this.element))return this.hasStarted=!0,void this.next();var t=this;window.addEventListener("scroll",function i(n){e(t.element)&&!t.hasStarted&&(t.hasStarted=!0,t.next(),n.currentTarget.removeEventListener(n.type,i))})}}},{key:"cursor",value:function(){var e="visibility: hidden;";this.options.cursor&&(i("\n        @keyframes blink-"+this.id+" {\n          0% {opacity: 0}\n          49% {opacity: 0}\n          50% {opacity: 1}\n        }\n\n        [data-typeitid='"+this.id+"'] .ti-cursor {\n          animation: blink-"+this.id+" "+this.options.cursorSpeed/1e3+"s infinite;\n        }\n      ",this.id),e=""),this.elementWrapper.insertAdjacentHTML("beforeend",'<span style="'+this.inlineStyles.base+e+'left: -.25ch;" class="ti-cursor">'+this.options.cursorChar+"</span>")}},{key:"insert",value:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]?this.elementContainer.lastChild.insertAdjacentHTML("beforeend",e):this.elementContainer.insertAdjacentHTML("beforeend",e),this.contents(this.contents().split("").join(""))}},{key:"prepareTargetElement",value:function(){var e=this;[].slice.call(this.element.childNodes).forEach(function(t){void 0!==t.classList&&t.classList.contains("ti-container")&&(e.element.innerHTML="")}),!this.options.startDelete&&this.element.innerHTML.length>0?this.options.strings=this.element.innerHTML.trim():this.stringsToDelete=this.element.innerHTML}},{key:"break",value:function(){this.insert("<br>"),this.next()}},{key:"pause",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];setTimeout(function(){e.next()},t||this.options.nextStringDelay.total)}},{key:"rake",value:function(e){var t=this;return e.map(function(e){return e=e.split(""),t.options.html?function(e){for(var t=[],i=void 0,n=!1,s=0;s<e.length;s++)"<"!==e[s]&&"&"!==e[s]||(t[0]=s,n="&"===e[s]),(">"===e[s]||";"===e[s]&&n)&&(t[1]=s,s=0,i=e.slice(t[0],t[1]+1).join(""),e.splice(t[0],t[1]-t[0]+1,i),n=!1);return e}(e):e})}},{key:"type",value:function(e){var t=this;this.setPace(),this.timeouts[0]=setTimeout(function(){return"string"!=typeof e?(e.innerHTML="",t.elementContainer.appendChild(e),t.isInTag=!0,void t.next()):n(e,"</")?(t.isInTag=!1,void t.next()):(t.insert(e,t.isInTag),void t.next())},this.typePace)}},{key:"setOptions",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n={};for(var s in null===t&&(t=this.options),t)n[s]=t[s];for(var o in e)n[o]=e[o];this.options=n,i&&this.next()}},{key:"setPace",value:function(){var e=this.options.speed,i=null!==this.options.deleteSpeed?this.options.deleteSpeed:this.options.speed/3,n=e/2,s=i/2;this.typePace=this.options.lifeLike?t(e,n):e,this.deletePace=this.options.lifeLike?t(i,s):i}},{key:"delete",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.timeouts[1]=setTimeout(function(){e.setPace();for(var i=e.contents().split(""),n=i.length-1;n>-1;n--){if(">"!==i[n]&&";"!==i[n]||!e.options.html){i.pop();break}for(var s=n;s>-1;s--){if("<br>"===i.slice(s-3,s+1).join("")){i.splice(s-3,4);break}if("&"===i[s]){i.splice(s,n-s+1);break}if("<"===i[s]&&">"!==i[s-1]){if(";"===i[s-1])for(var o=s-1;o>-1;o--)if("&"===i[o]){i.splice(o,s-o);break}i.splice(s-1,1);break}}break}if(e.options.html&&e.contents().indexOf("></")>-1)for(var r=e.contents().indexOf("></")-2;r>=0;r--)if("<"===i[r]){i.splice(r,i.length-r);break}e.contents(i.join("").replace(/<[^\/>][^>]*><\/[^>]+>/,"")),null===t&&e.queue.unshift([e.delete,i.length]),t>1&&e.queue.unshift([e.delete,t-1]),e.next()},this.deletePace)}},{key:"empty",value:function(){this.contents(""),this.next()}},{key:"next",value:function(){var e=this;if(!this.isFrozen){if(this.queue.length>0)return this.step=this.queue.shift(),"first-of-string"===this.step[2]&&this.options.beforeString&&this.options.beforeString(this.step,this.queue,this.typeit),this.options.beforeStep&&this.options.beforeStep(this.step,this.queue,this.typeit),this.step[0].call(this,this.step[1],this.step[2]),"last-of-string"===this.step[2]&&this.options.afterString&&this.options.afterString(this.step,this.queue,this.typeit),void(this.options.afterStep&&this.options.afterStep(this.step,this.queue,this.typeit));if(this.options.callback&&this.options.callback(),this.options.afterComplete&&this.options.afterComplete(this.typeit),this.options.loop){var t=this.options.loopDelay?this.options.loopDelay:this.options.nextStringDelay;return this.queueDeletions(this.contents()),this.generateQueue([this.pause,t.before]),void setTimeout(function(){e.next()},t.after)}this.isComplete=!0}}}]),o}(),l=function(){function e(t,i){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];r(this,e),this.id=Math.random().toString(36).substring(2,15),this.instances=[],this.elements=[],this.args=i,this.autoInit=n,"object"===(void 0===t?"undefined":o(t))&&(void 0===t.length?this.elements.push(t):this.elements=t),"string"==typeof t&&(this.elements=document.querySelectorAll(t)),this.generateInstances()}return a(e,[{key:"generateInstances",value:function(){var e=this;[].slice.call(this.elements).forEach(function(t){e.instances.push(new h(t,e.id,e.args,e.autoInit,e))})}},{key:"queueUp",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.init(!0),this.instances.forEach(function(i){i.queue.push([i[e],t]),!0===i.isComplete&&i.next(),i.isComplete=!1})}}]),e}();return function(e){function t(e,i){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return r(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,n))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l),a(t,[{key:"type",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return this.init(!0),this.instances.forEach(function(t){t.queueString(e),!0===t.isComplete&&t.next(),t.isComplete=!1}),this}},{key:"delete",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.queueUp("delete",e),this}},{key:"pause",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.queueUp("pause",e),this}},{key:"empty",value:function(){return this.queueUp("empty"),this}},{key:"break",value:function(){return this.queueUp("break"),this}},{key:"options",value:function(e){return this.queueUp("setOptions",e),this}},{key:"freeze",value:function(){this.instances.forEach(function(e){e.isFrozen=!0})}},{key:"unfreeze",value:function(){this.instances.forEach(function(e){e.isFrozen&&(e.isFrozen=!1,e.next())})}},{key:"destroy",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.instances.forEach(function(t){t.timeouts.forEach(function(e){clearTimeout(e)}),t.timeouts=[],e&&t.options.cursor&&t.elementWrapper.removeChild(t.elementWrapper.querySelector(".ti-cursor")),t.hasBeenDestroyed=!0})}},{key:"reset",value:function(){this.instances=this.instances.map(function(e){return e.reset()})}},{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.instances.forEach(function(t){e?t.autoInit&&t.init():t.init()})}},{key:"isComplete",get:function(){return!!this.instances.length&&this.instances[0].isComplete}},{key:"hasBeenDestroyed",get:function(){return!!this.instances.length&&this.instances[0].hasBeenDestroyed}},{key:"hasStarted",get:function(){return!!this.instances.length&&this.instances[0].hasStarted}},{key:"isFrozen",get:function(){return!!this.instances.length&&this.instances[0].isFrozen}}]),t}()});

// script

if(screen.width > 1350){
  new TypeIt('#typeit', {
    speed: 75,
    breakLines: false,
    autoStart: false
  })
  .type(" &#124; Dynamic URL Shortener")
} else {
  new TypeIt('#typeit', {
    speed: 60,
    breakLines: false,
    autoStart: false
  })
  .pause(300)
  .type(" &#124; URL Shortener")
  .pause(1000)
  .delete(13)
  .pause(100)
  .type("Dynamic Linking");
}

function positionError(){
  var error = document.getElementById("error");
  var left = (window.innerWidth - error.offsetWidth)/2;
  error.style.left = left + "px";
}

window.onload = function(){
  positionError()
  window.setTimeout(function(){
    document.getElementById("arrow").style.visibility = "visible";
      document.getElementById("arrow").classList = "animated bounce";
  }, 2500);

}
window.onresize = function(){positionError()}

function removeSpaces(url){
  var url = document.getElementById("url");
  url.value = url.value.replace(/ /g, "");
}

var buttonShown = false;
var txt = document.getElementById("url");
var btn = document.getElementById("btn");

function showButton(){
  if(buttonShown == true && txt.value == ""){
    txt.style.width = "80vw";
    btn.style.width = "0px";
    btn.style.color = "#424242";
    btn.style.paddingLeft = "0";
    btn.style.paddingRight = "0";
    buttonShown = false;
  } else if (txt.value !== "") {
    txt.style.width = "70vw";
    btn.style.padding = "10px";
    btn.style.width = "10vw";
    btn.style.color = "white";
    buttonShown = true;
  }
}

var link;
var url = document.getElementById("url").value;

function submit(url){
  //alert(encodeURI(url));
  var pattern = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
  var isURL = pattern.test(url);

  if(isURL){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        link = "https://1pt.co/" + this.responseText;
        document.getElementById("short-url").value = link.slice(8);
        document.getElementById("qr-code-link").href = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + link;
        document.getElementById("qr-code").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + link;
      }
    };
    xhttp.open("GET", "https://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/add-url-to-db.php?url=" + txt.value + "&de=" + document.getElementById("desktop").value + "&mo=" + document.getElementById("mobile").value + "&ap=" + document.getElementById("apple").value + "&an=" + document.getElementById("android").value + "&cu=" + document.getElementById("custom").value, true);
    xhttp.send();

    txt.classList = "animated bounceOutLeft";
    btn.classList = "btn animated bounceOutLeft";

    document.getElementById("short-url").style.display = "inline-block";
    document.getElementById("short-url").classList = "animated delay-500 bounceInRight";
    document.getElementById("qr-code-section").style.display = "block";
    document.getElementById("settings-section").style.display = "none";
  } else {
    txt.value = "";
    showButton();
    document.getElementById("error").style.opacity = "1";
    document.getElementById("error").classList = "error animated shake";
    window.setTimeout(function(){
      document.getElementById("error").style.opacity = "0";
      document.getElementById("error").classList = "error";
    }, 3000)
  }
}

window.addEventListener("scroll", function(){
	var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
	if(scrollTop !== 0){
    document.getElementById("short-url").style.boxShadow = '0px 0px 0px 2px white';
    document.getElementById('arrow').classList = 'animated fadeOutUp';
  } else {
    document.getElementById("short-url").style.boxShadow = 'none';
    document.getElementById('arrow').classList = 'animated bounce';
  }

}, false);

// click GO button if user presses ENTER key
txt.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13 && txt.style.width === "70vw") {
    btn.click();
  }
});

function appendURL(obj){
  if(obj.value.slice(0, 15) === "https://1pt.co/"){

  } else if(obj.value.slice(0, 14) === "https://1pt.co"){
    obj.value = 'https://1pt.co/';
  } else {
    obj.value = 'https://1pt.co/' + obj.value;
  }

  obj.value = obj.value.replace(/ /g, "");
}
