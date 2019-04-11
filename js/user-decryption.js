var keySize = 256;
var ivSize = 128;
var iterations = 100;

var message = "Felix Gonzalez";
var password = "ezb";

$(document).ready(function(){
	$.get("../server/user-account.php", function(data, status){
        	var info = JSON.parse(data);
                console.log(info);
                $("#firstName").val(decrypt(info.firstName, password));
                $("#lastName").val(decrypt(info.lastName, password));
                $("#email").val(decrypt(info.email, password));
                $("#mobilePhone").val(decrypt(info.mobilePhone, password));
                $("#workPhone").val(decrypt(info.workPhone, password));
                $("#company").val(decrypt(info.company, password));
                $("#address1").val(decrypt(info.address1, password));
                $("#address2").val(decrypt(info.address2, password));
                $("#state").val(decrypt(info.state, password));
                $("#city").val(decrypt(info.city, password));
                $("#zip").val(decrypt(info.zip, password));
                $("#url").val(decrypt(info.url, password));
                $("#facebook").val(decrypt(info.facebook, password));
                $("#twitter").val(decrypt(info.twitter, password));
                $("#instagram").val(decrypt(info.instagram, password));
        });

	$("#changePasswd").click(function(){
		if($("#oldPasswd").val() != ""){
			if($("#newPasswd").val() != "" && $("#confirmPasswd").val() != "" && $("#newPasswd").val() === $("#confirmPasswd").val()){
				$.post("../server/user-account-changePasswd.php",
					{
					  userID: 1, //Change later.
					  oldPasswd: $("#oldPasswd").val(),
					  passwd: $("#newPasswd").val()
					},
					function(data, status){
					if(status === "success"){
						alert(data);
						console.log(status);
					} else{
						alert(data);
						console.log(status);
					}
				});
			} else{
				alert("New password doesn't match or a field is empty.");
			}
		} else{
			alert("Password is empty.");
		}
	});	
	
	$("#save").click(function(){
		console.log('here 1');
		$.post("../server/user-encryption.php",
		{
			firstName:encrypt( $("#firstName").val(), password),
			lastName:encrypt( $("#lastName").val(), password),
			email:encrypt( $("#email").val(), password),
			mobilePhone:encrypt( $("#mobilePhone").val(), password),
			workPhone:encrypt( $("#workPhone").val(), password),
			companyName:encrypt( $("#company").val(), password),
			address1:encrypt( $("#address1").val(), password),
			address2:encrypt( $("#address2").val(), password),
			state:encrypt( $("#state").val(), password),
			city:encrypt( $("#city").val(), password),
			zipcode:encrypt( $("#zip").val(), password),
			companyURL:encrypt( $("#url").val(), password),
			facebookURL:encrypt( $("#facebook").val(), password),
			twitterURL:encrypt( $("#twitter").val(), password),
			instagramURL:encrypt( $("#instagram").val(), password)
		},

		function(data, status){
		//validateContactInfo();
		if(status === "success"){
		   alert(data);
		   console.log(status);
		} else{
		   alert(data);
		   console.log(status);
		}
		

		});

		
	});

});

function validateContactInfo(){
  var firstName = document.getElementById('firstName').value;
  var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
  var firstNameResult = firstNameRGEX.test(firstName);
  var lastName = document.getElementById('lastName').value;
  var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
  var lastNameResult = firstNameRGEX.test(lastName);
  var email = document.getElementById('email').value;
  var emailRGEX = /^(.+)@(.+)$/;
  var emailResult = emailRGEX.test(email);
  var mPhoneNumber = document.getElementById('mobilePhone').value;
  var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var mPhoneResult = mPhoneRGEX.test(mPhoneNumber);
  var wPhoneNumber = document.getElementById('workPhone').value;
  var wPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var wPhoneResult = wPhoneRGEX.test(wPhoneNumber);
  var company = document.getElementById('company').value;
  var companyRGEX = /^[a-z]|\d?[a-zA-Z0-9]?[a-zA-Z0-9\s&@.]+$/;
  var companyResult = companyRGEX.test(company);
  var addressOne = document.getElementById('address1').value;
  var addressOneRGEX = /^[a-zA-Z ]{2,30}$/;
  var addressOneResult = addressOneRGEX.test(addressOne);
  var addressTwo = document.getElementById('address2').value;
  var addressTwoRGEX = /^[a-zA-Z ]{2,30}$/;
  var addressTwoResult = addressTwoRGEX.test(addressTwo);
  var zip = document.getElementById('zip').value;
  var zipRGEX = /^\d{5}$|^\d{5}-\d{4}$/;
  var zipResult = zipRGEX.test(zip);
  var url = document.getElementById('url').value;
  var urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  var urlResult = urlRGEX.test(url);
  var twitter = document.getElementById('twitter').value;
  var twitterRGEX = /^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/;
  var twitterResult = twitterRGEX.test(twitter);
  var fb = document.getElementById('facebook').value;
  var fbRGEX = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/;
  var fbResult = fbRGEX.test(fb);
  var instagram = document.getElementById('instagram').value;
  var instagramRGEX = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/;
  var instagramResult = instagramRGEX.test(instagram);




  console.log('First Name = '+ firstName);
  console.log('Last Name = '+ lastName);
  console.log('Email = '+ email);
  console.log('Mobile Phone = '+ mPhoneNumber);
  console.log('Work Phone = '+ wPhoneNumber);
  console.log('Company = ' + company);
  console.log('Address 1 = '+ addressOne);
  console.log('Address 2 = '+ addressTwo);
  console.log('Zip  = '+ zip);
  console.log('URL  = '+ url);
  console.log('Facebook  = '+ fb);
  console.log('Twitter  = '+ twitter);
  console.log('Instagram  = '+ instagram);



  if(firstNameResult == false)
	{
	alert('Please enter a valid First Name');	
	return false;
	}

  if(lastNameResult == false)
        {
        alert('Please enter a valid Last Name');
        return false;
        }

  if(emailResult == false)
        {
        alert('Please enter a valid Email');
        return false;
        }

  if(mPhoneResult == false)
        {
        alert('Please enter a valid Mobile Phone');
        return false;
        }

  if(wPhoneResult == false)
        {
        alert('Please enter a valid Work Phone');
        return false;
        }

  if(company == false)
        {
        alert('Please enter a valid Company name');
        return false;
        }


  if(addressOneResult == false)
        {
        alert('Please enter a valid Address 1');
        return false;
        }

  if(addressTwoResult == false)
        {
        alert('Please enter a valid Address 2');
        return false;
        }

  if(zipResult == false)
        {
        alert('Please enter a valid Zip');
        return false;
        }


  if(urlResult == false)
        {
        alert('Please enter a valid URL');
        return false;
        }

  if(fbResult == false)
        {
        alert('Please enter a valid Facebook');
        return false;
        }


  if(twitterResult == false)
        {
        alert('Please enter a valid Twitter');
        return false;
        }
  if(instagramResult == false)
        {
        alert('Please enter a valid Instagram');
        return false;
        }


}

function encrypt (msg, pass) {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
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

function decrypt (transitmessage, pass) {
  var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
  var encrypted = transitmessage.substring(64);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted;
}
