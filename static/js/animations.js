/**
 * Smooth scroll animations and micro-interactions
 * go-folio design enhancements
 */

// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);

  // Observe all sections except the hero
  const sections = document.querySelectorAll('section:not(:first-child)');
  sections.forEach(section => {
    section.classList.add('fade-in');
    fadeInObserver.observe(section);
  });

  // Observe cards
  const cards = document.querySelectorAll('.card, .badge');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.05}s`;
    fadeInObserver.observe(card);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
