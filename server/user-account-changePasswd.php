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

$userID = $_POST['userID'];
$oldPasswd = $_POST['oldPasswd'];
$newPasswd = $_POST['passwd'];
$sql = "CALL getPassword($userID)";

$passwd;
$result = mysqli_query($conn,$sql);
if (mysqli_num_rows($result) > 0) {
	$readPasswd = mysqli_fetch_assoc($result);
	$passwd = $readPasswd['psswd'];
	echo md5($oldPasswd) . " " . md5($oldPasswd) . " " . md5($oldPasswd);// . " " . $passwd;
	if(md5($oldPasswd) == $passwd){
		mysqli_close($conn);
		
		$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

		if($conn === false){
    			die("ERROR: Could not connect. " . mysqli_connect_error());
		}
		
		$sql = "CALL putPassword($userID, '$newPasswd')";

		if (mysqli_query($conn, $sql)) {
    			echo "Record updated successfully";
		} else {
    			echo "Error updating record: " . mysqli_error($conn);
		}
	} else{
		echo "Password doesn't match.";	
	}
} else {
    echo "ERROR finding password.";
}

mysqli_close($conn);

?>
