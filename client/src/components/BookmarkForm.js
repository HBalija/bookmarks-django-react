import React from 'react';


class BookmarkForm extends React.Component {

  constructor(props) {
    super(props);

    const bookmark = props.bookmark;

    this.state = {
      title: bookmark ? bookmark.title: '',
      description: bookmark ? bookmark.description : '',
      bookmarkLink: bookmark ? bookmark.bookmarkLink : '',
      isPublic: bookmark ? bookmark.isPublic : false,
      error: ''
    };
  }

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onBookmarkLinkChange = e => {
    const bookmarkLink = e.target.value;
    this.setState(() => ({ bookmarkLink }));
  }

  onIsPublicChange = e => {
    const isPublic = e.target.checked;
    this.setState(() => ({ isPublic }));
  }


  onSubmit = e => {
    e.preventDefault();

    if (!this.state.title || !this.state.bookmarkLink) {
      this.setState(() => ({ error: 'Please provide title and bookmark link.' }));
    } else {
      this.setState(() => ({ error: '' }));

      // submit the form (logic is in add / edit bookmark)
      this.props.onSubmit({
        title: this.state.title,
        description: this.state.description,
        bookmarkLink: this.state.bookmarkLink,
        isPublic: this.state.isPublic
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onTitleChange}
            autoFocus />
          <input
            type="url"
            value={this.state.bookmarkLink}
            onChange={this.onBookmarkLinkChange}
            placeholder="Bookmark Link" />
          <label htmlFor="bookmarkLink">
            <input
              type="checkbox"
              onChange={this.onIsPublicChange}
              defaultChecked={this.state.isPublic}
              // id="bookmarkLink"
              // name="bookmarkLink"
              value={this.state.bookmarkLink} />
          Is bookmark public?</label>
          <textarea
            placeholder="Add a description for your bookmark (optional)"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            rows="5">
          </textarea>
          <button>{this.props.action}</button>
        </form>
      </div>
    );
  }
}

export default BookmarkForm;
