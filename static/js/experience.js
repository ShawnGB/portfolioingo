// Experience entry collapse/expand functionality
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
