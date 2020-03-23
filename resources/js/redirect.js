window.onload = function(){
    var md = new MobileDetect(window.navigator.userAgent);
    var url = window.location.href.split('1pt.co/')[1].toLowerCase();

    function redirectToLongUrl(url){
      if(url.includes('https://') || url.includes('http://')){
        window.location = url;
      } else {
        var protocol = 'http://';
        var fullURL = protocol.concat(url);
        window.location = fullURL;
      }
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText.trim().toLowerCase() == "error"){
          document.getElementById("error404").style.visibility = "visible";
          document.getElementById("loading").style.display = "none";
        } else {
          console.log(this.responseText)
          data = JSON.parse(this.responseText)

          if(md.os() == "iOS" && data[3]){
            redirectToLongUrl(data[3]);
          } else if(md.os == "AndroidOS" && data[4]) {
            redirectToLongUrl(data[4]);
          } else if(md.mobile() && data[2]){
            redirectToLongUrl(data[2]);
          } else {
            redirectToLongUrl(data[0]);
          }
        }
      }
    };
    xhttp.open("GET", "https://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/retrieve-url-from-db.php?url=" + url, true);
    xhttp.send();
  }
