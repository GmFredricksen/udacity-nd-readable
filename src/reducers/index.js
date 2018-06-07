import { combineReducers } from 'redux';

import {
  SET_CATEGORIES,
} from '../actions';

function categories (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action;

      return categories;
    default :
      return state
  }
}

export default combineReducers({
  categories,
})
