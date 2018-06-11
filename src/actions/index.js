export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_COMMENTS_FOR_POST = 'SET_COMMENTS_FOR_POST';
export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';

export function setCategories (categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  }
}

export function setPosts (posts) {
  return {
    type: SET_POSTS,
    posts,
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

export function setCommentsForPost (comments, postId) {
  return {
    type: SET_COMMENTS_FOR_POST,
    comments,
    postId,
  }
}
