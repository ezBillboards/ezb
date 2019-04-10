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
	
	$("#btnlogin").click(function(){
		console.log('btnlogin clicked!!');
		email = $('#emaillogin').val();
		//password = $('#passwordlogin').val();
		Login(email,$('#passwordlogin').val());
		//setTimeout(VerifyRole,500);
		validateLogin();
	});
	
	$("#btnregister").click(function(){
		console.log('btnregister clicked!!');
		if($('#passwordreg').val() === $('#confirm_passwordreg').val()){
			random = Math.floor((Math.random() * 1000000) + 1);
			console.log(random);
			console.log($('#emailreg').val());
			Register($('#emailreg').val(),$('#firstnamereg').val(),$('#passwordreg').val(),$('#phonereg').val(),$('#passwordreg').val(),random);
		}
			validateRegister();
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
		if($('#passwordchange').val() == $('#confirm_passwordchange').val()){
                        changePassword();
                }
                else{
                        console.log('password values not the same');
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
		sendVerificationCode();
	});
	
	
	$("#btnlogout").click(function(){
		console.log('btnlogout clicked!!');
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		Session();
	});
});




function validateLogin(){  
 var email = document.getElementById('emaillogin').value;
 var emailRGEX = /^(.+)@(.+)$/;
 var emailResult = emailRGEX.test(email);

 console.log('Email = '+ email);

if(emailResult == false)
{
alert('Please enter a valid Email');
return false;
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



console.log('Phone Number = '+ phoneNumber);

console.log('First Name = '+ firstName);

console.log('Last Name = '+ lastName);

console.log('Email = '+ email);

if(phoneResult == false)
{
alert('Please enter a valid phone number');
return false;
}


if(firstNameResult == false)
{
alert('Please enter a valid First Name');
return false;
}



if(lastNameResult == false)
{
alert('Please enter a valid Second Name');
return false;
}


if(emailResult == false)
{
alert('Please enter a valid Email');
return false;
}



}

function Register(email_IN,firstName_IN,lastName_IN,mobilePhone_IN,password_IN,random_IN){
	console.log('Register function');
	$.post("../server/user-registration.php",
			{
				email: email_IN,
				firstName: firstName_IN,
				lastName : lastName_IN,
				mobilePhone: mobilePhone_IN,
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
				password :password_IN,
			},function(data,status){
				console.log(data);
				console.log(status);
				if(status === "success"){
					if(JSON.parse(data).length > 0){
					credentials = JSON.parse(data);
						profile_ID = credentials[0].id;
						console.log(profile_ID);
						console.log(status);
					}
					console.log('USER REGISTERED!!')
					console.log(data);
					role = 1;
					sessionStorage.setItem('role', role);
					sessionStorage.setItem('email', email_IN);
					sessionStorage.setItem('verificationCode', random_IN);
					sendVerificationCode();
					$('#registerModal').modal('hide');
					//document.getElementById("verifyEmailModal").reset();
					$('#verifyEmailModal').modal('show');
				}else{
					console.log('Error registering user!!');
				}
		});
}

function Login(email_IN,password_IN){
	$.get("../server/user-credentials.php",
		{emailAddress: email_IN},
		function(data, status){
			if(data == 'No results'){
				alert('USER NOT FOUND!!');
			}
			else{
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
			window.location.href = "../administrator/billboards.html";
		}	
	}
}

function sendVerificationCode(){
	$.post("../server/mail-verification-code.php",
			{
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
		if (sessionStorage.getItem('ID') !== null){
			console.log('Session exists!!!');
			document.getElementById("getStartedLog").style.display = "none";
			document.getElementById("getStartedReg").style.display = "none";
			if(document.getElementById("getStartedMes") != null){
				document.getElementById("getStartedMes").style.display = "none";
			}
			document.getElementById("profileDropdown").style.display = "inline";
			document.getElementById("profileEmail").style.display = "inline";
		}else{
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

function changePassword(){
	$.post("../server/change-password.php",
			{
				userID : profile_ID,
				newPassword: $('#passwordchange').val()
			},function(data,status){
				if(status === "success"){
					console.log(data);
					$('#changePasswordModal').modal('hide');
				console.log(status);
				}else{
					console.log('Error changing password!!');
				}
		});
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
