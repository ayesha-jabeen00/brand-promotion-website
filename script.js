const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

// Toggle navbar on/off when hamburger or cross icon is clicked
if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      // Toggle navbar visibility
      navbar.classList.toggle('active');
      
      // Toggle between hamburger and close icon
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
// Carousel functionality
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const slides = carousel.querySelectorAll('img');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Update carousel position and dot state
function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Auto slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 4000);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Swipe support
let startX = 0;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) moveSlide(1); // swipe left
  else if (diff < -50) moveSlide(-1); // swipe right
});

function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = totalSlides - 1;
  if (currentIndex >= totalSlides) currentIndex = 0;

  updateCarousel();
}

// Initialize
updateCarousel();


const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => {
  observer.observe(card);
});
  

// review
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    selectedRating = index + 1;
    updateStars();
  });

  star.addEventListener('mouseover', () => {
    highlightStars(index);
  });

  star.addEventListener('mouseout', () => {
    updateStars();
  });
});

function updateStars() {
  stars.forEach((star, idx) => {
    star.classList.toggle('selected', idx < selectedRating);
  });
}

function highlightStars(index) {
  stars.forEach((star, idx) => {
    star.classList.toggle('hover', idx <= index);
  });
}

document.getElementById('submitBtn').addEventListener('click', () => {
  if (selectedRating > 0) {
    document.querySelector('.thank-you').style.display = 'block';
  }
});


