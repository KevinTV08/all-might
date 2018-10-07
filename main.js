// NAVIGATION

const $toggleButton = $('.toggle-button');
$toggleButton.on('click', e => {
  $('.mobile-nav').toggle('show');
});

const $shopBtn = $('.shop-btn');
$shopBtn.on('click', e => {
  $('.submenu').toggle('show');
});

// SLIDESHOW
('use strict');

let SLIDEINDEX = 0;

showSlides(SLIDEINDEX);

function showSlides(index) {
  // get slides html and dots
  let slides = document.querySelectorAll('.slide'),
    dots = document.querySelectorAll('.dot-navigation');

  // check if index is out of bounds
  if (index >= slides.length) SLIDEINDEX = 0;
  if (index < 0) SLIDEINDEX = slides.length - 1;

  // to hide all the sliders and remove the active-dot class
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    dots[i].classList.remove('active-dot');
  }

  // to show slide & set the dot as active
  slides[SLIDEINDEX].style.display = 'block';
  dots[SLIDEINDEX].classList.add('active-dot');
}

// addEventListener on prev arrow
document.querySelector('#arrow-prev').addEventListener('click', function() {
  showSlides(--SLIDEINDEX);
});

// addEventListener on next arrow
document.querySelector('#arrow-next').addEventListener('click', function() {
  showSlides(++SLIDEINDEX);
});

// addEventListener on dots
document.querySelectorAll('.dot-navigation').forEach(function(elem) {
  elem.addEventListener('click', function() {
    // get index of the dot
    let nodes = Array.prototype.slice.call(this.parentElement.children),
      dotIndex = nodes.indexOf(elem);

    // call the function for the index of clicked dot
    showSlides((SLIDEINDEX = dotIndex));
  });
});

// set slideshow to running automatically
setInterval(function() {
  showSlides(++SLIDEINDEX);
}, 10000);

// Typewriter

// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Checking if deleting
    if (this.isDeleting) {
      // Remove a char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
