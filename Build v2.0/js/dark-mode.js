const theme = document.querySelector("#theme-link");
var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

function toggleDarkMode() {
    console.log('is it dark mode?', isDarkMode);
    if (isDarkMode) {
        // Switch to light mode
        isDarkMode = !isDarkMode;
        theme.href = "";
    } else {
        // Switch to dark mode
        isDarkMode = !isDarkMode;
        theme.href = "css/dark-style.css";
    }
}
