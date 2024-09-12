document.getElementById('bookmarkBtn').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "getCurrentTime" }, (response) => {
          if (response && response.currentTime) {
            const bookmark = {
              url: activeTab.url,
              time: response.currentTime
            };
            chrome.runtime.sendMessage({ action: "saveBookmark", bookmark }, (res) => {
              if (res.status === "success") {
                loadBookmarks();
              }
            });
          }
        });
      });
    });
    
    function loadBookmarks() {
      chrome.storage.sync.get("bookmarks", (data) => {
        const bookmarks = data.bookmarks;
        const bookmarksContainer = document.getElementById('bookmarks');
        bookmarksContainer.innerHTML = "";
        bookmarks.forEach((bookmark, index) => {
          const div = document.createElement('div');
          div.classList.add('bookmark');
          const link = document.createElement('a');
          link.href = bookmark.url + "&t=" + Math.floor(bookmark.time) + "s";
          link.target = "_blank";
          link.textContent = "Bookmark " + (index + 1) + " - " + formatTime(bookmark.time);
          div.appendChild(link);
          bookmarksContainer.appendChild(div);
        });
      });
    }
    
    function formatTime(seconds) {
      const date = new Date(0);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
    }
    
    document.addEventListener('DOMContentLoaded', loadBookmarks);
    