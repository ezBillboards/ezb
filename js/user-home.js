/*user home view JavaScript*/
var firstName;
var lastName;
var email;
var password;
var confirmPassword;
var mobilePhone;
var credentials;
var role;
var profile_ID;
var verifiedUser;	

$(document).ready(function(){
	Session();
	$("#btnlogin").click(function(){
		console.log('btnlogin clicked!!');
		email = $('#emaillogin').val();
		password = $('#passwordlogin').val();
		Login(email,password);
		setTimeout(Verify,500);
	});
	
	$("#btnregister").click(function(){
		console.log('btnregister clicked!!');
		email = $('#emailreg').val();
		password = $('#passwordreg').val();
		
	});
});

function Register(email_IN,firstName_IN,lastName_IN,mobilePhone_IN,workPhone_IN,companyName_IN,facebookURL_IN,instagramURL_IN,twitterURL_IN,
	address1_IN,address2_IN,city_IN,state_IN,zipcode_IN,password_IN){
	$.post("../server/user-registration.php",
			{
				email: email_IN,
				firstName: firstName_IN,
				lastName : lastName_IN,
				mobilePhone: mobilePhone_IN,
				workPhone : workPhone_IN,
				companyName : companyName_IN,
				facebookURL : facebookURL_IN,
				instagramURL : instagramURL_IN,
				twitterURL : twitterURL_IN,
				address1 : address1_IN,
				address2 : address2_IN,
				city : city_IN,
				state : state_IN,
				zipcode : zipcode_IN,
				password :password_IN,
			},function(data,status){
				
		});
}

function Login(email_IN,password_IN){
	$.get("../server/user-credentials.php",
		{emailAddress: email_IN},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "USER";
				profile_ID = credentials[0].id;
				sessionStorage.setItem('ID', profile_ID);
				sessionStorage.setItem('email', email_IN);
				sessionStorage.setItem('role', role);
				verifiedUser = credentials[0].verified;
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/approver-credentials.php",
		{emailAddress: email_IN},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "APPROVER";
				profile_ID = credentials[0].id;
				sessionStorage.setItem('ID', profile_ID);
				sessionStorage.setItem('email', email_IN);
				sessionStorage.setItem('role', role);
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/publisher-credentials.php",
		{emailAddress: email_IN},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				profile_ID = credentials[0].id;
				sessionStorage.setItem('ID', profile_ID);
				sessionStorage.setItem('email', email_IN);
				sessionStorage.setItem('role', role);
				role = "PUBLISHER";
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/admin-credentials.php",
		{emailAddress: email_IN},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "ADMIN";
				profile_ID = credentials[0].id;
				sessionStorage.setItem('ID', profile_ID);
				sessionStorage.setItem('email', email_IN);
				sessionStorage.setItem('role', role);
				console.log(data);
				console.log(status);
			}

		});
}

function Verify(){
	if (!role){
		console.log('USER NOT FOUND');
		//USER NOT FOUND
		//RELOAD MODAL WITH ERROR MESSAGE OR SOMETHING LIKE THAT....
		//ERROR MESSAGE AND EMPTY PASSWORD INPUT BOX
	}
	else if(role == "USER"){
		//IF USER IS FOUND 
		//STEP 1: VERIFIED EMAIL??
		//STEP 2: IF NOT VERIFIED: ENTER CODE OR RESEND CODE
		//STEP 3: IF VERIFIED: SESSION VARIABLES AND HOME PAGE
		console.log('USER FOUND');
		if (verifiedUser == 0){
			console.log('USER NOT VERIFIED!')
			console.log(sessionStorage.getItem('ID'));
			$('#verifyEmailModal').modal('show');
		}else{
			//SESSION VARIABLES
			//logged in nav bar
			document.getElementById("getStartedLog").style.display = "none";
			document.getElementById("getStartedReg").style.display = "none";
			document.getElementById("getStartedMes").style.display = "none";
			//document.getElementById("userProfile").style.display = "inline";
			console.log('USER VERIFIED!')
			$('#loginModal').modal('hide');
		}
	}
	else if(role == "APPROVER"){
		//SESSION VARIABLES
		//IF APPROVER FOUND --->> APPROVER VIEW
		window.location.href = "../approver/approver-requests.html";
		//console.log('APPROVER FOUND');
	}
	else if(role == "PUBLISHER"){
		//SESSION VARIABLES
		//IF PUBLISHER FOUND --->> PUBLISHER VIEW
		window.location.href = "../publisher/publisher-paid-requests.html";
		//console.log('PUBLISHER FOUND');
	}
	else if(role == "ADMIN"){
		//SESSION VARIABLES
		//IF ADMIN FOUND --->> ADMIN VIEW
		console.log('ADMIN FOUND');
	}
}

function Session(){
		if (sessionStorage.getItem('ID') !== null){
			console.log('Session exists!!!');
			document.getElementById("getStartedLog").style.display = "none";
			document.getElementById("getStartedReg").style.display = "none";
			document.getElementById("getStartedMes").style.display = "none";
		}else{
			console.log('Session doesn\'t exists!!!');
			document.getElementById("getStartedLog").style.display = "inline";
			document.getElementById("getStartedReg").style.display = "inline";
			document.getElementById("getStartedMes").style.display = "inline";
			
		}
}
