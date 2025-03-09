export default class Card {
  constructor(node) {
    this.cardNode = node
  }

  get milestone() {
    // undefined value means yet not computed, while null value means the card has no milestone
    if (this._milestone === undefined) {
      const milestoneNode = this.cardNode.querySelector('.issue-milestone-details')
      this._milestone = milestoneNode ? new Milestone(milestoneNode) : null
    }

    return this._milestone
  }
}

export class Milestone {
  constructor(node) {
    this.node = node
    this.name = node.querySelector('span.milestone-title').innerText
  }

  createMarker = () => {
    const marker = this.node.cloneNode(true)
    marker.classList.add('board-card', 'gl-w-full', 'gl-text-sm', 'gl-text-subtle', 'gl-p-2');
    marker.classList.remove('gl-max-w-15');
    return marker
  }
}