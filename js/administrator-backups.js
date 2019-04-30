getBackups();

$(document).ready(function(){
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

	$("#backup").click(function(){
		if(validate()==true){
		$.post("../server/administrator-backups.php",{filename:$("#filename").val()}, function(data,status){
	                console.log(data);
			getBackups();
			alert("Added new backup file");
			   
        	});	    
	     }
	});
	$("#restore").click(function(){
		    $.post("../server/administrator-restore.php",
			{filename:files[$("#backup-files").prop("selectedIndex")]},
			function(data, status){
                        console.log(data);
                });
        });


});

function getBackups(){
	$.get("../server/administrator-backup-files.php",function(data,status){
		console.log(data);
		files = JSON.parse(data);
		var options = "";
		$("#backup-files").empty();
		for (var i = 0; i < files.length; i++) {
			options += "<option>" + files[i] + "</option>";
		}
		$("#backup-files").append(options);
	});
};


function validate(){
 var fileName = document.getElementById('filename').value;
 var fileNameRGEX = /\W*(.zip)\W*/;
 var fileNameResult = fileNameRGEX.test(fileName);

 console.log('Back up File Name = '+ fileName);

if(fileNameResult == false)
{
alert('Please enter a valid File name for the back up ending with .zip');
return false;
}
return true;

}





