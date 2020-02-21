const getVisibleBookmarks = (bookmarks, { text }) => {
  return bookmarks.filter(bookmark =>  {
    return bookmark.title.toLowerCase().includes(text.toLowerCase());
  });
};

export default getVisibleBookmarks;
