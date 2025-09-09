import '../games/quiz.js';

window.addEventListener('DOMContentLoaded', ()=> {
    const gameContainer = document.getElementById('gameContainer');
    loadQuiz(gameContainer);
});

function loadContent(section) {
  const container = document.getElementById('gameContainer');
  container.innerHTML = '';

  switch(section) {
    case 'home':
      container.innerHTML = `<p>Welcome to STEM Learn, explore courses, games, and more!</p>`;
      break;
    case 'courses':
      container.innerHTML = `<p>Courses coming soon!</p>`;
      break;
    case 'games':
      loadQuiz(container);
      break;
    case 'about':
      container.innerHTML = `<p>About STEM Learn platform...</p>`;
      break;
    case 'contact':
      container.innerHTML = `<p>Contact us at info@stemlearn.example.com</p>`;
      break;
    default:
      container.innerHTML = `<p>Welcome!</p>`;
  }
}

document.getElementById('navHome').addEventListener('click', e => {
  e.preventDefault();
  setActiveNav('navHome');
  loadContent('home');
});
document.getElementById('navCourses').addEventListener('click', e => {
  e.preventDefault();
  setActiveNav('navCourses');
  loadContent('courses');
});
document.getElementById('navGames').addEventListener('click', e => {
  e.preventDefault();
  setActiveNav('navGames');
  loadContent('games');
});
document.getElementById('navAbout').addEventListener('click', e => {
  e.preventDefault();
  setActiveNav('navAbout');
  loadContent('about');
});
document.getElementById('navContact').addEventListener('click', e => {
  e.preventDefault();
  setActiveNav('navContact');
  loadContent('contact');
});

function setActiveNav(activeId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.id === activeId);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadContent('home');
});
