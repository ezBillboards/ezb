/*user home view JavaScript*/
var credentials;
var role;
var profile_ID;
var verifiedUser;

Login();
setTimeout(Verify,100);

function Login(){
	

	$.get("../server/user-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			console.log(Object.keys(data).length);
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "USER";
				profile_ID = credentials[0].id;
				verifiedUser = credentials[0].verified;
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/approver-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "APPROVER";
				profile_ID = credentials[0].id;
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/publisher-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				profile_ID = credentials[0].id;
				role = "PUBLISHER";
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/admin-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "ADMIN";
				profile_ID = credentials[0].id;
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
		if (verified == 0){
			console.log('USER NOT VERIFIED!')
		}else{
			console.log('USER VERIFIED!')
		}
	}
	else if(role == "APPROVER"){
		//SESSION VARIABLES
		//IF APPROVER FOUND --->> APPROVER VIEW
		window.location.href = "../approver/approver-requests.html";
	}
	else if(role == "PUBLISHER"){
		//SESSION VARIABLES
		//IF PUBLISHER FOUND --->> PUBLISHER VIEW
		window.location.href = "../publisher/publisher-paid-requests.html";
	}
	else if(role == "ADMIN"){
		//SESSION VARIABLES
		//IF ADMIN FOUND --->> ADMIN VIEW
	}
}
