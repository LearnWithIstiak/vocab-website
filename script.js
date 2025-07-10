let vocab = [];
let currentPage = 1;
const wordsPerPage = 30;
let filteredVocab = [];

const container = document.getElementById("cards-container");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const searchInput = document.getElementById("search-input");
const posFilter = document.getElementById("pos-filter");
const toggleDark = document.getElementById("toggle-dark");

fetch("vocab-data.json")
  .then((res) => res.json())
  .then((data) => {
    vocab = data;
    filteredVocab = vocab;
    renderPage();
  });

function renderPage() {
  const start = (currentPage - 1) * wordsPerPage;
  const end = start + wordsPerPage;
  const pageWords = filteredVocab.slice(start, end);

  container.innerHTML = "";

  pageWords.forEach((wordObj) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${wordObj.word}</h2>
      ${wordObj.definitions
        .map(
          (def) => `
        <p><strong>Part of speech:</strong> ${def.part_of_speech}</p>
        <p><strong>Definition:</strong> ${def.definition}</p>
        <p><strong>Example:</strong> ${def.sentence}</p>
        <p><strong>Synonyms:</strong> ${def.synonyms.join(", ")}</p>
        <hr>
      `
        )
        .join("")}
    `;
    container.appendChild(card);
  });

  const totalPages = Math.ceil(filteredVocab.length / wordsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredVocab.length / wordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

searchInput.addEventListener("input", () => {
  filterWords();
});

posFilter.addEventListener("change", () => {
  filterWords();
});

function filterWords() {
  const query = searchInput.value.toLowerCase();
  const pos = posFilter.value;

  filteredVocab = vocab.filter((wordObj) => {
    const matchesQuery = wordObj.word.toLowerCase().includes(query);
    const matchesPOS =
      !pos || wordObj.definitions.some((d) => d.part_of_speech === pos);
    return matchesQuery && matchesPOS;
  });

  currentPage = 1;
  renderPage();
}

toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});