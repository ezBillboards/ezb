<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=iso-8859-1">
	<meta name="generator" content="Adobe GoLive">
	<title>EZBillboards</title>
</head>

<body bgcolor="#ffffff" align="center">
	<h1>Payment</h1>
	<table border="0" cellspacing="0" cellpadding="0" align="center">
		<tr>
			<td style="padding: 6px;">
				<div class="bodytext">
					<p><b>Sorry! There was an error in the transaction...</b></p>
					<div class="bodytext">
						<p>
							<?php
								$error = $_GET['error'];
								if($error == 3) {
									print "To use this service Java must be installed and configured in your computer. Visit <a href='http://www.java.com'>www.java.com</a> to install Java in your computer.";
								} elseif($error == 6) {
									print "At this moment this service doesn't support Opera.";
								} elseif($error == 7) {
									print "At this moment this service doesn't support Pocket Internet Explorer.";
								} elseif($error == 4) {
									print "To use this service you need to disable <b>\"pop-up blocker\"</b> in your computer.";
								} elseif($error == 5) {
									print "To use this service your browser needs to have javascript active.";
								}else{
									print "<font color='red'> $error Online service is not available.</font>";
								}
								print "<br><br>Please try again later.";
							?>
						<br>
						</p>
					</div>
				</div>
			</td>
		</tr>
	</table>
</body>
</html>
