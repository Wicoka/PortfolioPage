$(document).ready(function () {
	$(".navbar .navbar-nav .nav-item a").click(function () {
		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top
		}, 1);
	});
	var moonElement = document.getElementById("moon");
	var sunElement = document.getElementById("sun");
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		sunElement.style.display = "flex";
		moonElement.style.display = "none";
	} else {
		sunElement.style.display = "none";
		moonElement.style.display = "flex";
	}

});


var isDarkMode;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	this.isDarkMode = true;
} else {
	this.isDarkMode = false;
}

function toggleDarkMode() {
	isDarkMode = !isDarkMode;
	var moonElement = document.getElementById("moon");
	var sunElement = document.getElementById("sun");
	if (isDarkMode) {
		sunElement.style.display = "flex";
		moonElement.style.display = "none";
	} else {
		sunElement.style.display = "none";
		moonElement.style.display = "flex";
	}
	var element = document.body;
	element.classList.toggle("dark-mode");
}
