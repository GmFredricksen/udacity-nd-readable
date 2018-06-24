import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { sortPosts } from '../../actions';

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
    this.props.sortItems(value ? 'popular' : 'recent');
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
          <Tab label="Recent" />
          <Tab label="Popular" />
        </Tabs>
      </Paper>
    );
  }
}

SortingBar.propTypes = {
  classes: PropTypes.object.isRequired,
  sortItems: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sortItems: (sortingRule) => dispatch(sortPosts(sortingRule)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(SortingBar));
