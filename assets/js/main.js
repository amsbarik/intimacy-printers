


// partners slider js start 
(function () {
    const track = document.getElementById('partnersTrack');
    const slider = document.getElementById('partnersSlider');
    if (!track || !slider) return;

    function duplicateOnce() {
        if (track.dataset.duplicated === 'true') return;
        track.innerHTML += track.innerHTML;
        track.dataset.duplicated = 'true';
    }

    function imagesLoaded(parent, cb) {
        const imgs = parent.querySelectorAll('img');
        let total = imgs.length, loaded = 0;
        if (!total) return cb();
        imgs.forEach(img => {
        if (img.complete && img.naturalWidth !== 0) {
            loaded++;
            if (loaded === total) cb();
        } else {
            img.addEventListener('load', () => { loaded++; if (loaded === total) cb(); });
            img.addEventListener('error', () => { loaded++; if (loaded === total) cb(); });
        }
        });
    }

    let pos = 0, trackWidth = 0, lastTime = 0;
    let isDragging = false, pointerId = null, startX = 0, startPos = 0;
    let momentum = 0, hoverPaused = false;

    const style = getComputedStyle(document.documentElement);
    const AUTO_SPEED = parseFloat(style.getPropertyValue('--auto-speed')) || 0.035;

    function normalizePos() {
        if (!trackWidth) return;
        while (pos <= -trackWidth) pos += trackWidth;
        while (pos > 0) pos -= trackWidth;
    }

    function updateTransform() {
        track.style.transform = `translate3d(${pos}px,0,0)`;
    }

    function rafLoop(now) {
        if (!lastTime) lastTime = now;
        const dt = Math.min(40, now - lastTime);
        lastTime = now;

        if (!isDragging && !hoverPaused) {
        if (Math.abs(momentum) > parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--min-momentum') || 0.001)) {
            pos += momentum * dt;
            const decayPerMs = 0.9985;
            momentum *= Math.pow(decayPerMs, dt);
            if (Math.abs(momentum) < 0.0005) momentum = 0;
        } else {
            pos -= AUTO_SPEED * dt;
        }
        }

        normalizePos();
        updateTransform();
        requestAnimationFrame(rafLoop);
    }

    function onPointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
        isDragging = true; pointerId = e.pointerId;
        startX = e.clientX; startPos = pos; momentum = 0;
        slider.classList.add('dragging'); e.preventDefault();
    }

    function onPointerMove(e) {
        if (!isDragging || e.pointerId !== pointerId) return;
        const dx = e.clientX - startX; pos = startPos + dx;
        normalizePos(); updateTransform();
        const now = performance.now();
        if (!onPointerMove._lastTime) { onPointerMove._lastTime = now; onPointerMove._lastX = e.clientX; return; }
        const dt = now - onPointerMove._lastTime;
        if (dt > 0) {
        const vx = (e.clientX - onPointerMove._lastX) / dt;
        momentum = vx * 0.9 + momentum * 0.1;
        onPointerMove._lastTime = now; onPointerMove._lastX = e.clientX;
        }
    }

    function endDrag(e) {
        if (!isDragging) return;
        try { e.target.releasePointerCapture(e.pointerId); } catch (err) {}
        isDragging = false; pointerId = null; slider.classList.remove('dragging');
        if (Math.abs(momentum) < 0.0005) momentum = 0;
    }

    slider.addEventListener('mouseenter', () => { hoverPaused = true; });
    slider.addEventListener('mouseleave', () => { hoverPaused = false; });
    slider.addEventListener('pointerdown', onPointerDown, { passive: false });
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', endDrag, { passive: true });
    window.addEventListener('pointercancel', endDrag, { passive: true });

    function recompute() {
        trackWidth = track.scrollWidth / 2 || 0;
        normalizePos(); updateTransform();
    }
    window.addEventListener('resize', () => { setTimeout(recompute, 50); });

    function initOnce() {
        duplicateOnce();
        imagesLoaded(track, () => {
        recompute(); normalizePos(); lastTime = 0;
        requestAnimationFrame(rafLoop);
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initOnce();
    } else {
        window.addEventListener('DOMContentLoaded', initOnce);
    }
})();

// partners slider js end






// 6 card continous silder js start 
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





