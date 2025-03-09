
export default class Board {
  swimlanes = {}
  columns = []

  containsSwimlane = (swimlane) => !!this.swimlanes[swimlane.name]

  addSwimlane = (swimlane) => {
    this.swimlanes[swimlane.name] = swimlane
    console.log(this.columns[1])
    this.columns[1].addSwimLane(swimlane)
  }

  addColumn(column) {
    this.columns.push(column)
  }
}
export class BoardColumn {
  constructor(node) {
    this.node = node
  }

  get cardArea() {
    return new CardArea(this.node.querySelector('.board-list-component'))
  }

  addSwimLane = (swimlane) => {
    this.cardArea.setMarker(swimlane.createMarker())
    // const originalNode = document.querySelector('#miNodo'); // o cualquier selector que necesites
    // const clonedNode = originalNode.cloneNode(true); // true para clonar recursivamente todos los subnodos
    // originalNode.parentNode.insertBefore(clonedNode, originalNode.nextSibling);

  }
}

/**
 * A CardArea is a subset of the cards in a column, which might have a title or marker, like a specific milestone or label
 */
export class CardArea {
  constructor(node) {
    this.node = node
  }

  setMarker(marker) {
    this.node.insertBefore(marker, this.node.querySelector('ul'))
  }
}
