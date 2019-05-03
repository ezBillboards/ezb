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
	define('PATH',$config['IMAGE_PATH']);

	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
    		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$name = $_POST['name'];
	$description = $_POST['description'];
	$url = null;
	$width = $_POST['width'];
	$height = $_POST['height'];
	$latitude = $_POST['latitude'];
	$longitude = $_POST['longitude'];
	$minwidth = $_POST['minwidth'];
	$maxwidth = $_POST['maxwidth'];
	$minheight = $_POST['minheight'];
	$maxheight = $_POST['maxheight'];
	$tolerance = $_POST['tolerance'];
	$readtime = $_POST['readtime'];
	$impressions = $_POST['impressions'];
	$traffic = $_POST['traffic'];
	$cycle = $_POST['cycle'];
	$slots = $_POST['slots'];
	$imageRatio = $_POST['imageRatio'];
	$imageExtension = $_POST['imageExtension'];
	$fileName = $_POST['fileName'];
	$extension = $_POST['extension'];
	$packages = json_decode($_POST['packages']);
	$regulations = json_decode($_POST['regulations']);
	$rejections = json_decode($_POST['rejections']);
	$billboardID;

	$sql = "CALL postBillboard('$name','$description','$url',$width,$height,$latitude,$longitude,$minwidth,$maxwidth,$minheight,$maxheight,$tolerance,$readtime,$impressions,$traffic,$cycle,$slots,'$imageRatio','$imageExtension')";
	$result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
        		$billboardID = $row['ID'];
    		}
		echo "New billboard created successfully. Last inserted ID is: " . $billboardID . " ";
	} else {
		echo "Error updating record: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);

	/* Getting file name */
	$filename = $_FILES['uploadimage']['name'];
	echo $filename;

	/* Location */
	$location = "img/billboards/".$billboardID.".".$extension;
	//echo $location;

	$uploadOk = 1;
	$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

	/* Valid Extensions */
	$valid_extensions = array("jpg","jpeg","png");

	/* Check file extension */
	if(!in_array(strtolower($imageFileType),$valid_extensions) ) {
   		$uploadOk = 0;
	}

	if($uploadOk == 0){
   		echo " uploadOk = 0 ";
	}else{
		//echo PATH . $location . " ";
   		if(move_uploaded_file($_FILES['uploadimage']['tmp_name'],$config['IMAGE_PATH'] . $location)){
        		echo " Uploaded ";
   		}else{
      			echo " Not uploaded ";
   		}
	}
	//Insert billboard URL
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL putBillboardURL($billboardID,'$location')";
	if (mysqli_query($conn, $sql)) {
		echo " Billboard URL updated successfully ";
	} else {
		echo " Error updating URL: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);

	//Insert new packages
	echo " " . $packages . " ";
	for ($x = 0; $x < count($packages); $x=$x+3) {
		$duration = $packages[$x];
		$frequency = $packages[$x + 1];
		$price = $packages[$x + 2];
		echo $duration . " " . $frequency . " " . $price . " ";
		$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
		if($conn === false){
			die("ERROR: Could not connect. " . mysqli_connect_error());
		}
		$sql = "CALL postPackage($billboardID,$duration,$frequency,$price)";
		if (mysqli_query($conn, $sql)) {
        		echo " Package inserted successfully ";
		} else {
			echo "Error inserting package: " . mysqli_error($conn) . " ";
		}
		mysqli_close($conn);	
	}

	//Insert new regulations
	for ($x = 0; $x < count($regulations); $x++) {
    		$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
		if($conn === false){
			die("ERROR: Could not connect. " . mysqli_connect_error());
		}
		$sql = "CALL postRegulation($billboardID,'$regulations[$x]')";
		if (mysqli_query($conn, $sql)) {
        		echo " Regulation inserted successfully ";
		} else {
			echo "Error inserting regulation: " . mysqli_error($conn) . " ";
		}
		mysqli_close($conn);
	}

	//Insert new rejections
	for ($x = 0; $x < count($rejections); $x++) {
    		$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
		if($conn === false){
			die("ERROR: Could not connect. " . mysqli_connect_error());
		}
		$sql = "CALL postCommonRejection($billboardID,'$rejections[$x]')";
		if (mysqli_query($conn, $sql)) {
        		echo " Rejection inserted successfully ";
		} else {
			echo "Error inserting rejection: " . mysqli_error($conn) . " ";
		}
		mysqli_close($conn);
	}
}
?>
