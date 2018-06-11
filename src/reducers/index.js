/* eslint no-case-declarations: 0 */

import { combineReducers } from 'redux';

import {
  UPDATE_POST_VOTE,
  SET_CATEGORIES,
  SET_COMMENTS_FOR_POST,
  SET_POSTS,
  SET_POST,
} from '../actions';

function categories (state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action;

      return categories;
    default :
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      const { posts } = action;

      return posts;
    case SET_POST:
      const { post } = action;

      return [ post ];
    case UPDATE_POST_VOTE:
      const { postId, voteScore } = action;

      return state.map((post) => {
        return post.id === postId ?
          { ...post, voteScore } : post
      });
    default :
      return state
  }
}

function comments (state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS_FOR_POST:
      const { comments, postId } = action;

      return {
        ...state,
        [postId]: comments,
      };
    default :
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
})
