/*user home view JavaScript*/

Login();

function Login(){
	$.get("../server/user-login.php",
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error Login function!!");
			}
			console.log(data);
			console.log(status);
		});
	
}
