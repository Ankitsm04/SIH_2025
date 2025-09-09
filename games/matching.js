const matchingData = [
  { term: "Gravity", definition: "A force that pulls objects toward Earth" },
  { term: "Atom", definition: "The smallest unit of an element" },
  { term: "Evaporation", definition: "Process of liquid turning into vapor" },
  { term: "Photosynthesis", definition: "Plants making food from sunlight" }
];

let selectedTerm = null;
let matches = [];

function loadMatchingGame(container, onBack) {
  container.innerHTML = '';

  if (matches.length === matchingData.length) {
    container.innerHTML = `
      <div class="quiz-result">
        <h2>All pairs matched!</h2>
        <button id="restartMatching" class="btn-primary">Restart</button>
        <button id="backToGames" class="btn-secondary">Back to Games</button>
      </div>
    `;
    document.getElementById('restartMatching').onclick = () => {
      matches = [];
      loadMatchingGame(container, onBack);
    };
    document.getElementById('backToGames').onclick = () => onBack();
    return;
  }

  container.innerHTML = `
    <h2 class="quiz-question">Match each STEM term to its correct definition:</h2>
    <div class="matching-columns">
      <ul id="terms" class="matching-list"></ul>
      <ul id="definitions" class="matching-list"></ul>
    </div>
    <button id="backToGames" class="btn-secondary" style="margin-top:2rem;">Back to Games</button>
  `;

  document.getElementById('backToGames').onclick = () => onBack();

  // Shuffle terms and definitions, but only show unmatched
  const unmatchedTerms = matchingData.filter(x => !matches.includes(x.term));
  const terms = unmatchedTerms.map(x => x.term);
  const definitions = unmatchedTerms.map(x => x.definition);
  terms.sort(() => Math.random() - 0.5);
  definitions.sort(() => Math.random() - 0.5);

  // Render terms
  const termsList = document.getElementById('terms');
  terms.forEach(term => {
    const li = document.createElement('li');
    li.textContent = term;
    li.className = 'matching-item';
    li.onclick = () => selectMatchingTerm(li, term);
    termsList.appendChild(li);
  });

  // Render definitions
  const defsList = document.getElementById('definitions');
  definitions.forEach(def => {
    const li = document.createElement('li');
    li.textContent = def;
    li.className = 'matching-item';
    li.onclick = () => tryMatching(def, container, onBack);
    defsList.appendChild(li);
  });
}

function selectMatchingTerm(element, term) {
  document.querySelectorAll('.matching-item.selected').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  selectedTerm = term;
}

function tryMatching(definition, container, onBack) {
  if (!selectedTerm) return;
  const matchObj = matchingData.find(x => x.term === selectedTerm && x.definition === definition);
  if (matchObj) {
    matches.push(selectedTerm);
  }
  selectedTerm = null;
  loadMatchingGame(container, onBack);
}
