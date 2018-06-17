import uuidv4 from 'uuid/v4';

const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * CATEGORY
  */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/**
 * POST
  */
export const addPost = (post) =>
  fetch(`${api}/posts/`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...post,
        timestamp: Date.now(),
        id: uuidv4(),
      }),
    }
  )
    .then(res => res.json())
    .then(data => data)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPosts = (category = '') =>
  fetch(`${api}${category ? '/' + category : ''}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const updatePostVote = (postId, vote) =>
  fetch(`${api}/posts/${postId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'option': vote === 1 ? 'upVote' : 'downVote'
      })
    })
    .then(res => res.json())
    .then(data => data)
/**
 * COMMENTS OF POST
  */
export const getCommentsOfPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const updateCommentVote = (commentId, vote) =>
  fetch(`${api}/comments/${commentId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'option': vote === 1 ? 'upVote' : 'downVote'
      })
    })
    .then(res => res.json())
    .then(data => data)

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.books)
