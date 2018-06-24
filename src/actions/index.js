export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_POST = 'ADD_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_COMMENTS_FOR_POST = 'SET_COMMENTS_FOR_POST';
export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE';

export function setCategories (categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  }
}

export function addPost (postToBeAdded) {
  return {
    type: ADD_POST,
    postToBeAdded,
  }
}

export function setPosts (posts) {
  return {
    type: SET_POSTS,
    posts,
  }
}

export function sortPosts (sortingRule) {
  return {
    type: SORT_POSTS,
    sortingRule,
  }
}

export function setPost (post) {
  return {
    type: SET_POST,
    post,
  }
}

export function updatePostVote (postId, voteScore) {
  return {
    type: UPDATE_POST_VOTE,
    postId,
    voteScore,
  }
}

export function addComment (commentToBeAdded) {
  return {
    type: ADD_COMMENT,
    commentToBeAdded,
  }
}

export function deletePost (postToBeDeleted) {
  return {
    type: DELETE_POST,
    postToBeDeleted,
  }
}

export function setCommentsForPost (comments, postId) {
  return {
    type: SET_COMMENTS_FOR_POST,
    comments,
    postId,
  }
}

export function updateComment (comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  }
}

export function updateCommentVote (commentId, parentId, voteScore) {
  return {
    type: UPDATE_COMMENT_VOTE,
    commentId,
    parentId,
    voteScore,
  }
}

export function deleteComment (commentToBeDeleted) {
  return {
    type: DELETE_COMMENT,
    commentToBeDeleted,
  }
}
