$(document).ready(function(){

	$.get("../server/user-account.php", function(data, status){
        	var info = JSON.parse(data);
                console.log(info);
                $("#firstName").val(info.firstName);
                $("#lastName").val(info.lastName);
                $("#email").val(info.email);
                $("#mobilePhone").val(info.mobilePhone);
                $("#workPhone").val(info.workPhone);
                $("#company").val(info.company);
                $("#address1").val(info.address1);
                $("#address2").val(info.address2);
                $("#state").val(info.state);
                $("#city").val(info.city);
                $("#zip").val(info.zip);

                $("#url").val(info.url);
                $("#facebook").val(info.facebook);
                $("#twitter").val(info.twitter);
                $("#instagram").val(info.instagram);
        });

	$("#changePasswd").click(function(){
		if($("#oldPasswd").val() != ""){
			if($("#newPasswd").val() != "" && $("#confirmPasswd").val() != "" && $("#newPasswd").val() === $("#confirmPasswd").val()){
				$.post("../server/user-account-changePasswd.php",
					{
					  userID: 1, //Change later.
					  oldPasswd: $("#oldPasswd").val(),
					  passwd: $("#newPasswd").val()
					},
					function(data, status){
					if(status === "success"){
						alert(data);
						console.log(status);
					} else{
						alert(data);
						console.log(status);
					}
				});
			} else{
				alert("New password doesn't match or a field is empty.");
			}
		} else{
			alert("Password is empty.");
		}
	});	
	
	$("#save").click(function(){
		$.post("../server/user-account-save.php",
                        {
                                userID: 1, //Change later.
				firstName: $("#firstName").val(),
                		lastName: $("#lastName").val(),
                		email: $("#email").val(),
                		mobilePhone: $("#mobilePhone").val(),
                		workPhone: $("#workPhone").val(),
                		company: $("#company").val(),
                		address1: $("#address1").val(),
                		address2: $("#address2").val(),
                		state: $("#state").val(),
                		city: $("#city").val(),
                		zip: $("#zip").val(),
                		url: $("#url").val(),
                		facebook: $("#facebook").val(),
                		twitter: $("#twitter").val(),
                		instagram: $("#instagram").val()
                        },
                        function(data, status){
                        if(status === "success"){
                               alert(data);
                               console.log(status);
                        } else{
                               alert(data);
         	               console.log(status);
                	}
		});
	});
});
