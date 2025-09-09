const memoryItems = [
  { id: 1, label: "Atom", icon: "⚛️" },
  { id: 2, label: "Microscope", icon: "🔬" },
  { id: 3, label: "Test Tube", icon: "🧪" },
  { id: 4, label: "DNA", icon: "🧬" },
  { id: 5, label: "Rocket", icon: "🚀" },
  { id: 6, label: "Electricity", icon: "⚡" },
];

let memoryDeck = [];
let flippedCards = [];
let matchedCards = [];
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadMemoryGame(container, onBack) {
  container.innerHTML = `
    <h2 class="quiz-question">Match the STEM pairs</h2>
    <div class="memory-board"></div>
    <div class="memory-actions">
      <button id="backToGamesMemory" class="btn-secondary">Back to Games</button>
      <span class="memory-score">Matched Pairs: <span id="matchCount">0</span> / ${memoryItems.length}</span>
    </div>
  `;

  memoryDeck = shuffle([...memoryItems, ...memoryItems]); // duplicate and shuffle deck
  flippedCards = [];
  matchedCards = [];
  lockBoard = false;

  const board = container.querySelector('.memory-board');
  memoryDeck.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.id = item.id;
    card.dataset.index = index;
    card.innerHTML = `
      <div class="memory-card-front">?</div>
      <div class="memory-card-back">${item.icon}<br><small>${item.label}</small></div>
    `;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });

  container.querySelector('#backToGamesMemory').onclick = () => onBack();
  updateScore(container, 0);
}

function flipCard(card) {
  if (lockBoard) return;
  if (flippedCards.includes(card) || matchedCards.includes(card)) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.id === card2.dataset.id;

  if (isMatch) {
    matchedCards.push(card1, card2);
    updateScore(card1.closest('.main-content'), matchedCards.length / 2);
    resetFlip(true);
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      resetFlip(false);
    }, 1000);
  }
}

function resetFlip(isMatch) {
  flippedCards = [];
  lockBoard = false;
  if (isMatch && matchedCards.length === memoryItems.length * 2) {
    const container = document.querySelector('.main-content');
    const board = container.querySelector('.memory-board');
    const actionArea = container.querySelector('.memory-actions');
    if (board && actionArea) {
      const congrats = document.createElement('div');
      congrats.className = 'quiz-result';
      congrats.innerHTML = `
        <h2>Congratulations! You matched all pairs!</h2>
        <button id="restartMemory" class="btn-primary">Restart</button>
        <button id="backToGamesMemory" class="btn-secondary">Back to Games</button>
      `;
      container.innerHTML = '';
      container.appendChild(congrats);

      document.getElementById('restartMemory').addEventListener('click', () => {
        loadMemoryGame(container, showGameCards);
      });
      document.getElementById('backToGamesMemory').addEventListener('click', () => {
        showGameCards();
      });
    }
  }
}

function updateScore(container, matchedCount) {
  const scoreSpan = container.querySelector('#matchCount');
  if (scoreSpan) {
    scoreSpan.textContent = matchedCount;
  }
}
