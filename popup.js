document.addEventListener('DOMContentLoaded', () => {
   const toggleButton = document.getElementById('toggleButton');

   // Check the current state of ad skipping
   chrome.storage.local.get(['isEnabled'], (result) => {
       toggleButton.innerText = result.isEnabled ? 'Disable Ad Skipping' : 'Enable Ad Skipping';
   });

   // Add click event listener to the toggle button
   toggleButton.addEventListener('click', () => {
       chrome.storage.local.get(['isEnabled'], (result) => {
           const newState = !result.isEnabled;

           // Update the state in local storage
           chrome.storage.local.set({ isEnabled: newState }, () => {
               toggleButton.innerText = newState ? 'Disable Ad Skipping' : 'Enable Ad Skipping';
           });
       });
   });
});
