<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$userID = 1; //Change to GET later.
$sql = "CALL getUserRequest($userID, 5)";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['img'] = $row['artworkURL'];
        $request['name'] = $row['billboardName'];
        $request['description'] = $row['billboardDescription'];
        $request['id'] = $row['request_ID'];
        $request['date'] = $row['requestDateFormat'];
	$request['paymentDate'] = $row['paymentDateFormat'];
        $request['duration'] = $row['duration'];
        $request['frequency'] = $row['displayPerCycle'];
	$request['startingDate'] = $row['startDate'];
	$request['artworkName'] = $row['artworkName'];
	$request['extension'] = $row['extension'];
	$request['comments'] = $row['comments'];
        array_push($requests,$request);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($requests);

?>
