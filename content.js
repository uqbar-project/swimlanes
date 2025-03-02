console.log("Gitlab Swimlanes extension init.");

// Wait for the DOM to load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExtension);
} else {
  initExtension();
}

function initExtension() {
  console.log("Gitlab Swimlanes extension loaded.")

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

  const newSwimlane = originalSwimlane.cloneNode(true);
  const initialContent = newSwimlane.firstChild;
  console.log("New swimlane", newSwimlane)

  boardsList.insertBefore(newSwimlane, originalSwimlane.nextSibling)
  observeMutations(originalSwimlane, mutation => {
    // Verificamos si se agregaron nodos
    mutation.addedNodes.forEach(addedNode => {
      console.log(addedNode);

      // Aseguramos que sea un nodo de elemento
      if (addedNode.nodeType === Node.ELEMENT_NODE) {
        // Por ejemplo, si queremos detectar nodos con la clase "board"
        if (addedNode.matches && addedNode.matches('[data-testid="board-list"]')) {
          console.log('Nodo .board agregado:', addedNode);
          // Aquí puedes ejecutar la manipulación que necesites
          newSwimlane.insertBefore(addedNode.cloneNode(true), initialContent);
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