import { BoardColumn } from "../render/board.js"

export const onColumnNodeAdded = (node, callback) => {
  if (node.matches && node.matches('[data-testid="board-list"]')) {
    callback(new BoardColumn(node))
  }
}
