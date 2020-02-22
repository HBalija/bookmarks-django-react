const getVisibleBookmarks = (bookmarks, { text }) => {
  return bookmarks.filter(bookmark =>  {
    return bookmark.name.toLowerCase().includes(text.toLowerCase());
  });
};

export default getVisibleBookmarks;
