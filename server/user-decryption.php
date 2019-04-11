<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

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
?>
