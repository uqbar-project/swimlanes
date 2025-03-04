console.log("fetch")

// content.js
function injectFetchOverride() {
  const script = document.createElement("script");
  script.textContent = `
    (function() {
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        if (args[0] && args[0].includes('/api/graphql')) {
          console.log("Intercepted GraphQL fetch (in page context):", args);
          // Despacha un evento personalizado para que el content script lo capture, si lo deseas
          window.dispatchEvent(new CustomEvent("graphqlFetchDetected", { detail: args }));
        }
        return originalFetch.apply(this, args);
      };
    })();
  `;
  // Inserta el script en el head o en el documentElement
  document.documentElement.appendChild(script);
  // Opcionalmente, remuévelo después de inyectarlo
  script.remove();
}

injectFetchOverride();
