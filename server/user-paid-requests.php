<?php

$config = parse_ini_file('../../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$userID = $_GET['id'];
$sql = "CALL getUserRequest($userID, 5)";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['img'] = $config['IMAGE_PATH'] . $row['artworkURL'];
        $request['name'] = $row['billboardName'];
        $request['description'] = $row['billboardDescription'];
        $request['id'] = $row['request_ID'];
        $request['date'] = $row['requestDateFormat'];
	$request['approvedDate'] = $row['approveDateFormat'];
	$request['paymentDate'] = $row['paymentDateFormat'];
        $request['duration'] = $row['duration'];
        $request['frequency'] = $row['displayPerCycle'];
	$request['startingDate'] = $row['startDateFormat'];
        $request['endDate'] = $row['endDateFormat'];
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
