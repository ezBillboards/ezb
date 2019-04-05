/*Administrator billboards JavaScript*/

$(document).ready(function(){
	$('#btnaddpackage').click(function(){
		var newPackage = "<tr>" +
		"<td>1 Day</td>" +
		"<td>Every 4 min.</td>" +
		"<td>$15.45</td>" +
		"<td>" +
		"<div class="column">" +
		"<div class="row">" +
		"<div class="col-lg-6">" +
		"<a href="#"><span class="glyphicon glyphicon-pencil"><br></span></a></div>" +
		"<div class="col-lg-6";">" +
		"<a href="#"><span class="glyphicon glyphicon-trash"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-package").append(newPackage);
	});
});