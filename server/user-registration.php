<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

require_once('./logger.php');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

/*************************************
*Post user information to the DB
*from registration
**************************************/	
$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$mobilePhone = $_POST['mobilePhone'];
$workPhone = $_POST['workPhone'];
$companyName = $_POST['companyName'];
$companyURL = $_POST['companyURL'];
$facebookURL = $_POST['facebookURL'];
$instagramURL = $_POST['instagramURL'];
$twitterURL = $_POST['twitterURL'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$password = $_POST['password'];

$sql = "CALL postUser('$email','$firstName','$lastName','$mobilePhone','$workPhone','$companyName','$companyURL','$facebookURL','$instagramURL','$twitterURL','$address1','$address2','$city','$state','$zipcode','$password')";

if (mysqli_query($conn, $sql)) {
	logger($email,"USER REGISTRATION","User with email " . $email . " has registered succesfully");
	mysqli_close($conn);
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
	 
	if($conn === false){
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sql = "call getUserID('$email')";
	$result = mysqli_query($conn,$sql);
	$id = "";
	
	if (mysqli_num_rows($result) > 0) {
	    $row = mysqli_fetch_assoc($result);
	    $id = $row['user_ID'];
	    logger($email,"USER REGISTRATION ID", "Registered user has ID " . $id);
	} else {
	    logger($email,"ERROR USER REGISTRATION ID", "Error while trying to retrieve new user ID");
	}	
	echo $id;
	mysqli_close($conn);

} else {
	echo "Email already exists";
	logger($email,"ERROR IN DB","Error while trying to register new user account");
	mysqli_close($conn);
}
}
?>
