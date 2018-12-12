var REDIRECTS = {
  'website': 'https://www.param.me',
  'hht': 'https://www.1ht.co',
  'mp4': 'https://www.param.me/kevlar/animation.mp4',
  'web': 'https://www.param.me/kevlar'
}

window.onload = function(){
  var shortURL = window.location.href.split('1pt.co/')[1]

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      REDIRECTS.[shortURL] = this.responseText;
      window.location = REDIRECTS.[window.location.href.split('1pt.co/')[1]];
    }
  };
  xhttp.open("GET", "https://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/retrieve-url-from-db.php?url=" + document.getElementById("url").value, true);
  xhttp.send();
}
