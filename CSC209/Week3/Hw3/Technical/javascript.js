let slidesDiv = document.getElementById("slideshow-container")
let slideLength = 3

function newSlide(){
    for (let i=0; i < 3; i++){

        let mySlides = document.createElement("div");
        mySlides.classList.add("mySlides", "fade");

        let numberText = document.createElement("div");
        numberText.classList.add("numbertext")
        numberText.innerHTML = `${i+1}/3`

        let img = document.createElement("img");
        img.src = `img${i+1}.jpg`;
        img.style = "width:100%";

        let text = document.createElement("div");
        text.classList.add("text");
        text.innerHTML = `Image number ${i+1}`;

        mySlides.appendChild(numberText);
        mySlides.appendChild(img);
        mySlides.appendChild(text);

        slidesDiv.append(mySlides);
    }
}

newSlide();

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 
