window.onload = function(){
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

  positionError()
  window.setTimeout(function(){
    document.getElementById("arrow").style.visibility = "visible";
      document.getElementById("arrow").classList = "animated bounce";
  }, 2500);

  txt = document.getElementById("url");
  btn = document.getElementById("btn");

  // click GO button if user presses ENTER key
  txt.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13 && txt.style.width === "70vw") {
      btn.click();
    }
  });
}

var buttonShown = false
var txt;
var btn;


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

function positionError(){
  var error = document.getElementById("error");
  var left = (window.innerWidth - error.offsetWidth)/2;
  error.style.left = left + "px";
}

window.onresize = function(){positionError()}

function removeSpaces(url){
  url.value = url.value.replace(/ /g, "");
}

function submit(url){
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
    xhttp.open("GET", "https://api.1pt.co?url=" + txt.value + "&desktop=" + document.getElementById("desktop").value + "&mobile=" + document.getElementById("mobile").value + "&apple=" + document.getElementById("apple").value + "&android=" + document.getElementById("android").value + "&custom=" + document.getElementById("custom").value, true);
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
