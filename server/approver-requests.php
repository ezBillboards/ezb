<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getRequests()";
$result = mysqli_query($conn,$sql);
$index = 0;

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $requests[index][0] = $row['request_ID'];
        $requests[index][1] = $row['requestDate'];
        $requests[index][2] = $row['billboardName'];
        $requests[index][3] = $row['firstName'];
        $requests[index][4] = $row['lastName'];
        $requests[index][5] = $row['displayPerCycle'];
        $requests[index][6] = $row['artworkName'];
        $requests[index][7] = $row['artworkURL'];
        $requests[index][8] = $row['extension'];
        $requests[index][9] = $row['width'];
        $requests[index][10] = $row['height'];
        $requests[index][10] = $row['size'];
        index++;
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($requests);
?>
