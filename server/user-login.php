<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getLoginUser('example2@billboards.com')";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	echo "User Role";
	/*array_push($requests,$request);*/
    }
} else {
    echo "Not user";
}

$sql2 = "CALL getLoginPublisher('example@publisher.com')";
$result2 = mysqli_query($conn,$sql2);
$requests2 = array();

if (mysqli_num_rows($result2) > 0) {
    while($row = mysqli_fetch_assoc($result2)) {
        echo "Publisher Role";
        /*array_push($requests,$request);*/
    }
} else {
    echo "Not publisher!";
}

mysqli_close($conn);

echo json_encode($requests);

?>
