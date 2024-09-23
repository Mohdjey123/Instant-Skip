document.addEventListener('DOMContentLoaded', () => {
   // Always set ad skipping to enabled
   chrome.storage.local.set({ isEnabled: true }, () => {
       console.log('Ad Skipping is always enabled.');
   });

   const messageElement = document.getElementById('message');
   messageElement.innerText = 'Ad Skipping is enabled.';
});
