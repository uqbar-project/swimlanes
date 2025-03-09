export default class Card {
  constructor(node) {
    this.cardNode = node
  }

  getMilestone = () => {
    const div = this.cardNode.querySelector('.issue-milestone-details')
    if (!div) return null

    // TODO better milestone modelling, this could be somewhere else.
    const name = this.cardNode.querySelector('span.milestone-title').innerText
    const marker = div.cloneNode(true)
    marker.classList.add('board-card', 'gl-w-full', 'gl-text-sm', 'gl-text-subtle', 'gl-p-2');
    marker.classList.remove('gl-max-w-15');

    return { name, marker }
  }
}
