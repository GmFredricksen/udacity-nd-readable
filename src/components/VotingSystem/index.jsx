import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowVoteDown from '@material-ui/icons/ArrowDropDown';
import ArrowVoteUp from '@material-ui/icons/ArrowDropUp';

const styles = (theme) => ({
  voteControls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  }
});

class VotingSystem extends Component {
  render() {
    const { classes } = this.props;

    return (
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
    );
  }
}

export default withStyles(styles)(VotingSystem);
