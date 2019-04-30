<?php

$config = parse_ini_file('../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$emailAddress = $_GET['emailAddress'];
$psswd = $_GET['psswd'];
$sql = "call getLoginUser('$emailAddress','$psswd')";
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
