<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getProcessedRequest(4)";
$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['id'] = $row['request_ID'];
        $request['reqDate'] = $row['requestDateFormat'];
        $request['firstName'] = $row['firstName'];
        $request['lastName'] = $row['lastName'];
        $request['artworkName'] = $row['artworkName'];
        $request['artworkURL'] = $row['artworkURL'];
        $request['extension'] = $row['extension'];
        $request['cancelledDate'] = $row['cancelDate'];
		$request['cancelFirstName'] = $row['cancelFirstName'];
        $request['cancelLastName'] = $row['cancelLastName'];
		$request['comments'] = $row['comments'];
        array_push($requests,$request);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($requests);

?>
