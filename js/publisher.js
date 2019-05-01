
$(document).ready(function(){
	session();
	
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
	if (sessionStorage.getItem('ID') != null){
		if(decrypt(sessionStorage.getItem('role')) != 3){
			if(decrypt(sessionStorage.getItem('role')) == 1){
				window.location.href = "../user/home.html";
			}
			else if(decrypt(sessionStorage.getItem('role')) == 2){
				window.location.href = "../approver/requests.html";
			}
			else{
				window.location.href = "../administrator/settings.html";
			}
		}
	}else{
		window.location.href = "../user/home.html";
	}
}