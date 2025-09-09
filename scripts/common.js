if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered.', reg))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

document.getElementById('languageSwitcher').addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  localStorage.setItem('selectedLanguage', selectedLang);
  window.location.reload(); 
});

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'en';
  document.getElementById('languageSwitcher').value = savedLang;
  loadLanguage(savedLang);
});

function saveScore(gameId, score) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const currentUserKey = localStorage.getItem('currentUser');
  if (!currentUserKey || !users[currentUserKey]) return;

  const user = users[currentUserKey];

  if (!user.scores) user.scores = {};
  if (!user.scores[gameId] || score > user.scores[gameId]) {
    user.scores[gameId] = score;
    localStorage.setItem('users', JSON.stringify(users));
  }
}
