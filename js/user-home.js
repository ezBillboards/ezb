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
	});
	
	$("#btnregister").click(function(){
		console.log('btnregister clicked!!');
		if($('#passwordreg').val() === $('#confirm_passwordreg').val()){
			random = Math.floor((Math.random() * 1000000) + 1);
			console.log(random);
			console.log($('#emailreg').val());
			Register($('#emailreg').val(),$('#firstnamereg').val(),$('#passwordreg').val(),$('#phonereg').val(),$('#passwordreg').val(),random);
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
		if($('#passwordchange').val() == $('#confirm_passwordchange').val()){
                        changePassword();
                }
                else{
                        console.log('password values not the same');
                }
	});
	
	$("#btnresend").click(function(){
		
	});
	
	$("#btnverify").click(function(){
		if( $('#verificationCode').val() == sessionStorage.getItem('verificationCode')){
			VerifyEmail();	
		}
		else{
			alert('Verification code incorrect');
		}
	});
	
	$("#btnlogout").click(function(){
		console.log('btnlogout clicked!!');
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		Session();
	});
});

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
			document.getElementById("getStartedMes").style.display = "none";
			document.getElementById("profileDropdown").style.display = "inline";
			document.getElementById("profileEmail").style.display = "inline";
			//document.getElementById("userProfile").style.display = "inline";
			console.log('USER VERIFIED!')
			Session();
			$('#loginModal').modal('hide');
		}
	}else if(role == 2){
		//SESSION VARIABLES
		sessionStorage.setItem('ID', profile_ID);
		sessionStorage.setItem('role', role);
		//IF APPROVER FOUND --->> APPROVER VIEW
		window.location.href = "../approver/approver-requests.html";
		//console.log('APPROVER FOUND');
	}
	else if(role == 3){
		//SESSION VARIABLES
		sessionStorage.setItem('ID', profile_ID);
		sessionStorage.setItem('role', role);
		//IF PUBLISHER FOUND --->> PUBLISHER VIEW
		window.location.href = "../publisher/publisher-paid-requests.html";
		
	}
	else if(role == 4){
		//SESSION VARIABLES
		sessionStorage.setItem('ID', profile_ID);
		sessionStorage.setItem('role', role);
		//IF ADMIN FOUND --->> ADMIN VIEW
		console.log('ADMIN FOUND');
		window.location.href = "../administrator/administrator-logs.html";

		
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
			document.getElementById("getStartedMes").style.display = "none";
			document.getElementById("profileDropdown").style.display = "inline";
			document.getElementById("profileEmail").style.display = "inline";
		}else{
			console.log('Session doesn\'t exists!!!');
			document.getElementById("getStartedLog").style.display = "inline";
			document.getElementById("getStartedReg").style.display = "inline";
			document.getElementById("getStartedMes").style.display = "inline";
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
