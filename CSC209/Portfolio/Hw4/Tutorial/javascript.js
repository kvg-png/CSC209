const checkbox = document.getElementById("click-me");
const div = document.getElementById("picture");
const helloWorld = document.getElementById("hello-world");
const options = document.getElementById("options");
const radioButtons = document.querySelectorAll('input[name="style"]');


var img = document.createElement("img");
img.setAttribute("src", "img1.jpg");
img.width = "200";
div.appendChild(img);

checkbox.addEventListener("click", function(){
    if (checkbox.checked){
        console.log(checkbox.checked)
        img.style.display = "block";
    }
    if (!checkbox.checked){
        console.log(checkbox.checked)
        img.style.display = "none";
    }
}); 

for(const radioButton of radioButtons){
    radioButton.addEventListener('click', showSelected);

    function showSelected(e){
        if (radioButton.value == "red-background"){
            helloWorld.style.background = "red";
            helloWorld.style.borderStyle = "none";
            helloWorld.style.color = "black";
        }
        if (radioButton.value == "blue-text"){
            helloWorld.style.color = "blue";
            helloWorld.style.background = "white";
            helloWorld.style.borderStyle = "none";
        }
        if (radioButton.value == "border"){
            helloWorld.style.borderStyle = "dotted";
            helloWorld.style.background = "white";
            helloWorld.style.color = "black";
        }
    }
}        
