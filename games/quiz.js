const quizData = [
  { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: 2 },
  { question: "Water boils at what temperature (°C)?", options: ["90", "95", "100", "105"], answer: 2 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
  { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"], answer: 2 },
  { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: 2 },
  { question: "Which force keeps us grounded on Earth?", options: ["Gravity", "Magnetism", "Friction", "Electricity"], answer: 0 },
  { question: "What is H2O commonly known as?", options: ["Hydrogen Peroxide", "Water", "Hydrogen", "Oxygen"], answer: 1 },
  { question: "How many bones are there in the adult human body?", options: ["206", "201", "210", "215"], answer: 0 },
  { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Fe", "Pb"], answer: 1 },
  { question: "What is the center of an atom called?", options: ["Electron", "Nucleus", "Proton", "Neutron"], answer: 1 }
];

let currentQuestionIndex = 0;
let score = 0;

// Instructions screen before quiz start
function showQuizInstructions(container, startCallback, backCallback) {
  container.innerHTML = `
    <div class="quiz-instructions">
      <h2>Quiz Instructions</h2>
      <ul>
        <li>You will be asked 10 multiple-choice questions.</li>
        <li>Select the answer you think is correct.</li>
        <li>After selecting, you will see if you were right or wrong.</li>
        <li>Your score will be shown at the end.</li>
        <li>You can restart the quiz or go back to games after finishing.</li>
      </ul>
      <button id="startQuizBtn" class="btn-primary">Start Quiz</button>
      <button id="backToGamesBtn" class="btn-secondary">Back to Games</button>
    </div>
  `;

  document.getElementById('startQuizBtn').addEventListener('click', () => {
    startCallback();
  });

  document.getElementById('backToGamesBtn').addEventListener('click', () => {
    backCallback();
  });
}

function loadQuiz(container, onBack) {
  container.innerHTML = '';

  if (currentQuestionIndex >= quizData.length) {
    const resultEl = document.createElement('div');
    resultEl.className = 'quiz-result';
    resultEl.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your Score: <strong>${score} / ${quizData.length}</strong></p>
      <button id="restartQuiz" class="btn-primary">Restart Quiz</button>
      <button id="backToGames" class="btn-secondary">Back to Games</button>
    `;
    container.appendChild(resultEl);

    document.getElementById('restartQuiz').addEventListener('click', () => {
      currentQuestionIndex = 0;
      score = 0;
      loadQuiz(container, onBack);
    });

    document.getElementById('backToGames').addEventListener('click', () => {
      onBack();
    });

    return;
  }

  const q = quizData[currentQuestionIndex];

  const questionEl = document.createElement('h2');
  questionEl.className = 'quiz-question';
  questionEl.textContent = `Q${currentQuestionIndex + 1}. ${q.question}`;

  const optionsEl = document.createElement('ul');
  optionsEl.className = 'quiz-options';

  q.options.forEach((option, i) => {
    const li = document.createElement('li');
    li.className = 'quiz-option';
    li.tabIndex = 0;
    li.setAttribute('role', 'button');
    li.setAttribute('aria-pressed', 'false');
    li.textContent = option;

    li.addEventListener('click', () => selectAnswer(i, container, onBack));
    li.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        selectAnswer(i, container, onBack);
      }
    });

    optionsEl.appendChild(li);
  });

  container.appendChild(questionEl);
  container.appendChild(optionsEl);
}

function selectAnswer(selectedIndex, container, onBack) {
  const q = quizData[currentQuestionIndex];
  const optionsEls = container.querySelectorAll('.quiz-option');

  // Disable all options after selection:
  optionsEls.forEach(el => {
    el.setAttribute('aria-disabled', 'true');
    el.style.pointerEvents = 'none';
  });

  // Highlight correct and incorrect answers:
  optionsEls.forEach((el, idx) => {
    if (idx === q.answer) {
      el.classList.add('correct');
    }
    if (idx === selectedIndex && selectedIndex !== q.answer) {
      el.classList.add('incorrect');
    }
  });

  // Update score
  if (selectedIndex === q.answer) {
    score++;
  }

  // After short delay, move to next question or end quiz
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuiz(container, onBack);
  }, 1500);
}
