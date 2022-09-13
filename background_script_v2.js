window.browser = (() => window.msBrowser || window.browser || window.chrome)();

let isExtensionOn = true;

browser.runtime.onInstalled.addListener(function() {
  browser.storage.local.set({ isExtensionOn });
});

browser.browserAction.onClicked.addListener(() => {
  isExtensionOn = !isExtensionOn;
  browser.storage.local.set({ isExtensionOn });
  browser.browserAction.setTitle({
    title: isExtensionOn ? 'Maken all the things!' : 'Maken disabled:('
  });
  browser.browserAction.setIcon({
    path: isExtensionOn ? "icons/icon.png" : "icons/icon-disabled.png"
  });
});

