// Change theme
const body = document.querySelector('body');
const changeThemeButton = document.getElementById('lamp');

function toggleTheme() {
    body.classList.toggle("dark");
    changeThemeButton.classList.toggle("dark");

    localStorage["bodyTheme"] = body.className;
    localStorage["buttonTheme"] = changeThemeButton.className; 
}

if (localStorage["bodyTheme"] == "dark") {
    toggleTheme();
} else {
    localStorage["bodyTheme"] = body.className;
    localStorage["buttonTheme"] = changeThemeButton.className;
}
changeThemeButton.onclick = function() {
    toggleTheme();
}