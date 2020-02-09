var input = document.getElementById("url");
var next = document.getElementById("next");
var submit = document.getElementById("submit");

// Click GO button if the ENTER key is pressed
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        next.click();
    }
});

// Called by clicking the GO button
function showOptions() {
    if(input.value != "" && validateURL(input.value)) {
        input.disabled = true;
        input.style.width = "1200px";
        next.style.display = "none";

        // Apply the top-left border-radius to all 4 sides
        input.style.borderRadius = getComputedStyle(input).borderRadius.split(" ")[0];

        document.getElementById("top").style.height = "300px";
        document.getElementById("options").style.display = "block";
    } else {
        showError("Invalid URL!");
    }
}

// Error popup
function showError(message) {
    Swal.fire({
        title: message,
        icon: "error",
        confirmButtonText: "OK"
    })
}

// Return true if the input could be a valid URL
function validateURL(url) {
    var regex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);

    if (regex.test(url)) {
        return true;
    } else {
        return false;
    }
}

// Add '1pt.co/' prefix to input#custom-url
var cleave = new Cleave("#custom-url", {
    prefix: "1pt.co/",
});

function displayOutput(shortURL) {
    qrCode = document.getElementById("qr-code");
    output = document.getElementById("output");
    outputWrapper = document.getElementById("output-wrapper");
    copyBtn = document.getElementById("copy");


    qrCode.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + "https://" + shortURL;
    output.value = shortURL;

    copyBtn.style.visibility = "visible";
    output.style.visibility = "visible";

    outputWrapper.classList.add("animated", "faster", "zoomIn");
    copyBtn.classList.add("animated", "faster", "zoomIn");

    qrCode.onload = function(){
        qrCode.style.visibility = "visible";
        qrCode.classList.add("animated", "faster", "zoomIn");
    }
}

// Return short URL given a long URL
function sendRequest(longURL, shortURL){
    if(validateURL(longURL)){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                shortURL = "1pt.co/" + this.responseText;
                displayOutput(shortURL);
            }
        };

        request = "https://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/add-url-to-db.php?url=" + longURL + "&cu=" + encodeURI(shortURL);
        xhttp.open("GET", request, true);
        xhttp.send();
    } else {
        showError("There was an error!");
    }
}

function remove(string, toRemove) {

    toRemove.forEach(function(item, index) {
        console.log(item);
        string = string.replace(new RegExp(item, "gi"), "");
        console.log(index);
    })

    return string;
}

submit.onclick = function() {
    customURL = document.getElementById("custom-url");
    sendRequest(input.value, remove(customURL.value, ["1pt.co/", "/", "\\?"]));
};
