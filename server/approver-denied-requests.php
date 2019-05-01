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

$sql = "CALL getProcessedRequest(3)";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['id'] = $row['request_ID'];
        $request['reqDate'] = $row['requestDateFormat'];
        $request['firstName'] = $row['firstName'];
        $request['lastName'] = $row['lastName'];
        $request['artworkName'] = $row['artworkName'];
        $request['artworkURL'] = $config['IMAGE_PATH'] . $row['artworkURL'];
        $request['extension'] = $row['extension'];
        $request['deniedDate'] = $row['approveDate'];
		$request['approverFirstName'] = $row['approverFirstName'];
        $request['approverLastName'] = $row['approverLastName'];
		$request['comments'] = $row['comments'];
		/* $request['billboard_ID'] = $row['billboard_ID'];
        $request['billboard'] = $row['billboardName'];
		$request['displayPerCycle'] = $row['displayPerCycle'];
		 request['width'] = $row['width'];
        $request['height'] = $row['height'];
        $request['size'] = $row['size'];*/
        array_push($requests,$request);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($requests);

?>
