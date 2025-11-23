// script.js — client-side validation and password toggle (demo only)
(function () {
  'use strict';

  const form = document.querySelector('.login-form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const toggle = document.querySelector('.toggle-pw');
  const submitBtn = form.querySelector('button[type="submit"]');
  const message = document.getElementById('form-message');

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPassword = 8;

  function validateEmail() {
    const v = email.value.trim();
    if (v.length === 0) {
      emailError.textContent = 'Email is required.';
      return false;
    }
    if (!emailRe.test(v)) {
      emailError.textContent = 'Please enter a valid email address.';
      return false;
    }
    emailError.textContent = '';
    return true;
  }

  function validatePassword() {
    const v = password.value;
    if (v.length === 0) {
      passwordError.textContent = 'Password is required.';
      return false;
    }
    if (v.length < minPassword) {
      passwordError.textContent = `Password must be at least ${minPassword} characters.`;
      return false;
    }
    passwordError.textContent = '';
    return true;
  }

  function updateSubmitState() {
    const ok = validateEmail() && validatePassword();
    submitBtn.disabled = !ok;
  }

  // live validation
  email.addEventListener('input', () => {
    validateEmail();
    updateSubmitState();
  });

  password.addEventListener('input', () => {
    validatePassword();
    updateSubmitState();
  });

  // password toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isShown = password.type === 'text';
      password.type = isShown ? 'password' : 'text';
      toggle.textContent = isShown ? 'Show' : 'Hide';
      toggle.setAttribute('aria-pressed', String(!isShown));
      // keep focus on password field after toggling
      password.focus();
    });
  }

  // form submit (demo): prevent default and simulate async
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.className = 'form-message';

    const ok = validateEmail() && validatePassword();
    if (!ok) {
      message.textContent = 'Please fix the errors above.';
      message.classList.add('error');
      return;
    }

    submitBtn.disabled = true;
    message.textContent = 'Signing in...';

    // Simulate network request
    setTimeout(() => {
      submitBtn.disabled = false;
      message.textContent = 'Signed in (demo).';
      message.classList.remove('error');
      message.classList.add('success');

      // Optionally clear sensitive fields
      password.value = '';
      passwordError.textContent = '';
      // keep email for convenience
      updateSubmitState();
    }, 900);
  });

  // initial state
  submitBtn.disabled = true;
})();
