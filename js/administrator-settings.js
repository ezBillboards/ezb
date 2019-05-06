$(document).ready(function(){
/**************
*Get EZB logos
***************/
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

/****************************
*Get all information
*fron the DB involving settings
*******************************/
	$.get("../server/administrator-read-config.php",function(data, status){
		var settings = JSON.parse(data);
		console.log(settings);
		$("#server").val(settings.DB_SERVER);
                $("#user").val(settings.DB_USERNAME);
                $("#database").val(settings.DB_NAME);
		$("#ip").val(settings.IP);
                $("#port").val(settings.PORT);
                $("#backup").val(settings.BACKUP_PATH);
                $("#image").val(settings.IMAGE_PATH);
                $("#office").val(settings.OFFICE);
                $("#postal").val(settings.POSTAL);
                $("#physical").val(settings.PHYSICAL);
                $("#phone").val(settings.PHONE);
                $("#extension").val(settings.EXTENSION);
                $("#directPhone").val(settings.DIRECT_PHONE);
                $("#fax").val(settings.FAX);
                $("#email").val(settings.EMAIL);
                $("#about").val(settings.ABOUT);
                $("#terms").val(settings.TERMS);
	});

/****************************
*Post information to the DB
*****************************/
	$(".save-config").click(function(){
		var configCategory = $(this).attr("id");
		if(configCategory == "db"){

/****************************
*Post Database Configuration
*****************************/
			if(validateDatabaseConfiguration()==true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                server: $("#server").val(),
                                username: $("#user").val(),
                                password: $("#password").val(),
                                dbname: $("#database").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
				if(status == "success"){
                                        alert('Database Configuration Updated');
                                } else{
                                        alert('Error Trying to Update Database Configuration');
                                }
                	   }
			);
			}
		} else if(configCategory == "mail"){

/****************************
*Post Mail Server Configuration
*****************************/
			if(validateMailServerConfiguration()==true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                ip: $("#ip").val(),
                                port: $("#port").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
				if(status == "success"){
                                        alert('Mail Server Configuration Updated');
                                } else{
                                        alert('Error Trying to Update Mail Server Configuration');
                                }
                           }
			);
			}
		} else if(configCategory == "backup"){

/****************************
*Post Backup Path Configuration
*****************************/
			if(validateBackupPathConfiguration()==true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                backupPath: $("#backup").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
				if(status == "success"){
                                        alert('Backup Path Updated');
                                } else{
                                        alert('Error Trying to Update Backup Path');
                                }
                	   }
			);
			}
		} else if(configCategory == "image"){

/****************************
*Post Image Server Configuration
*****************************/
			if(validateImagePathConfiguration() == true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                imagePath: $("#image").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
                		if(status == "success"){
                                        alert('Image Path Updated');
                                } else{
                                        alert('Error Trying to Update Image Path');
                                }
			   }
			);
			}
		}
	});
	
/****************************
*Post Contact information
*****************************/
	$("#save-contact").click(function(){
		if(validateContactInfoConfiguration() == true){
                $.post("../server/administrator-contact-settings.php",
                        {
                                office:$("#office").val(),
                		postal:$("#postal").val(),
                		physical:$("#physical").val(),
                		phone:$("#phone").val(),
                		extension:$("#extension").val(),
                		directPhone:$("#directPhone").val(),
                		fax:$("#fax").val(),
                		email:$("#email").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
				if(status == "success"){
                                        alert('Contact Information Updated');
                                } else{
                                        alert('Error Trying to Update Contact Information');
                                }

                	}
		);
		}
        });

/****************************
*Post About information
*****************************/
	$("#save-about").click(function(){
                $.post("../server/administrator-about-settings.php",
                        {
                                about: $("#about").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
				if(status == "success"){
					alert('About Information Updated');
				} else{
					alert('Error Trying to Update About Information');
				}
                	}
		);
        });

/**************************************
*Post Terms and Agreement information
**************************************/
	$("#save-terms").click(function(){
                $.post("../server/administrator-terms-settings.php",
                        {
                                terms: $("#terms").val(),
				adminEmail: decrypt(sessionStorage.getItem('email'))
                        }, function(data, status){
				if(status == "success"){
                                        alert('Terms & Privacy Policy Information Updated');
                                } else{
                                        alert('Error Trying to Update Terms & Privacy Policy Information');
                                }
                	}
		);
        });
});


