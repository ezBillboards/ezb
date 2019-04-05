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
  
  // Add the following code if you want the name of the file appear on select
  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });
  
  (function ($) {
    $('.spinner .btn:first-of-type').on('click', function() {
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function() {
      $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
    });
  })(jQuery);
  
  
  
