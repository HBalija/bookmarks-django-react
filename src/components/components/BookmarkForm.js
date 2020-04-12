import React, { useState } from 'react';


const BookmarkForm = props => {

  const bookmark = props.bookmark;

  const [name, setName] = useState(bookmark ? bookmark.name: '');
  const [description, setDescription] = useState(bookmark ? bookmark.description: '');
  const [bookmark_link, setBookmarkLink] = useState(bookmark ? bookmark.bookmark_link: '');
  const [is_public, setIsPublic] = useState(bookmark ? bookmark.is_public: '');
  const [error, setError] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    if (!name || !bookmark_link) {
      setError('Please provide name and bookmark link.');
    } else {
      setError('');

      // submit the form (logic is in add / edit bookmark)
      props.onSubmit({ name, description, bookmark_link, is_public });
    }
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <div className="center-container">
        <form onSubmit={submitHandler} className="form">
          <input
            className="text-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus />
          <input
            className="text-input"
            type="url"
            value={bookmark_link}
            onChange={e => setBookmarkLink(e.target.value)}
            placeholder="Bookmark Link" />
          <label
            className="checkbox-label"
            htmlFor="bookmark_link">
            <input
              className="checkbox"
              id="bookmark_link"
              type="checkbox"
              onChange={e => setIsPublic(e.target.checked)}
              defaultChecked={is_public}
              value={bookmark_link} />
            <span>Is bookmark public?</span>
          </label>
          <textarea
            className="textarea"
            placeholder="Add a description for your bookmark (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4">
          </textarea>
          <button>{props.action}</button>
        </form>
      </div>
    </>
  );
};

export default BookmarkForm;
