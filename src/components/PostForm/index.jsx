import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { addPost, setPost } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class PostForm extends Component {
  state = {
    isPostToBeEdited: false,
    postToBeSubmitted: {
      author: '',
      body: '',
      category: '',
      title: '',
    }
  }

  componentDidMount() {
    const postId = this.props.postId;

    if (postId) {
      this.setState({ isPostToBeEdited: true });
      this.props.getPost(postId);
    }
  }

  componentDidUpdate(prevProps) {
    const { postToBeEdited } = this.props;
    if (postToBeEdited !== prevProps.postToBeEdited) {
      this.setState({
        postToBeSubmitted: {
          author: postToBeEdited.author,
          body: postToBeEdited.body,
          category: postToBeEdited.category,
          title: postToBeEdited.title,
        }
      });
    }
  }

  formIsValid = ({ author, body, category, title }) => (
    author.length && body.length && category.length && title.length
  )

  handleChangeOfFormInputs = (event) => {
    this.setState({
      postToBeSubmitted: {
        ...this.state.postToBeSubmitted,
        [event.target.name]: event.target.value,
      }
    });
  }

  assignSelectedPostDataToForm = () => {
    this.setState({
      postToBeSubmitted: {
        author: '',
        body: '',
        category: '',
        title: '',
      }
    });
  }

  render() {
    const { submitPost, categories, classes } = this.props;
    let { isPostToBeEdited, postToBeSubmitted } = this.state;

    return (
      <section className={classes.content}>
        <div className={classes.toolbar} />
        <Card className={classes.card}>

          <CardHeader title={isPostToBeEdited ? 'Edit Post': 'Add new Post'} />

          <CardContent>
            <form className={classes.container} autoComplete="off" onSubmit={(event) => submitPost(event, postToBeSubmitted)}>
              <FormGroup>
                <TextField
                  id="postTitle"
                  label="Post Title"
                  className={classes.textField}
                  margin="normal"
                  name="title"
                  value={postToBeSubmitted.title}
                  onChange={this.handleChangeOfFormInputs}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  id="postAuthor"
                  label="Post Author"
                  className={classes.textField}
                  margin="normal"
                  name="author"
                  value={postToBeSubmitted.author}
                  onChange={this.handleChangeOfFormInputs}
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  id="postMessage"
                  label="Message"
                  className={classes.textField}
                  margin="normal"
                  multiline
                  name="body"
                  value={postToBeSubmitted.body}
                  onChange={this.handleChangeOfFormInputs}
                />
              </FormGroup>
              <FormGroup>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="postCategory">Category</InputLabel>
                  <Select
                    id="postCategory"
                    name="category"
                    value={postToBeSubmitted.category || 0}
                    onChange={this.handleChangeOfFormInputs}
                  >
                    {categories.map(({ name }) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                  </Select>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <Button
                  className={classes.button}
                  color="default"
                  component={Link}
                  to='/'
                >
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  type="submit"
                  disabled={!this.formIsValid(postToBeSubmitted)}
                >
                  {isPostToBeEdited ? 'Update' : 'Add'}
                </Button>
              </FormGroup>
            </form>
          </CardContent>
        </Card>
      </section>
    );
  }
}

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string,
  postToBeEdited: PropTypes.object,
  submitPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categories, posts }) => ({
  categories,
  postToBeEdited: posts[0] || null,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPost: (postId) => {
    ReadableAPI.getPost(postId)
      .then((post) => dispatch(setPost(post)));
  },

  submitPost: (formSubmitEvent, postToBeSubmitted) => {
    formSubmitEvent.preventDefault();
    const isPostEdit = !!ownProps.postId;

    if (isPostEdit) {
      ReadableAPI.updatePost(postToBeSubmitted, ownProps.postId)
        .then((post) => {
          window.location = `/${post.category}/${post.id}`;
        });
      return;
    }

    ReadableAPI.addPost(postToBeSubmitted)
      .then((post) => {
        dispatch(addPost(post));
        window.location = `/${post.category}/${post.id}`;
      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostForm));
