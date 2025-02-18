let button = document.getElementById("read-me");
let switchMode = document.getElementById("switch-mode");

button.addEventListener('click', function(){
    const description = document.getElementById("read-me-description");


    if (description.style.display === "none") {
        description.style.display = "block";
        button.innerText = "Hide"

      } else {
        description.style.display = "none";
        button.innerText = "Read me"

      }
});

switchMode.addEventListener('click', function(){
    let theme = document.getElementById('theme');

    if (theme.getAttribute('href') == 'light.css') {
        theme.setAttribute('href', 'dark.css');

    } else {
        theme.setAttribute('href', 'light.css');
    }
});