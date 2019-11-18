
<?php

// Change these variables
$servername = "";
$username = "";
$password = "";
$dbname = "";

$short = $_GET["url"];
$long = array();
$desktop = array();
$mobile = array();
$apple = array();
$android = array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT long_url, desktop, mobile, apple, android FROM redirects WHERE short_url = '$short'";
$result = $conn->query($sql);

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "[\"" . $row["long_url"] . "\", \"" . $row["desktop"] . "\", \"" . $row["mobile"] . "\", \"" . $row["apple"] . "\", \"" . $row["android"] . "\"]";
    }
} else {
	echo "error";
}

$conn->close();
?> 
