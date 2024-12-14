document.addEventListener('DOMContentLoaded', () => {
  const feedbackSlider = document.querySelector('.feedback-slider');
  const slides = document.querySelectorAll('.feedback-slide');
  const controls = document.querySelectorAll(
    '.feedback-header__controls > div'
  );

  let currentSlide = 0;

  function initializeSlider() {
    updateSliderPosition();
    updateControls();

    controls.forEach((control, index) => {
      control.addEventListener('click', () => {
        currentSlide = index;
        updateSliderPosition();
        updateControls();
        resetAutoSlide();
      });
    });
  }

  function updateSliderPosition() {
    const slideWidth = slides[0].offsetWidth + 48;
    feedbackSlider.style.transition = 'transform 0.5s ease';
    feedbackSlider.style.transform = `translateX(-${
      currentSlide * slideWidth
    }px)`;
  }

  function updateControls() {
    controls.forEach((control, index) => {
      control.style.width = index === currentSlide ? '48px' : '12px';
      control.style.transition = 'width 0.3s ease';
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSliderPosition();
    updateControls();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSliderPosition();
    updateControls();
  }

  let autoSlide = setInterval(nextSlide, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }

  feedbackSlider.addEventListener('mouseover', () => clearInterval(autoSlide));
  feedbackSlider.addEventListener('mouseout', resetAutoSlide);

  initializeSlider();
});
