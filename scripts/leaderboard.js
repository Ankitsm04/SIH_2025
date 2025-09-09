const TEACHER_PASSWORD = '2025';

  function initializeDummyData() {
      const dummyUsers = {
        'anita7': {
          name: 'Anita',
          class: '7',
          scores: {
            'math-quiz': 88,
            'science-trivia': 92
          }
        },
        'ravi8': {
          name: 'Ravi',
          class: '8',
          scores: {
            'science-true-false': 80,
            'memory-game': 75
          }
        },
        'neha10': {
          name: 'Neha',
          class: '10',
          scores: {
            'term-matching': 95,
            'science-trivia': 85
          }
        }
      };
      localStorage.setItem('users', JSON.stringify(dummyUsers));
    }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem('users')) || {};
    } catch {
      return {};
    }
  }

  function renderLeaderboard(filterClass = '') {
    const tbody = document.querySelector('#leaderboardTable tbody');
    tbody.innerHTML = '';

    const users = getUsers();

    Object.values(users).forEach(user => {
      if (filterClass && user.class !== filterClass) return;

      Object.entries(user.scores || {}).forEach(([game, score]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.name || 'N/A'}</td>
          <td>${user.class || 'N/A'}</td>
          <td>${game}</td>
          <td>${score}</td>
        `;
        tbody.appendChild(tr);
      });
    });
  }

  function exportLeaderboardToExcel() {
    const users = getUsers();
    const data = [['Student Name', 'Class', 'Game', 'Score']];

    Object.values(users).forEach(user => {
      (user.scores ? Object.entries(user.scores) : []).forEach(([game, score]) => {
        data.push([user.name, user.class, game, score]);
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaderboard');
    XLSX.writeFile(workbook, 'leaderboard.xlsx');
  }

  window.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('passwordModalOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const passwordSubmitBtn = document.getElementById('passwordSubmitBtn');
    const passwordError = document.getElementById('passwordError');
    const leaderboardContent = document.getElementById('leaderboardContent');

    function unlockLeaderboard() {
      modalOverlay.style.display = 'none';
      leaderboardContent.style.display = 'block';
      initializeDummyData();
      renderLeaderboard();
      document.getElementById('classFilter').addEventListener('change', e => {
        renderLeaderboard(e.target.value);
      });
      document.getElementById('exportLeaderboard').addEventListener('click', exportLeaderboardToExcel);
    }

    passwordSubmitBtn.addEventListener('click', () => {
      if (passwordInput.value === TEACHER_PASSWORD) {
        unlockLeaderboard();
      } else {
        passwordError.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
      }
    });

    // Also allow pressing Enter to submit password
    passwordInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        passwordSubmitBtn.click();
      }
    });

    // Set initial focus to input
    passwordInput.focus();
  });
  document.getElementById('backButton').addEventListener('click', () => {
    window.history.back();
    });