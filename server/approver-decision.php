<?php

date_default_timezone_set('Etc/UTC');
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

$config = parse_ini_file('../../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_POST['id'];
$approverID = $_POST['approverID'];
$status = $_POST['status'];
$comments = $_POST['comments'];

$sql = "CALL putStatusApprover($id, $approverID, $status, '$comments')";

if (mysqli_query($conn, $sql)) {
	echo "Record updated successfully";
	mysqli_close($conn);
	
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

	if($conn === false){
    		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sql = "CALL getRequestEmail($id)";
	$result = mysqli_query($conn,$sql);

	if (mysqli_num_rows($result) > 0) {
    		$info = mysqli_fetch_assoc($result);
        	$userEmail = $info['emailAddress'];
	}else {
    		echo "No results";
	}

	mysqli_close($conn);

	$mail = new PHPMailer;
    	$mail->isSMTP();
    	$mail->Host = $config['IP'];
    	$mail->Port = $config['PORT'];
    	$mail->SMTPAuth = false;

    	$mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');
    	$mail->addAddress($userEmail);
	
	if($status == 2){
    		$mail->Subject = 'Your Request Has Been Approved!';
    		$mail->Body    = 'Your request with ID: ' . $id . ' has been approved. Please go to the requests and pay to continue the process.';
	} else if($status == 3){
		$mail->Subject = 'Your Request Has Been Denied';
                $mail->Body    = 'Your request with ID: ' . $id . ' has been denied. The reason for the denial was: ' . $comments;
	}

	if (!$mail->send()) {
    		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
    		echo "Message sent!";
	}
} else {
    	echo "Error updating record: " . mysqli_error($conn);
	mysqli_close($conn);
}

?>
