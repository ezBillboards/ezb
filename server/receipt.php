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

$id = $_GET['id'];

/*************************************
*Read info from DB.
**************************************/
$sql = "CALL getCheckoutInformation('$id')";
$result = mysqli_query($conn, $sql);

if ($result) {
        if (mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                $requestID = $row['request_ID'];
		$email = $row['payerEmail'];
		$payerFirstName = $row['payerFirstName'];
		$payerLastName = $row['payerLastName'];
		$type = $row['transactionType'];
		$tandem = $row['tandem'];
		$price = $row['price'];
		$paymentDate = $row['paymentDate'];
        } else {
                //echo "No results";
        }

        mysqli_close($conn);

        $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

        if($conn === false){
                die("ERROR: Could not connect. " . mysqli_connect_error());
        }

        $sql = "CALL getAccounts(3);";
        $result = mysqli_query($conn,$sql);
        $publisherEmails = array();

        if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                        array_push($publisherEmails, $row['emailAddress']);
                }
        } else {
                //echo "No results";
        }

        mysqli_close($conn);

	
/******************
*Send email to User
*******************/
        $mail = new PHPMailer;

        $mail->isSMTP();
	$mail->IsHTML(true);
        $mail->Host = $config['IP'];
        $mail->Port = $config['PORT'];
        $mail->SMTPAuth = false;

        $mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');

        $mail->Subject = 'A Request Is Available To Publish';
        $mail->Body    = 'A request with ID: '.$requestID .' is now available to publish.';

        foreach ($publisherEmails as $pEmail) {
            $mail->addAddress($pEmail);
        }

        if (!$mail->send()) {
                //echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
                //echo "Message sent!";
        }
	
	$mail->Subject = 'EZBillboards Payment Receipt';

	$message = 'We have received your payment for request: ' . $requestID .'.<br><br>';
        $message .= 'URL: https://ezb.uprm.edu/ <br>';
	$message .= 'Payment Date: ' . $paymentDate . '<br>';
	$message .= 'Transaction ID: ' . $id . '<br>';
	$message .= 'Approval Code: ' . $tandem . '<br>';
	$message .= 'Transaction Type: ' . $type . '<br>';
	$message .= 'Name: ' . $payerFirstName . " " . $payerLastName . '<br>';
	$message .= 'Email: ' . $email . '<br>';
	$message .= 'Price Paid: $' . $price . '<br>';	

	$mail->Body    = $message;
	$mail->ClearAllRecipients();
	$mail->addAddress($email);

	if (!$mail->send()) {
                //echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
                //echo "Message sent!";
        }

} else {
        //echo "Error updating record: " . mysqli_error($conn);
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--HTML Email Receipt generator with css styling-->
<html>

<head>
	<meta http-equiv="content-type" content="text/html;charset=iso-8859-1">
	<meta name="generator" content="Adobe GoLive">
	<title>Payment Receipt</title>
	<style type="text/css" media="screen">
		.bd { border: solid 1px black }
		.bd1 { border-bottom: 1px solid black }
		.tx { color: black; font-size: 0.8em; font-family: Verdana, Arial, Helvetica, sans-serif; margin: 6px }
		.crt  { background-image: url(../media/p2.png); background-repeat: repeat; margin: 8px; padding: 6px }
		.mnu { font-size: 0.8em; font-family: Verdana, Arial, Helvetica, sans-serif; background-color: #ffc; text-align: right; width: 100%; height: 28px }
	</style>
	<style type="text/css" media="print">
		.bd { border: solid 1px black }
		.bd1 { border-bottom: 1px solid black }
		.tx { color: black; font-size: 0.8em; font-family: Verdana, Arial, Helvetica, sans-serif; margin: 6px }
		.crt  { background-image: url(../media/p2.png); background-repeat: repeat; margin: 8px; padding: 6px }
		.mnu { display: none }
	</style>
</head>

<body bgcolor="#ffffff">
	<br>
	<div align="center">
		<table class="bd" width="780" border="0" cellspacing="0" cellpadding="0" bgcolor='#ffffff'>
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="2" cellpadding="0">
						<tr>
							<td width="230"><img src="http://www.uprm.edu/wdt/resources/portico1.gif" alt="" height="100" width="100" border="0" style="margin-left: 25px;margin-top: 25px;"></td>
							<td align="center">
								<div>	
									University of Puerto Rico<br>
									University of Mayag&uuml;ez Campus<br>
									<font size="4"><b>EZBillboards</b></font><br>
									<font size="2">
									PO Box 9000<br>
									Mayag&uuml;ez PR 00681-9000<br>
									</font>
								</div>
							</td>
							<td width="120"><img src="../../img/ezb/EZBillboardsLogo.png" width="245px" height="66px" alt="EZB Logo" style="margin-left: 0px;"></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr height="5">
				<td class="bd1" height="18"></td>
			</tr>
			<tr>
				<td class="bd1">
					<table width="100%" border="0" cellspacing="0" cellpadding="5">
						<tr>
							<td valign="top">
								<table width="100%" border="0" cellspacing="0" cellpadding="0" >
									<tr valign="top">
										<td class="crt" rowspan="5" width="620">
											<div class="tx">
												<p><b><font size="+1">Payment Receipt</font></b></p>
												<hr>
												<p><b>UPRM</b>: EZBillboards</p>
												<p><b>URL</b>: https://ezb.uprm.edu/</p>
												<p><b>Payment Date</b>: 
													<?php
														print $paymentDate;
													?>
												</p>
												<p><b>Transaction ID</b>: 
													<?php
														print $_GET['id'];
													?>
												</p>
												<p><b>Approval Code</b>: 
													<?php
														print $tandem;
													?>
												</p>
												<p><b>Transaction Type</b>: 
													<?php
														print $type;
													?>
												</p>
												<p><b>Name</b>: 
													<?php
														print $payerFirstName . " " . $payerLastName;
													?>
												</p>
												<p><b>Email</b>:
                                                                                                        <?php
                                                                                                                print $email;
                                                                                                        ?>
                                                                                                </p>
												<p><b>Price Paid</b>: 
													<?php
														print "$" . $price;
													?>
												</p>
											</div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>
