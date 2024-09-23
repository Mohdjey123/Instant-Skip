let isEnabled = true; // State to track if ad skipping is enabled

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  isEnabled = !isEnabled; // Toggle the state
  const status = isEnabled ? "enabled" : "disabled";
  console.log(`Ad skipping is now ${status}.`);

  // Send a message to the content script to update its state
  chrome.tabs.sendMessage(tab.id, { action: "toggle", enabled: isEnabled });
});
