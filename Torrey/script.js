/* =============================================================
   STERLING AUTO GLASS — TEMPLATE SCRIPT
   Vanilla JavaScript, no dependencies.
   Handles: mobile nav toggle, FAQ accordion, quote form submission,
   and the dynamic copyright year in the footer.
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     MOBILE NAV TOGGLE
     Opens/closes the primary navigation on small screens and
     closes it automatically after a link is tapped.
     ----------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    var navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* -----------------------------------------------------------
     FAQ ACCORDION
     Only one panel open at a time. Height is set dynamically via
     scrollHeight so the CSS transition animates smoothly.
     ----------------------------------------------------------- */
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panel = trigger.nextElementSibling;
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close every other open panel first
      accordionTriggers.forEach(function (otherTrigger) {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* -----------------------------------------------------------
     QUOTE FORM SUBMISSION
     This demo intercepts submission and shows a confirmation
     message in place. Replace the section marked below with a
     real fetch() call to your form backend, email service, or
     CRM endpoint when deploying for a live business.
     ----------------------------------------------------------- */
  var quoteForm = document.getElementById('quoteForm');
  var formNote = document.getElementById('formNote');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!quoteForm.checkValidity()) {
        formNote.textContent = 'Please fill in your name and phone number so we can reach you.';
        formNote.style.color = '#B4342A';
        return;
      }

      // ---- Replace this block with a real submission call ----
      // Example:
      // fetch('/api/quote-requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(Object.fromEntries(new FormData(quoteForm)))
      // });
      // ----------------------------------------------------------

      formNote.style.color = '#16233F';
      formNote.textContent = "Thanks! We've received your request and will call you back shortly.";
      quoteForm.reset();
    });
  }

  /* -----------------------------------------------------------
     FOOTER YEAR
     ----------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});