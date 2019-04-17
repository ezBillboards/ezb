

$(document).ready(function(){
	session();
	$("#btnlogout").click(function(){
		console.log('btnlogout clicked!!');
		sessionStorage.removeItem('ID');
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('role');
		Session();
		window.location.href = "../user/home.html";
	});
});

function session(){
	console.log(sessionStorage.getItem('ID'));
	
	if (sessionStorage.getItem('ID') != null){
		
		console.log(sessionStorage.getItem('role'));
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