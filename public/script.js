const ready = (fn) => {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

ready(() => {
  setupMenu();
  setupFaq();
  setupForms();
  setupScrollTop();
  restoreStoredData();
});

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupFaq() {
  const items = document.querySelectorAll('.faq-item button');
  items.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if (panel) {
        panel.hidden = expanded;
      }
    });
  });
}

function setupForms() {
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      status && (status.textContent = '');
      const valid = validateForm(form);

      if (valid) {
        status && (status.textContent = 'Demande envoyée (simulation). Merci !');
        form.reset();
        const storageKey = form.dataset.storage;
        if (storageKey) localStorage.removeItem(storageKey);
      }
    });

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const msg = input.parentElement?.querySelector('.error-message');
          if (msg) msg.textContent = '';
        }
        const storageKey = form.dataset.storage;
        if (storageKey) persistField(storageKey, input);
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach((field) => {
    const messageEl = field.parentElement?.querySelector('.error-message');
    if (messageEl) messageEl.textContent = '';
    field.classList.remove('error');

    if (field.hasAttribute('required') && !field.value.trim()) {
      setError(field, 'Ce champ est requis');
    } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      setError(field, 'Email invalide');
    } else if (field.type === 'number' && field.value && Number(field.value) < 0) {
      setError(field, 'Valeur non valide');
    }
  });

  function setError(field, message) {
    isValid = false;
    field.classList.add('error');
    const messageEl = field.parentElement?.querySelector('.error-message');
    if (messageEl) messageEl.textContent = message;
  }

  return isValid;
}

function setupScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 260 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function persistField(storageKey, input) {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
  stored[input.name] = input.value;
  localStorage.setItem(storageKey, JSON.stringify(stored));
}

function restoreStoredData() {
  const form = document.querySelector('form[data-storage]');
  if (!form) return;
  const storageKey = form.dataset.storage;
  const saved = storageKey ? JSON.parse(localStorage.getItem(storageKey) || '{}') : null;
  if (!saved) return;
  Object.entries(saved).forEach(([name, value]) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (field) field.value = value;
  });
}
