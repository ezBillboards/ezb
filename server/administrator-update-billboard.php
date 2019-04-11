<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
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
$traffic = $_POST['traffic'];
$fileName = $_POST['fileName'];
$extension = $_POST['extension'];
$packages = json_decode($_POST['packages']);
$regulations = json_decode($_POST['regulations']);
$rejections = json_decode($_POST['rejections']);
$cycle = 4;
$billboardID;

$sql = "CALL putBillboardInfo($id,'$name','$description',$width,$height,$latitude,$longitude,$minwidth,$maxwidth,$minheight,$maxheight,$readtime,$impressions,$traffic,$cycle)";
if (mysqli_query($conn, $sql)) {
	echo "Billboard updated successfully";
} else {
	echo "Error updating record: " . mysqli_error($conn) . " ";
}
mysqli_close($conn);

if($fileName != null){
	/* Getting file name */
	$filename = $_FILES['uploadimage']['name'];
	//echo $filename;

	/* Location */
	$location = "../../img/billboards/".$id.".".$extension;
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

}

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
	$sql = "CALL postPackage($id,$duration,$frequency,$price)";
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
	$sql = "CALL postRegulation($id,'$regulations[$x]')";
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
	$sql = "CALL postCommonRejection($id,'$rejections[$x]')";
	if (mysqli_query($conn, $sql)) {
        echo " Rejection inserted successfully ";
	} else {
		echo "Error inserting rejection: " . mysqli_error($conn) . " ";
	}
	mysqli_close($conn);
}

?>
