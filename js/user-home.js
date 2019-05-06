/*user home view JavaScript*/
var firstName;
var lastName;
var email;
var password;
var confirmPassword;
var mobilePhone;
//Profile Information
var credentials;
var role;
var profile_ID;
var verifiedUser;
var statusTemp;
var enabled;
var random;	

$(document).ready(function(){
	//setTimeout(session,500);

/**************************
*Contact information Getter
***************************/
	$.get("../server/user-contact.php", function(data, status){
		var info = JSON.parse(data);
		$("#footer-physical").text(info.physical);
		$("#footer-email").text(info.email);
		$("#footer-phone").text(info.phone);
		$("#footer-extension").text(info.extension);
        });

/**************
*Get EZB logos
***************/
	$.get("../server/get-image-path.php", function(data, status){
                $("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
                $("#home-billboard").attr("src", data + "img/ezb/BackgroundHome.jpg");		
        });	
	
/*********************
*Login button activate
**********************/
	$("#btnlogin").click(function(){
		if(validateLogin() == true){	
			email = $('#emaillogin').val();
			password = $('#passwordlogin').val();
			Login(email, password);
		}
	});

/*********************
*Register button activate
**********************/
	$("#btnregister").click(function(){
		if(validateRegister()==true){
			random = Math.floor((Math.random() * 900000) + 1);
			Register($('#emailreg').val(),$('#firstnamereg').val(),$('#lastnamereg').val(),$('#phonereg').val(),$('#passwordreg').val(),random);
		}
	});
	
/*********************
*Register button navbar
**********************/
	$("#btn-register").click(function(){
		$('#firstnamereg').val() = "";
		$('#lastnamereg').val() = "";
		$('#emailreg').val() = "";
		$('#phonereg').val() = "";
		$('#passwordreg').val() = "";
		$('#confirm_passwordreg').val() = "";
		$('#terms').prop('checked', false);
	});
	
/**************************
*Restores session back home
**************************/
	$("#closeVerModal").click(function(){
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		session();
	});
	
/*************************
*Forgot password Getter
*then performces forgot 
*password function
*************************/
	$("#btnforgotpsswd").click(function(){
		if(validateEmail()){
			$.get("../server/get-email-account.php",
                        	{
                        		emailAddress:$('#emailforgot').val()
                        	},function(data,status){
        			if(JSON.parse(data)){
                                	forgotPassword();
                                	alert("Temporary password has been sent.");
                        	}else{
                                	alert("This account does not exist.");
                        	}	
			});
		}
	});

/*************************
*Change password button
*************************/	
	$("#btnchangepassword").click(function(){
		var password = document.getElementById('passwordlogin').value;
		var email = document.getElementById('emaillogin').value;
		if($('#passwordchange').val() == ""){
			alert('Parameters cannot be empty');
			return;
		}		

		if(validatePassword($('#passwordchange').val()) == true){
			if($('#passwordchange').val() == $('#confirm_passwordchange').val()){
				changePassword(email,password);
                	}
                	else{
                        	alert('Password values not the same');
                	}
		}
	});
	
/*************************
*Verify email button
*************************/
	$("#btnverify").click(function(){
		if( $('#verificationCode').val() == decrypt(sessionStorage.getItem('verificationCode'))){
			VerifyEmail();	
		}
		else{
			alert('Verification code incorrect');
		}
	});

/*************************
*Resent Verification Code
*************************/	
	$("#btnresend").click(function(){
		resendVerificationCode();
	});


/*************
*Logout button 
**************/
	$("#btnlogout").click(function(){
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		session();
		window.location.href = "../user/home.html";
	});
});


/**********************************
*Validates Login with REGEX
*
*@return {Boolean}
**********************************/
function validateLogin(){  
 var email = document.getElementById('emaillogin').value;
 var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var emailResult = emailRGEX.test(email);
 var password = document.getElementById('passwordlogin').value;

if(emailResult == false){
	alert('Please enter a valid Email');
	return false;
	}

if(document.getElementById('remember').checked){
	setCookie("email",email,30);
	setCookie("password",password,30);
}

if(!document.getElementById('remember').checked){
removeCookies();
}
	
return true;
}




/**********************************
*Validates password with REGEX
*
*@return {Boolean}
**********************************/
function validatePassword(password){
errors = [];
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
     if (password.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.")
    }
    if (password.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }


return true;
}



/**********************************
*Validates Email with REGEX
*
*@return {Boolean}
**********************************/
function validateEmail(){

 var email = document.getElementById('emailforgot').value;
 var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var emailResult = emailRGEX.test(email);

if(emailResult == false){
        alert('Please enter a valid Email');
	return false;
}
return true;
}




/**********************************
*Set cookies with name, value and
*expirational days
*
*@param {string} cname
*@param {string} cvalue
*@param {string} exdays
**********************************/
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


/**********************************
*Removes cookies changing the date
* to a previous one
**********************************/
 function removeCookies() {
            var res = document.cookie;
            var multiple = res.split(";");
            for(var i = 0; i < multiple.length; i++) {
               var key = multiple[i].split("=");
               document.cookie = key[0]+" =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
 }


/**********************************
*Search for cookie with name as
* a parameter
*
*@param {string} cname
**********************************/
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**********************************
*Checks for cookies and checkbox
**********************************/
function checkCookie() {
  var email = getCookie("email");
  var password = getCookie("password");

  if (email != "" && password != "")
	{
	$("#emaillogin").val(email);
	$("#passwordlogin").val(password);
	document.getElementById('remember').checked =true;
	}
}

/**********************************
*Validates Register with REGEX
*
*
*@return {Boolean}
**********************************/
function validateRegister(){
 var phoneNumber = document.getElementById('phonereg').value;
 var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var phoneResult = phoneRGEX.test(phoneNumber);

 var firstName = document.getElementById('firstnamereg').value;
 var firstNameRGEX = /^[a-zA-Z]{2,30}$/;
 var firstNameResult = firstNameRGEX.test(firstName);

 var lastName = document.getElementById('lastnamereg').value;
 var lastNameRGEX = /^[a-zA-Z]{2,30}$/;
 var lastNameResult = lastNameRGEX.test(lastName);

 var email = document.getElementById('emailreg').value;
 var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var emailResult = emailRGEX.test(email);

 var password = document.getElementById('passwordreg').value;
 var cpassword = document.getElementById('confirm_passwordreg').value;

errors = [];

    if(firstNameResult == false){
	errors.push('Please enter a valid First Name');
    }
    if(lastNameResult == false){
	errors.push('Please enter a valid Last Name');
    }
    if(emailResult == false){
	errors.push('Please enter a valid Email');
    }
    if(phoneResult == false){
	errors.push('Please enter a valid Mobile Number');
    }
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
     if (password.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.")
    }
    if (password.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    if(cpassword ==""){
	alert('Confirm Password is empty');
	return false;
    }


var temp = password.localeCompare(cpassword);


    if(temp ==-1){
	alert('Password and Confirm Password do not  match');
	return false;
    }
    if(!document.getElementById('terms').checked){
	alert('You must agree with the terms and policies');
	return false;
    }


return true;

}

/**********************************
*Get terms and policies from DB
**********************************/
function termsCall() {
                $.get("../server/user-terms.php", function(data, status){
                $("#termsInfo").html(data);
	});
}


/**********************************
*Register with parameters received
*and post it on the DB
*
*@param {string} email_IN
*@param {string} firstName_IN
*@param {string} lastName_IN
*@param {string} mobilePhone_IN
*@param {string} password_IN
*@param {string} random_IN
**********************************/
function Register(email_IN,firstName_IN,lastName_IN,mobilePhone_IN,password_IN,random_IN){
	role = 1;
	if(validateRegister() == true){
	$.post("../server/user-registration.php",
			{
				email: email_IN,
				firstName: encrypt(firstName_IN),
				lastName : encrypt(lastName_IN),
				mobilePhone: encrypt(mobilePhone_IN),
				workPhone : null,
				companyName : null,
				companyURL : null,
				facebookURL : null,
				instagramURL : null,
				twitterURL : null,
				address1 : null,
				address2 : null,
				city : null,
				state : null,
				zipcode : null,
				password : password_IN,
			},function(data,status){
				if(data == "Email already exists"){
					alert("Email address already exists");
				}
				else if(status === "success"){
					if(data != ""){
						profile_ID = data;
					}
					sessionStorage.setItem('role', encrypt(role.toString()));
					sessionStorage.setItem('email', encrypt(email_IN));
					sessionStorage.setItem('verificationCode', encrypt(random_IN.toString()));
					sendVerificationCode();

					$('#registerModal').modal('hide');
					$('#verifyEmailModal').modal('show');
				}else{
					//Error
				}
		});
	}
}

/**********************************
*Login in with expected parameters,
*compare with DB credentials
*
*@param {string} email_IN
*@param {string} password_IN
**********************************/
function Login(email_IN,password_IN){
	$.get("../server/user-credentials.php",
		{
			emailAddress: email_IN,
			psswd: password_IN
		},
		function(data, status){
			if(data == 'No results'){
				alert('Incorrect credentials!');
			}
			else{
				credentials = JSON.parse(data);
				profile_ID = credentials[0].id;
				role = credentials[0].roleID;
				verifiedUser = credentials[0].verified;
				statusTemp = credentials[0].statusTemp;
				enabled = credentials[0].enabled;
				sessionStorage.setItem('email', encrypt(email_IN));
				setTimeout(VerifyRole,500);
			}
		}
	);

}

/**********************************
*Verifies Roll for the current user
**********************************/
function VerifyRole(){
	if(enabled == 0){
		alert('Account was deleted!');
	}
	else if(role == 1){
		if (verifiedUser == 0 && statusTemp == 0){
			random = Math.floor((Math.random() * 900000) + 1);
			sessionStorage.setItem('verificationCode', encrypt(random.toString()));
			sendVerificationCode();
			$('#loginModal').modal('hide');
			$('#verifyEmailModal').modal('show');
		}else if(verifiedUser == 0 && statusTemp == 1){
			$('#loginModal').modal('hide');
			$('#changePasswordModal').modal('show');
		}
		else if(verifiedUser == 1 && statusTemp == 1){
			$('#loginModal').modal('hide');
			$('#changePasswordModal').modal('show');
		}else{
			//SESSION VARIABLES
			sessionStorage.setItem('ID', encrypt(profile_ID));
			sessionStorage.setItem('role', encrypt(role));
			
			//logged in nav bar
			document.getElementById("getStartedLog").style.display = "none";
			document.getElementById("getStartedReg").style.display = "none";
			if(document.getElementById("getStartedMes") != null){
				document.getElementById("getStartedMes").style.display;
			}
			document.getElementById("profileDropdown").style.display = "inline";
			document.getElementById("profileEmail").style.display = "inline";
			session();
			$('#loginModal').modal('hide');
		}
	}else if(role == 2){
		if(statusTemp == 1){
			$('#loginModal').modal('hide');
			$('#changePasswordModal').modal('show');
		}
		else{	
			//SESSION VARIABLES
			sessionStorage.setItem('ID', encrypt(profile_ID));
			sessionStorage.setItem('role', encrypt(role));
			//IF APPROVER FOUND --->> APPROVER VIEW
			window.location.href = "../approver/requests.html";
		}
	}
	else if(role == 3){
		if(statusTemp == 1){
			$('#loginModal').modal('hide');
			$('#changePasswordModal').modal('show');
		}
		else{	
			//SESSION VARIABLES
			sessionStorage.setItem('ID', encrypt(profile_ID));
			sessionStorage.setItem('role', encrypt(role));
			//IF PUBLISHER FOUND --->> PUBLISHER VIEW
			window.location.href = "../publisher/paid-requests.html";
		}
	}
	else if(role == 4){
		if(statusTemp == 1){
			$('#loginModal').modal('hide');
			$('#changePasswordModal').modal('show');
		}
		else{	
			//SESSION VARIABLES
			sessionStorage.setItem('ID', encrypt(profile_ID));
			sessionStorage.setItem('role', encrypt(role));
			//IF ADMIN FOUND --->> ADMIN VIEW
			window.location.href = "../administrator/settings.html";
		}	
	}
}


/**********************************
*Creates random code
*post it on the DB
* send it to user
**********************************/
function sendVerificationCode(){
	setTimeout(function(){
		$.post("../server/mail-verification-code.php",
			{
			emailAddress:decrypt(sessionStorage.getItem('email')),
			random: decrypt(sessionStorage.getItem('verificationCode'))
			},function(data,status){
				
				if(status === "success"){
					//Success
				}else{
					//Error
				}
		});
	},100);
}

/**********************************
*resends random code
*post it on the DB
* send it to user
**********************************/

function resendVerificationCode(){
	random = Math.floor((Math.random() * 900000) + 1);
	sessionStorage.setItem('verificationCode', encrypt(random.toString()));
	$.post("../server/mail-verification-code.php",
			{
				emailAddress:decrypt(sessionStorage.getItem('email')),
				random:decrypt(sessionStorage.getItem('verificationCode'))
			},function(data,status){
				
				if(status === "success"){
					alert("New verification code sent.");
				}else{
					//Error
				}
		});
}

/**********************************
*Sends decripted email
*verifies if email is correct on php
**********************************/
function VerifyEmail(){
	$.post("../server/user-verified.php",
			{
				email: decrypt(sessionStorage.getItem('email'))
			},function(data,status){
				if(status === "success"){
					sessionStorage.setItem('ID', encrypt(profile_ID));
					sessionStorage.setItem('role', encrypt(role.toString()));
					$('#verifyEmailModal').modal('hide');
					session();
				}else{
					//Error
				}
		});
}

/**********************************
*takes elements by 
*Id and depending on the results,
*the session will be determined
**********************************/
function session(){
		checkCookie();
		if (sessionStorage.getItem('ID') !== null){
			$("#profileEmail").text(decrypt(sessionStorage.getItem('email'))); 
			if(decrypt(sessionStorage.getItem('role')) != 1){
				if(decrypt(sessionStorage.getItem('role')) == 2){
					window.location.href = "../approver/requests.html";
				}
				else if(decrypt(sessionStorage.getItem('role')) == 3){
					window.location.href = "../publisher/paid-requests.html";
				}
				else{
					window.location.href = "../administrator/settings.html";
				}
			}
			document.getElementById("getStartedLog").style.display = "none";
			document.getElementById("getStartedReg").style.display = "none";
			if(document.getElementById("getStartedMes") != null){
				document.getElementById("getStartedMes").style.display = "none";
			}
			document.getElementById("profileDropdown").style.display = "inline";
			document.getElementById("profileEmail").style.display = "inline";
		}else{
			if(window.location.pathname == "/ezb/user/requests.html"){
				window.location.href = "home.html";
			}
			if(window.location.pathname == "/ezb/user/account.html"){
                                window.location.href = "home.html";
                        }

			document.getElementById("getStartedLog").style.display = "inline";
			document.getElementById("getStartedReg").style.display = "inline";
			if(document.getElementById("getStartedMes") != null){
				document.getElementById("getStartedMes").style.display = "inline";
			}
			document.getElementById("profileDropdown").style.display = "none";
			document.getElementById("profileEmail").style.display = "none";
		}
}

/**********************************
*Post new password and 
*checks if email exist
**********************************/
function forgotPassword(){
	if(validateEmail()==true){
		$.post("../server/forgot-password.php",
		{
			emailAddress : $('#emailforgot').val(),
			tempPassword: generatePassword()
		},function(data,status){
			if(data == "Email address doesn't exist"){
				alert("Email address doesn't exist");
			}else{
				$('#forgotPasswordModal').modal('hide');
			}
		});
	}
}

/**********************************
*Post new password and also 
*verifies new password and 
*temp password cannot be the same
**********************************/
function changePassword(email,password){
		if(password == $('#confirm_passwordchange').val()){
            		alert('Temporary password and new password cant be the same');
       			return;
		}
		else if(password != $('#passwordchange').val()){
		$.post("../server/change-password.php",
			{
				userID : profile_ID,
				newPassword: $('#passwordchange').val()
	        	},function(data,status){
				if(status === "success"){
					$('#changePasswordModal').modal('hide');
					removeCookies();
					$('#loginModal').modal('hide');
					Login(email,$('#passwordchange').val());

				}else{
					//Error
				}
			});
		}
}



/**********************************
*Generate random Password
**********************************/
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
