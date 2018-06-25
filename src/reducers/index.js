/* eslint no-case-declarations: 0 */

import { combineReducers } from 'redux';

import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  SET_CATEGORIES,
  SET_COMMENTS_FOR_POST,
  SET_POSTS,
  SET_POST,
  SORT_POSTS,
  UPDATE_COMMENT,
  UPDATE_COMMENT_VOTE,
  UPDATE_POST_VOTE,
  UPDATE_POSTS_SORTING_METHOD,
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
    case SORT_POSTS:
      const { sortingRule } = action;

      switch(sortingRule) {
        case 'recent':
          state.sort((post1, post2) => {
            return Number(post2.timestamp) - Number(post1.timestamp);
          });

          return [...state];
        case 'popular':
          state.sort((post1, post2) => {
            return Number(post2.voteScore) - Number(post1.voteScore);
          });

          return [...state];
        default:
          return state;
      }
    case SET_POST:
      const { post } = action;

      return [post];
    case UPDATE_POST_VOTE:
      const { postId, voteScore } = action;

      return state.map((post) => {
        return post.id === postId ?
          { ...post, voteScore } : post
      });
    case DELETE_POST:
      const { postToBeDeleted } = action;

      return state.filter((post) => post.id !== postToBeDeleted.id);
    default:
      return state
  }
}

function comments(state = {}, action) {
  let commentsOfPost;

  switch (action.type) {
    case ADD_COMMENT:
      const { commentToBeAdded } = action;
      commentsOfPost = state[commentToBeAdded.parentId];

      return {
        ...state,
        [commentToBeAdded.parentId]: [
          ...commentsOfPost,
          commentToBeAdded
        ]
      };
    case SET_COMMENTS_FOR_POST:
      const { comments, postId } = action;

      return {
        ...state,
        [postId]: comments,
      };
    case UPDATE_COMMENT:
      const { comment } = action;
      commentsOfPost = state[comment.parentId];

      return {
        ...state,
        [comment.parentId]: commentsOfPost.map((commentInState) => {
          return commentInState.id === comment.id ?
            comment : commentInState
        })
      }
    case UPDATE_COMMENT_VOTE:
      const { commentId, parentId, voteScore } = action;
      commentsOfPost = state[parentId];

      return {
        ...state,
        [parentId]: commentsOfPost.map((comment) => {
          return comment.id === commentId ?
            { ...comment, voteScore } : comment
        })
      }
    case DELETE_COMMENT:
      const { commentToBeDeleted } = action;
      commentsOfPost = state[commentToBeDeleted.parentId];

      return {
        ...state,
        [commentToBeDeleted.parentId]: commentsOfPost.filter((comment) => comment.id !== commentToBeDeleted.id),
      };
    default:
      return state
  }
}

function sorting(state = {selectedSortingMethod: 'recent'}, action) {
  switch (action.type) {
    case UPDATE_POSTS_SORTING_METHOD:
    const { selectedSortingMethod } = action;
      return {
        ...state,
        selectedSortingMethod,
      };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
  sorting,
})
