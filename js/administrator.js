

$(document).ready(function(){
	setTimeout(session,300);
	
	$("#profile-email").text(decrypt(sessionStorage.getItem('email')));
	
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
		if(decrypt(sessionStorage.getItem('role')) != 4){
			if(decrypt(sessionStorage.getItem('role')) == 1){
				window.location.href = "../user/home.html";
			}
			else if(decrypt(sessionStorage.getItem('role')) == 3){
				window.location.href = "../publisher/paid-requests.html";
			}
			else{
				window.location.href = "../approver/requests.html";
			}
		}else{
			//document.getElementById('profile-email').value = sessionStorage.getItem('email');
		}
	}else{
		window.location.href = "../user/home.html";
	}
}