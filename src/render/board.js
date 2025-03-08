
export default class Board {
  swimlanes = {}
  boardLists = []

  containsSwimlane = (swimlane) => !!this.swimlanes[swimlane.name]

  addSwimlane = (swimlane) => {
    this.swimlanes[swimlane.name] = swimlane
    this.boardLists[1].insertBefore(swimlane.marker, this.boardLists[1].querySelector('ul'))
  }

  addBoardList(boardList) {
    this.boardLists.push(boardList)
  }
}

