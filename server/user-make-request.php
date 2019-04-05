<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$userID = $_POST['userID'];
$billboardID = $_POST['billboardID'];
$startingDate = $_POST['sDate'];
$packetID = $_POST['packetID'];
$fileName = $_POST['fileName'];
$extension = $_POST['extension'];
$size = $_POST['size'];
$width = $_POST['width'];
$height = $_POST['height'];
$ratio = $_POST['ratio'];

echo $userID . " " . $billboardID . " " . $startingDate . " " . $packetID . " " . $fileName . " " . $extension . " " . $size . " " . $width . " " . $height . " " . $ratio;
/*$sql = "CALL postAddRequest($userID, '$firstName','$lastName','$email','$mobilePhone','$workPhone','$company','$address1','$address2','$state','$city','$zip','$url','$facebook','$twitter','$instagram')";

if (mysqli_query($conn, $sql)) {
	echo "Record updated successfully";
} else {
	echo "Error updating record: " . mysqli_error($conn);
}*/

mysqli_close($conn);

?>
