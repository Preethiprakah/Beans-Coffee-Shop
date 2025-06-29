//imp! NAVBAR SCROLLING COLOR

window.onscroll = () => {
    if(scrollY > 233){
        document.querySelector('.header-section').style.backgroundColor = '#1b1514e7';
    }
    else if (scrollY === 0){
        document.querySelector('.header-section').style.backgroundColor = 'transparent';
    }
}

// COUNTER UP JAVASCRIPT with Intersection Observer
let valueDisplays = document.querySelectorAll(".section-5__counter-number");
let interval = 2000; // total animation time in ms

function animateCounter(valueDisplay) {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.max(Math.floor(interval / endValue), 10); // minimum 10ms per increment

  // Prevent running twice
  if (valueDisplay.dataset.animated === "true") return;
  valueDisplay.dataset.animated = "true";

  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.innerHTML = `${startValue}<span class="plus-symbol">+</span>`;
    if (startValue >= endValue) {
      clearInterval(counter);
      valueDisplay.innerHTML = `${endValue}<span class="plus-symbol">+</span>`;
    }
  }, duration);
}

// Use Intersection Observer to trigger animation when visible
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCounter(entry.target);
      observer.unobserve(entry.target); // run only once
    }
  });
}, { threshold: 0.5 });

valueDisplays.forEach((el) => {
  observer.observe(el);
});

// Section-4 image click blink effect
document.querySelectorAll('.section-4__img-div img').forEach(img => {
  img.addEventListener('click', function() {
    img.classList.remove('blink'); // reset if already blinking
    void img.offsetWidth; // force reflow for restart animation
    img.classList.add('blink');
  });
});

// Section-3 image click blink effect
// Ensure this runs after DOM is loaded

document.addEventListener('DOMContentLoaded', function() {
  // Section-3 image blink
  document.querySelectorAll('.section-3__coffee-img').forEach(img => {
    img.addEventListener('click', function() {
      img.classList.remove('blink');
      void img.offsetWidth;
      img.classList.add('blink');
    });
  });
  // Section-3 card blink/color effect
  document.querySelectorAll('.section-3__card').forEach(card => {
    card.addEventListener('click', function() {
      card.classList.remove('blink');
      void card.offsetWidth;
      card.classList.add('blink');
    });
  });
  // BUY NOW button blink/color effect
  var buyNowBtn = document.querySelector('.section-1__button-white');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      buyNowBtn.classList.remove('blink');
      void buyNowBtn.offsetWidth;
      buyNowBtn.classList.add('blink');
    });
  }

  // Booking form simple submit handler
  const bookForm = document.querySelector('.section-book__form');
  if(bookForm) {
    bookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for booking! We look forward to seeing you.');
      bookForm.reset();
    });
  }

  // Prevent past dates in booking form date input
  var dateInput = document.querySelector('.section-book__form input[type="date"]');
  if (dateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var minDate = yyyy + '-' + mm + '-' + dd;
    dateInput.setAttribute('min', minDate);
  }

  // === Testimonial Carousel Logic ===
  const testimonials = document.querySelectorAll('.section-5__testimonial');
  const leftArrow = document.querySelector('.section-5__arrow--left');
  const rightArrow = document.querySelector('.section-5__arrow--right');
  const carousel = document.querySelector('.section-5__testimonial-carousel');
  let currentIndex = 0;
  let autoSlideInterval = null;
  let isInView = false;
  let lastDirection = null;

  function updateReviewCount() {
    const countDiv = document.querySelector('.section-5__review-count');
    if (countDiv) {
      countDiv.textContent = `${currentIndex + 1} / ${testimonials.length}`;
    }
  }

  function showTestimonial(index, direction) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.remove('slide-left', 'slide-right', 'active');
      if (i === currentIndex) {
        testimonial.classList.add('active');
        if (direction === 'left') {
          testimonial.classList.add('slide-left');
          setTimeout(() => testimonial.classList.remove('slide-left'), 10);
        } else if (direction === 'right') {
          testimonial.classList.add('slide-right');
          setTimeout(() => testimonial.classList.remove('slide-right'), 10);
        }
      }
    });
    updateReviewCount();
  }

  function nextTestimonial() {
    let prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex, 'right');
  }

  function prevTestimonial() {
    let prevIndex = currentIndex;
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex, 'left');
  }

  function startAutoSlide() {
    if (!autoSlideInterval) {
      autoSlideInterval = setInterval(nextTestimonial, 3500);
    }
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }

  // Intersection Observer to start auto-slide when section is in view
  const section5 = document.getElementById('section-5');
  if (section5) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isInView = true;
          startAutoSlide();
        } else {
          isInView = false;
          stopAutoSlide();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(section5);
  }

  showTestimonial(currentIndex);
  updateReviewCount();

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      prevTestimonial();
      if (isInView) {
        stopAutoSlide();
        startAutoSlide();
      }
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      nextTestimonial();
      if (isInView) {
        stopAutoSlide();
        startAutoSlide();
      }
    });
  }

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', () => { if (isInView) startAutoSlide(); });
  }

  // Section 6 blog animation on scroll (slide in from left/right, stay visible after animating)
  const blogsLeft = document.querySelectorAll('.animate-left');
  const blogsRight = document.querySelectorAll('.animate-right');
  const blogObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Trigger blink effect automatically on scroll-in
        // If the blog card itself
        if (entry.target.classList.contains('section-6__blog')) {
          entry.target.classList.remove('blink');
          void entry.target.offsetWidth;
          entry.target.classList.add('blink');
        }
        // If the image inside the blog card
        const blogImg = entry.target.querySelector('img');
        if (blogImg) {
          blogImg.classList.remove('blink');
          void blogImg.offsetWidth;
          blogImg.classList.add('blink');
        }
        blogObserver.unobserve(entry.target); // Animate only once, then stay visible
      }
    });
  }, { threshold: 0.3 });
  blogsLeft.forEach(el => blogObserver.observe(el));
  blogsRight.forEach(el => blogObserver.observe(el));

  // Section-6 image blink effect on hover and click
  document.querySelectorAll('.section-6__blog img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      img.classList.remove('blink');
      void img.offsetWidth;
      img.classList.add('blink');
    });
    img.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default if image is inside a link
      img.classList.remove('blink');
      void img.offsetWidth;
      img.classList.add('blink');
    });
  });

  // Section 3 coffee cup images scroll-in effect
  const section3 = document.getElementById('section-3');
  if (section3) {
    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          section3.classList.add('in-view');
        } else {
          section3.classList.remove('in-view');
        }
      });
    }, { threshold: 0.2 });
    observer3.observe(section3);
  }

});
// Feedback form alert
document.getElementById("feedback-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("✅ Thank you for your feedback!");
  this.reset();
});
// === End moved from index.html ===

