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
