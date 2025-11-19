// Experience entry collapse/expand functionality (OLD TIMELINE)
document.addEventListener('DOMContentLoaded', function() {
  const experienceEntries = document.querySelectorAll('.experience-entry');

  experienceEntries.forEach(entry => {
    const header = entry.querySelector('.experience-header');
    const list = entry.querySelector('ul');

    if (!header || !list) return;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'experience-toggle';
    toggleBtn.setAttribute('aria-expanded', 'false'); // Start collapsed
    toggleBtn.innerHTML = '<svg class="toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

    // Add button to header
    header.appendChild(toggleBtn);

    // Start collapsed
    list.style.maxHeight = '0';
    list.style.opacity = '0';
    list.style.marginTop = '0';
    entry.classList.add('collapsed');

    // Toggle functionality
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        list.style.maxHeight = '0';
        list.style.opacity = '0';
        list.style.marginTop = '0';
        toggleBtn.setAttribute('aria-expanded', 'false');
        entry.classList.add('collapsed');
      } else {
        list.style.maxHeight = list.scrollHeight + 'px';
        list.style.opacity = '1';
        list.style.marginTop = '';
        toggleBtn.setAttribute('aria-expanded', 'true');
        entry.classList.remove('collapsed');
      }
    });
  });
});

// ==========================================
// INTERACTIVE TIMELINE DRAG FUNCTIONALITY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const knob = document.getElementById('timeline-knob');
  const trackContainer = document.querySelector('.timeline-track-container');
  const markers = document.querySelectorAll('.timeline-marker');
  const educationCards = document.querySelectorAll('.education-card');
  const experienceCards = document.querySelectorAll('.experience-card');

  if (!knob || !trackContainer || markers.length === 0) {
    return; // Exit if interactive timeline doesn't exist
  }

  // Configuration
  const SNAP_ENABLED = true; // Change to false for smooth dragging
  const SNAP_THRESHOLD = 30; // pixels

  let isDragging = false;
  let currentIndex = 0;
  let trackRect = null;

  // Initialize knob position
  updateKnobPosition(0);
  setActiveExperience(0);

  // Get marker positions (percentages)
  function getMarkerPositions() {
    return Array.from(markers).map(marker => {
      const index = parseInt(marker.dataset.index);
      return {
        index,
        percent: parseFloat(markers[index].style.top || marker.dataset.index * (100 / (markers.length - 1)))
      };
    });
  }

  // Update knob position (0-100%)
  function updateKnobPosition(percent) {
    percent = Math.max(0, Math.min(100, percent));
    knob.style.top = percent + '%';
  }

  // Set active card and marker (works for both education and experience)
  function setActiveExperience(index) {
    currentIndex = index;

    // Update education cards - activate only the card with matching data-index
    educationCards.forEach((card) => {
      const cardIndex = parseInt(card.dataset.index);
      card.classList.toggle('active', cardIndex === index);
    });

    // Update experience cards - activate only the card with matching data-index
    experienceCards.forEach((card) => {
      const cardIndex = parseInt(card.dataset.index);
      card.classList.toggle('active', cardIndex === index);
    });

    // Update markers
    markers.forEach((marker, i) => {
      marker.classList.toggle('active', i === index);
    });
  }

  // Find nearest marker index
  function getNearestMarkerIndex(percent) {
    let nearestIndex = 0;
    let minDistance = Infinity;

    markers.forEach((marker, index) => {
      const markerPercent = (index / (markers.length - 1)) * 100;
      const distance = Math.abs(percent - markerPercent);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  // Handle drag start
  function handleDragStart(e) {
    isDragging = true;
    knob.classList.add('dragging');
    trackRect = trackContainer.getBoundingClientRect();
    e.preventDefault();
  }

  // Handle drag move
  function handleDragMove(e) {
    if (!isDragging || !trackRect) return;

    // Get Y position (handle both mouse and touch)
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Calculate position as percentage
    const relativeY = clientY - trackRect.top;
    const percent = (relativeY / trackRect.height) * 100;

    updateKnobPosition(percent);

    // Find and activate nearest marker if snap is enabled
    if (SNAP_ENABLED) {
      const nearestIndex = getNearestMarkerIndex(percent);
      setActiveExperience(nearestIndex);
    }

    e.preventDefault();
  }

  // Handle drag end
  function handleDragEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    knob.classList.remove('dragging');

    // Snap to nearest marker
    const knobTop = parseFloat(knob.style.top);
    const nearestIndex = getNearestMarkerIndex(knobTop);
    const targetPercent = (nearestIndex / (markers.length - 1)) * 100;

    updateKnobPosition(targetPercent);
    setActiveExperience(nearestIndex);

    e.preventDefault();
  }

  // Mouse events
  knob.addEventListener('mousedown', handleDragStart);
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);

  // Touch events
  knob.addEventListener('touchstart', handleDragStart, { passive: false });
  document.addEventListener('touchmove', handleDragMove, { passive: false });
  document.addEventListener('touchend', handleDragEnd, { passive: false });

  // Click on markers to jump
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      const percent = (index / (markers.length - 1)) * 100;
      updateKnobPosition(percent);
      setActiveExperience(index);
    });
  });

  // Click on education cards to activate them
  educationCards.forEach((card) => {
    card.addEventListener('click', () => {
      const cardIndex = parseInt(card.dataset.index);
      const percent = (cardIndex / (markers.length - 1)) * 100;
      updateKnobPosition(percent);
      setActiveExperience(cardIndex);
    });
  });

  // Click on experience cards to activate them
  experienceCards.forEach((card) => {
    card.addEventListener('click', () => {
      const cardIndex = parseInt(card.dataset.index);
      const percent = (cardIndex / (markers.length - 1)) * 100;
      updateKnobPosition(percent);
      setActiveExperience(cardIndex);
    });
  });

  // Keyboard navigation for experience timeline (Up/Down arrows)
  document.addEventListener('keydown', (e) => {
    // Only handle arrow keys when timeline section is in view or focused
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // Check if we're in the experience section
      const experienceSection = document.querySelector('.experience-timeline-interactive');
      if (!experienceSection) return;

      // Check if section is visible in viewport
      const rect = experienceSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        e.preventDefault(); // Prevent page scroll

        if (e.key === 'ArrowUp') {
          // Navigate to previous card
          const newIndex = Math.max(0, currentIndex - 1);
          if (newIndex !== currentIndex) {
            const percent = (newIndex / (markers.length - 1)) * 100;
            updateKnobPosition(percent);
            setActiveExperience(newIndex);
          }
        } else if (e.key === 'ArrowDown') {
          // Navigate to next card
          const newIndex = Math.min(markers.length - 1, currentIndex + 1);
          if (newIndex !== currentIndex) {
            const percent = (newIndex / (markers.length - 1)) * 100;
            updateKnobPosition(percent);
            setActiveExperience(newIndex);
          }
        }
      }
    }
  });

  // Update track rect on resize
  window.addEventListener('resize', () => {
    if (trackContainer) {
      trackRect = trackContainer.getBoundingClientRect();
    }
  });

  // ==========================================
  // SKILLS CAROUSEL
  // ==========================================
  const carouselTrack = document.getElementById('skills-carousel-track');
  const carouselDots = document.getElementById('skills-carousel-dots');

  if (carouselTrack && carouselDots) {
    const carouselItems = Array.from(carouselTrack.querySelectorAll('.carousel-item'));
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    // Create dots
    carouselItems.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      carouselDots.appendChild(dot);
    });

    const dots = Array.from(carouselDots.querySelectorAll('.carousel-dot'));

    // Position cards based on current index
    function updateCarousel() {
      carouselItems.forEach((item, index) => {
        // Remove all position classes
        item.classList.remove('center', 'left', 'right', 'hidden');

        const diff = index - currentIndex;

        if (diff === 0) {
          // Center card
          item.classList.add('center');
        } else if (diff === -1 || (currentIndex === 0 && index === totalItems - 1)) {
          // Left card (or wrap around from first to last)
          item.classList.add('left');
        } else if (diff === 1 || (currentIndex === totalItems - 1 && index === 0)) {
          // Right card (or wrap around from last to first)
          item.classList.add('right');
        } else {
          // Hidden cards
          item.classList.add('hidden');
        }
      });

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    // Navigate to specific slide
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    // Navigate to next slide (infinite loop)
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    // Navigate to previous slide (infinite loop)
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next
          nextSlide();
        } else {
          // Swiped right - go to previous
          prevSlide();
        }
      }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Initialize carousel
    updateCarousel();
  }
});
