const trueFalseData = [
  { statement: "The Earth revolves around the Sun.", answer: true },
  { statement: "Water freezes at 0°C.", answer: true },
  { statement: "Venus is the closest planet to the Sun.", answer: false },
  { statement: "Humans have four lungs.", answer: false },
  { statement: "Plants produce oxygen during photosynthesis.", answer: true },
  { statement: "Sound travels faster than light.", answer: false },
  { statement: "The human heart has four chambers.", answer: true },
  { statement: "Lightning never strikes the same place twice.", answer: false },
  { statement: "Bacteria are larger than human cells.", answer: false },
  { statement: "Carbon dioxide is a greenhouse gas.", answer: true }
];

let tfIndex = 0;
let tfScore = 0;

function loadTrueFalseGame(container, onBack) {
  container.innerHTML = '';

  if (tfIndex >= trueFalseData.length) {
    const resultEl = document.createElement('div');
    resultEl.className = 'quiz-result';
    resultEl.innerHTML = `
      <h2>Game Completed!</h2>
      <p>Your Score: <strong>${tfScore} / ${trueFalseData.length}</strong></p>
      <button id="restartTF" class="btn-primary">Restart</button>
      <button id="backToGamesTF" class="btn-secondary">Back to Games</button>
    `;
    container.appendChild(resultEl);

    document.getElementById('restartTF').addEventListener('click', () => {
      tfIndex = 0;
      tfScore = 0;
      loadTrueFalseGame(container, onBack);
    });

    document.getElementById('backToGamesTF').addEventListener('click', () => {
      onBack();
    });

    return;
  }

  const current = trueFalseData[tfIndex];

  const statementEl = document.createElement('h2');
  statementEl.className = 'quiz-question';
  statementEl.textContent = `True or False: ${current.statement}`;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'tf-buttons';

  ['True', 'False'].forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'tf-btn';
    btn.textContent = choice;
    btn.onclick = () => handleTFAnswer(choice === 'True', current.answer, container, onBack);
    buttonsDiv.appendChild(btn);
  });

  container.appendChild(statementEl);
  container.appendChild(buttonsDiv);
}

function handleTFAnswer(selected, correctAnswer, container, onBack) {
  const resultText = document.createElement('p');
  resultText.className = 'tf-feedback';

  if (selected === correctAnswer) {
    tfScore++;
    resultText.textContent = 'Correct!';
    resultText.style.color = '#27ae60';
  } else {
    resultText.textContent = 'Incorrect.';
    resultText.style.color = '#e74c3c';
  }

  container.appendChild(resultText);

  [...container.querySelectorAll('.tf-btn')].forEach(btn => btn.disabled = true);

  tfIndex++;
  setTimeout(() => {
    loadTrueFalseGame(container, onBack);
  }, 1400);
}
