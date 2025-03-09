
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

  getCardAreaNode() {
    return this.node.querySelector('.board-list-component')
  }

  addSwimLane = (swimlane) => {
    this.getCardAreaNode().insertBefore(swimlane.createMarker(), this.getCardAreaNode().querySelector('ul'))
  }
}
