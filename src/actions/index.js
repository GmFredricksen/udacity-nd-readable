export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_COMMENTS_FOR_POST = 'SET_COMMENTS_FOR_POST';
export const SET_POSTS = 'SET_POSTS';

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

export function setCommentsForPost (comments, postId) {
  return {
    type: SET_COMMENTS_FOR_POST,
    comments,
    postId,
  }
}
