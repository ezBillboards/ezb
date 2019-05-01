<?php

require_once('./ckPGClient.php');
require_once('./ckparser.class');
require_once('./cksocketstream.class');
require_once('./id.php');

// XML lo envia el banco.
$xml = $_POST['xml'];

// Crea parser para el XML.
$parser = new ckSimpleParser;
$parser->data = $xml;

//Informacion que devuelve el banco
$transactionID = addslashes($parser->getProperty('TRANSACTIONID'));
$errorno = addslashes($parser->getProperty('ERROR'));
$error = addslashes($parser->getProperty('MESSAGE'));
$firstName = addslashes($parser->getProperty('NAME'));
$lastName = addslashes($parser->getProperty('LASTNAME'));
$tandem = addslashes($parser->getProperty('TANDEMID'));
$type = addslashes($parser->getProperty('TRANSACTION_TYPE'));
$email = addslashes($parser->getProperty('EMAIL'));
$date = time();

// Conecta a la base de datos.
$config = parse_ini_file('../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Si errorno es 0 todo salió bien.
if($errorno == 0) {
	// Envía a página de recibo.
	$sql = "CALL putCheckoutSuccess('$transactionID','$firstName','$lastName','$email','$tandem','$type')";
	$url = "https://ezb.uprm.edu/ezb/server/receipt.php?id=$transactionID";
} else {
	// Envía a página de error.
	$sql = "CALL putCheckoutError('$transactionID','$errorno','$error')";
	$url = 'https://ezb.uprm.edu/ezb/server/onerror.php?error=' .urlencode($errorno);
}

if (!mysqli_query($conn, $sql))	exit;	

mysqli_close($conn);

unset($parser);
print "<URL>$url</URL>";

?>
