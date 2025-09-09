const translations = {};

async function loadLanguage(language) {
  try {
    const response = await fetch(`lang/${language}.json?nocache=${Date.now()}`);
    const data = await response.json();
    translations.current = data;
    updateText();
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

function updateText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations.current && translations.current[key]) {
      el.textContent = translations.current[key];
    }
  });
}

document.getElementById('languageSwitcher').addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('selectedLanguage', lang);
  loadLanguage(lang);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  document.getElementById('languageSwitcher').value = savedLang;
  loadLanguage(savedLang);
});
