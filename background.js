function executeContentScript(tab) {
  chrome.tabs.sendMessage(tab.id, { toggle: true });
}

if (chrome.action && chrome.action.onClicked) {
  // Manifest V3
  chrome.action.onClicked.addListener(executeContentScript);
} else if (chrome.browserAction && chrome.browserAction.onClicked) {
  // Manifest V2
  chrome.browserAction.onClicked.addListener(executeContentScript);
}