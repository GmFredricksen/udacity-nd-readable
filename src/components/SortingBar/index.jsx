import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { sortPosts, updatePostsSortingMethod } from '../../actions';

const styles = (theme) => ({
  sortingPostsTabs: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
});

class SortingBar extends Component {
  handleChangeSortingMethod = (event, value) => {
    this.props.sortItems(value ? 'popular' : 'recent');
  };

  render() {
    const { classes, selectedSortingMethod } = this.props;

    return (
      <Paper className={classes.sortingPostsTabs}>
        <Tabs
          value={selectedSortingMethod === 'recent' ? 0 : 1}
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
  selectedSortingMethod: PropTypes.string.isRequired,
  sortItems: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sorting }) => ({
  selectedSortingMethod: sorting.selectedSortingMethod,
})

const mapDispatchToProps = (dispatch) => ({
  sortItems: (sortingRule) => {
    dispatch(updatePostsSortingMethod(sortingRule))
    dispatch(sortPosts(sortingRule))
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SortingBar));
