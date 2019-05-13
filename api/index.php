<?php

header('Access-Control-Allow-Origin: *');

if(!empty($_GET["url"])) {
    $long = $_GET["url"];
    $desktop = @$_GET["desktop"];
    $mobile = @$_GET["mobile"];
    $apple = @$_GET["apple"];
    $android = @$_GET["android"];
    $custom = @$_GET["custom"];

    $query = "https://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/add-url-to-db.php?url=" . $long;

    if(isset($_GET['desktop'])){
        $query = $query . "&de=" . $desktop;
    }

    if(isset($_GET['mobile'])){
        $query = $query . "&mo=" . $mobile;
    }

    if(isset($_GET['apple'])){
        $query = $query . "&ap=" . $apple;
    }

    if(isset($_GET['android'])){
        $query = $query . "&an=" . $android;
    }

    if(isset($_GET['custom'])){
        $query = $query . "&cu=" . $custom;
    }

    echo(file_get_contents($query));

} else {
    header('HTTP/1.0 400 Bad Request');
    echo("Invalid request!");
    exit();
}

?>
