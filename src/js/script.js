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

// likes

const likeButtons = document.querySelectorAll('.like');

function saveLikesToLocalStorage(productId, isLiked) {
  const likedItems = JSON.parse(localStorage.getItem('likedItems')) || {};
  likedItems[productId] = isLiked;
  localStorage.setItem('likedItems', JSON.stringify(likedItems));
}

function restoreLikesFromLocalStorage() {
  const likedItems = JSON.parse(localStorage.getItem('likedItems')) || {};
  likeButtons.forEach((button) => {
    const productId = button.getAttribute('data-id');
    if (likedItems[productId]) {
      button.classList.add('active');
    }
  });
}

restoreLikesFromLocalStorage();

likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');

    const productId = button.getAttribute('data-id');
    const isLiked = button.classList.contains('active');

    saveLikesToLocalStorage(productId, isLiked);

    if (isLiked) {
      console.log(`Product ${productId} added to favorites`);
    } else {
      console.log(`Product ${productId} removed from favorites`);
    }
  });
});

// Search Panel

const products = [
  {
    id: 1,
    name: 'Crimson Bloom',
    price: '$10.00',
    img: './img/products/products-1.jpg',
  },
  {
    id: 2,
    name: 'Springlight',
    price: '$16.00',
    img: './img/products/products-2.jpg',
  },
  {
    id: 3,
    name: 'Verdant Charm',
    price: '$14.00',
    img: './img/products/products-3.jpg',
  },
  {
    id: 4,
    name: 'Cactus Sentinel',
    price: '$16.00',
    img: './img/products/products-4.jpg',
  },
  {
    id: 5,
    name: 'Ethereal Wave',
    price: '$12.00',
    img: './img/products/products-5.jpg',
  },
  {
    id: 6,
    name: 'Desert Sunset',
    price: '$10.00',
    img: './img/products/products-6.jpg',
  },
  {
    id: 7,
    name: "Nature's Embrace",
    price: '$14.00',
    img: './img/products/products-7.jpg',
  },
  {
    id: 8,
    name: 'Emerald Grace',
    price: '$16.00',
    img: './img/products/products-8.jpg',
  },
];

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = '';

  if (query) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
          <img src="${product.img}" alt="${product.name}" />
          <div class="result-info">
            <div class="result-name">${product.name}</div>
            <div class="result-price">${product.price}</div>
          </div>
        `;
        searchResults.appendChild(resultItem);
      });
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'none';
    }
  } else {
    searchResults.style.display = 'none';
  }
});

document.addEventListener('click', (event) => {
  if (
    !searchResults.contains(event.target) &&
    !searchInput.contains(event.target)
  ) {
    searchResults.style.display = 'none';
  }
});
