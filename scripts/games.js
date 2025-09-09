document.getElementById('languageSwitcher').addEventListener('change', (e) => {
  loadLanguage(e.target.value);
});

function showGameCards() {
  document.getElementById('gameCardsContainer').style.display = 'grid';
  const container = document.getElementById('gameContainer');
  container.style.display = 'none';
  container.innerHTML = '<p>Select a game above to start playing!</p>';
}

function getCurrentUserKey() {
  return localStorage.getItem('currentUser');
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || {};
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function saveCurrentUser(userKey) {
  localStorage.setItem('currentUser', userKey);
}

function createOrGetUser(name, classNum) {
  const users = getUsers();
  const userKey = name.trim().toLowerCase().replace(/\s+/g, '');
  if (!users[userKey]) {
    users[userKey] = { name, class: classNum, scores: {} };
    saveUsers(users);
  }
  saveCurrentUser(userKey);
  return users[userKey];
}

function showLoginForm(show) {
  document.getElementById('loginSection').style.display = show ? 'block' : 'none';
  document.getElementById('gamesSection').style.display = show ? 'none' : 'block';
  document.getElementById('navLogoutLi').style.display = show ? 'none' : 'inline-block';
  document.getElementById('gameContainer').style.display = 'none';
  document.getElementById('logoutBtn').style.display = show ? 'none' : 'inline-block';
  document.getElementById('gameContainer').style.display = 'none';
}

function logout() {
  localStorage.removeItem('currentUser');
  showLoginForm(true);
}

document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('studentName').value.trim();
  const classNum = document.getElementById('studentClass').value;

  if (!name || !classNum) {
    alert('Please enter your name and select your class.');
    return;
  }

  createOrGetUser(name, classNum);
  showLoginForm(false);
  filterGamesByClass(classNum);
  setupGameButtons();
});

window.addEventListener('DOMContentLoaded', () => {
  loadLanguage('en');

  const currentUser = getCurrentUserKey();
  if (currentUser) {
    const users = getUsers();
    const user = users[currentUser];
    if (user) {
      showLoginForm(false);
      filterGamesByClass(user.class);
      setupGameButtons();
      return;
    }
  }
  showLoginForm(true);
});

function filterGamesByClass(classNum) {
  const allowedGamesByClass = {
    '6': ['math-quiz', 'science-trivia', 'science-true-false'],
    '7': ['math-quiz', 'science-trivia', 'term-matching', 'science-true-false'],
    '8': ['math-quiz', 'science-trivia', 'term-matching', 'science-true-false', 'memory-game'],
    '9': ['math-quiz', 'science-trivia', 'term-matching', 'science-true-false', 'memory-game'],
    '10': ['math-quiz', 'science-trivia', 'term-matching', 'science-true-false', 'memory-game'],
    '11': ['science-trivia', 'term-matching', 'science-true-false', 'memory-game'],
    '12': ['science-trivia', 'term-matching', 'science-true-false', 'memory-game'],
  };

  const allowedGames = allowedGamesByClass[classNum] || [];
  document.querySelectorAll('.game-card').forEach(card => {
    const gameId = card.querySelector('button.start-game-btn').getAttribute('data-game');
    card.style.display = allowedGames.includes(gameId) ? 'block' : 'none';
  });
}

function setupGameButtons() {
  const cardsContainer = document.getElementById('gameCardsContainer');
  cardsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('start-game-btn')) {
      const selectedGame = e.target.getAttribute('data-game');
      const container = document.getElementById('gameContainer');

      cardsContainer.style.display = 'none';
      container.style.display = 'block';
      container.focus();

      switch (selectedGame) {
        case 'math-quiz':
          showQuizInstructions(container,
            () => {
              currentQuestionIndex = 0;
              score = 0;
              loadQuiz(container, showGameCards);
            },
            () => showGameCards()
          );
          break;

        case 'science-trivia':
          currentScienceIndex = 0;
          scienceScore = 0;
          loadScienceTrivia(container, showGameCards);
          break;

        case 'term-matching':
          matches = [];
          loadMatchingGame(container, showGameCards);
          break;

        case 'space-explorer':
          container.innerHTML = '<p>Space Explorer game will be added soon!</p><button id="backToGames">Back to Games</button>';
          document.getElementById('backToGames').addEventListener('click', showGameCards);
          break;

        case 'science-true-false':
          tfIndex = 0;
          tfScore = 0;
          loadTrueFalseGame(container, showGameCards);
          break;

        case 'memory-game':
          loadMemoryGame(container, showGameCards);
          break;

        default:
          container.innerHTML = '<p>Select a game to start.</p><button id="backToGames">Back to Games</button>';
          document.getElementById('backToGames').addEventListener('click', showGameCards);
      }
    }
  }, { once: true });
}
