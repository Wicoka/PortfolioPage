$(document).ready(function() {
	var header_offset = 75;

	$("header a").click(function() {
		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top - header_offset
		}, 1000);
	});

});