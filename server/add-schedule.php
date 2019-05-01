<?php

if(strpos($_SERVER['HTTP_REFERER'],"ezb.uprm.edu") == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
        $config = parse_ini_file('../../../config.ini');

	define('DB_SERVER', 'ezb.uprm.edu');
	define('DB_USERNAME', 'ezb');
	define('DB_PASSWORD', 'ezb');
	define('DB_NAME', 'ezbillboards');

	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
    		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sql = "CALL putNextSchedule()";

	if (mysqli_query($conn, $sql)) {
		echo "Record updated successfully";
		mysqli_close($conn);
	} else {
    		echo "Error updating record: " . mysqli_error($conn);
		mysqli_close($conn);
	}
}
?>
