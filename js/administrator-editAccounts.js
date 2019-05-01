$(document).ready(function(){
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

	setTimeout(function(){
		console.log(decrypt(sessionStorage.getItem('ID')));
		$.get("../server/user-account.php",
			{id:decrypt(sessionStorage.getItem('ID'))},
			function(data, status){

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

			});
	},100);
	

	$("#changePasswd").click(function(){
	    if(validatePassword()==true){
			$.post("../server/user-account-changePasswd.php",
				{
				  userID: sessionStorage.getItem('ID'), //Change later.
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
		 
		}
	});		
	
	$("#save").click(function(){

         if (validateContactInfo()==true){
		$.post("../server/user-account-save.php",
                        {
                                userID: sessionStorage.getItem('ID'), //Change later.
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
                		facebook: "",
                		twitter: "",
                		instagram: ""
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
	    }
	 
	});

function validatePassword(){
 var oldpassword = document.getElementById('oldPasswd').value;
 var newpassword = document.getElementById('newPasswd').value;
 var cpassword = document.getElementById('confirmPasswd').value;

 console.log('Old Password = '+ oldpassword);
 console.log('New Password = '+ newpassword);
 console.log('Confirm Password = '+ cpassword);


if(oldpassword == ""){
alert('Old password is empty');
return false;
}

if(newpassword == ""){
alert('New password is empty');
return false;
}


	
 errors = [];
    if (newpassword.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (newpassword.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
    if (newpassword.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.")
    }
    if (newpassword.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    if(newpassword.localeCompare(oldpassword)==0){
	alert('Old and new password cannot be the same');
	return false;
    }


    if(cpassword == ""){
	alert('Confirm password is empty');
	return false;
    }

    if(newpassword.localeCompare(cpassword)==-1){
        alert('Confirm and new password are not the same');
        return false;
    }



return true;

}

function validateContactInfo(){
  var firstName = document.getElementById('firstName').value;
  var firstNameRGEX = /^[a-zA-Z]{2,30}$/;
  var firstNameResult = firstNameRGEX.test(firstName);
  var lastName = document.getElementById('lastName').value;
  var lastNameRGEX = /^[a-zA-Z]{2,30}$/;
  var lastNameResult = firstNameRGEX.test(lastName);
  var email = document.getElementById('email').value;
  var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var emailResult = emailRGEX.test(email);
  var mPhoneNumber = document.getElementById('mobilePhone').value;
  var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var mPhoneResult = mPhoneRGEX.test(mPhoneNumber);
  var wPhoneNumber = document.getElementById('workPhone').value;
  var wPhoneRGEX = /^$|^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var wPhoneResult = wPhoneRGEX.test(wPhoneNumber);
  var company = document.getElementById('company').value;
  var companyRGEX = /^$|[a-zA-Z0-9]/;
  var companyResult = companyRGEX.test(company);
  var addressOne = document.getElementById('address1').value;
  var addressOneRGEX = /^$|^[a-zA-Z ]{2,30}$/;
  var addressOneResult = addressOneRGEX.test(addressOne);
  var addressTwo = document.getElementById('address2').value;
  var addressTwoRGEX = /^$|^[a-zA-Z ]{2,30}$/;
  var addressTwoResult = addressTwoRGEX.test(addressTwo);
  var zip = document.getElementById('zip').value;
  var zipRGEX = /^$|^\d{5}$|^\d{5}-\d{4}$/;
  var zipResult = zipRGEX.test(zip);


  console.log('First Name = '+ firstName);
  console.log('Last Name = '+ lastName);
  console.log('Email = '+ email);
  console.log('Mobile Phone = '+ mPhoneNumber);
  console.log('Work Phone = '+ wPhoneNumber);
  console.log('Company = ' + company);
  console.log('Address 1 = '+ addressOne);
  console.log('Address 2 = '+ addressTwo);
  console.log('Zip  = '+ zip);



  if(firstNameResult == false)
	{
	alert('Please enter a valid First Name');	
	return false;
	}

  if(lastNameResult == false)
        {
        alert('Please enter a valid Last Name');
        return false;
        }

  if(emailResult == false)
        {
        alert('Please enter a valid Email');
        return false;
        }

  if(mPhoneResult == false)
        {
        alert('Please enter a valid Mobile Phone');
        return false;
        }

  if(wPhoneResult == false)
        {
        alert('Please enter a valid Work Phone');
        return false;
        }

  if(companyResult == false)
        {
        alert('Please enter a valid Company name');
        return false;
        }


  if(addressOneResult == false)
        {
        alert('Please enter a valid Address 1');
        return false;
        }

  if(addressTwoResult == false)
        {
        alert('Please enter a valid Address 2');
        return false;
        }

  if(zipResult == false)
        {
        alert('Please enter a valid Zip');
        return false;
        }




return true;

}



});
