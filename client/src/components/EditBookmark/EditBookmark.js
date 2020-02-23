import React from 'react';
import { connect } from 'react-redux';

import BookmarkForm from '../BookmarkForm/BookmarkForm';
import Spinner from '../Spinner/Spinner';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import axiosInstance from '../../axios';
import { startRemoveBookmark, startEditBookmark } from '../../store/actions/bookmarks';


class EditBookmark extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      bookmark: this.props.bookmark,
      notFound : false,
      loading: !this.props.bookmark
    };
  }

  componentDidMount() {
    if (this.state.loading) {
      axiosInstance.get(`/bookmarks/${this.props.match.params.id}/`)
        .then(response =>{
          this.setState(() => ({ bookmark: response.data,  loading: false }));
        })
        .catch(error => {
          this.setState(() => ({ notFound: true }));
          throw(error);
        }) ;
    }
  }

  render () {

    let jsx = (
      <div>
        <BookmarkForm
          onSubmit={bk => {
            this.props.startEditBookmark(this.state.bookmark.id, bk);
            this.props.history.push('/');
          }}
          bookmark={this.state.bookmark}
          action='Edit bookmark' />

        <button
          onClick={() => {
            this.props.startRemoveBookmark(this.state.bookmark.id);
            this.props.history.push('/');
          }}>Remove
        </button>
      </div>
    );

    if (this.state.notFound) jsx = <NotFoundPage />;
    else if (this.state.loading) jsx = <Spinner />;

    return jsx;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: state.bookmarks.bookmarks.find(
      bookmark => bookmark.id === parseInt(ownProps.match.params.id)),
    loading: state.bookmarks.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startEditBookmark: (id, updates) => dispatch(startEditBookmark(id, updates)),
    startRemoveBookmark: id => dispatch(startRemoveBookmark(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBookmark);
