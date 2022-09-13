try{
  browser = chrome;
} catch {
  window.browser = (() => window.msBrowser || window.browser || window.chrome)();
}

let isExtensionOn = true;

browser.runtime.onInstalled.addListener(function() {
  browser.storage.local.set({ isExtensionOn });
});

browser.action.onClicked.addListener(() => {
  isExtensionOn = !isExtensionOn;
  browser.storage.local.set({ isExtensionOn });
  browser.action.setTitle({
    title: isExtensionOn ? 'Maken all the things!' : 'Maken disabled :('
  });
  browser.action.setIcon({
    path: isExtensionOn ? "icons/icon.png" : "icons/icon-disabled.png"
  });
});

