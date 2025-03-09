import { BoardColumn } from "../render/board.js"
import { Card } from "../model"

export const onColumnNodeAdded = (node, callback) => {
  if (node.matches && node.matches('[data-testid="board-list"]')) {
    callback(new BoardColumn(node))
  }
}

export const onCardNodeAdded = (node, callback) => {
  if (node.classList.contains('board-card')) {
    callback(new Card(node))
  }
}
