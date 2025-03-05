console.log("Gitlab Swimlanes extension init.");
const milestones = new Set()

// Wait for the DOM to load
if (document.readyState === "loading") {
  console.log("Init with event listener")
  document.addEventListener("DOMContentLoaded", initExtension);
} else {
  console.log("Already loaded init immediately")
  initExtension();
}

function initExtension() {
  observeTimeout();
  console.log("Gitlab Swimlanes extension loaded.")
  chrome.runtime.sendMessage({ type: "pageLoaded" });

  // // Create a container for the board
  const boardContainer = document.createElement("div");
  boardContainer.id = "custom-board";
  // // Insert the container at the beginning of the body
  // document.body.prepend(boardContainer);

  // // Add a test message visible to the user in Spanish
  // boardContainer.innerHTML = "<h1>Tablero de GitLab</h1>";

  const boardsList = document.querySelector('[data-testid="boards-list"]');
  boardsList.classList.add('swimlanes');
  console.log(boardsList);

  const originalSwimlane = boardsList.firstElementChild;
  console.log(originalSwimlane);
  console.log("Cantidad de elementos hijos:", originalSwimlane.children.length);
  console.log("Cantidad de nodos (incluyendo textos):", originalSwimlane.childNodes.length);

  observeMutations(originalSwimlane, mutation => {
    // Verificamos si se agregaron nodos
    mutation.addedNodes.forEach(addedNode => {
      // console.log(addedNode)

      // Aseguramos que sea un nodo de elemento
      if (addedNode.nodeType === Node.ELEMENT_NODE) {
        // Por ejemplo, si queremos detectar nodos con la clase "board"
        if (addedNode.matches && addedNode.matches('[data-testid="board-list"]')) {
          // console.log('Nodo .board agregado:', addedNode);
          // Aquí puedes ejecutar la manipulación que necesites
          // newSwimlane.insertBefore(addedNode.cloneNode(true), initialContent);
        }

        if (addedNode.classList.contains('board-card')) {
          const milestoneSpan = addedNode.querySelector('span.milestone-title')
          milestones.add(milestoneSpan?.innerText);
        }
      }
    });
  })
};

function observeMutations(targetNode, onMutation) {
  // Configuramos las opciones del observer para que escuche adiciones en todo el subárbol
  const config = { childList: true, subtree: true };

  // Callback que se ejecuta cuando hay cambios en el DOM
  const callback = (mutationsList, observer) => {
    mutationsList.forEach(onMutation);
  };

  // Creamos el observer
  const observer = new MutationObserver(callback);

  // Iniciamos la observación en el nodo objetivo
  observer.observe(targetNode, config);

}

function observeTimeout() {
  console.log("OBserving mutations")
  let mutationTimeout;

  const observer = new MutationObserver((mutationsList) => {
    clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => {
      console.log(milestones)
    }, 200); // espera 500 ms sin cambios
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
