var sessionID;

$(document).ready(function(){
	//setTimeout(session,5);
	
	
	
	$("#btnlogout").click(function(){
		console.log('btnlogout clicked!!');
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		window.location.href = "../user/home.html";
	});
});

function session(){
	console.log("Reading session variables");
	
	if (sessionStorage.getItem('ID') != null){
		sessionID = decrypt(sessionStorage.getItem('role'));
		if(sessionID != 4){
			if(sessionID == 1){
				window.location.href = "../user/home.html";
			}
			else if(sessionID == 3){
				window.location.href = "../publisher/paid-requests.html";
			}
			else{
				window.location.href = "../approver/requests.html";
			}
		}else{
			$("#profile-email").text(decrypt(sessionStorage.getItem('email')));		
		}
	}else{
		window.location.href = "../user/home.html";
	}
}
