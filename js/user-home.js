/*user home view JavaScript*/
var credentials;

Login();

function Login(){
	$.get("../server/user-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				console.log(credentials[0].id);
			}
			console.log(data);
			console.log(status);
		});
	$.get("../server/approver-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				console.log(credentials[0].id);
			}
			console.log(data);
			console.log(status);
		});
	$.get("../server/publisher-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				console.log(credentials[0].id);
			}
			console.log(data);
			console.log(status);
		});
	$.get("../server/admin-credentials.php",
		{emailAddress: 'example2@billboards.com'},
		function(data, status){
			credentials = JSON.parse(data);
			if(credentials.length > 0){
				console.log(credentials[0].id);
			}
			console.log(data);
			console.log(status);
		});
}
