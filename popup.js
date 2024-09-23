let isSkippingEnabled = true; // Initial state

// Get references to elements
const toggleButton = document.getElementById('toggleButton');
const statusDiv = document.getElementById('status');
const buttonVisibilityDiv = document.getElementById('buttonVisibility');

// Update the button and status on popup open
chrome.runtime.getBackgroundPage((background) => {
    isSkippingEnabled = background.isEnabled; // Access the state from the background
    updateUI();
});

// Toggle ad skipping
toggleButton.addEventListener('click', () => {
    isSkippingEnabled = !isSkippingEnabled;
    chrome.runtime.sendMessage({ action: "toggle", enabled: isSkippingEnabled });
    updateUI();
});

// Update the UI based on current state
function updateUI() {
    toggleButton.textContent = isSkippingEnabled ? 'Disable Ad Skipping' : 'Enable Ad Skipping';
    statusDiv.textContent = `Ad Skipping is ${isSkippingEnabled ? 'enabled' : 'disabled'}.`;
    checkSkipButtonStatus();
}

// Check if the skip button is visible
function checkSkipButtonStatus() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                const skipButton = document.querySelector('.ytp-skip-ad-button');
                return skipButton && skipButton.style.opacity === '1' && skipButton.style.display !== 'none';
            }
        }, (results) => {
            const isVisible = results[0]?.result;
            buttonVisibilityDiv.textContent = `Skip Button Status: ${isVisible ? 'Visible' : 'Not Visible'}`;
        });
    });
}
