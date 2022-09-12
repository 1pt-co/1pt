window.onload = function () {
  var url = window.location.href.split("1pt.co/")[1].toLowerCase();
  url = url.split("?")[0]; // Remove URL parameters
  url = url.replace("/", ""); // Remove trailing slashes

  function redirectToLongUrl(url) {
    if (url.includes("https://") || url.includes("http://")) {
      window.location = url;
    } else {
      var protocol = "http://";
      var fullURL = protocol.concat(url);
      window.location = fullURL;
    }
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 301) {
      data = JSON.parse(this.responseText);
      redirectToLongUrl(data.url);
    } else if (this.readyState == 4 && this.status == 404) {
      document.getElementById("error404").style.visibility = "visible";
      document.getElementById("loading").style.display = "none";
    }
  };
  xhttp.open("GET", "https://thakdees.dev.fast.sheridanc.on.ca/1pt/getURL.php?url=" + url, true);
  xhttp.send();
};
