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
*Get email account from DB
**************************************/
$email = $_GET['emailAddress'];
	$sql = "CALL getAccounts(1);";
	$result = mysqli_query($conn,$sql);
	$emailExist = false;
	if (mysqli_num_rows($result) > 0) {
    		while($row = mysqli_fetch_assoc($result)) {
        		if($email == $row['emailAddress']){
			$emailExist = true;
			}
    		}
	}
	
	mysqli_close($conn);
	echo json_encode($emailExist);
}
?>
