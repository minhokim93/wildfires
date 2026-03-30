/* =========================================
   WRM Lab - Interactive Slider Logic
   ========================================= */

window.addEventListener('load', () => {
    const slidesContainer = document.getElementById('slides-container');
    const slide = document.querySelector('.slide');
    const prevButton = document.getElementById('slide-arrow-prev');
    const nextButton = document.getElementById('slide-arrow-next');
    const currentSlideNumSpan = document.getElementById('current-slide-num');

    // Basic Slider Setup
    let currentSlideIndex = 0;
    const totalSlides = 6; // Slides 00 - 06

    // Pre-calculate slide width on load and on resize
    let slideWidth = slide.clientWidth;
    window.addEventListener('resize', () => {
        slideWidth = slide.clientWidth;
    });

    // Function to handle moving to a specific slide
    const goToSlide = (index) => {
        // Handle boundaries
        if (index < 0) {
            index = 0;
        } else if (index > totalSlides) {
            index = totalSlides;
        }
        
        currentSlideIndex = index;
        
        // Use scrollLeft to animate the change
        // We use scrollLeft instead of translate for best mobile performance
        slidesContainer.scrollLeft = currentSlideIndex * slideWidth;
        
        updateSliderUI(currentSlideIndex);
    }

    // Function to update the fractional counter and disable arrows at the ends
    const updateSliderUI = (index) => {
        // Format the index with a leading zero (e.g., 03)
        currentSlideNumSpan.innerText = index.toString().padStart(2, '0');
        
        // Handle disabling arrows at boundaries
        prevButton.disabled = (index === 0);
        nextButton.disabled = (index === totalSlides);
    }

    // --- Arrow Click Interaction ---
    nextButton.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides) {
            goToSlide(currentSlideIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    });

    // --- Touch/Native Scroll Interaction ---
    // Listen to the scroll event to update the counter even when a user scrolls on mobile
    let isScrolling;
    slidesContainer.addEventListener('scroll', () => {
        // Clear timeout so we don't trigger update UI on every pixel of scrolling
        window.clearTimeout(isScrolling);
        
        // Use a slight timeout to calculate the current index AFTER the scroll has snapped
        isScrolling = setTimeout(() => {
            // Calculate current index by dividing the current scroll position by width
            const index = Math.round(slidesContainer.scrollLeft / slideWidth);
            currentSlideIndex = index;
            updateSliderUI(currentSlideIndex);
        }, 100); // 100ms lag is barely noticeable but saves performance
    }, { passive: true }); // passive increases scroll performance

    // Initialize the UI on page load
    updateSliderUI(currentSlideIndex);
});