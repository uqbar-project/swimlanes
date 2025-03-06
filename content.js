console.log("Gitlab Swimlanes extension init.");

// Wait for the DOM to load
if (document.readyState === "loading") {
  console.log("Init with event listener")
  document.addEventListener("DOMContentLoaded", initExtension);
} else {
  console.log("Already loaded init immediately")
  initExtension();
}

function initExtension() {
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

  const milestones = {}
  const boardLists = []
  observeTimeout(() => console.log(milestones));

  observeEachMutation(originalSwimlane, mutation => {
    // Verificamos si se agregaron nodos
    mutation.addedNodes.forEach(addedNode => {
      // console.log(addedNode)

      // Aseguramos que sea un nodo de elemento
      if (addedNode.nodeType === Node.ELEMENT_NODE) {
        // Por ejemplo, si queremos detectar nodos con la clase "board"
        if (addedNode.matches && addedNode.matches('[data-testid="board-list"]')) {
          console.log("new board", boardLists)
          boardLists.push(addedNode.querySelector('.board-list-component'))
          // board-list-component
          // console.log('Nodo .board agregado:', addedNode);
          // Aquí puedes ejecutar la manipulación que necesites
          // newSwimlane.insertBefore(addedNode.cloneNode(true), initialContent);
        }

        if (addedNode.classList.contains('board-card')) {
          const milestoneDiv = addedNode.querySelector('.issue-milestone-details')
          if (milestoneDiv) {
            const milestoneName = addedNode.querySelector('span.milestone-title').innerText
            if (!milestones[milestoneName]) {
              console.log("new milestone", boardLists)
              milestones[milestoneName] = milestoneDiv.cloneNode(true)
              boardLists[1].insertBefore(milestones[milestoneName], boardLists[1].querySelector('ul'))
            }
          }
        }
      }
    });
  })
};

function observeTimeout(callback, timeout = 200) {
  let mutationTimeout;

  observeMutations(document.body, () => {
    clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(callback, timeout);
  })
}

function observeEachMutation(targetNode, onMutation) {
  observeMutations(targetNode, mutationsList => mutationsList.forEach(onMutation))
}

function observeMutations(targetNode, callback, config = { childList: true, subtree: true }) {
  new MutationObserver(callback).observe(targetNode, config);
}
