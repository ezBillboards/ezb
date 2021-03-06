$(document).ready(function(){

/**************
*Get EZB logos
***************/
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

/**************
*Sleep Setter
***************/		
	setTimeout(function(){		
		$.get("../server/user-account.php",
			{id:decrypt(sessionStorage.getItem('ID'))},
			function(data, status){
				var info = JSON.parse(data);
				$("#firstName").val(decrypt(info.firstName));
				$("#lastName").val(decrypt(info.lastName));
				$("#email").val(info.email);
				$("#mobilePhone").val(decrypt(info.mobilePhone));
				$("#workPhone").val(decrypt(info.workPhone));
				$("#office").val(decrypt(info.office));
				$("#company").val(decrypt(info.company));
				$("#address1").val(decrypt(info.address1));
				$("#address2").val(decrypt(info.address2));
				$("#state").val(decrypt(info.state));
				$("#city").val(decrypt(info.city));
				$("#zip").val(decrypt(info.zip));
			});
	},150);
	

/*****************
*Change password
*on the DB
******************/
	$("#changePasswd").click(function(){
	    if(validatePassword()==true){
			$.post("../server/user-account-changePasswd.php",
				{
				  userID: decrypt(sessionStorage.getItem('ID')), //Change later.
				  oldPasswd: $("#oldPasswd").val(),
				  passwd: $("#newPasswd").val()
				},
				function(data, status){
				if(status === "success"){
					alert(data);
				} else{
					alert(data);
				}
			});
		 
		}
	});		
	
/************************
*Save all new information
*from front-end to DB
*************************/

	$("#save").click(function(){

        if (validateContactInfo()==true){
			$.post("../server/user-account-save.php",
            {
				userID: decrypt(sessionStorage.getItem('ID')),
				firstName: encrypt($("#firstName").val()),
				lastName: encrypt($("#lastName").val()),
				email: $("#email").val(),
				mobilePhone: encrypt($("#mobilePhone").val()),
				workPhone: encrypt($("#workPhone").val()),
				company: encrypt($("#company").val()),
				office: encrypt($("#office").val()),
				address1: encrypt($("#address1").val()),
				address2: encrypt($("#address2").val()),
				state: encrypt($("#state").val()),
				city: encrypt($("#city").val()),
				zip: encrypt($("#zip").val()),
				url: encrypt($("#url").val()),
				facebook: "",
				twitter: "",
				instagram: ""
            },

			function(data, status){
				if(status === "success"){
					alert(data);
				} else{
					alert(data);
				}  
			});
	    }
	 
	});

});

/**********************************
*Validates password
*making sure that old password
*and new password are not the same
*and specific password requirements
*
* @return {Boolean}
**********************************/
function validatePassword(){
	var oldpassword = document.getElementById('oldPasswd').value;
	var newpassword = document.getElementById('newPasswd').value;
	var cpassword = document.getElementById('confirmPasswd').value;



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


/**********************************
*Validates contact information
*Adress
*Name
*Phone Number
*Work Phone
*Address
*City
*State
*ZIP
*
* @return {Boolean}
**********************************/
function validateContactInfo(){
  var firstName = document.getElementById('firstName').value;
  var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
  var firstNameResult = firstNameRGEX.test(firstName);
  var lastName = document.getElementById('lastName').value;
  var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
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
  var addressOneRGEX = /^$|^[a-zA-Z \d]{2,30}$/;
  var addressOneResult = addressOneRGEX.test(addressOne);
  var addressTwo = document.getElementById('address2').value;
  var addressTwoRGEX = /^$|^[a-zA-Z \d]{2,30}$/;
  var state = document.getElementById('state').value.toUpperCase();;
  var stateRGEX = /^$|\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|AS|DC|FM|GU|MH|MP|PW|PR|VI)\b/;
  var stateResult = stateRGEX.test(state);
  var city = document.getElementById('city').value;
  var cityRGEX = /^$|^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
  var cityResult = cityRGEX.test(city);
  var addressTwoResult = addressTwoRGEX.test(addressTwo);
  var zip = document.getElementById('zip').value;
  var zipRGEX = /^$|^\d{5}$|^\d{5}-\d{4}$/;
  var zipResult = zipRGEX.test(zip);





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

  if(cityResult == false)
        {
        alert('Please enter a valid City');
        return false;
        }

  if(stateResult == false)
        {
        alert('Please enter a valid State');
        return false;
        }

  if(zipResult == false)
        {
        alert('Please enter a valid Zip');
        return false;
        }

return true;

}	
	

