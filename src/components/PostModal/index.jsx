import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { addPost } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';

const modalWidth = 500;
const styles = (theme) => ({
  addPostModal: {
    position: 'absolute',
    top: '30%',
    left: `calc(50% - ${modalWidth / 2}px)`,
    transform: `translate(-30%, -calc(50% - ${modalWidth / 2}px))`,
    width: modalWidth,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class PostModal extends Component {
  state = {
    postToBeSubmitted: {
      author: '',
      body: '',
      category: '',
      title: '',
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

  render() {
    const { submitPost, categories, classes, handleCloseCreatePostModal, isCreatePostModalOpen } = this.props;
    const { postToBeSubmitted } = this.state;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isCreatePostModalOpen}
        onClose={handleCloseCreatePostModal}
      >
        <div className={classes.addPostModal}>
          <Typography variant="title" id="modal-title">
            Add new Post
            </Typography>

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
                onClick={handleCloseCreatePostModal}
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                color="primary"
                type="submit"
                disabled={!this.formIsValid(postToBeSubmitted)}
              >
                Add
              </Button>
            </FormGroup>
          </form>
        </div>
      </Modal>
    );
  }
}

PostModal.propTypes = {
  categories: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleCloseCreatePostModal: PropTypes.func.isRequired,
  isCreatePostModalOpen: PropTypes.bool.isRequired,
  submitPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

const mapDispatchToProps = (dispatch) => ({
  submitPost: (formSubmitEvent, postToBeSubmitted) => {
    formSubmitEvent.preventDefault();

    ReadableAPI.addPost(postToBeSubmitted)
      .then((post) => dispatch(addPost(post)));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostModal));
