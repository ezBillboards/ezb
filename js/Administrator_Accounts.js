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
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5>" + accounts[i].email + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Work Phone: " + accounts[i].workPhone +
                        "</div>" +
                        "<div>Mobile Phone: " + accounts[i].mobilePhone +
                        "</div>" +
                        "<div>Company Name: " + accounts[i].company +
                        "</div>" +
                        "<div>Address: " + accounts[i].address1 + " " + accounts[i].address2 + " " + accounts[i].city + " " + accounts[i].state + " " + accounts[i].zip +
                        "</div>" +
                        "<div>URL: " + accounts[i].url +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\"></span>" +
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
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5>" + accounts[i].email + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Work Phone: " + accounts[i].workPhone +
                        "</div>" +
                        "<div>Mobile Phone: " + accounts[i].mobilePhone +
                        "</div>" +
                        "<div>Office Number: " + accounts[i].office +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\"></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\"></span>" +
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
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5>" + accounts[i].email + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Work Phone: " + accounts[i].workPhone +
                        "</div>" +
                        "<div>Mobile Phone: " + accounts[i].mobilePhone +
                        "</div>" +
                        "<div>Office Number: " + accounts[i].office +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\"></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\"></span>" +
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
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<span class=\"glyphicon glyphicon-user\"></span>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + accounts[i].firstName + " " + accounts[i].lastName + "</h4><h5>" + accounts[i].email + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Work Phone: " + accounts[i].workPhone +
                        "</div>" +
                        "<div>Mobile Phone: " + accounts[i].mobilePhone +
                        "</div>" +
                        "<div>Office Number: " + accounts[i].office +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-pencil edit-account\" data-toggle=\"modal\" data-target=\"#EditModal\"></span>" +
                                "<span id=\"" + i + "\" class=\"glyphicon glyphicon-trash delete-account\"></span>" +
                        "</td>" +
                        "</tr>";

                }
                $("#administrator-accounts").append(account);
        });
}

