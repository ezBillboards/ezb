getBackups();

$(document).ready(function(){
/**************
*Get EZB logos
***************/
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

/**************************************************
*Validates the zipfile name
*Post the information to the DB
*and show that the new back up file has been added
***************************************************/
	$("#backup").click(function(){
		if(validate()==true){
		$.post("../server/administrator-backups.php",
		{filename:$("#filename").val(),
			email: decrypt(sessionStorage.getItem('email'))},
			function(data,status){
				getBackups();
				$("#filename").val("");
				alert("Added new backup file");
			   
        	});	    
	     }
	});

/**************************************************
*Restores information on the DB and images
***************************************************/
	$("#restore").click(function(){
		    $.post("../server/administrator-restore.php",
			{filename:files[$("#backup-files").prop("selectedIndex")],
			email: decrypt(sessionStorage.getItem('email'))},
			function(data, status){
			alert("Restore backup file");
                });
        });


});

/************************
*Backup Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
************************/
function getBackups(){
	$.get("../server/administrator-backup-files.php",function(data,status){
		files = JSON.parse(data);
		var options = "";
		$("#backup-files").empty();
		for (var i = 0; i < files.length; i++) {
			options += "<option>" + files[i] + "</option>";
		}
		$("#backup-files").append(options);
	});
};


/*************************
*Validates parameters that
*wil be entered with Regex
*for the backup
*
* @return {Boolean}
*************************/
function validate(){
 var fileName = document.getElementById('filename').value;
 var fileNameRGEX = /\W*(.zip)\W*/;
 var fileNameResult = fileNameRGEX.test(fileName);


if(fileNameResult == false)
{
alert('Please enter a valid File name for the back up ending with .zip');
return false;
}
return true;

}





