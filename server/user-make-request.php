<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$userID = $_POST['userID'];
$billboardID = $_POST['billboardID'];
$startingDate = $_POST['sDate'];
$packageID = $_POST['packetID'];
$fileName = $_POST['fileName'];
$extension = $_POST['extension'];
$size = $_POST['size'];
$width = $_POST['width'];
$height = $_POST['height'];
$ratio = $_POST['ratio'];

//echo $userID . " " . $billboardID . " " . $startingDate . " " . $packageID . " " . $fileName . " " . $extension . " " . $size . " " . $width . " " . $height . " " . $ratio;
$sql = "CALL postAdRequest($userID, $billboardID, $packageID, '$startingDate', '$fileName', '$extension', $width, $height, $size, '$ratio')";
$result = mysqli_query($conn, $sql);
$requestID;

if ($result) {
	echo "Record updated successfully";
	if (mysqli_num_rows($result) > 0) {
    		while($row = mysqli_fetch_assoc($result)){
			$requestID = $row['requestID_OUT'];
		}		
	} else {
    		echo "No results";
	}
} else {
	echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);

/* Getting file name */
$filename = $_FILES['upload-image']['name'];

echo $requestID;

/* Location */
$location = "../../img/requests/".$requestID.".".$extension;

$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

/* Valid Extensions */
$valid_extensions = array("jpg","jpeg","png");

/* Check file extension */
if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
   $uploadOk = 0;
}

if($uploadOk == 0){
   echo 0;
}else{
   if(move_uploaded_file($_FILES['upload-image']['tmp_name'],$location)){
        echo "Uploaded";
   }else{
      echo 0;
   }
}

?>
