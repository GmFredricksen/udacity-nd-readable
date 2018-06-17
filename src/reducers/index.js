/* eslint no-case-declarations: 0 */

import { combineReducers } from 'redux';

import {
  ADD_POST,
  SET_CATEGORIES,
  SET_COMMENTS_FOR_POST,
  SET_POSTS,
  SET_POST,
  UPDATE_COMMENT_VOTE,
  UPDATE_POST_VOTE,
} from '../actions';

function categories(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action;

      return categories;
    default:
      return state
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case ADD_POST:
      const { postToBeAdded } = action;

      return [
        ...state,
        postToBeAdded,
      ];
    case SET_POSTS:
      const { posts } = action;

      return posts;
    case SET_POST:
      const { post } = action;

      return [post];
    case UPDATE_POST_VOTE:
      const { postId, voteScore } = action;

      return state.map((post) => {
        return post.id === postId ?
          { ...post, voteScore } : post
      });
    default:
      return state
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS_FOR_POST:
      const { comments, postId } = action;

      return {
        ...state,
        [postId]: comments,
      };
    case UPDATE_COMMENT_VOTE:
      const { commentId, parentId, voteScore } = action;
      const commentsOfPost = state[parentId];

      return {
        ...state,
        [parentId]: commentsOfPost.map((comment) => {
            return comment.id === commentId ?
              { ...comment, voteScore } : comment
          })
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
})
