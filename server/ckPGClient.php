<?PHP
define('SECURESERVER', 'secure2.uprm.edu');

class ckPurchaseRequest{
	var $authorizationID='';
	var $version='1.1.0';
	var $productID='';
	var $IP='';
	var $xml='';
	var $lastError=0;
	var $quantity=1;

//	Parametros nuevos para la version del cliente 1.1.0
	var $clientFirstName='';
	var $clientLastName='';
	var $email='';
	var $addr1='';
	var $addr2='';
	var $city='';
	var $zipcode='';
	var $telephone='';

	function ckPurchaseRequest($authID){
		$this->authorizationID = $authID;

		$this->IP = $_SERVER['REMOTE_ADDR'];
	}
	function create($productID){
		$this->productID = $productID;

		$this->xml = "<VERSION>{$this->version}</VERSION>\n";
		$this->xml.= "<AUTHORIZATIONID>{$this->authorizationID}</AUTHORIZATIONID>\n";
		$this->xml.= "<CLIENTFIRSTNAME>{$this->clientFirstName}</CLIENTFIRSTNAME>\n";
		$this->xml.= "<CLIENTLASTNAME>{$this->clientLastName}</CLIENTLASTNAME>\n";
		$this->xml.= "<EMAIL>{$this->email}</EMAIL>\n";
		$this->xml.= "<ADDR1>{$this->addr1}</ADDR1>\n";
		$this->xml.= "<ADDR2>{$this->addr2}</ADDR2>\n";
		$this->xml.= "<CITY>{$this->city}</CITY>\n";
		$this->xml.= "<ZIPCODE>{$this->zipcode}</ZIPCODE>\n";
		$this->xml.= "<TELEPHONE>{$this->telephone}</TELEPHONE>\n";
		$this->xml.= "<QUANTITY>{$this->quantity}</QUANTITY>\n";
		$this->xml.= "<IP>{$this->IP}</IP>\n";
		$this->xml.= "<PRODUCTID>{$this->productID}</PRODUCTID>\n";
	}
}

class ckPurchaseResponse{
	var $statusCode='';
	var $transactionID='';
	var $errorMsg='';
	var $xml='';
	var $kiosk = false;
	
	function isOK(){
		if($this->statusCode != '000'){
			$this->errorMsg = getTextualStatusCode($this->statusCode);
			return false;
		}
		return true;
	}

	function redirect(){
		if($this->kiosk){
			header("Location: https://" . SECURESERVER . "/payment/index.php?id={$this->transactionID}&kiosk=1");
		}else{
			header("Location: https://" . SECURESERVER . "/payment/index.php?id={$this->transactionID}");
		}
		exit;
	}

	function load($xml){
		$p = new ckSimpleParser;
		$this->xml = $xml;
		//$p->data = cleanText($xml);
		$p->data = $xml;

		$this->statusCode = $p->getProperty("STATUSCODE");
		$this->transactionID = $p->getProperty("TRANSACTIONID");

		//$c = strlen($p->data) - 1;
		//Print "Count $c<br>";
		//for($i=0; $i<=$c; $i++){
		//	print "Char[$i] = " . ord($p->data[$i]) . ", " . htmlentities($p->data[$i]). "<br>";
		//}
		//print htmlentities($p->data);
		//print "<hr>Hello [" . $p->getProperty("TRANSACTIONID") . "]";
		unset($p);
	}
}

class ckPGClient{
	function &sendRequest($request){
		//$sock = new ckSocketStream("ssl://" . SECURESERVER, 80);
		$sock = new ckSocketStream(SECURESERVER, 80);

		$xml='xml=' . urlencode($request->xml);

		$size = strlen($xml);
		$strPOST = "POST /secure/inttrans.php HTTP/1.1\r\nHost: " . SECURESERVER . "\r\nConnection: close\r\n";
		$strPOST.= "Content-Type: application/x-www-form-urlencoded\r\nContent-Length: $size\r\n\r\n";

		$responseData = '';
		$sock->write($strPOST);
		$sock->write($xml);
		while(!$sock->eof()){
			$responseData.= $sock->read(1024);
		}
		//print "rsock=[" . htmlentities($responseData) . "]";
		$response = new ckPurchaseResponse;
		$response->load($responseData);
		return $response;
	}
}

function getTextualStatusCode($code){
	if($code=='001') return 'The client is not authorized to process this transaction.';
	if($code=='002') return 'The payment gateway was unable to continue with this transaction.';
	if($code=='003') return 'The client host is not authorized to process this transaction.';
	if($code=='004') return 'The product or service is not recognized by the payment gateway.';
	if($code=='005') return 'The client version is incompatible with the payment gateway.';
	return "Unknown error returned by payment gateway.";

}
function cleanText($s){
	return str_replace(chr(0),'',$s);
}

$clientPG = new ckPGClient;
?>
