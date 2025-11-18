/**
 * Fixed Side Navigation - Scroll Tracking
 * Highlights active section based on scroll position
 */

(function () {
  'use strict';

  // Configuration
  const OFFSET_TOP = 100; // Offset from top for active state
  const THROTTLE_DELAY = 100; // ms

  // Get all sections with IDs that match side nav links
  function getSections() {
    const navItems = document.querySelectorAll('.side-nav-link');
    const sections = [];

    navItems.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          sections.push({
            id: sectionId,
            element: section,
            link: link,
            navItem: link.closest('.side-nav-item')
          });
        }
      }
    });

    return sections;
  }

  // Throttle function for performance
  function throttle(func, delay) {
    let timeoutId;
    let lastRan;

    return function () {
      const context = this;
      const args = arguments;

      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          if ((Date.now() - lastRan) >= delay) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, delay - (Date.now() - lastRan));
      }
    };
  }

  // Update active section based on scroll position
  function updateActiveSection() {
    const sections = getSections();
    if (sections.length === 0) return;

    const scrollPos = window.scrollY + OFFSET_TOP;

    // Find the current section
    let currentSection = sections[0];

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.element.offsetTop <= scrollPos) {
        currentSection = section;
        break;
      }
    }

    // Remove active class from all, add to current
    sections.forEach(section => {
      section.navItem.classList.remove('active');
    });

    if (currentSection) {
      currentSection.navItem.classList.add('active');
    }
  }

  // Smooth scroll to section when clicking nav link
  function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.side-nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Initialize
  function init() {
    const sideNav = document.querySelector('.side-nav');
    if (!sideNav) return; // No side nav on this page

    setupSmoothScroll();
    updateActiveSection();

    // Listen to scroll with throttling
    window.addEventListener('scroll', throttle(updateActiveSection, THROTTLE_DELAY));
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
