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

import { addPost } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';

// const modalWidth = 500;
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
    const { submitPost, categories, classes } = this.props;
    const { postToBeSubmitted } = this.state;

    return (
      <section className={classes.content}>
        <div className={classes.toolbar} />
        <Card className={classes.card}>

          <CardHeader title="Add new Post" />

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
                  Add
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
  submitPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

const mapDispatchToProps = (dispatch) => ({
  submitPost: (formSubmitEvent, postToBeSubmitted) => {
    formSubmitEvent.preventDefault();

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
