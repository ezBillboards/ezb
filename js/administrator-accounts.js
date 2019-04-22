var accounts;
var currentRole = 0;
var index;
var indexUserId;

$(document).ready(function(){
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
      console.log($(this).text());
      if($(this).text() == "Users"){
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

    $("#searchUsers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#user-accounts tr").filter(function() {
	        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
    });

    $("#searchApprovers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#approver-accounts tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#searchPublishers").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#publisher-accounts tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#searchAdministrators").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#administrator-accounts tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#add-account").click(function(){
	if(validate() == true){
	$.post("../server/administrator-add-account.php",
	{
		firstName: $("#firstName").val(),
		lastName: $("#lastName").val(),
		email: $("#email").val(),
		tempPass: $("#tempPass").val(),
		workPhone: $("#workPhone").val(),
		mobilePhone: $("#mobilePhone").val(),
		office: $("#office").val(),
		role: $("#role").val()	
	}, function(data,status){
		validate();
		console.log(data);	
      });
	 alert('Added the new ' + $("#role").val());
	location.reload();
      }
    });

    $("table").on("click", "tr .delete-account", function(){    	
	indexUserId = $(this).attr("id");
	console.log("Roll id = " + indexUserId);
	$("#myModal").modal("show");

    });

    $("table").on("click", "tr .edit-account", function(){
        index = $(this).attr("id");
	$("#firstNameEdit").val(accounts[index].firstName),
        $("#lastNameEdit").val(accounts[index].lastName),
        $("#workPhoneEdit").val(accounts[index].workPhone),
        $("#mobilePhoneEdit").val(accounts[index].mobilePhone),
        $("#officeEdit").val(accounts[index].office),
	$("#roleEdit").prop('selectedIndex', currentRole);
    });
   
    $("#update-account").click(function(){
    	$.post("../server/administrator-update-account.php",
        {
		id: parseInt(accounts[index].id),
                firstName: $("#firstNameEdit").val(),
                lastName: $("#lastNameEdit").val(),
                workPhone: $("#workPhoneEdit").val(),
                mobilePhone: $("#mobilePhoneEdit").val(),
                office: $("#officeEdit").val(),
                role: $("#roleEdit").val()
        }, function(data,status){
                console.log(data);
		location.reload();
      });
    });
});

function cancelRoll(){
        console.log(indexUserId);
              $.post("../server/administrator-delete-account.php",{id:parseInt(accounts[indexUserId].id)}, function(data,status){
              console.log(data);
              location.reload();
      });

}

  
function getUserAccounts(){
	$.get("../server/administrator-user-accounts.php", function(data,status){
		accounts = JSON.parse(data);
                console.log(accounts);
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
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;vertical-align: middle;\">" +
			"<p class=\text-center\"><b>Address: </b>" + accounts[i].address1 + " " + accounts[i].address2 + " " + accounts[i].city + " " + accounts[i].state + " " + accounts[i].zip +
                        "</p>" +
                        "<p class=\text-center\"><b>Work Phone: </b>" + accounts[i].workPhone +
                        "</p>" +
                        "<p class=\text-center\"><b>Mobile Phone: </b>" + accounts[i].mobilePhone +
                        "</p>" +
                        "<p class=\text-center\"><b>Company Name: </b>" + accounts[i].company +
                        "</p>" +
                        "<p class=\text-center\"><b>URL: </b>" + accounts[i].url +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</b></i></p></span>" +
			"</td>" +
                        "</tr>";
                }
                $("#user-accounts").append(account);
        });
}

function getApproverAccounts(){
        $.get("../server/administrator-non-user-accounts.php",{id:2}, function(data,status){
                accounts = JSON.parse(data);
                console.log(accounts);
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
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;vertical-align: middle;\">" +
                        "<p class=\"text-center\"><b>Work Phone: </b>" + accounts[i].workPhone +
                        "</p>" +
                        "<p class=\"text-center\"><b>Mobile Phone: </b>" + accounts[i].mobilePhone +
                        "</p>" +
                        "<p class=\"text-center\"><b>Office Number: </b>" + accounts[i].office +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</b></i></p></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#approver-accounts").append(account);
        });
}




function validate(){
 var firstName = document.getElementById('firstName').value;
 var firstNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var firstNameResult = firstNameRGEX.test(firstName);

 var lastName = document.getElementById('lastName').value;
 var lastNameRGEX = /^[a-zA-Z ]{2,30}$/;
 var lastNameResult = lastNameRGEX.test(lastName);

 var email = document.getElementById('email').value;
 var emailRGEX = /^(.+)@(.+)$/;
 var emailResult = emailRGEX.test(email);

 var password = document.getElementById('tempPass').value;

 var wPhone = document.getElementById('workPhone').value;
 var wPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var wPhoneResult = wPhoneRGEX.test(wPhone);

 var mPhone = document.getElementById('mobilePhone').value;
 var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 var mPhoneResult = mPhoneRGEX.test(mPhone);

 var office = document.getElementById('office').value;
 var officeRGEX = /^$|^[a-zA-Z0-9._-]{1,6}$/
 var officeResult = officeRGEX.test(office);


console.log('First Name = '+ firstName);

console.log('Last Name = '+ lastName);

console.log('Email = '+ email);

console.log('Phone Number = '+ wPhone);

console.log('Mobile Number = '+ mPhone);

console.log('Temp Password = '+ password);

console.log('Office = '+office);

    if(firstNameResult == false){
	alert('Please enter a valid First Name');
	return false;
    }



    if(lastNameResult == false){
	alert('Please enter a valid Last Name');
	return false;
    }


    if(emailResult == false){
	alert('Please enter a valid Email');
	return false;
    }

 errors = [];
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
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    if(mPhoneResult == false){
        alert('Please enter a valid phone number');
        return false;
    }


    if(officeResult == false){
	  alert('Please enter a Office ');
	  return false;
    }




return true;

}


function getPublisherAccounts(){
        $.get("../server/administrator-non-user-accounts.php",{id:3}, function(data,status){
                accounts = JSON.parse(data);
                console.log(accounts);
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
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<p class=\"text-center\"><b>Work Phone: </b>" + accounts[i].workPhone +
                        "</p>" +
                        "<p class=\"text-center\"><b>Mobile Phone: </b>" + accounts[i].mobilePhone +
                        "</p>" +
                        "<p class=\"text-center\"><b>Office Number: </b>" + accounts[i].office +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</i></b></p></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#publisher-accounts").append(account);
        });
}




function getAdministratorAccounts(){
        $.get("../server/administrator-non-user-accounts.php",{id:4}, function(data,status){
                accounts = JSON.parse(data);
                console.log(accounts);
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
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5 style=\"color:gray;\"><i>" + accounts[i].email + "</i></h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                        "<p class=\"text-center\"><b>Work Phone: </b>" + accounts[i].workPhone +
                        "</p>" +
                        "<p class=\"text-center\"><b>Mobile Phone: </b>" + accounts[i].mobilePhone +
                        "</p>" +
                        "<p class=\"text-center\"><b>Office Number: </b>" + accounts[i].office +
                        "</p>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</i></b></p></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#administrator-accounts").append(account);
        });
}

