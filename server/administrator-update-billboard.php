<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
require_once('./logger.php');
define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);


/*************************************
*Post information about billboard
*description for the user knowledge
*on the DB
**************************************/ 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$width = $_POST['width'];
$height = $_POST['height'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$minwidth = $_POST['minwidth'];
$maxwidth = $_POST['maxwidth'];
$minheight = $_POST['minheight'];
$maxheight = $_POST['maxheight'];
$readtime = $_POST['readtime'];
$impressions = $_POST['impressions'];
$tolerance = $_POST['tolerance'];
$traffic = $_POST['traffic'];
$fileName = $_POST['fileName'];
$extension = $_POST['extension'];
$packages = json_decode($_POST['packages']);
$regulations = json_decode($_POST['regulations']);
$rejections = json_decode($_POST['rejections']);
$existingpackages = json_decode($_POST['existingpackages']);
$existingregulations = json_decode($_POST['existingregulations']);
$existingrejections = json_decode($_POST['existingrejections']);
$cycle = $_POST['cycle'];
$imageRatio = $_POST['imageRatio'];
$imageExtension = $_POST['imageExtension'];
$email = $_POST['email'];

print_r($_POST);
$sql = "CALL putBillboardInfo($id,'$name','$description',$width,$height,$latitude,$longitude,$minwidth,$maxwidth,$minheight,$maxheight,$tolerance,$readtime,$impressions,$traffic,$cycle,'$imageRatio','$imageExtension')";
if (mysqli_query($conn, $sql)) {
	logger($email, "UPDATE BILLBOARD", "Administrator " . $email . " has updated the information of billboard ID: " . $id);
} else {
	echo "Error updating record: " . mysqli_error($conn) . " ";
}
mysqli_close($conn);

/*************************************
*Upload image from the DB
**************************************/
if($fileName){
	/* Getting file name */
	$filename = $_FILES['uploadimage']['name'];
	echo $filename;

	/* Location */
	$location = "img/billboards/".$id.".".$extension;
	//echo $location;

	$uploadOk = 1;
	$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

	/* Valid Extensions */
	$valid_extensions = array("jpg","jpeg","png");

	/* Check file extension */
	if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
	   $uploadOk = 0;
	}

	if($uploadOk == 0){
	   echo " uploadOk = 0 ";
	}else{
	   if(move_uploaded_file($_FILES['uploadimage']['tmp_name'],$location)){
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
	$sql = "CALL putBillboardURL($id,'$location')";
	if (mysqli_query($conn, $sql)) {
		echo " Billboard URL updated successfully ";
	} else {
			echo " Error updating URL: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);

}


/*************************************
*Update existing packages
**************************************/
echo " " . $existingpackages . " ";
for ($x = 0; $x < count($existingpackages); $x=$x+4) {
	$packageid = $existingpackages[$x];
	$duration = $existingpackages[$x + 1];
	$frequency = $existingpackages[$x + 2];
	$price = $existingpackages[$x + 3];
	echo $duration . " " . $frequency . " " . $price . " ";
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL putPackage($packageid,$duration,$frequency,$price)";
	if (mysqli_query($conn, $sql)) {
        echo " Package inserted successfully ";
	} else {
			echo "Error inserting package: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);	
}

//Insert new packages
//echo " " . $packages . " ";
for ($x = 0; $x < count($packages); $x=$x+3) {
	$duration = $packages[$x];
	$frequency = $packages[$x + 1];
	$price = $packages[$x + 2];
	echo $duration . " " . $frequency . " " . $price . " ";
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postPackage($id,$duration,$frequency,$price)";
	if (mysqli_query($conn, $sql)) {
        echo " Package inserted successfully ";
	} else {
			echo "Error inserting package: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);	
}

//Update existing regulations
for ($x = 0; $x < count($existingregulations); $x=$x+2) {
	$regulationid = $existingregulations[$x];
	$regulation = $existingregulations[$x + 1];
	echo $regulation . " ";
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL putRegulation($regulationid,'$regulation')";
	if (mysqli_query($conn, $sql)) {
        echo " Regulation inserted successfully ";
	} else {
		echo "Error inserting regulation: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);
}

//Insert new regulations
for ($x = 0; $x < count($regulations); $x++) {
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postRegulation($id,'$regulations[$x]')";
	if (mysqli_query($conn, $sql)) {
        echo " Regulation inserted successfully ";
	} else {
		echo "Error inserting regulation: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);
}

//Update existing rejection
for ($x = 0; $x < count($existingrejections); $x=$x+2) {
	$rejectionid = $existingrejections[$x];
	$rejection = $existingrejections[$x + 1];
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL putRegulation($rejectionid,'$rejection')";
	if (mysqli_query($conn, $sql)) {
        echo " Rejection inserted successfully ";
	} else {
		echo "Error inserting rejection: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);
}

//Insert new rejections
for ($x = 0; $x < count($rejections); $x++) {
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postCommonRejection($id,'$rejections[$x]')";
	if (mysqli_query($conn, $sql)) {
        echo " Rejection inserted successfully ";
	} else {
		echo "Error inserting rejection: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);
}
}
?>
