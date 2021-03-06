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
*Post information from the DB
*about the user profile info
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
$password = null;

$sql = "CALL postUser('$email','$firstName','$lastName','$mobilePhone','$workPhone','$companyName','$companyURL','$facebookURL','$instagramURL','$twitterURL','$address1','$address2','$city','$state','$zipcode','$password')";

if (mysqli_query($conn, $sql)) {
	echo "User encryption complete";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "call getUserID('$email')";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['id'] = $row['user_ID'];
	array_push($requests,$request);
    }
} else {
    echo "No results";
}

mysqli_close($conn);
echo json_encode($requests);
}
?>
