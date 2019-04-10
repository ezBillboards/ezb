<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$name = $_POST['name'];
$description = $_POST['description'];
$url = '../../img/billboards/1.jpg';
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
$cycle = 4;
$fileName = $_POST['fileName'];
$extension = $_POST['extension'];
$packages = $_POST['packages'];
$regulations = $_POST['regulations'];
$rejections = $_POST['rejections'];
$billboardID;

$sql = "CALL postBillboard('$name','$description','$url',$width,$height,$latitude,$longitude,$minwidth,$maxwidth,$minheight,$maxheight,$readtime,$impressions,$traffic,$cycle)";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)) {
        $billboardID = $row['ID'];
    }
	echo "New record created successfully. Last inserted ID is: " . $billboardID;
} else {
	echo "Error updating record: " . mysqli_error($conn);
}
mysqli_close($conn);
/* Getting file name */
$filename = $_FILES['uploadimage']['name'];
echo $filename;

/* Location */
$location = "../../img/billboards/".$billboardID.".".$extension;
echo $location;

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
        echo "Uploaded";
   }else{
      echo " Not uploaded";
   }
}

for ($x = 0; $x < count($packages); $x=$x+3) {
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$duration = $packages[$x];
	$frequency = $packages[$x + 1];
	$price = $packages[$x + 2];
	$sql = "CALL postPackage($billboardID,$duration,$frequency,$price)";
	if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
	} else {
			echo "Error updating record: " . mysqli_error($conn);
	}
	mysqli_close($conn);	
}

for ($x = 0; $x < count($regulations); $x++) {
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postRegulation($billboardID,'$regulations[$x]')";
	if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
	} else {
		echo "Error updating record: " . mysqli_error($conn);
	}
	mysqli_close($conn);
}

for ($x = 0; $x < count($rejections); $x++) {
    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	$sql = "CALL postCommonRejection($billboardID,'$rejections[$x]')";
	if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
	} else {
		echo "Error updating record: " . mysqli_error($conn);
	}
	mysqli_close($conn);
}

?>