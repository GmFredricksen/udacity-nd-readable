import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { classes, updateVote, voteScore } = this.props;

    return (
      <div className={classes.voteControls}>
        <IconButton aria-label="Vote-Up" onClick={() => updateVote(1)}>
          <ArrowVoteUp />
        </IconButton>
        <Typography variant='button' color='inherit' noWrap>
          {voteScore}
        </Typography>
        <IconButton aria-label="Vote-Down" onClick={() => updateVote(-1)}>
          <ArrowVoteDown />
        </IconButton>
      </div>
    );
  }
}

VotingSystem.propTypes = {
  classes: PropTypes.object.isRequired,
  updateVote: PropTypes.func,
  voteScore: PropTypes.number.isRequired,
};

export default withStyles(styles)(VotingSystem);
