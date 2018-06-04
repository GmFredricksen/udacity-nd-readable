import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ArrowVoteDown from '@material-ui/icons/ArrowDropDown';
import ArrowVoteUp from '@material-ui/icons/ArrowDropUp';

import MenuOfActionsOnEntity from '../MenuOfActionsOnEntity';

const styles = (theme) => ({
  voteControls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  }
});

class Comment extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ListItem divider>
        <div className={classes.voteControls}>
          <IconButton aria-label="Vote-Up">
            <ArrowVoteUp />
          </IconButton>
          <Typography variant='button' color='inherit' noWrap>
            12
          </Typography>
          <IconButton aria-label="Vote-Down">
            <ArrowVoteDown />
          </IconButton>
        </div>
        <ListItemText
          primary="1st Comment"
          secondary="Author - September 14, 2016"
        />
        <MenuOfActionsOnEntity />
      </ListItem>
    );
  }
}

export default withStyles(styles)(Comment);
