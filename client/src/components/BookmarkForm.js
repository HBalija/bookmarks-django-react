import React from 'react';


class BookmarkForm extends React.Component {

  constructor(props) {
    super(props);

    const bookmark = props.bookmark;

    this.state = {
      name: bookmark ? bookmark.name: '',
      description: bookmark ? bookmark.description : '',
      bookmark_link: bookmark ? bookmark.bookmark_link : '',
      isPublic: bookmark ? bookmark.isPublic : false,
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
    const isPublic = e.target.checked;
    this.setState(() => ({ isPublic }));
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
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
            autoFocus />
          <input
            type="url"
            value={this.state.bookmark_link}
            onChange={this.onBookmarkLinkChange}
            placeholder="Bookmark Link" />
          <label htmlFor="bookmark_link">
            <input
              type="checkbox"
              onChange={this.onIsPublicChange}
              defaultChecked={this.state.isPublic}
              value={this.state.bookmark_link} />
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
