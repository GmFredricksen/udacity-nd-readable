import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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

const modalWidth = 500;
const styles = (theme) => ({
  addPostModal: {
    position: 'absolute',
    top: '30%',
    left: `calc(50% - ${modalWidth/2}px)`,
    transform: `translate(-30%, -calc(50% - ${modalWidth/2}px))`,
    width: modalWidth,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class PostModal extends Component {
  state = {
  }

  render() {
    const { classes, handleCloseCreatePostModal, isCreatePostModalOpen } = this.props;

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
            
            <form className={classes.container} autoComplete="off">
              <FormGroup>
                <TextField
                  id="postTitle"
                  label="Post Title"
                  className={classes.textField}
                  margin="normal"
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  id="postMessage"
                  label="Message"
                  className={classes.textField}
                  margin="normal"
                  multiline
                />
              </FormGroup>
              <FormGroup>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Category</InputLabel>
                  <Select value={0}>
                    <MenuItem value={1}>Category 1</MenuItem>
                    <MenuItem value={2}>Category 2</MenuItem>
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
                <Button className={classes.button} color="primary">
                  Add
                </Button>
              </FormGroup>
            </form>
          </div>
        </Modal>
    );
  }
}

export default withStyles(styles)(PostModal);
