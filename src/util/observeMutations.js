export function observeTimeout(callback, timeout = 200) {
  let mutationTimeout;

  observeMutations(document.body, () => {
    clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(callback, timeout);
  })
}

export function observeEachMutation(targetNode, onMutation) {
  observeMutations(targetNode, mutationsList => mutationsList.forEach(onMutation))
}

export function observeMutations(targetNode, callback, config = { childList: true, subtree: true }) {
  new MutationObserver(callback).observe(targetNode, config);
}
