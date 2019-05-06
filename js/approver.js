
$(document).ready(function(){
	//setTimeout(session,500);
	
/******************
*Log out
*from roll and
*send to home.html
******************/	
	$("#btnlogout").click(function(){
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		window.location.href = "../user/home.html";
	});
});


/*******************
*Determine Session
*depending on the ID
********************/
function session(){	
	if (sessionStorage.getItem('ID') != null){
		if(decrypt(sessionStorage.getItem('role')) != 2){
			if(decrypt(sessionStorage.getItem('role')) == 1){
				window.location.href = "../user/home.html";
			}
			else if(decrypt(sessionStorage.getItem('role')) == 3){
				window.location.href = "../publisher/paid-requests.html";
			}
			else{
				window.location.href = "../administrator/settings.html";
			}
		}else{
			$("#profile-email").text(decrypt(sessionStorage.getItem('email')));
		}
	}else{
		window.location.href = "../user/home.html";
	}
}
