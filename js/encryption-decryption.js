var keySize;
var ivSize;
var iterations;
var psswd;

$(document).ready(function(){
	$.get("../server/get-security.php", function(data, status){
			var security = JSON.parse(data);
			keySize = security.KEYSIZE;
			ivSize = security.IVSIZE;
			iterations = security.ITERATIONS;
			psswd = security.KEY;
			console.log("Read Security");
			session();
    });
});

function encrypt (msg) {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(psswd, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var iv = CryptoJS.lib.WordArray.random(128/8);
  
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  });
  
  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  return transitmessage;
}

function decrypt (transitmessage) {
	if(transitmessage != ""){
		var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
		var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
		var encrypted = transitmessage.substring(64);
		  
		var key = CryptoJS.PBKDF2(psswd, salt, {
			keySize: keySize/32,
			iterations: iterations
		});
		var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
			iv: iv, 
			padding: CryptoJS.pad.Pkcs7,
			mode: CryptoJS.mode.CBC
		})
		return decrypted.toString(CryptoJS.enc.Utf8);
	}else{
		return "Not received";
	}
	
	
}
