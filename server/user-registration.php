<?php
define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
	
$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$mobilePhone = $_POST['mobilePhone'];
$workPhone = $_POST['workPhone'];
$companyName = $_POST['companyName'];
$facebookURL = $_POST['facebookURL'];
$instagramURL = $_POST['instagramURL'];
$twitterURL = $_POST['twitterURL'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$password = $_POST['password'];

$sql = "CALL postUser($email,$firstName,$lastName,$mobilePhone,$workPhone,$companyName,$facebookURL,$instagramURL,$twitterURL,$address1,$address2,$city,$state,$zipcode,$password)";

if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
