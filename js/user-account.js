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
		console.log('here 1');
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
			validateContactInfo();
                        if(status === "success"){
                               alert(data);
                               console.log(status);
                        } else{
                               alert(data);
         	               console.log(status);
                	}
		

		});

		
	});

function validateContactInfo(){
  var firstName = document.getElementById('firstName').value;
  var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
  var firstNameResult = firstNameRGEX.test(firstName);
  var lastName = document.getElementById('lastName').value;
  var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
  var lastNameResult = firstNameRGEX.test(lastName);
  var email = document.getElementById('email').value;
  var emailRGEX = /^(.+)@(.+)$/;
  var emailResult = emailRGEX.test(email);
  var mPhoneNumber = document.getElementById('mobilePhone').value;
  var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var mPhoneResult = mPhoneRGEX.test(mPhoneNumber);
  var wPhoneNumber = document.getElementById('workPhone').value;
  var wPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var wPhoneResult = wPhoneRGEX.test(wPhoneNumber);
  var company = document.getElementById('company').value;
  var companyRGEX = /^[a-z]|\d?[a-zA-Z0-9]?[a-zA-Z0-9\s&@.]+$/;
  var companyResult = companyRGEX.test(company);
  var addressOne = document.getElementById('address1').value;
  var addressOneRGEX = /^[a-zA-Z ]{2,30}$/;
  var addressOneResult = addressOneRGEX.test(addressOne);
  var addressTwo = document.getElementById('address2').value;
  var addressTwoRGEX = /^[a-zA-Z ]{2,30}$/;
  var addressTwoResult = addressTwoRGEX.test(addressTwo);
  var zip = document.getElementById('zip').value;
  var zipRGEX = /^\d{5}$|^\d{5}-\d{4}$/;
  var zipResult = zipRGEX.test(zip);
  var url = document.getElementById('url').value;
  var urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  var urlResult = urlRGEX.test(url);
  var twitter = document.getElementById('twitter').value;
  var twitterRGEX = /^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/;
  var twitterResult = twitterRGEX.test(twitter);
  var fb = document.getElementById('facebook').value;
  var fbRGEX = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/;
  var fbResult = fbRGEX.test(fb);
  var instagram = document.getElementById('instagram').value;
  var instagramRGEX = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/;
  var instagramResult = instagramRGEX.test(instagram);




  console.log('First Name = '+ firstName);
  console.log('Last Name = '+ lastName);
  console.log('Email = '+ email);
  console.log('Mobile Phone = '+ mPhoneNumber);
  console.log('Work Phone = '+ wPhoneNumber);
  console.log('Company = ' + company);
  console.log('Address 1 = '+ addressOne);
  console.log('Address 2 = '+ addressTwo);
  console.log('Zip  = '+ zip);
  console.log('URL  = '+ url);
  console.log('Facebook  = '+ fb);
  console.log('Twitter  = '+ twitter);
  console.log('Instagram  = '+ instagram);



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

  if(company == false)
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


  if(urlResult == false)
        {
        alert('Please enter a valid URL');
        return false;
        }

  if(fbResult == false)
        {
        alert('Please enter a valid Facebook');
        return false;
        }


  if(twitterResult == false)
        {
        alert('Please enter a valid Twitter');
        return false;
        }
  if(instagramResult == false)
        {
        alert('Please enter a valid Instagram');
        return false;
        }


}


});
