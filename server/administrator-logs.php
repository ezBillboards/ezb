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
/*$sql = "CALL getUserRequest($userID, 1)";
$requests = array();
$result = mysqli_query($conn,$sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['timeStamp'] = 'sept 12';
	$request['email'] = 'elvin.ortiz3@upr.edu';
	$request['action'] = 'deleted billboard';
	$request['detailedAction'] = 'deleted main billboard';
        array_push($requests,$request);
    }
} else {
    echo "No results";
}*/
$logs = array();
	$log['date'] = '13/feb/2019';
        $log['timeStamp'] = '15:33:02';
        $log['email'] = 'juan.pueblo@gmail.com';
        $log['action'] = 'PWD REQUEST';
        $log['detailedAction'] = 'password change request temp password send to juan.pueblo@gmail.com';
        array_push($logs,$log);

        $log['date'] = '15/feb/2019';
        $log['timeStamp'] = '5:00:02';
        $log['email'] = 'benito.martinez@gmail.com';
        $log['action'] = 'DELETE ACCOUNT';
        $log['detailedAction'] = 'Benito Martinez deleted his account';
        array_push($logs,$log);


mysqli_close($conn);
echo json_encode($logs);
?>

