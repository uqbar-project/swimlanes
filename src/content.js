import main from './main.js';

console.log("Gitlab Swimlanes extension init.");

// Wait for the DOM to load
if (document.readyState === "loading") {
  console.log("Init with event listener")
  document.addEventListener("DOMContentLoaded", initExtension);
} else {
  console.log("Already loaded init immediately")
  initExtension();
}

function initExtension() {
  console.log("Gitlab Swimlanes extension loaded.")
  chrome.runtime.sendMessage({ type: "pageLoaded" });

  // // Create a container for the board
  const boardContainer = document.createElement("div");
  boardContainer.id = "custom-board";
  // // Insert the container at the beginning of the body
  // document.body.prepend(boardContainer);

  // // Add a test message visible to the user in Spanish
  // boardContainer.innerHTML = "<h1>Tablero de GitLab</h1>";
  main()
};

