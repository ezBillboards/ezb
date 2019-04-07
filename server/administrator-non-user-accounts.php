<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$id = $_GET['id'];
$sql = "CALL getAccounts($id)";
$result = mysqli_query($conn,$sql);
$accounts = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$account['id'] = $row['user_ID'];
	$account['firstName'] = $row['firstName'];
        $account['lastName'] = $row['lastName'];
        $account['email'] = $row['emailAddress'];
        $account['workPhone'] = $row['workPhone'];
        $account['mobilePhone'] = $row['mobilePhone'];
        $account['office'] = $row['office'];
        array_push($accounts, $account);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($accounts);
?>
