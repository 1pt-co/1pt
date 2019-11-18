<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "https://1pt.co" || $http_origin == "http://code.param.me")
{  
    header("Access-Control-Allow-Origin: " . $http_origin);
}

function urlExists($url){
  // Change these variables
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT short_url FROM redirects";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			if($row["short_url"] == $url){
				return true;
			} 
		}
		$conn->close();
	}
}

function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
	if(urlExists($randomString)){
		generateRandomString(4);
	} else {
		return $randomString;
	}
}

$long = $_GET["url"];
$desktop = $_GET["de"];
$mobile = $_GET["mo"];
$apple = $_GET["ap"];
$android = $_GET["an"];
$custom = $_GET["cu"];

if($custom==null ||  urlExists($custom)){
        $short = generateRandomString(4);
} else {
        $short = $custom;
}


$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {die("Connection failed: " . mysqli_connect_error());}

$sql = "INSERT INTO redirects (short_url, long_url, desktop, mobile, apple, android, custom) VALUES ('$short', '$long', '$desktop', '$mobile', '$apple', '$android', '$custom')";

if ($conn->query($sql) === TRUE) {
	echo $short;
} else {
	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    echo "Error";
}
$conn->close();
	
?>

