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
  const cards = document.querySelectorAll('.experience-card');

  if (!knob || !trackContainer || markers.length === 0 || cards.length === 0) {
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

  // Set active experience card and marker
  function setActiveExperience(index) {
    currentIndex = index;

    // Update cards
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
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

  // Update track rect on resize
  window.addEventListener('resize', () => {
    if (trackContainer) {
      trackRect = trackContainer.getBoundingClientRect();
    }
  });
});