/*******************************
*Validate database configuration
*
** @return {Boolean}
*******************************/
function validateDatabaseConfiguration(){
 var server = document.getElementById('server').value;
 var serverRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.:,])*$/;
 var serverResult = serverRGEX.test(server);
 var db = document.getElementById('database').value;
 var dbRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.:,])*$/;
 var dbResult = dbRGEX.test(db);
 var user = document.getElementById('user').value;
 var userRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.:,])*$/;
 var userResult = userRGEX.test(user);
 var password = document.getElementById('password').value;

console.log('Server = '+ server);
console.log('Database = '+ db);
console.log('User = '+ user);
console.log('Password = '+ password);


if(password == ""){
        alert('Password is empty');
return false;
}


errors = [];

if(serverResult == false){
        errors.push('Please enter a valid Server');
    }
if(dbResult == false){
        errors.push('Please enter a valid Database');
    }
if(userResult == false){
        errors.push('Please enter a valid User');
    }
if(password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
if(password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
if(password.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.")
    }
if(password.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }

if(errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

return true;
}


/****************************
*Validate Mail Server
*
*
* @return {Boolean} 
*****************************/
function validateMailServerConfiguration(){
 var ip = document.getElementById('ip').value;
 var ipRGEX = /\W*(localhost)\W*|((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
 var ipResult = ipRGEX.test(ip);
 var port = document.getElementById('port').value;
 var portRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.])*$/;
 var portResult = portRGEX.test(port);

console.log('Ip = '+ ip + ipResult);
console.log('Port = '+ port);


errors = [];

if(ipResult == false){
        errors.push('Please enter a valid IP');
        }

if(portResult == false || port ==""){
        errors.push('Please enter a valid port');
        }

if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

return true;
}


/****************************
*Validate Backup Path
*
*
* @return {Boolean}
*****************************/
function validateBackupPathConfiguration(){
 var backup = document.getElementById('backup').value;
 var backupRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9./])*$/;
 var backupResult = backupRGEX.test(backup);

console.log('Backup = '+ backup);

errors = [];

if(backupResult == false || backup == ""){
        alert('Please enter a valid backup path');
        return false;
	}


return true;
}



/****************************
*Validate Image Path
*
*
* @return {Boolean}
*****************************/
function validateImagePathConfiguration(){
 var image = document.getElementById('image').value;
 var imageRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9./])*$/;
 var imageResult = imageRGEX.test(image);

console.log('Image = '+ image);

if(imageResult == false || image == ""){
        alert('Please enter a valid image path');
        return false;
        }


return true;
}


/****************************
*Validate Contact Info
*
*
* @return {Boolean}
*****************************/
function validateContactInfoConfiguration(){
 var office = document.getElementById('office').value;
 var officeRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.,:])*$/;
 var officeResult = officeRGEX.test(office);

 var postal = document.getElementById('postal').value;
 var postalRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.#-,])*$/;
 var postalResult = postalRGEX.test(postal);

 var physical = document.getElementById('physical').value;
 var physicalRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.,#])*$/;
 var physicalResult = physicalRGEX.test(physical);

 var phoneNumber = document.getElementById('phone').value;
 var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var phoneResult = phoneRGEX.test(phoneNumber);

 var extension = document.getElementById('extension').value;
 var extensionRGEX = /^[0-9]*((-|\s)*[0-9.,])*$/;
 var extensionResult = extensionRGEX.test(extension);

 var dphoneNumber = document.getElementById('directPhone').value;
 var dphoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var dphoneResult = dphoneRGEX.test(dphoneNumber);

 var fax = document.getElementById('fax').value;
 var faxRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var faxResult = faxRGEX.test(fax);

 var email = document.getElementById('email').value;
 var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var emailResult = emailRGEX.test(email);


console.log('Office = '+ office);
console.log('Postal = '+ postal);
console.log('Physical = '+ physical);
console.log('Phone = '+ phoneNumber);
console.log('Extensions = '+ extension);
console.log('Direct Phone = '+ dphoneNumber);
console.log('Fax' +fax );
console.log('Email = '+ email);






errors = [];

if(officeResult == false || office == ""){
        errors.push('Please enter a valid office hour');
        }
if(postalResult == false || postal == ""){
        errors.push('Please enter a valid postal address');
        }
if(physicalResult == false || physical == ""){
        errors.push('Please enter a valid physical address');
        }
if(phoneResult == false || phoneNumber == ""){
        errors.push('Please enter a valid phone number');
        }
if(extensionResult == false || extension == ""){
        errors.push('Please enter a valid extension');
        }
if(dphoneResult == false || dphoneNumber == ""){
        errors.push('Please enter a valid direct number');
        }
if(faxResult == false || fax == ""){
        errors.push('Please enter a valid fax number');
        }
if(emailResult == false || email == ""){
        errors.push('Please enter a valid email');
        }

if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

return true;
}

