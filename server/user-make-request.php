<?php

date_default_timezone_set('Etc/UTC');
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
require_once('./logger.php');

$config = parse_ini_file('../../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$userID = $_POST['userID'];
$userEmail = $_POST['userEmail'];
$billboardID = $_POST['billboardID'];
$startingDate = $_POST['sDate'];
$packageID = $_POST['packetID'];
$duration = $_POST['duration'];
$frequency = $_POST['frequency'];
$price = $_POST['price'];
$fileName = $_POST['fileName'];
$extension = $_POST['extension'];
$size = $_POST['size'];
$width = $_POST['width'];
$height = $_POST['height'];
$ratio = $_POST['ratio'];

$sql = "CALL postAdRequest($userID, $billboardID, $packageID, $duration, $frequency, $price, '$startingDate', '$fileName', '$extension', $width, $height, $size, '$ratio')";
$result = mysqli_query($conn, $sql);
$requestID;

if ($result) {
	if (mysqli_num_rows($result) > 0) {
    		$row = mysqli_fetch_assoc($result);
		$requestID = $row['requestID_OUT'];
		logger($userEmail, "USER MADE REQUEST", "User made request #" . $requestID . " with start date " . $startingDate . ", duration " . $duration . " day(s), frequency " . $frequency . " display per cycle, price $" . $price . " and billboardID " . $billboardID);
	} else {
    		logger($userEmail, "ERROR READING REQUEST ID", "Error reading request ID while making a request");
	}
	
	mysqli_close($conn);

	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

	if($conn === false){
    		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sql = "CALL getAccounts(2);";
	$result = mysqli_query($conn,$sql);
	$approverEmails = array();

	if (mysqli_num_rows($result) > 0) {
    		while($row = mysqli_fetch_assoc($result)) {
        		array_push($approverEmails, $row['emailAddress']);
    		}
	} else {
    		logger($userEmail, "ERROR READING APPROVER EMAILS","Error reading approver email while trying to notify approver of the new request");
	}

	mysqli_close($conn);

	$mail = new PHPMailer;

    	$mail->isSMTP();
    	$mail->Host = $config['IP'];
    	$mail->Port = $config['PORT'];
    	$mail->SMTPAuth = false;

    	$mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');

    	$mail->Subject = 'A Request Is Available For Review';
    	$mail->Body    = 'A request with ID: '.$requestID .' is now available for review.';

	foreach ($approverEmails as $email) {
	    $mail->addAddress($email);
	}
	
	if (!$mail->send()) {
                logger($userEmail,"MAILER ERROR", "Error sending email to approvers when creating a request : " . $mail->ErrorInfo);
        } else {
	        logger($userEmail,"EMAIL SENT", "Emails were sent to approvers to notify of new request was made");
        }
} else {
	logger($userEmail,"ERROR IN DB","Error updating record when creating new request: " . mysqli_error($conn));
}

// Getting file name
$filename = $_FILES['upload-image']['name'];

// Location
$location = $config['IMAGE_PATH'] . "img/requests/".$requestID.".".$extension;

$uploadOk = 1;
//$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

// Valid Extensions
//$valid_extensions = array("jpg","jpeg","png");

// Check file extension
//if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
   //$uploadOk = 0;
//}

//if($uploadOk == 0){
  // echo 0;
//}else{
   if(move_uploaded_file($_FILES['upload-image']['tmp_name'],$location)){
        echo "Uploaded";
   }else{
      echo 0;
   }
//}

?>
