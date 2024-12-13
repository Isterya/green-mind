const feedbackSlider = document.querySelector('.feedback-slider');
const slides = document.querySelectorAll('.feedback-slide');
const controls = document.querySelectorAll('.feedback-header__controls > div');

let currentSlide = 0;

// Initialize the slider
function initializeSlider() {
  updateSliderPosition();
  updateControls();

  // Add click events to controls
  controls.forEach((control, index) => {
    control.addEventListener('click', () => {
      currentSlide = index;
      updateSliderPosition();
      updateControls();
      resetAutoSlide(); // Reset auto-slide timer
    });
  });
}

// Update slider position
function updateSliderPosition() {
  const slideWidth = slides[0].offsetWidth + 48; // 48px - gap
  feedbackSlider.style.transition = 'transform 0.5s ease';
  feedbackSlider.style.transform = `translateX(-${
    currentSlide * slideWidth
  }px)`;
}

// Update controls animation
function updateControls() {
  controls.forEach((control, index) => {
    control.style.width = index === currentSlide ? '48px' : '12px';
    control.style.transition = 'width 0.3s ease';
  });
}

// Move to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSliderPosition();
  updateControls();
}

// Move to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSliderPosition();
  updateControls();
}

// Auto-slide functionality
let autoSlide = setInterval(nextSlide, 5000);

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

// Pause auto-slide on hover
feedbackSlider.addEventListener('mouseover', () => clearInterval(autoSlide));
feedbackSlider.addEventListener('mouseout', resetAutoSlide);

// Initialize
initializeSlider();
