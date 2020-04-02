const getVisibleBookmarks = (bookmarks, { text, show }, user) => {

  const textFiltered = bookmarks.filter(bookmark => {
    return bookmark.name.toLowerCase().includes(text.toLowerCase());
  });

  if (show === 'public') return textFiltered.filter(bookmark => bookmark.is_public);
  if (show === 'user') return textFiltered.filter(bookmark => bookmark.user.username === user);

  return textFiltered;
};

export default getVisibleBookmarks;
