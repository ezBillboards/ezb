/*user home view JavaScript*/

Login();

function Login(){
	$.get("../server/user-credentials.php",
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error Login function!!");
			}
			console.log(data);
			console.log(status);
		});
	$.get("../server/approver-credentials.php",
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error Login function!!");
			}
			console.log(data);
			console.log(status);
		});
	$.get("../server/publisher-credentials.php",
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error Login function!!");
			}
			console.log(data);
			console.log(status);
		});
	$.get("../server/admin-credentials.php",
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
