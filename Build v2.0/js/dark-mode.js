const theme = document.querySelector("#theme-link");
var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

function initDarkMode() {
    if (isDarkMode) {
        // Switch to light mode
        document.getElementById("dark-mode-checkbox").checked = isDarkMode;
        theme.href = "css/dark-style.css";
    } else {
        // Switch to dark mode
        document.getElementById("dark-mode-checkbox").checked = isDarkMode;
        theme.href = "";
    }
}

function toggleDarkMode() {
    if (isDarkMode) {
        // Switch to light mode
        isDarkMode = !isDarkMode;
        document.getElementById("dark-mode-checkbox").checked = isDarkMode;
        theme.href = "";
    } else {
        // Switch to dark mode
        isDarkMode = !isDarkMode;
        document.getElementById("dark-mode-checkbox").checked = isDarkMode;
        theme.href = "css/dark-style.css";
    }
}

initDarkMode();