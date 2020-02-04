var input = document.getElementById("url");
var button = document.getElementById("next");

// Click GO button if the ENTER key is pressed
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        button.click();
    }
});

// Called by clicking the GO button
function showOptions() {
    if(input.value != "" && validateURL(input.value)) {
        input.disabled = true;
        input.style.width = "1200px";
        // Apply the top-left border-radius to all 4 sides
        input.style.borderRadius = getComputedStyle(input).borderRadius.split(" ")[0];
        button.style.display = "none";

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
    var regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    if (url.match(regex)) {
        return true;
    } else {
        return false;
    }
}

// Add '1pt.co/' prefix to input#custom-url
var cleave = new Cleave("#custom-url", {
    prefix: "1pt.co/",
});
