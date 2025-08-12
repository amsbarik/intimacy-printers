// card continous silder js start 

  document.querySelectorAll('.six-card-slider-wrapper').forEach((sliderWrapper, index) => {
    let productCards = sliderWrapper.querySelectorAll('.six-card');
    const prevBtn = sliderWrapper.closest('.six-card-slider-container').querySelector('.prev-btn');
    const nextBtn = sliderWrapper.closest('.six-card-slider-container').querySelector('.next-btn');
    let currentIndex = 6; // Start from the first real card set after cloning
    let slideInterval;

    // Clone first and last few slides to create infinite looping effect
    for (let i = 0; i < 6; i++) {
        const firstClone = productCards[i].cloneNode(true);
        const lastClone = productCards[productCards.length - 1 - i].cloneNode(true);
        sliderWrapper.appendChild(firstClone);
        sliderWrapper.insertBefore(lastClone, sliderWrapper.firstChild);
    }

    // Update productCards to include cloned elements
    productCards = sliderWrapper.querySelectorAll('.six-card');

    // Adjust the initial position to be at the start of the actual cards
    const cardWidth = productCards[0].offsetWidth + 24; // Adjust according to product-card CSS margin
    sliderWrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;

    function slideTo(index) {
        const translateXValue = -(index * cardWidth);
        sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
        sliderWrapper.style.transform = `translateX(${translateXValue}px)`;
        currentIndex = index;

        // Handle looping effect
        if (index === 0) {
            setTimeout(() => {
                sliderWrapper.style.transition = 'none';
                currentIndex = productCards.length - 12;
                sliderWrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
            }, 500);
        } else if (index === productCards.length - 6) {
            setTimeout(() => {
                sliderWrapper.style.transition = 'none';
                currentIndex = 6;
                sliderWrapper.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
            }, 500);
        }
    }

    function nextSlide() {
        slideTo(currentIndex + 1);
    }

    function prevSlide() {
        slideTo(currentIndex - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000); // Adjust interval as needed
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    sliderWrapper.addEventListener('mouseover', stopAutoSlide);
    sliderWrapper.addEventListener('mouseout', startAutoSlide);

    startAutoSlide();
    });



// index page departments show more/less js 
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.readmore').forEach(function(link) {
        link.addEventListener('click', function() {
            var currentWrapper = this.closest('.departments-wrap');
            document.querySelectorAll('.departments-wrap.show').forEach(function(wrapper) {
                if (wrapper !== currentWrapper) {
                    wrapper.classList.remove('show');
                }
            });
            currentWrapper.classList.toggle('show');
        });
    });
});
