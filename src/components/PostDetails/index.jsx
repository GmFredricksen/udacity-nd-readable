import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as ReadableAPI from '../../utils/ReadableAPI';
import Paper from '@material-ui/core/Paper';

import { setPost } from '../../actions';
import CommentForm from '../CommentForm';
import CommentsList from '../CommentsList';
import Post from '../Post';
import NotFound from '../NotFound';

const styles = (theme) => ({
  commentsListBox: {
    marginTop: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class PostDetails extends Component {
  componentDidMount() {
    const postId = this.props.postId;

    this.props.getPost(postId);
  }

  render() {
    const { classes, post, postId } = this.props;

    return ( post ?
      <section className={classes.content}>
        <div className={classes.toolbar} />
          <Post post={post} isFromDetail />

          <CommentForm parentId={postId} />

          <Paper className={classes.commentsListBox}>
              <CommentsList post={post} />
          </Paper>
      </section>
      :
      <NotFound />
    );
  }
}

PostDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object,
};

function mapStateToProps({ posts }, ownProps) {
  if (posts.length) {
    return {
      post: posts.find((post) => post.id === ownProps.postId)
    };
  }

  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (postId) => {
      ReadableAPI.getPost(postId)
        .then((post) => Object.keys(post).length && dispatch(setPost(post)));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostDetails));
