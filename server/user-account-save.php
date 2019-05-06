<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

/*************************************
*Post account information from
*from the front end to the DB
**************************************/
$userID = $_POST['userID'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$mobilePhone = $_POST['mobilePhone'];
$workPhone = $_POST['workPhone'];
$company = $_POST['company'];
$office = $_POST['office'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$state = $_POST['state'];
$city = $_POST['city'];
$zip = $_POST['zip'];

$url = $_POST['url'];
$facebook = $_POST['facebook'];
$twitter = $_POST['twitter'];
$instagram = $_POST['instagram'];
		
$sql = "CALL putAccount($userID, '$firstName','$lastName','$email','$mobilePhone','$workPhone','$company','$office','$address1','$address2','$state','$city','$zip','$url','$facebook','$twitter','$instagram')";

if (mysqli_query($conn, $sql)) {
	echo "Record updated successfully";
} else {
	echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
}
?>
