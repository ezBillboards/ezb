/*Administrator billboards JavaScript*/

$(document).ready(function(){
	
	$("#upload-image").bind('change', function() {
	fd = new FormData();
        files = this.files[0];
        fd.append('upload-image',files);
	var fr = new FileReader;
    	fr.readAsDataURL(this.files[0]);
    	fr.onload = function() {
        	img = new Image;
               	img.src = fr.result;
        	img.onload = function() {
        	};
		};    
	});
  
	$('#btnaddpackage').click(function(){
		console.log('btnaddpackage clicked!');
		var newPackage = "<tr>" +
		"<td>1 Day</td>" +
		"<td>Every 4 min.</td>" +
		"<td>$15.45</td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href="#"><span class=\"glyphicon glyphicon-pencil\"><br></span></a></div>" +
		"<div class=\"col-lg-6\";">" +
		"<a href="#"><span class=\"glyphicon glyphicon-trash\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-package").append(newPackage);
	});
	
});