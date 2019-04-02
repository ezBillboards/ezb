<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$userID = 1; //Do GET later.
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$mobilePhone = $_POST['mobilePhone'];
$workPhone = $_POST['workPhone'];
$company = $_POST['company'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$state = $_POST['state'];
$city = $_POST['city'];
$zip = $_POST['zip'];

$url = $_POST['url'];
$facebook = $_POST['facebook'];
$twitter = $_POST['twitter'];
$instagram = $_POST['instagram'];
		
$sql = "CALL putAccount($userID, '$firstName','$lastName','$email','$mobilePhone','$workPhone','$company','$address1','$address2','$state','$city','$zip','$url','$facebook','$twitter','$instagram')";

if (mysqli_query($conn, $sql)) {
	echo "Record updated successfully";
} else {
	echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);

?>
