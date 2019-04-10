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
$packages = $_POST['packages'];
$regulations = $_POST['regulations'];
$billboardID;

$sql = "CALL postBillboard('$name','$description','$url',$width,$height,$latitude,$longitude,$minwidth,$maxwidth,$minheight,$maxheight,$readtime,$impressions,$traffic,$cycle)";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)) {
        $billboardID = $row['ID'];
    }
	echo "New record created successfully. Last inserted ID is: " . $billboardID;
} else {
	echo "Error updating record: " . mysqli_error($conn);
}
mysqli_close($conn);

for ($x = 0; $x < count($packages); $x=$x+3) {
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postPackage($billboardID,$packages[$x],$packages[$x + 1],$packages[$x + 2])";
	if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
	} else {
			echo "Error updating record: " . mysqli_error($conn);
	}
	mysqli_close($conn);	
}

for ($x = 0; $x < count($regulations); $x++) {
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postRegulation($billboardID,'$regulations[$x]')";
	if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
	} else {
		echo "Error updating record: " . mysqli_error($conn);
	}
	mysqli_close($conn);
}


?>
