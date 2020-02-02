var input = document.getElementById("url");
var button = document.getElementById("submit");


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
        input.style.borderRadius = "10px";
        button.style.display = "none";

        document.getElementById("top").style.height = "300px";
        document.getElementById("options").style.display = "block";
    } else {
        showError("Invalid URL!");
    }
}

function showError(message) {
    Swal.fire({
        title: 'Invalid URL!',
        icon: 'error',
        confirmButtonText: 'OK'
    })
}

function validateURL(url) {
    var regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    if (url.match(regex)) {
        return true;
    } else {
        return false;
    }
}
