let isEnabled = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    isEnabled = request.enabled;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Ad Skipper installed.");
});
