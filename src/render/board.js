
export default class Board {
  swimlanes = {}
  columns = []

  containsSwimlane = (swimlane) => !!this.swimlanes[swimlane.name]

  addSwimlane = (swimlane) => {
    this.swimlanes[swimlane.name] = swimlane
    this.columns[1].insertBefore(swimlane.marker, this.columns[1].querySelector('ul'))
  }

  addColumn(column) {
    this.columns.push(column.getCardAreaNode())
  }
}
export class BoardColumn {
  constructor(node) {
    this.node = node
  }

  getCardAreaNode() {
    return this.node.querySelector('.board-list-component')
  }
}
