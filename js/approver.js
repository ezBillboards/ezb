

$(document).ready(function(){
	session();
	
	$("#profile-email").text(sessionStorage.getItem('email'));
	
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
		
		
		if(sessionStorage.getItem('role')!= 2){
			if(sessionStorage.getItem('role') == 1){
				window.location.href = "../user/home.html";
			}
			else if(sessionStorage.getItem('role') == 3){
				window.location.href = "../publisher/paid-requests.html";
			}
			else{
				window.location.href = "../administrator/settings.html";
			}
		}else{
			//document.getElementById('profile-email').value = sessionStorage.getItem('email');
		}
	}else{
		window.location.href = "../user/home.html";
	}
}