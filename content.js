const defined = (v) => v !== null && v !== undefined;

const createPointerEvent = (type, element) => {
  const event = new PointerEvent(type, {
    bubbles: true,
    cancelable: true,
    pointerType: 'mouse',
  });
  element.dispatchEvent(event);
};

const clickSkipButton = () => {
  const skipButton = document.querySelector(".ytp-skip-ad-button");
  const skipButtonModern = document.querySelector(".ytp-ad-skip-button-modern");

  if (defined(skipButton) && skipButton.style.opacity === '1' && skipButton.style.display !== 'none') {
    createPointerEvent('pointerdown', skipButton);
    createPointerEvent('pointerup', skipButton);
    return true;
  }

  if (defined(skipButtonModern) && skipButtonModern.style.opacity === '1' && skipButtonModern.style.display !== 'none') {
    createPointerEvent('pointerdown', skipButtonModern);
    createPointerEvent('pointerup', skipButtonModern);
    return true;
  }

  return false;
};

const clickConfirmDialogButton = () => {
  const confirmButton = document.querySelector(".style-scope.yt-confirm-dialog-renderer");

  if (defined(confirmButton)) {
    createPointerEvent('pointerdown', confirmButton);
    createPointerEvent('pointerup', confirmButton);
  }
};

const stopYoutubeAd = () => {
  const adElement = document.querySelector(".ad-showing.ad-interrupting video");

  if (adElement && adElement.readyState >= 3) {
    adElement.currentTime = adElement.duration - 1;
  }

  clickSkipButton();

  const overlayAds = document.querySelectorAll(".ytp-ad-overlay-slot");
  overlayAds.forEach((overlayAd) => {
    overlayAd.style.visibility = "hidden";
  });
};

// Check for ads every second
setInterval(stopYoutubeAd, 1000);
