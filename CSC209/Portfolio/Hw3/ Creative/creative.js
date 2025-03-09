const ul = document.querySelector("ul");
const div = document.getElementById("div");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.onclick = function(){
    const currentValue = input.value;
    input.value = '';

    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const deleteButton = document.createElement("button");

    button.classList = "delete-item"

    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(deleteButton)
    ul.appendChild(li);
    div.appendChild(ul);

    span.textContent = currentValue;
    button.textContent = "Done";
    div.style.textAlign = "center";
    deleteButton.classList = "delete-button";
    deleteButton.textContent = "Delete";
    

    button.addEventListener('click', function(){

        if (button.style.background == 'green') {
            button.style.background = 'red';
            button.style.border = "1px solid red";
            span.style.textDecoration = "line-through";
            button.textContent = "Undo";

        } else {
            button.style.background = 'green';
            button.style.border = "1px solid green";
            span.style.textDecoration = "none";
            button.textContent = "Done"
        }
    })

    deleteButton.addEventListener('click', function(){
        ul.removeChild(li);
    })
}
