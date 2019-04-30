$(document).ready(function(){
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

	$.get("../server/administrator-read-config.php",function(data, status){
		var settings = JSON.parse(data);
		console.log(settings);
		$("#server").val(settings.DB_SERVER);
                $("#user").val(settings.DB_USERNAME);
                $("#password").val(settings.DB_PASSWORD);
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

	$(".save-config").click(function(){
		var configCategory = $(this).attr("id");
		if(configCategory == "db"){
			if(validateDatabaseConfiguration()==true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                server: $("#server").val(),
                                username: $("#user").val(),
                                password: $("#password").val(),
                                dbname: $("#database").val(),
				adminEmail: sessionStorage.getItem('email')
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
			if(validateMailServerConfiguration()==true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                ip: $("#ip").val(),
                                port: $("#port").val(),
				adminEmail: sessionStorage.getItem('email')
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
			if(validateBackupPathConfiguration()==true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                backupPath: $("#backup").val(),
				adminEmail: sessionStorage.getItem('email')
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
			if(validateImagePathConfiguration() == true){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                imagePath: $("#image").val(),
				adminEmail: sessionStorage.getItem('email')
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
				adminEmail: sessionStorage.getItem('email')
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

	$("#save-about").click(function(){
                $.post("../server/administrator-about-settings.php",
                        {
                                about: $("#about").val(),
				adminEmail: sessionStorage.getItem('email')
                        }, function(data, status){
				if(status == "success"){
					alert('About Information Updated');
				} else{
					alert('Error Trying to Update About Information');
				}
                	}
		);
        });

	$("#save-terms").click(function(){
                $.post("../server/administrator-terms-settings.php",
                        {
                                terms: $("#terms").val(),
				adminEmail: sessionStorage.getItem('email')
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
 var passwordRGEX = /^[_A-z0-9]*((-|\s)*[_A-z0-9.:,])*$/;
 var passwordResult = passwordRGEX.test(password);

console.log('Server = '+ server);
console.log('Database = '+ db);
console.log('User = '+ user);
console.log('Password = '+ password);


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

if(passwordResult == false){
        errors.push('Please enter a valid Password');
        }
if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

return true;
}


function validateMailServerConfiguration(){
 var ip = document.getElementById('ip').value;
 var ipRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
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

