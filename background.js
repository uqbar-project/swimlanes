console.log("Gitlab Swimlanes worker started")

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes('/api/graphql') && details.requestBody) {
      const request = getBody(details)
      console.log("Intercepted GraphQL request:", request.query, request.variables);
    }
  },
  { urls: ["*://gitlab.arba.gov.ar/*"] },
  ["requestBody"]
);

function getBody(details) {
  if (details.requestBody.raw && details.requestBody.raw.length) {
    const decoder = new TextDecoder('utf-8');

    // Decodificamos cada fragmento y los unimos en un solo string
    const requestBodyString = details.requestBody.raw
      .map(element => decoder.decode(element.bytes))
      .join('');
    console.log("Request payload as string:", requestBodyString);

    // Intentamos parsearlo como JSON
    try {
      return JSON.parse(requestBodyString);;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "pageLoaded" && sender.tab) {
    console.log("Mensaje 'pageLoaded' recibido del tab:", {
      id: sender.tab.id,
      title: sender.tab.title,
      url: sender.tab.url
    });
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['fetchOverride.js'],
      world: 'MAIN'
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("Error inyectando fetchOverride.js:", chrome.runtime.lastError);
      } else {
        console.log("fetchOverride.js inyectado correctamente en el tab", sender.tab.id);
      }
    });
  }
});
