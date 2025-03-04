var counter = 0;

(function () {
  console.log("fetchOverride started")
  var originalFetch = window.fetch;

  window.fetch = function (...args) {
    if (args[0] && args[0].includes('/api/graphql')) {
      const body = JSON.parse(args[1].body);;
      console.log("fetchOverride", body);

      window.dispatchEvent(new CustomEvent("graphqlFetchDetected", { detail: args }));
    }
    return originalFetch.apply(this, args);

  };
  console.log("fetchOverride finished")
})();

