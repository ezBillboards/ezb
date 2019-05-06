var accounts;
var currentRole = 0;
var index;
var indexUserId;

$(document).ready(function(){
/***************************************
*Check which role is the HTML looking for
*Administrator = 0
*Approver = 1
*Publisher = 2
*User = 3
****************************************/
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
      if($(this).text() == "Users"){
	currentRole = 3;
	getUserAccounts();
      } else if($(this).text() == "Approvers"){
	currentRole = 1;
	getApproverAccounts();
      } else if($(this).text() == "Publishers"){
	currentRole = 2;
	getPublisherAccounts();
      } else if($(this).text() == "Administrators"){
	currentRole = 0;
	getAdministratorAccounts();
      }
    });


/**************
*Get EZB logos
***************/
    $.get("../server/get-image-path.php", function(data, status){
	$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
    	$("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
    });


/*******************************************
*Search bar takes the user name and performs
*toLowerCase method and looks
*for the result on the DB
********************************************/
    $("#searchUsers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#user-accounts tr").filter(function() {
	        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
    });

/***********************************************
*Search bar takes the Approver name and performs
*toLowerCase method and looks
*for the result on the DB
************************************************/
    $("#searchApprovers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#approver-accounts tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

/**************************************************
*Search bar takes the Publisher name and performs
*toLowerCase method and looks
*for the result on the DB
**************************************************/
    $("#searchPublishers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#publisher-accounts tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

/*****************************************************
*Search bar takes the Administrator name and performs
*toLowerCase method and looks
*for the result on the DB
******************************************************/
    $("#searchAdministrators").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#administrator-accounts tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

/********************************************
*Validates the inputs to register
*If false, alert with an error will appear
*else, it will be posted to the DB
********************************************/
    $("#add-account").click(function(){
	if(validate() == true){
	$.post("../server/administrator-add-account.php",
	{
		firstName: encrypt($("#firstName").val()),
		lastName: encrypt($("#lastName").val()),
		email: $("#email").val(),
		tempPass: $("#tempPass").val(),
		workPhone: encrypt($("#workPhone").val()),
		mobilePhone: encrypt($("#mobilePhone").val()),
		office: encrypt($("#office").val()),
		role: $("#role").val(),
		adminEmail: decrypt(sessionStorage.getItem('email'))	
	}, function(data,status){
		var roleStr;
		if($("#role").val() == 0) roleStr = "Administrator";
		else if($("#role").val() == 1) roleStr = "Approver";
		else roleStr = "Publisher";
 
      		if(status == "success"){
			alert('Added the new ' + roleStr);
		} else{
			alert('Error trying to add the new ' + roleStr);
		}
		$("#firstName").val("");
		$("#lastName").val("");
		$("#email").val("");
		$("#tempPass").val("");
		$("#workPhone").val("");
		$("#mobilePhone").val("");
		$("#office").val("");
		$("#role").val(0);
	   }
	);
      }
    });

/**************************
*Takes id from DB and 
*deletes the current roll 
*in the front end
**************************/
    $("table").on("click", "tr .delete-account", function(){    	
	indexUserId = $(this).attr("id");
	$("#myModal").modal("show");

    });

/**************************
*Takes id from DB and
*edits the current roll
*in the db and front end
**************************/
    $("table").on("click", "tr .edit-account", function(){
        index = $(this).attr("id");
	$("#firstNameEdit").val(decrypt(accounts[index].firstName)),
        $("#lastNameEdit").val(decrypt(accounts[index].lastName)),
        $("#workPhoneEdit").val(decrypt(accounts[index].workPhone)),
        $("#mobilePhoneEdit").val(decrypt(accounts[index].mobilePhone)),
        $("#officeEdit").val(decrypt(accounts[index].office)),
	$("#roleEdit").prop('selectedIndex', currentRole);
    });
   
/***************************************************
*Validates new editions
*If false, alert will show saying there as an error
*else it will encript all parameters
*and send it to the DB
****************************************************/
    $("#update-account").click(function(){
	if(validateEdit()==true){
    	$.post("../server/administrator-update-account.php",
        {
		id: parseInt(accounts[index].id),
                firstName: encrypt($("#firstNameEdit").val()),
                lastName: encrypt($("#lastNameEdit").val()),
                workPhone: encrypt($("#workPhoneEdit").val()),
                mobilePhone: encrypt($("#mobilePhoneEdit").val()),
                office: encrypt($("#officeEdit").val()),
                role: $("#roleEdit").val(),
		userEmail:accounts[index].email,
		adminEmail:decrypt(sessionStorage.getItem('email'))
        }, function(data,status){
		if(status == "success"){
                        alert('Account has been succesfully updated');
                } else{
                        alert('Error trying to update the account');
                }
		$("#EditModal").modal("hide");
		if(currentRole == 0){
        		getAdministratorAccounts();
      		} else if(currentRole == 1){
        		getApproverAccounts();
      		} else if(currentRole == 2){
        		getPublisherAccounts();
      		}
      });
	}
    });
});

/*************************************
*Takes Id checks its roll
*depending on which roll it is
*it will delete it from the front end
*and disables the user on the DB
*************************************/
function cancelRoll(){
	$.post("../server/administrator-delete-account.php",
	{
		id:parseInt(accounts[indexUserId].id),
		userEmail:accounts[indexUserId].email,
		adminEmail:decrypt(sessionStorage.getItem('email'))
	}, function(data,status){
		if(status == "success"){
                        alert('Account has been succesfully deleted');
                } else{
                        alert('Error trying to delete the account');
                }
                $("#myModal").modal("hide");
                if(currentRole == 0){
                        getAdministratorAccounts();
                } else if(currentRole == 1){
                        getApproverAccounts();
                } else if(currentRole == 2){
                        getPublisherAccounts();
                } else{
			getUserAccounts();
		}
      	});
}

/*************************
*User Roll Getter
*Takes JSON from de DB
*And appends information 
* as an HTMLto the view
*************************/
function getUserAccounts(){
	$.get("../server/administrator-user-accounts.php", 
			function(data,status){
			accounts = JSON.parse(data);
                $("#user-accounts").empty();
                var account = "";
                for(var i = 0; i < accounts.length; i++){
						account += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<div class=\"row text-center\" style=\"display: flex;align-items: center;\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\" style=\"font-size: 40px;\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-9 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + decrypt(accounts[i].firstName) + " " + decrypt(accounts[i].lastName) + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;vertical-align: middle;\">" +
						"<p class=\text-center\"><b>Address: </b>" + decrypt(accounts[i].address1) + " " + decrypt(accounts[i].address2) + " " + decrypt(accounts[i].city) + " " + decrypt(accounts[i].state) + " " + decrypt(accounts[i].zip) +
                        "</p>" +
                        "<p class=\text-center\"><b>Work Phone: </b>" + decrypt(accounts[i].workPhone) +
                        "</p>" +
                        "<p class=\text-center\"><b>Mobile Phone: </b>" + decrypt(accounts[i].mobilePhone) +
                        "</p>" +
                        "<p class=\text-center\"><b>Company Name: </b>" + decrypt(accounts[i].company) +
                        "</p>" +
                        "<p class=\text-center\"><b>URL: </b>" + decrypt(accounts[i].url) +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</b></i></p></span>" +
			"</td>" +
                        "</tr>";
                }
                $("#user-accounts").append(account);
        });
}

/*************************
*Approver Roll Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*************************/
function getApproverAccounts(){
        $.get("../server/administrator-non-user-accounts.php",{id:2}, function(data,status){
                accounts = JSON.parse(data);
                $("#approver-accounts").empty();
                var account = "";
                for(var i = 0; i < accounts.length; i++){
			account += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<div class=\"row\"  style=\"display: flex;align-items: center;\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\" style=\"font-size: 40px;\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + decrypt(accounts[i].firstName) + " " + decrypt(accounts[i].lastName) + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;vertical-align: middle;\">" +
                        "<p class=\"text-center\"><b>Work Phone: </b>" + decrypt(accounts[i].workPhone) +
                        "</p>" +
                        "<p class=\"text-center\"><b>Mobile Phone: </b>" + decrypt(accounts[i].mobilePhone) +
                        "</p>" +
                        "<p class=\"text-center\"><b>Office Number: </b>" + decrypt(accounts[i].office) +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</b></i></p></span>" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#approver-accounts").append(account);
        });
}


/*************************
*Validates parameters that
*wil be edited with Regex
*for the current roll
*
* @returns {Boolean}
*************************/
function validateEdit(){
 var firstName = document.getElementById('firstNameEdit').value;
 var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var firstNameResult = firstNameRGEX.test(firstName);

 var lastName = document.getElementById('lastNameEdit').value;
 var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var lastNameResult = lastNameRGEX.test(lastName);

 var wPhone = document.getElementById('workPhoneEdit').value;
 var wPhoneRGEX = /^$|^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var wPhoneResult = wPhoneRGEX.test(wPhone);

 var mPhone = document.getElementById('mobilePhoneEdit').value;
 var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var mPhoneResult = mPhoneRGEX.test(mPhone);

 var office = document.getElementById('officeEdit').value;
 var officeRGEX = /^[a-zA-Z0-9._-]{1,6}$/
 var officeResult = officeRGEX.test(office);



errors = [];

    if(firstNameResult == false){
	errors.push('Please enter a valid First Name');
    }
    if(lastNameResult == false){
	errors.push('Please enter a valid Last Name');
    }
    if(wPhoneResult == false){
        errors.push('Please enter a valid Work phone');
    }
    if(mPhoneResult == false){
        errors.push('Please enter a valid Mobile phone');
    }
    if(officeResult == false){
	errors.push('Please enter a Office ');
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }




return true;

}



/*************************
*Validates parameters that
*wil be register with Regex
*for the current roll
*
* @returns {Boolean}
*************************/
function validate(){
 var firstName = document.getElementById('firstName').value;
 var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var firstNameResult = firstNameRGEX.test(firstName);

 var lastName = document.getElementById('lastName').value;
 var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var lastNameResult = lastNameRGEX.test(lastName);

 var email = document.getElementById('email').value;
 var emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var emailResult = emailRGEX.test(email);

 var password = document.getElementById('tempPass').value;

 var wPhone = document.getElementById('workPhone').value;
 var wPhoneRGEX = /^$|^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var wPhoneResult = wPhoneRGEX.test(wPhone);

 var mPhone = document.getElementById('mobilePhone').value;
 var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var mPhoneResult = mPhoneRGEX.test(mPhone);

 var office = document.getElementById('office').value;
 var officeRGEX = /^$|^[A-Z]{1,2}-[ ]?[0-9]\d{2}$/
 var officeResult = officeRGEX.test(office);



errors = [];

    if(firstNameResult == false){
	errors.push('Please enter a valid First Name');
    }
    if(lastNameResult == false){
	errors.push('Please enter a valid Last Name');
    }
    if(emailResult == false){
	errors.push('Please enter a valid Email');
    }
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
     if (password.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.")
    }
    if (password.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }
    if(mPhoneResult == false){
        errors.push('Please enter a valid phone number');
    }
    if(officeResult == false){
	errors.push('Please enter a Office ');
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }




return true;

}



/*************************
*Publisher Roll Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*************************/
function getPublisherAccounts(){
        $.get("../server/administrator-non-user-accounts.php",{id:3}, function(data,status){
                accounts = JSON.parse(data);
                $("#publisher-accounts").empty();
                var account = "";
                for(var i = 0; i < accounts.length; i++){
                        account += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<div class=\"row\" style=\"display: flex;align-items: center;\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\" style=\"font-size: 40px;\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + decrypt(accounts[i].firstName) + " " + decrypt(accounts[i].lastName) + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<p class=\"text-center\"><b>Work Phone: </b>" + decrypt(accounts[i].workPhone) +
                        "</p>" +
                        "<p class=\"text-center\"><b>Mobile Phone: </b>" +decrypt( accounts[i].mobilePhone) +
                        "</p>" +
                        "<p class=\"text-center\"><b>Office Number: </b>" + decrypt(accounts[i].office) +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</i></b></p></span>" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#publisher-accounts").append(account);
        });
}




/*************************
*Administrator Roll Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*************************/
function getAdministratorAccounts(){
        $.get("../server/administrator-non-user-accounts.php",{id:4}, function(data,status){
                accounts = JSON.parse(data);
                $("#administrator-accounts").empty();
                var account = "";
                for(var i = 0; i < accounts.length; i++){
                        account += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<div class=\"row\" style=\"display: flex;align-items: center;\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\" style=\"font-size: 40px;\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + decrypt(accounts[i].firstName) + " " + decrypt(accounts[i].lastName) + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<p class=\"text-center\"><b>Work Phone: </b>" + decrypt(accounts[i].workPhone) +
                        "</p>" +
                        "<p class=\"text-center\"><b>Mobile Phone: </b>" + decrypt(accounts[i].mobilePhone) +
                        "</p>" +
                        "<p class=\"text-center\"><b>Office Number: </b>" + decrypt(accounts[i].office) +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</i></b></p></span>" +
                                "<span id=\"" + i + "\" class=\"clickable glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#administrator-accounts").append(account);
        });
}

