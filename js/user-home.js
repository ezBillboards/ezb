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
			console.log('Size > 0');
			}
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				role = "USER";
				console.log(credentials[0].id);
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/approver-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				role = "APPROVER";
				console.log(credentials[0].id);
				console.log(data);
				console.log(status);

			}
			
		});
	$.get("../server/publisher-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				role = "PUBLISHER";
				console.log(credentials[0].id);
				console.log(data);
				console.log(status);
			}
		});
	$.get("../server/admin-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				role = "ADMIN";
				console.log(credentials[0].id);
				console.log(data);
				console.log(status);
			}
		});
		
	//User not found
	//Error message
}
