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
*Get information about the history
*of the publish image for the publisher
**************************************/
$sql = "CALL getProcessedRequest(6)";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['id'] = $row['request_ID'];
        $request['reqDate'] = $row['requestDateFormat'];
		$request['startDate'] = $row['startDate'];
		$request['endDate'] = $row['endDate'];
		$request['paymentDate'] = $row['paymentDateFormat'];
        $request['firstName'] = $row['firstName'];
        $request['lastName'] = $row['lastName'];
        $request['artworkName'] = $row['artworkName'];
        $request['artworkURL'] = $config['IMAGE_PATH'] . $row['artworkURL'];
        $request['extension'] = $row['extension'];
        $request['approveDate'] = $row['approveDate'];
		$request['approverFirstName'] = $row['approverFirstName'];
        $request['approverLastName'] = $row['approverLastName'];
		$request['billboard'] = $row['billboardName'];
		$request['displayPerCycle'] = $row['displayPerCycle'];
        array_push($requests,$request);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($requests);
}
?>
