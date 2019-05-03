<?php

require_once('./ckparser.class');
require_once('./cksocketstream.class');
require_once('./ckPGClient.php');
require_once('./id.php');
require_once('./logger.php');

// Crea un request para el banco.
$request = new ckPurchaseRequest($authid);

// Lee información de POST.
$requestID = $_POST['requestID'];
$firstName = $_POST['requestFirstName'];
$lastName = $_POST['requestLastName'];
$email = $_POST['email'];

// Conecta a la base de datos.
$config = parse_ini_file('../../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Lee información de pago.
$sql = "CALL getRequestInformation($requestID)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    $info = mysqli_fetch_assoc($result);
	$packageID = $info['package_ID'];
	$price = $info['price'];
} else {
    echo "No results";
}

mysqli_close($conn);

// Información del RECA.
$prod = 'RECA0343';

$request->clientFirstName = $firstName;
$request->clientLastName= $lastName;
$request->email= $email;
/*
$request->addr1= "Urb Paseos Dorados";
$request->addr2= "";
$request->city= "Cayey";
$request->zipcode= "00736";
$request->telephone= "9394883023";
*/
$request->quantity = 10;//$price; // 10 Cents for testing purposes.
$request->create($prod);
$response = $clientPG->sendRequest($request);
$transactionID = $response->transactionID;

// Número de transactionID inválido.
if($transactionID <= 0){
	logger($email,"ERROR PAYMENT TRANSACTION", "Received a response with invalid transaction ID " . $transactionID);
	header('Location: onerror.php?error=' .urlencode("Transaction ID invalido"));
	exit;
}

// Hubo error en el response.
if(!$response->isOK()){
	logger($email, "ERROR PAYMENT RESPONSE", "Received error " . $response->errorMsg . " in response from the bank");
	header('Location: onerror.php?error=' .urlencode($response->errorMsg));
	exit;
}

// Inserta información del transaction en el DB.
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL postCheckout('$transactionID','$firstName','$lastName','$email',$requestID, $packageID, $price)";

if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
	exit;
}

mysqli_close($conn);

// Brinco a la página del banco.
$response->redirect();
?>
