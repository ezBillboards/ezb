<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$name = $_POST['name'];
$description = $_POST['description'];
$url = '../../img/billboards/1.jpg';
$width = $_POST['width'];
$height = $_POST['height'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$minwidth = $_POST['minwidth'];
$maxwidth = $_POST['maxwidth'];
$minheight = $_POST['minheight'];
$maxheight = $_POST['maxheight'];
$readtime = $_POST['readtime'];
$impressions = $_POST['impressions'];
$traffic = $_POST['traffic'];
$cycle = 4;
$billboardID;


$sql = "CALL postBillboard('$name','$description','$url',$width,$height,$latitude,$longitude,$minwidth,$maxwidth,$minheight,$maxheight,$readtime,$impressions,$traffic,$cycle,$billboardID)";

if (mysqli_query($conn, $sql)) {
	echo "New record created successfully. Last inserted ID is: " . $billboardID;
} else {
	echo "Error updating record: " . mysqli_error($conn);
}
mysqli_close($conn);
?>