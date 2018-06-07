import { combineReducers } from 'redux';

import {
  SET_CATEGORIES,
  SET_POSTS,
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

function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      const { posts } = action;

      return posts;
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
