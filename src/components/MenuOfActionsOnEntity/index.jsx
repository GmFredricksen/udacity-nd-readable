import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { deleteComment, deletePost } from '../../actions';
import { typeOfEntityToAffect } from '../../utils';
import * as ReadableAPI from '../../utils/ReadableAPI';

class MenuOfActionsOnEntity extends Component {
  state = {
    anchorElement: null,
  }

  handleOpenEditDeleteMenu = event => {
    this.setState({ anchorElement: event.currentTarget });
  };
  handleCloseEditDeleteMenu = () => {
    this.setState({ anchorElement: null });
  };

  render() {
    const { anchorElement } = this.state;
    const { classes, deleteEntity, entityToBeAffected } = this.props;

    return (
      <IconButton onClick={this.handleOpenEditDeleteMenu}>
        <MoreVertIcon />

        <Paper>
          <Menu
            id="fade-menu"
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={this.handleCloseEditDeleteMenu}
            TransitionComponent={Fade}
          >
            <MenuItem className={classes.menuItem}
              button={true}
            >
              <ListItemIcon className={classes.icon}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText inset primary="Edit" />
            </MenuItem>
            <MenuItem className={classes.menuItem}
              button={true}
              onClick={() => deleteEntity(entityToBeAffected)}
            >
              <ListItemIcon className={classes.icon}>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText inset primary="Delete" />
            </MenuItem>
          </Menu>
        </Paper>
      </IconButton>
    )
  }
}

MenuOfActionsOnEntity.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  entityToBeAffected: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteEntity: (entityToBeAffected) => {
    switch (typeOfEntityToAffect(entityToBeAffected)) {
      case 'post':
        ReadableAPI.deletePost(entityToBeAffected.id)
          .then((post) => dispatch(deletePost(post)));
        break;
      case 'comment':
        ReadableAPI.deleteComment(entityToBeAffected.id)
          .then((comment) => dispatch(deleteComment(comment)));
        break;
      default:
        return;
    }
  }
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles()(MenuOfActionsOnEntity));
