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
*Get information from the DB
*about the user profile info
**************************************/
$userID = 5; //Do GET later.
$sql = "CALL getUserAccount($userID)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$info['firstName'] = $row['firstName'];
	$info['lastName'] = $row['lastName'];
	$info['email'] = $row['emailAddress'];
	$info['mobilePhone'] = $row['mobilePhone'];
	$info['workPhone'] = $row['workPhone'];
	$info['company'] = $row['companyName'];
	$info['address1'] = $row['address1'];
	$info['address2'] = $row['address2'];
	$info['state'] = $row['state'];
	$info['city'] = $row['city'];
	$info['zip'] = $row['zipcode'];
	$info['url'] = $row['companyURL'];
	$info['facebook'] = $row['facebookURL'];
	$info['twitter'] = $row['twitterURL'];
	$info['instagram'] = $row['instagramURL'];
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($info);
}
?>
