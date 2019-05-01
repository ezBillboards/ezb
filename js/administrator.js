

$(document).ready(function(){
	session();
	
	$("#profile-email").text(sessionStorage.getItem('email')).toString(CryptoJS.enc.Utf8));
	
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
		
		
		if(decrypt(sessionStorage.getItem('role')).toString(CryptoJS.enc.Utf8)!= 4){
			if(decrypt(sessionStorage.getItem('role')).toString(CryptoJS.enc.Utf8) == 1){
				window.location.href = "../user/home.html";
			}
			else if(decrypt(sessionStorage.getItem('role')).toString(CryptoJS.enc.Utf8) == 3){
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