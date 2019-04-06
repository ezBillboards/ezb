/*Administrator billboards JavaScript*/

$(document).ready(function(){
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
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
		"<a href=\"#\"><span class=\"glyphicon glyphicon-pencil\"><br></span></a></div>" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-package").append(newPackage);
	});
});
  
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$('#profile-img-tag').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}
$("#profile-img").change(function(){
	readURL(this);
});


(function ($) {
$('.spinner .btn:first-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
});
$('.spinner .btn:last-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
});
})(jQuery);
  
  
  
