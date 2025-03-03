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
  console.log("getBody", details.requestBody.raw, details.requestBody.raw.length)
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