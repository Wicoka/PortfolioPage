$(document).ready(function() {
	var header_offset = 75;

	$("header a").click(function() {
		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top - header_offset
		}, 1000);
	});

});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
	var isDarkMode = true;
}

function toggleDarkMode() {
	isDarkMode = !isDarkMode;
	var element = document.body;
	element.classList.toggle("dark-mode");
}