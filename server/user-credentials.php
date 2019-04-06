<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$emailAddress = $_GET['emailAddress'];
$sql = "call getLoginUser( '$emailAddress')";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['id'] = $row['user_ID'];
		$request['roleID'] = $row['role_ID'];
		$request['verified'] = $row['verified'];
		$request['statusTemp'] = $row['statusTemp'];
		$request['enabled'] = $row['enabled'];
		array_push($requests,$request);
    }
	echo json_encode($requests);
} else {
    echo "No results";
}

mysqli_close($conn);

?>
