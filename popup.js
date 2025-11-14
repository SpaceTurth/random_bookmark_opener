function collectBookmarks(nodes, bookmarks = []) {
  for (let node of nodes) {
    if (node.url) {
      bookmarks.push(node);
    }
    if (node.children) {
      collectBookmarks(node.children, bookmarks);
    }
  }
  return bookmarks;
}

// When the button is clicked, retrieve bookmarks, pick one at random, and open it.
document.getElementById("push-btn").addEventListener("click", () => {
  browser.bookmarks.getTree()
    .then(bookmarkTreeNodes => {
      const allBookmarks = collectBookmarks(bookmarkTreeNodes);
      if (allBookmarks.length === 0) {
        console.error("No bookmarks found!");
        return;
      }
      const randomIndex = Math.floor(Math.random() * allBookmarks.length);
      const randomBookmark = allBookmarks[randomIndex];
      // Open the random bookmark in a new tab
      browser.tabs.create({ url: randomBookmark.url });
    })
    .catch(error => {
      console.error("Error retrieving bookmarks:", error);
    });
});
