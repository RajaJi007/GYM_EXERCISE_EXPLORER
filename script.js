
const CONFIG = {
  API_BASE_URL: "https://api.api-ninjas.com/v1/exercises",
  API_KEY: "CCBJD23xJBcF0Ozq8jX7yZ6wigQ1ABPGqPWXy2MZ",
  DEFAULT_LIMIT: 15,
};
const DOM = {
  muscleFilter: document.getElementById("muscleFilter"),
  difficultyFilter: document.getElementById("difficultyFilter"),
  typeFilter: document.getElementById("typeFilter"),
  fetchBtn: document.getElementById("fetchBtn"),
  retryBtn: document.getElementById("retryBtn"),
  sortBtn: document.getElementById("sortBtn"),
  loadingState: document.getElementById("loadingState"),
  errorState: document.getElementById("errorState"),
  errorMsg: document.getElementById("errorMsg"),
  promptState: document.getElementById("promptState"),
  resultsHeader: document.getElementById("resultsHeader"),
  resultsCount: document.getElementById("resultsCount"),
  exerciseGrid: document.getElementById("exerciseGrid"),
  statusDot: document.getElementById("statusDot"),
  statusLabel: document.getElementById("statusLabel"),
  searchInput: document.getElementById("searchInput"),
  favoritesList: document.getElementById("favoritesList"),
};

let appState = {
  exercises: [],
  sortAscending: true,
};
/**
@param {Object} params 
@returns {string}
 */
function buildQueryString(params) {
  const queryParts = Object.entries(params)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
}

/**
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
async function fetchExercises(filters) {
  const queryString = buildQueryString(filters);
  const url = `${CONFIG.API_BASE_URL}${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": CONFIG.API_KEY,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error ${response.status}: ${errorBody || response.statusText}`);
  }

  const data = await response.json();
  return data;
}
/**
 * @param {'ready' | 'loading' | 'active' | 'error'} state
 * @param {string} label
 */
function handleSearch() {
  const searchTerm = DOM.searchInput.value.toLowerCase();
  const filtered = appState.exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm)
  );
  renderGrid(filtered);
}
function setStatus(state, label) {
  DOM.statusDot.className = `status-dot ${state}`;
  DOM.statusLabel.textContent = label;
}

/**
 * @param {'loading' | 'error' | 'prompt' | 'results'} panel
 */
function showPanel(panel) {
  const panels = [
    { key: "loading", el: DOM.loadingState },
    { key: "error", el: DOM.errorState },
    { key: "prompt", el: DOM.promptState },
    { key: "results", el: DOM.resultsHeader },
    { key: "results", el: DOM.exerciseGrid },
  ];

  panels.forEach(({ key, el }) => {
    el.classList.toggle("hidden", key !== panel);
  });
}

/**
 * @param {string} difficulty
 * @returns {string}
 */
function createDifficultyBadge(difficulty) {
  const level = difficulty?.toLowerCase() || "unknown";
  return `<span class="badge badge-diff" data-level="${level}">${capitalize(level)}</span>`;
}

/**
 * @param {string} type
 * @returns {string}
 */
function createTypeBadge(type) {
  const label = type?.replace(/_/g, " ") || "—";
  return `<span class="badge badge-type">${capitalize(label)}</span>`;
}

/**
 * @param {Object} exercise
 * @param {number} index
 * @returns {string}
 */
function renderExerciseCard(exercise, index) {
  const {
    name = "Unknown Exercise",
    type = "",
    muscle = "—",
    equipment = "—",
    difficulty = "",
    instructions = "No instructions provided.",
  } = exercise;

  const equipmentIcon = equipment === "body_only" ? "🤸" : "🏋";
  const equipmentLabel = equipment.replace(/_/g, " ");

  return `
    <article class="exercise-card" role="listitem" tabindex="0" aria-label="${name}">
      <span class="card-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>

      <div class="card-header">
        <h3 class="card-name">${name}</h3>
        <div class="card-badges">
          ${createTypeBadge(type)}
          ${createDifficultyBadge(difficulty)}
        </div>
      </div>

      <div class="card-divider" aria-hidden="true"></div>

      <div class="card-body">
        <div class="card-row">
          <span class="card-row-label">Muscle</span>
          <span class="card-row-value">${muscle.replace(/_/g, " ")}</span>
        </div>
        <div class="card-row">
          <span class="card-row-label">Equipment</span>
          <span class="card-row-value">${equipmentLabel}</span>
        </div>
        <p class="card-instructions">${instructions}</p>
      </div>

      <div class="card-footer">
        <span class="equipment-tag">${equipmentIcon} ${equipmentLabel}</span>
      </div>
    </article>
  `;
}

