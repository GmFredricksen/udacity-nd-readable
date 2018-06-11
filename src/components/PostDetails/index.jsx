import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as ReadableAPI from '../../utils/ReadableAPI';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

import { setPost } from '../../actions';
import CommentsList from '../CommentsList';
import Post from '../Post';

const styles = (theme) => ({
  addCommentForm: {
    padding: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
  },
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
    const { classes, post } = this.props;

    return (
      <section className={classes.content}>
        <div className={classes.toolbar} />

        {post &&
          <Post post={post} />
        }

        <Paper className={classes.addCommentForm}>
          <Typography variant="headline" component="h5">
            Add new Comment
          </Typography>

          <form className={classes.container} autoComplete="off">
            <FormGroup>
              <TextField
                id="authorName"
                label="Author"
                className={classes.textField}
                margin="normal"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="commentMessage"
                label="Message"
                className={classes.textField}
                margin="normal"
                multiline
              />
            </FormGroup>
            <FormGroup>
              <Button className={classes.button} color="primary">
                Add Comment
              </Button>
            </FormGroup>
          </form>
        </Paper>

        <Paper className={classes.commentsListBox}>
          {post &&
            <CommentsList post={post} />
          }
        </Paper>
      </section>
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
        .then((post) => dispatch(setPost(post)));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostDetails));
