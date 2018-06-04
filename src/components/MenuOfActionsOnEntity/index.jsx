import React, { Component } from 'react';
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
    const { classes } = this.props;

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
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText inset primary="Edit" />
            </MenuItem>
            <MenuItem className={classes.menuItem}>
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

export default withStyles()(MenuOfActionsOnEntity);
