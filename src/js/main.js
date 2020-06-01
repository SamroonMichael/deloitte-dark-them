/* 
----
Carousel starts here
----
*/

// Select all elements for carousel
let carouselImages = document.querySelectorAll('.slide'),
  arrowLeft = document.querySelector('.prevBnt'),
  arrowRight = document.querySelector('.nextBtn'),
  slider = document.querySelector('.slider'),
  current = 0;

// Clear all images when doc loads
function reset() {
  // Loop over all images to hide on doc load
  for (let i = 0; i < carouselImages.length; i++) {
    carouselImages[i].style.display = 'none';
  }
}

// Init slider
function startSlide() {
  // Rest all images
  reset();
  // Display 1st available image in carousel
  carouselImages[0].style.display = 'block';
}

// Show prev
function slideLeft() {
  reset();
  // Hide previous image at current display
  carouselImages[current - 1].style.display = 'block';
  current--;
}

// Show next
function slideRight() {
  reset();
  // Show next image at current display
  carouselImages[current + 1].style.display = 'block';
  current++;
}

// On click left, move the slide to left
arrowLeft.addEventListener('click', function () {
  if (current === 0) {
    current = carouselImages.length;
  }
  slideLeft();
});

// On click right, move the slide to right
arrowRight.addEventListener('click', function () {
  if (current === carouselImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

/*
----
Modal starts here
----
*/

// Destructuring all modal button and storing in a variable
const modalBtns = [...document.querySelectorAll('.modal-button')];

// Looping over modal button and add onClick event
modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    // Get current modal data and store in variable
    const modal = btn.getAttribute('data-modal');
    // Display the current modal data
    document.getElementById(modal).style.display = 'block';
  };
});

// Destructuring all modal close button and store in variable
const closeBtns = [...document.querySelectorAll('.closeBtn')];

// Looping over modal close button and add onClick event
closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    const modal = btn.closest('.modal');
    modal.style.display = 'none';
  };
});

// Close modal when clicked outside anywhere at window object
window.onclick = function (event) {
  if (event.target.className === 'modal') {
    event.target.style.display = 'none';
  }
};
