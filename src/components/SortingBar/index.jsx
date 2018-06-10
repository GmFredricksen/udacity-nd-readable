import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = (theme) => ({
  sortingPostsTabs: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
});

class SortingBar extends Component {
  state = {
    selectedSortingMethod: 0,
  }

  handleChangeSortingMethod = (event, value) => {
    this.setState({ selectedSortingMethod: value });
  };

  render() {
    const { selectedSortingMethod } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.sortingPostsTabs}>
        <Tabs
          value={selectedSortingMethod}
          onChange={this.handleChangeSortingMethod}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Popular" />
          <Tab label="Recent" />
        </Tabs>
      </Paper>
    );
  }
}

SortingBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortingBar);