/**
 * @param {Array} exercises
 */
function renderGrid(exercises) {
  const cardsHTML = exercises
    .map((exercise, index) => renderExerciseCard(exercise, index))
    .join("");
  DOM.exerciseGrid.innerHTML = cardsHTML;
  const cardCount = exercises.length;
  DOM.resultsCount.textContent = `${cardCount} exercise${cardCount !== 1 ? "s" : ""} found`;
}
/**
 * @param {string} message
 */
function renderError(message) {
  DOM.errorMsg.textContent = message;
  showPanel("error");
  setStatus("error", "Error");
}

/**
 * @param {Array}   exercises
 * @param {boolean} ascending
 * @returns {Array}
 */
function sortExercises(exercises, ascending) {
  return [...exercises].sort((a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();
    return ascending
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
}
async function handleFetch() {
  const filters = {
    muscle: DOM.muscleFilter.value,
    difficulty: DOM.difficultyFilter.value,
    type: DOM.typeFilter.value,
  };
  showPanel("loading");
  setStatus("loading", "Fetching...");
  DOM.fetchBtn.disabled = true;

  try {
    const rawData = await fetchExercises(filters);
    appState.exercises = rawData.slice(0, CONFIG.DEFAULT_LIMIT);
    appState.sortAscending = true;
    DOM.sortBtn.textContent = "Sort A–Z";

    if (appState.exercises.length === 0) {
      renderError("No exercises found for the selected filters. Try a different combination.");
      return;
    }
    const sortedExercises = sortExercises(appState.exercises, appState.sortAscending);
    renderGrid(sortedExercises);
    showPanel("results");
    setStatus("active", `${appState.exercises.length} loaded`);

  } catch (error) {
    console.error("[IronTrack] Fetch failed:", error);
    renderError(error.message || "An unexpected error occurred. Please try again.");

  } finally {
    DOM.fetchBtn.disabled = false;
  }
}
function handleSort() {
  appState.sortAscending = !appState.sortAscending;
  DOM.sortBtn.textContent = appState.sortAscending ? "Sort A–Z" : "Sort Z–A";

  const sorted = sortExercises(appState.exercises, appState.sortAscending);
  renderGrid(sorted);
}

function toggleFavorite(name) {
  let favorites = JSON.parse(localStorage.getItem("favExercises")) || [];
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
  } else {
    favorites.push(name);
  }
  localStorage.setItem("favExercises", JSON.stringify(favorites));
  alert(`${name} updated in favorites!`);
}
function toggleFavorite(name) {
  let favorites = JSON.parse(localStorage.getItem("favExercises")) || [];
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
    alert(`${capitalize(name)} removed from favorites!`);
  } else {
    favorites.push(name);
    alert(`${capitalize(name)} saved to favorites!`);
  }
  localStorage.setItem("favExercises", JSON.stringify(favorites));
}
/**
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

DOM.fetchBtn.addEventListener("click", handleFetch);
DOM.retryBtn.addEventListener("click", handleFetch);
DOM.sortBtn.addEventListener("click", handleSort);
DOM.searchInput.addEventListener("input", handleSearch);

[DOM.muscleFilter, DOM.difficultyFilter, DOM.typeFilter].forEach(select => {
  select.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleFetch();
  });
});

setStatus("ready", "Ready");
showPanel("prompt");

console.log("%c[IronTrack] Script loaded. Ready to fetch exercises.", "color: #e8ff47; font-weight: bold;");
