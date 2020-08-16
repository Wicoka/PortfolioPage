$(document).ready(function() {
	$(".navbar .navbar-nav .nav-item a").click(function() {
		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top
		}, 1);
	});
});


var isDarkMode;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
	this.isDarkMode = true;
} else {
	this.isDarkMode = false;
}

function toggleDarkMode() {
	isDarkMode = !isDarkMode;
	var element = document.body;
	element.classList.toggle("dark-mode");
}