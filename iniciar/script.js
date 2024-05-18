let initialPoint = 0;
const words = [
  { id: 0, name: "one", point: 2 },
  { id: 1, name: "two", point: 4 },
  { id: 2, name: "three", point: 6 },
  { id: 3, name: "for", point: 8 },
  { id: 4, name: "five", point: 10 },
];
const phasesElements = [];
let selectedPhase = words[0];
let isError = false;
let maxPoints = 0;

localStorage.removeItem("gameIsFinalizated");

words.forEach((phase) => (maxPoints += phase.point));

function populatePoints() {
  document.getElementById(
    "pointing"
  ).innerText = `${initialPoint} / ${maxPoints}`;
}

populatePoints();

function splicePhaseWord() {
  phaseWordElement.innerText = selectedPhase.name.slice(
    0,
    selectedPhase.name.length <= 3
      ? selectedPhase.name.length - 1
      : selectedPhase.name.length - 2
  );
}

function populateErrorField(valueTextError) {
  document.getElementById("text-error").innerText = valueTextError;
}

function submitForm(event) {
  isError = false;
  populateErrorField("");
  event?.preventDefault();

  const typedWord = document.getElementById("word-writed").value;

  if (!typedWord) {
    populateErrorField("Campo obrigatorio!");
    isError = true;
    return;
  }

  if (typedWord !== selectedPhase.name) {
    populateErrorField("Xiii, resposta errada, tente novamente!");
    isError = true;
    return;
  }

  initialPoint += selectedPhase.point;
  if (selectedPhase.id === 4) {
    window.location.href = "/finalizado";
    localStorage.setItem("gameIsFinalizated", true);
  }

  selectedPhase = words[selectedPhase.id + 1];
  document.getElementById("word-writed").value = "";

  populatePoints();
  splicePhaseWord();
}

const phaseWordElement = document.getElementById("phase-word");
splicePhaseWord();

phaseWordElement.addEventListener("mouseenter", () => {
  phaseWordElement.innerText = selectedPhase.name;
});

phaseWordElement.addEventListener("mouseleave", () => {
  splicePhaseWord();
});

const elementGamePhases = document.getElementById("game-phases");

words.forEach((item, index) => {
  const element = document.createElement("span");
  element.id = `phase-${index}`;
  element.classList.add("phase");
  element.innerText = `Fase ${index + 1}`;

  phasesElements.push(element);
});

phasesElements.map((item) => {
  elementGamePhases.append(item);
});
