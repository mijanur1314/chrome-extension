chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "getCurrentTime") {
        const video = document.querySelector('video');
        if (video) {
          sendResponse({ currentTime: video.currentTime });
        } else {
          sendResponse({ error: "No video found" });
        }
      }
      return true;
    });
    
    