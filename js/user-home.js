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
	Session();

	$.get("../server/get-image-path.php", function(data, status){
                $("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
                $("#home-billboard").attr("src", data + "img/ezb/BackgroundHome.jpg");		
        });	
	
	$("#btnlogin").click(function(){
		if(validateLogin() ==true){	
		console.log('btnlogin clicked!!');
		email = $('#emaillogin').val();
		//password = $('#passwordlogin').val();
		Login(email,$('#passwordlogin').val());
		//setTimeout(VerifyRole,500);
		}
	});
	
	$("#btnregister").click(function(){
		console.log('btnregister clicked!!');
		if(validateRegister()==true){
			random = Math.floor((Math.random() * 1000000) + 1);
			console.log(random);
			console.log($('#emailreg').val());
			Register($('#emailreg').val(),$('#firstnamereg').val(),$('#lastnamereg').val(),$('#phonereg').val(),$('#passwordreg').val(),random);
		}
	});
	
	$("#closeVerModal").click(function(){
		console.log('closeVerModal clicked!!');
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		Session();
	});
	
	$("#btnforgotpsswd").click(function(){
		forgotPassword();
	});
	
	$("#btnchangepassword").click(function(){
		console.log('btnchangepassword clicked!!');
		var password = document.getElementById('passwordlogin').value;
		console.log('before entering function');
		if($('#passwordchange').val() == ""){
		alert('Parameters cannot be empty');
		return;
		}		
	
	if(validatePassword($('#passwordchange').val())==true){
		if($('#passwordchange').val() == $('#confirm_passwordchange').val()){
			changePassword(password);
                }
                else{
                        alert('Password values not the same');
                }
	}

	});
	
	$("#btnverify").click(function(){
		if( $('#verificationCode').val() == sessionStorage.getItem('verificationCode')){
			VerifyEmail();	
		}
		else{
			alert('Verification code incorrect');
		}
	});
	
	$("#btnresend").click(function(){
		resendVerificationCode();
	});



	
	$("#btnlogout").click(function(){
		console.log('btnlogout clicked!!');
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		Session();
		window.location.href = "../user/home.html";
	});
});

function validateLogin(){  
 var email = document.getElementById('emaillogin').value;
 var emailRGEX = /^(.+)@(.+)$/;
 var emailResult = emailRGEX.test(email);
 var password = document.getElementById('passwordlogin').value;

console.log('Email = '+ email);
console.log('Password = '+password);

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


function validatePassword(password){
errors = [];
console.log(password);
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


function validateEmail(){

 var email = document.getElementById('emailforgot').value;
 var emailRGEX = /^(.+)@(.+)$/;
 var emailResult = emailRGEX.test(email);

console.log(email);
if(emailResult == false){
        alert('Please enter a valid Email');
	return false;
}
return true;
}





function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

 function removeCookies() {
            var res = document.cookie;
            var multiple = res.split(";");
            for(var i = 0; i < multiple.length; i++) {
               var key = multiple[i].split("=");
               document.cookie = key[0]+" =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
 }

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

function validateRegister(){
 var phoneNumber = document.getElementById('phonereg').value;
 var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var phoneResult = phoneRGEX.test(phoneNumber);

 var firstName = document.getElementById('firstnamereg').value;
 var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var firstNameResult = firstNameRGEX.test(firstName);

 var lastName = document.getElementById('lastnamereg').value;
 var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var lastNameResult = lastNameRGEX.test(lastName);

 var email = document.getElementById('emailreg').value;
 var emailRGEX = /^(.+)@(.+)$/;
 var emailResult = emailRGEX.test(email);

 var password = document.getElementById('passwordreg').value;
 var cpassword = document.getElementById('confirm_passwordreg').value;


console.log('First Name = '+ firstName);

console.log('Last Name = '+ lastName);

console.log('Phone Number = '+ phoneNumber);

console.log('Email = '+ email);

console.log('Password = '+ password);

console.log('Confirm Password = '+ cpassword);


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

function termsCall() {
 console.log('enter Terms function');
                $.get("../server/user-terms.php", function(data, status){
                $("#termsInfo").text(data);
	});
}

function Register(email_IN,firstName_IN,lastName_IN,mobilePhone_IN,password_IN,random_IN){
	console.log('Register function');
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
					role = 1;
					sessionStorage.setItem('role', role);
					sessionStorage.setItem('email', email_IN);
					sessionStorage.setItem('verificationCode', random_IN);
					sendVerificationCode();
					$('#registerModal').modal('hide');
					$('#verifyEmailModal').modal('show');
				}else{
					console.log('Error registering user!!');
				}
		});
	}
}

function Login(email_IN,password_IN){
	$.get("../server/user-credentials.php",
		{emailAddress: email_IN,
		psswd: password_IN},
		function(data, status){
			if(data == 'No results'){
				alert('Incorrect credentials!');
			}
			else{
				console.log(data);
				credentials = JSON.parse(data);
				profile_ID = credentials[0].id;
				role = credentials[0].roleID;
				verifiedUser = credentials[0].verified;
				statusTemp = credentials[0].statusTemp;
				enabled = credentials[0].enabled;
				sessionStorage.setItem('email', email_IN);
				setTimeout(VerifyRole,500);
			}
		});

}

