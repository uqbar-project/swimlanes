import { observeTimeout, observeEachMutation } from './util/observeMutations.js';
import { getMilestone } from './model/card.js'
import { onColumnNodeAdded } from './inspect'
import Board from './render/board.js';

export default function main() {
  const boardsList = document.querySelector('[data-testid="boards-list"]');
  boardsList.classList.add('swimlanes');
  console.log(boardsList);

  const originalSwimlane = boardsList.firstElementChild;
  console.log(originalSwimlane);
  console.log("Cantidad de elementos hijos:", originalSwimlane.children.length);
  console.log("Cantidad de nodos (incluyendo textos):", originalSwimlane.childNodes.length);

  observeTimeout(() => console.log("Render finished", board.swimlanes), 500);

  const board = new Board()

  observeEachMutation(originalSwimlane, mutation => {
    mutation.removedNodes.forEach(removedNode => console.log("removed", removedNode))

    // Verificamos si se agregaron nodos
    mutation.addedNodes.forEach(addedNode => {
      // Aseguramos que sea un nodo de elemento
      if (addedNode.nodeType === Node.ELEMENT_NODE) {
        onColumnNodeAdded(addedNode, column => board.addColumn(column))

        // newSwimlane.insertBefore(addedNode.cloneNode(true), initialContent);

        if (addedNode.classList.contains('board-card')) {
          const milestone = getMilestone(addedNode)
          if (milestone && !board.containsSwimlane(milestone)) {
            board.addSwimlane(milestone)
          }
        }
      }
    });
  })
}