var accounts;
var currentRole = 0;
var index;

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
    });

    $("table").on("click", "tr .delete-account", function(){    	
	var index = $(this).attr("id");
	$.post("../server/administrator-delete-account.php",{id:parseInt(accounts[index].id)}, function(data,status){
		console.log(data);
		location.reload();
	});
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
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;\"></span>" +
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
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;\"></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;\"></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#approver-accounts").append(account);
        });
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
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;\"></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;\"></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#publisher-accounts").append(account);
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
  var wPhoneNumber = document.getElementById('workPhone').value;  
  var wPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var wPhoneResult = wPhoneRGEX.test(wPhoneNumber);
  var mPhoneNumber = document.getElementById('mobilePhone').value; 
  var mPhoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var mPhoneResult = mPhoneRGEX.test(mPhoneNumber);
  var office = document.getElementById('office').value;
  var officeRGEX = /[\d -]+/;
  var officeResult = officeRGEX.test(office);

console.log('First Name = '+ firstName);
console.log('Last Name = '+ lastName);
console.log('Email = '+ email);
console.log('Mobile Phone = '+ mPhoneNumber);
console.log('Work Phone = '+ wPhoneNumber);
console.log('Office Number = '+ office);



if(firstNameResult == false)
{
alert('Please enter a valid First Name');
return false;
}

if(lastNameResult == false)
{
alert('Please enter a valid Second Name');
return false;
}


if(emailResult == false)
{
alert('Please enter a valid Email');
return false;
}


if(wPhoneResult == false)
{
alert('Please enter a valid work number');
return false;
}


if(mPhoneResult == false)
{
alert('Please enter a valid phone number');
return false;
}

if(officeResult == false)
{
alert('Please enter a valid office');
return false;
}



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
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;\"></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\" style=\"font-size: 35px;padding-left:5%;\"></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#administrator-accounts").append(account);
        });
}

