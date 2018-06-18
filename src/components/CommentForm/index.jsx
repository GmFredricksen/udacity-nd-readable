import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';

import { addComment } from '../../actions';
import * as ReadableAPI from '../../utils/ReadableAPI';

const styles = (theme) => ({
  addCommentForm: {
    padding: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
  },
});

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentToBeSubmitted: {
        author: '',
        body: '',
        parentId: this.props.parentId,
      }
    }
  }

  emptyTheForm = () => {
    this.setState({
      commentToBeSubmitted: {
        ...this.state.commentToBeSubmitted,
        author: '',
        body: '',
      }
    })
  }
  formIsValid = ({ author, body }) => (
    author.length && body.length
  )

  handleChangeOfFormInputs = (event) => {
    this.setState({
      commentToBeSubmitted: {
        ...this.state.commentToBeSubmitted,
        [event.target.name]: event.target.value,
      }
    });
  }

  handleSubmit = (event, commentToBeSubmitted) => {
    this.props.submitComment(event, commentToBeSubmitted)
      .then(() => this.emptyTheForm());
  }

  render() {
    const { classes } = this.props;
    const { commentToBeSubmitted } = this.state;

    return (
      <Paper className={classes.addCommentForm}>
        <Typography variant="headline" component="h5">
          Add new Comment
        </Typography>

        <form className={classes.container} autoComplete="off" onSubmit={(event) => this.handleSubmit(event, commentToBeSubmitted)}>
          <FormGroup>
            <TextField
              id="authorName"
              label="Author"
              className={classes.textField}
              margin="normal"
              name="author"
              value={commentToBeSubmitted.author}
              onChange={this.handleChangeOfFormInputs}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              id="commentMessage"
              label="Message"
              className={classes.textField}
              margin="normal"
              multiline
              name="body"
              value={commentToBeSubmitted.body}
              onChange={this.handleChangeOfFormInputs}
            />
          </FormGroup>
          <FormGroup>
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              disabled={!this.formIsValid(commentToBeSubmitted)}
            >
              Add Comment
            </Button>
          </FormGroup>
        </form>
      </Paper>
    );
  }
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  parentId: PropTypes.string.isRequired,
  submitComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitComment: (formSubmitEvent, commentToBeSubmitted) => {
    formSubmitEvent.preventDefault();

    return ReadableAPI.addComment(commentToBeSubmitted)
      .then((comment) => dispatch(addComment(comment)));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(CommentForm));
