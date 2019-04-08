var files;

getBackups();

$(document).ready(function(){
	$("#backup").click(function(){
		$.post("../server/administrator-backups.php",{filename:$("#filename").val()}, function(data,status){
	                console.log(data);
			getBackups();
        	});
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
}


