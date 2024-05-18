function removeGameFinalizedToken() {
  localStorage.removeItem("gameIsFinalizated");
}

if (!localStorage.getItem("gameIsFinalizated"))
  window.location.href = "../index.html";