function VerifyRole(){
	if(enabled == 0){
		alert('Account was deleted!');
	}
	else if(role == 1){
		if (verifiedUser == 0 && statusTemp == 0){
			console.log('USER NOT VERIFIED!');
			random = Math.floor((Math.random() * 1000000) + 1);
			sessionStorage.setItem('verificationCode', random);
			sendVerificationCode();
			$('#loginModal').modal('hide');
			//document.getElementById("verifyEmailModal").reset();
			$('#verifyEmailModal').modal('show');
		
		
		}else if(verifiedUser == 0 && statusTemp == 1){
			//$('#loginModal').modal('hide');
			//document.getElementById("changePasswordModal").reset();
			$('#changePasswordModal').modal('show');
		}
		
		else if(verifiedUser == 1 && statusTemp == 1){
			//$('#loginModal').modal('hide');
			//document.getElementById("changePasswordModal").reset();
			$('#changePasswordModal').modal('show');
		
		
		}else{
			//SESSION VARIABLES
			sessionStorage.setItem('ID', profile_ID);
			sessionStorage.setItem('role', role);
			
			//logged in nav bar
			document.getElementById("getStartedLog").style.display = "none";
			document.getElementById("getStartedReg").style.display = "none";
			if(document.getElementById("getStartedMes") != null){
				document.getElementById("getStartedMes").style.display;
			}
			document.getElementById("profileDropdown").style.display = "inline";
			document.getElementById("profileEmail").style.display = "inline";
			//document.getElementById("userProfile").style.display = "inline";
			console.log('USER VERIFIED!')
			Session();
			$('#loginModal').modal('hide');
		}
	}else if(role == 2){
		if(statusTemp == 1){
			$('#changePasswordModal').modal('show');
		}
		else{	
			//SESSION VARIABLES
			sessionStorage.setItem('ID', profile_ID);
			sessionStorage.setItem('role', role);
			//IF APPROVER FOUND --->> APPROVER VIEW
			window.location.href = "../approver/requests.html";
			//console.log('APPROVER FOUND');
		}
	}
	else if(role == 3){
		if(statusTemp == 1){
			$('#changePasswordModal').modal('show');
		}
		else{	
			//SESSION VARIABLES
			sessionStorage.setItem('ID', profile_ID);
			sessionStorage.setItem('role', role);
			//IF PUBLISHER FOUND --->> PUBLISHER VIEW
			window.location.href = "../publisher/paid-requests.html";
		}
	}
	else if(role == 4){
		if(statusTemp == 1){
			$('#changePasswordModal').modal('show');
		}
		else{	
			//SESSION VARIABLES
			sessionStorage.setItem('ID', profile_ID);
			sessionStorage.setItem('role', role);
			//IF ADMIN FOUND --->> ADMIN VIEW
			console.log('ADMIN FOUND');
			window.location.href = "../administrator/settings.html";
		}	
	}
}

function sendVerificationCode(){
	$.post("../server/mail-verification-code.php",
			{
			emailAddress:sessionStorage.getItem('email'),
			random: sessionStorage.getItem('verificationCode')
			},function(data,status){
				
				if(status === "success"){
					console.log(data);
				console.log(status);
				}else{
					console.log('Error on user verification!!');
				}
		});
}

function resendVerificationCode(){
	random = Math.floor((Math.random() * 1000000) + 1);
	sessionStorage.setItem('verificationCode', random);
	$.post("../server/mail-verification-code.php",
			{
				emailAddress:sessionStorage.getItem('email'),
				random: sessionStorage.getItem('verificationCode')
			},function(data,status){
				
				if(status === "success"){
					console.log(data);
				console.log(status);
				}else{
					console.log('Error on user verification!!');
				}
		});
}

function VerifyEmail(){
	$.post("../server/user-verified.php",
			{
				email: sessionStorage.getItem('email')
			},function(data,status){
				if(status === "success"){
					sessionStorage.setItem('ID', profile_ID);
					sessionStorage.setItem('role', role);
					$('#verifyEmailModal').modal('hide');
					console.log(profile_ID);
					Session();
				}else{
					console.log('Error on user verification!!');
				}
		});
}

function Session(){
		checkCookie();
		if (sessionStorage.getItem('ID') !== null){
			$("#profileEmail").text(sessionStorage.getItem('email')); 
			if(sessionStorage.getItem('role')!= 1){
				if(sessionStorage.getItem('role') == 2){
					window.location.href = "../approver/requests.html";
				}
				else if(sessionStorage.getItem('role') == 3){
					window.location.href = "../publisher/paid-requests.html";
				}
				else{
					window.location.href = "../administrator/settings.html";
				}
			}
			console.log('Session exists!!!');
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

			console.log('Session doesn\'t exists!!!');
			document.getElementById("getStartedLog").style.display = "inline";
			document.getElementById("getStartedReg").style.display = "inline";
			if(document.getElementById("getStartedMes") != null){
				document.getElementById("getStartedMes").style.display = "inline";
			}
			document.getElementById("profileDropdown").style.display = "none";
			document.getElementById("profileEmail").style.display = "none";
		}
}

function forgotPassword(){
	if(validateEmail()==true){
	$.post("../server/forgot-password.php",
			{
				emailAddress : $('#emailforgot').val(),
				tempPassword: generatePassword()
			},function(data,status){
				if(status === "success"){
					console.log(data);
					$('#forgotPasswordModal').modal('hide');
				console.log(status);
				}else{
					console.log('Error on forgot password!!');
				}
		});
	}
}

function changePassword(password){
        console.log('After entering function');
	console.log(password);
	console.log($('#passwordchange').val());
	console.log($('#confirm_passwordchange').val());

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
					console.log(data);
					$('#changePasswordModal').modal('hide');
					removeCookies();
					location.reload();
					console.log(status);
				}else{
					console.log('Error changing password!!');
				}
			});
		}
		
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
