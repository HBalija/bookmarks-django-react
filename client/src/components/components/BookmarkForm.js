import React from 'react';


class BookmarkForm extends React.Component {

  constructor(props) {
    super(props);

    const bookmark = props.bookmark;

    this.state = {
      name: bookmark ? bookmark.name: '',
      description: bookmark ? bookmark.description : '',
      bookmark_link: bookmark ? bookmark.bookmark_link : '',
      is_public: bookmark ? bookmark.is_public : false,
      error: ''
    };
  }

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onBookmarkLinkChange = e => {
    const bookmark_link = e.target.value;
    this.setState(() => ({ bookmark_link }));
  }

  onIsPublicChange = e => {
    const is_public = e.target.checked;
    this.setState(() => ({ is_public }));
  }


  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name || !this.state.bookmark_link) {
      this.setState(() => ({ error: 'Please provide name and bookmark link.' }));
    } else {
      this.setState(() => ({ error: '' }));

      // submit the form (logic is in add / edit bookmark)
      this.props.onSubmit({
        name: this.state.name,
        description: this.state.description,
        bookmark_link: this.state.bookmark_link,
        is_public: this.state.is_public
      });
    }
  }

  render() {
    return (
      <>
        {this.state.error && <p className="error-message">{this.state.error}</p>}
        <div className="center-container">
          <form onSubmit={this.onSubmit} className="form">
            <input
              className="text-input"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onNameChange}
              autoFocus />
            <input
              className="text-input"
              type="url"
              value={this.state.bookmark_link}
              onChange={this.onBookmarkLinkChange}
              placeholder="Bookmark Link" />
            <label
              className="checkbox-label"
              htmlFor="bookmark_link">
              <input
                className="checkbox"
                id="bookmark_link"
                type="checkbox"
                onChange={this.onIsPublicChange}
                defaultChecked={this.state.is_public}
                value={this.state.bookmark_link} />
              <span>Is bookmark public?</span>
            </label>
            <textarea
              className="textarea"
              placeholder="Add a description for your bookmark (optional)"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              rows="4">
            </textarea>
            <button>{this.props.action}</button>
          </form>
        </div>
      </>
    );
  }
}

export default BookmarkForm;
