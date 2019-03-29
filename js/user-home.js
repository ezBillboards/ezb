/*user home view JavaScript*/
var credentials;
var role;

Login();

function Login(){
	$.get("../server/user-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			console.log(Object.keys(data).length);
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "USER";
				console.log(credentials[0].id);
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
				console.log(credentials[0].id);
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/publisher-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			if(JSON.parse(data).length > 0){
				credentials = JSON.parse(data);
				role = "PUBLISHER";
				console.log(credentials[0].id);
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
				console.log(credentials[0].id);
				console.log(data);
				console.log(status);
			}
		});
		
	//IF USER IS FOUND 
	//STEP 1: VERIFIED EMAIL??
	//STEP 2: IF NOT VERIFIED: ENTER CODE OR RESEND CODE
	//STEP 3: IF VERIFIED: SESSION VARIABLES AND HOME PAGE
	
	//IF APPROVER FOUND --->> APPROVER VIEW
	
	//IF PUBLISHER FOUND --->> PUBLISHER VIEW
	
	//IF ADMIN FOUND --->> ADMIN VIEW
	
	//USER NOT FOUND
	//RELOAD MODAL WITH ERROR MESSAGE OR SOMETHING LIKE THAT....
	//ERROR MESSAGE AND EMPTY PASSWORD INPUT BOX
}
