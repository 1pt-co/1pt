var input = document.getElementById("url");
var next = document.getElementById("next");
var submit = document.getElementById("submit");
var customURLInput = document.getElementById("custom-url");

// Click 'GO' button if the ENTER key is pressed
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        next.click();
    }
});

// Click 'Shorten' button if the ENTER key is pressed
customURLInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        submit.click();
    }
});

// Add '1pt.co/' prefix to input#custom-url
var cleave = new Cleave(customURLInput, {
    prefix: "1pt.co/",
});

// Show div#options (called by clicking the GO button)
function showOptions() {
    if(input.value != "" && validateURL(input.value)) {
        input.disabled = true;
        input.style.width = "1200px";
        next.style.display = "none";

        // Apply the top-left border-radius to all 4 sides
        input.style.borderRadius = getComputedStyle(input).borderRadius.split(" ")[0];

        // Shift div#options up by reducing the height of div#top
        document.getElementById("top").style.height = "300px";
        document.getElementById("options").style.display = "block";

        customURLInput.focus({preventScroll: true});
    } else {
        showError("Invalid URL!");
    }
}

// Display QR code and the shortened URL
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

submit.onclick = function() {
    sendRequest(input.value, remove(customURLInput.value, ["1pt.co/", "/", "\\?"]));
};

/* Helper functions below */

// Show error popup
function showError(message) {
    Swal.fire({
        title: message,
        icon: "error",
        confirmButtonText: "OK"
    })
}

// Check whether a given string *could* be a valid URL
function validateURL(url) {
    var regex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);

    if (regex.test(url)) {
        return true;
    } else {
        return false;
    }
}

// Remove all occurrences of each item in the toRemove array from string baseString
function remove(baseString, toRemove) {
    toRemove.forEach(function(item, index) {
        console.log(item);
        baseString = baseString.replace(new RegExp(item, "gi"), "");
        console.log(index);
    })

    return baseString;
}