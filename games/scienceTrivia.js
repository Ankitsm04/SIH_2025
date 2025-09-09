const scienceTriviaData = [
  {
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "Water is made up of which elements?",
    options: ["Hydrogen and Oxygen", "Carbon and Oxygen", "Hydrogen and Carbon", "Oxygen and Nitrogen"],
    answer: 0
  },
  {
    question: "The process by which plants make their food is called?",
    options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
    answer: 0
  }
];

let currentScienceIndex = 0;
let scienceScore = 0;

function loadScienceTrivia(container) {
  container.innerHTML = '';

  if (currentScienceIndex >= scienceTriviaData.length) {
    const resultEl = document.createElement('div');
    resultEl.innerHTML = `
      <h2>Your Score: ${scienceScore} / ${scienceTriviaData.length}</h2>
      <button id="restartScience" aria-label="Restart Science Trivia">Restart Science Trivia</button>
    `;
    container.appendChild(resultEl);

    document.getElementById('restartScience').addEventListener('click', () => {
      currentScienceIndex = 0;
      scienceScore = 0;
      loadScienceTrivia(container);
    });

    return;
  }

  const q = scienceTriviaData[currentScienceIndex];

  const questionEl = document.createElement('h2');
  questionEl.textContent = q.question;
  container.appendChild(questionEl);

  const optionsEl = document.createElement('ul');
  optionsEl.className = 'quiz-options';

  q.options.forEach((option, i) => {
    const li = document.createElement('li');
    li.textContent = option;
    li.tabIndex = 0;
    li.className = 'quiz-option';
    li.setAttribute('role', 'button');
    li.setAttribute('aria-pressed', 'false');
    li.onclick = () => selectScienceAnswer(i, container);
    li.onkeypress = (e) => { if(e.key === 'Enter' || e.key === ' ') selectScienceAnswer(i, container); };
    optionsEl.appendChild(li);
  });

  container.appendChild(optionsEl);
}

function selectScienceAnswer(selectedIndex, container) {
  if (selectedIndex === scienceTriviaData[currentScienceIndex].answer) {
    scienceScore++;
  }
  currentScienceIndex++;
  loadScienceTrivia(container);
}
