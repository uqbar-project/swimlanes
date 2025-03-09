import main from './main.js';

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExtension);
} else {
  initExtension();
}

function initExtension() {
  console.log("Gitlab Swimlanes extension loaded.")
  chrome.runtime.sendMessage({ type: "pageLoaded" });
  main()
};
