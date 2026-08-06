// ==========================================================
// Elite Mobile Auto Repair — site script
// Plain JS, no frameworks. Handles the mobile nav menu and
// basic validation + a friendly confirmation on the lead form.
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu after picking a link (mobile)
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Lead form validation ----
  var form = document.getElementById('lead-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');

  function setError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + '-error');
    var row = input ? input.closest('.form-row') : null;

    if (row) row.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  }

  function isValidPhone(value) {
    var digits = value.replace(/\D/g, '');
    return digits.length >= 10;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var details = document.getElementById('details').value.trim();

    var hasError = false;

    if (!name) {
      setError('name', 'Please enter your name.');
      hasError = true;
    } else {
      setError('name', '');
    }

    if (!phone) {
      setError('phone', 'Please enter a phone number.');
      hasError = true;
    } else if (!isValidPhone(phone)) {
      setError('phone', 'Please enter a valid phone number.');
      hasError = true;
    } else {
      setError('phone', '');
    }

    if (!details) {
      setError('details', "Let Richard know what's going on with your car.");
      hasError = true;
    } else {
      setError('details', '');
    }

    if (hasError) {
      statusEl.textContent = 'Please fix the fields above and try again.';
      statusEl.className = 'form-status error';
      return;
    }

    // No backend is connected yet. This confirms the request to the
    // visitor and opens their email client pre-filled with the details
    // so the message actually reaches Richard. Swap this section out
    // once a form backend (e.g. Formspree, a mail API, etc.) is wired up.
    var city = document.getElementById('city').value.trim();

    var subject = 'Callback request from ' + name;
    var bodyLines = [
      'Name: ' + name,
      'Phone: ' + phone,
      'City: ' + (city || 'Not provided'),
      '',
      "What's going on with the car:",
      details
    ];
    var mailtoUrl =
      'mailto:Richardwilson090274@gmail.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(bodyLines.join('\n'));

    window.location.href = mailtoUrl;

    statusEl.textContent = "Thanks, " + name + "! Your email app should open with the details filled in \u2014 just hit send, or call 208-202-9912 directly.";
    statusEl.className = 'form-status success';
    form.reset();
  });
});