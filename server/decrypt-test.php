<?php
/**
* Helper library for CryptoJS AES encryption/decryption
* Allow you to use AES encryption on client side and server side vice versa
*
* @author BrainFooLong (bfldev.com)
* @link https://github.com/brainfoolong/cryptojs-aes-php
*/
/**
* Decrypt data from a CryptoJS json encoding string
*
* @param mixed $passphrase
* @param mixed $jsonString
* @return mixed
*/
function cryptoJsAesDecrypt($passphrase, $jsonString){
    $jsondata = json_decode($jsonString, true);
	$salt = openssl_random_pseudo_bytes(8);
    $salted = '';
    $dx = '';
    while (strlen($salted) < 48) {
        $dx = md5($dx.$passphrase.$salt, true);
        $salted .= $dx;
    }
    echo $key = substr($salted, 0, 32);
    echo $iv  = substr($salted, 32,16);
    try {
        echo $salt = hex2bin($salt);
        echo $iv  = hex2bin($iv);
    } catch(Exception $e) { return null; }
    $ct = base64_decode($jsonString);
    $concatedPassphrase = $passphrase.$salt;
    $md5 = array();
    $md5[0] = md5($concatedPassphrase, true);
    $result = $md5[0];
    for ($i = 1; $i < 3; $i++) {
        $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
        $result .= $md5[$i];
    }
    $key = substr($result, 0, 32);
    $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
	//echo $data;
    return json_decode($data, true);
}

//CryptoJS.AES.decrypt('hhrjo40OH0XXHZ9ygwQ9', '4d4a69f20c3a63ef0efe489fea7703d1b21f9eadbcfe55c9acc9cb44a335e3666ht0KGjfiM0z7ySC8J0dgg==', {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8);
/**
* Encrypt value to a cryptojs compatiable json encoding string
*
* @param mixed $passphrase
* @param mixed $value
* @return string
*/
function cryptoJsAesEncrypt($passphrase, $value){
    $salt = openssl_random_pseudo_bytes(8);
    $salted = '';
    $dx = '';
    while (strlen($salted) < 48) {
        $dx = md5($dx.$passphrase.$salt, true);
        $salted .= $dx;
    }
    $key = substr($salted, 0, 32);
    $iv  = substr($salted, 32,16);
    $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
    $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
    return json_encode($data);
}

?>