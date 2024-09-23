let isEnabled = true; // Default state

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isEnabled });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
        isEnabled = request.enabled;
        chrome.storage.local.set({ isEnabled });
        sendResponse({ success: true });
    }
});
