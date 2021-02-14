import gql from 'graphql-tag'

// Query

// radio
export const GET_RADIOS = gql`
  query getRadios {
    radios {
      _id
      times
      youtubeUrl
      createdAt
      themeImage
      broadCastingDate
      themes {
        _id
        thumbnail
        title
      }
    }
  }
`

export const GET_RADIO = gql`
  query getRadio ($radioId: ID!) {
    radio (radioId: $radioId) {
      _id
      times
      createdAt
      broadCastingDate
      youtubeUrl
    }
  }
`

// theme
export const GET_THEME = gql`
  query getTheme($themeId: ID!) {
    theme(themeId: $themeId) {
      _id
      title
      thumbnail
    }
  }
`

export const GET_RADIO_THEMES = gql`
  query getRadioThemes($radioId: ID!) {
    radioThemes(radioId: $radioId) {
      _id
      title
      thumbnail
      createdAt
      description
      radioId
    }
  }
`

// comment
export const GET_THEME_COMMENTS = gql`
  query themeComments($themeId: ID!, $skip: Int, $limit: Int) {
    themeComments(themeId: $themeId, skip: $skip, limit: $limit) {
      hasMore
      comments {
        _id
        likes
        radioName
        createdAt
        userId
        message
      }
    }
  }
`

export const GET_LIKE_ORDER_THEME_COMMENTS = gql`
  query likeOrderThemeComments($themeId: ID!, $skip: Int, $limit: Int) {
    likeOrderThemeComments(themeId: $themeId, skip: $skip, limit: $limit) {
      hasMore
      comments {
        _id
        likes
        radioName
      }
    }
  }
`

export const GET_COMMENTS = gql`
  query getComments($skip: Int, $limit: Int) {
    comments(skip: $skip, limit: $limit) {
      _id
      radioName
      message
      themeId {
        _id
        title
      }
    }
  }
`

// responses
export const GET_COMMENT_RESPONSES = gql`
  query getCommentResponses($commentId: ID!) {
    commentResponses(commentId: $commentId) {
      _id
      message
      userId
      radioName
      commentId
      createdAt
    }
  }
`

export const GET_COMMENT_RESPONSE_COUNTS = gql `
  query getCommentResponseCounts($commentId: ID!){
    commentResponseCounts(commentId: $commentId)
  }
`

// mutation

// comment

export const CREATE_COMMENT = gql `
  mutation($radioName: String!, $message: String!, $themeId: ID!, $userId: ID) {
    createComment(data: { radioName: $radioName, message: $message, themeId: $themeId, userId: $userId}) {
      _id
      message
      radioName
      likes
      createdAt
      userId
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId){
      _id
      message
      radioName
      themeId {
        _id
      }
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation($commentId: ID!, $message: String, $radioName: String) {
    updateComment(commentId: $commentId, data: { message: $message, radioName: $radioName }) {
      _id
      message
      radioName
      likes
      createdAt
    }
  }
`

export const LIKE_COMMENT = gql`
  mutation($commentId: ID!) {
    likeComment(commentId: $commentId) {
      _id
      likes
    }
  }
`

export const UNLIKE_COMMENT = gql`
  mutation($commentId: ID!) {
    unlikeComment(commentId: $commentId) {
      _id
      likes
    }
  }
`

// response

export const CREATE_RESPONSE = gql`
  mutation mutateCreatResponse($commentId: ID!, $message: String!, $radioName: String!, $userId: ID) {
    createResponse(commentId: $commentId, data: { message:$message, radioName:$radioName, userId: $userId }) {
      _id
      message
      radioName
      createdAt
    }
  }
`

export const DELETE_RESPONSE = gql`
  mutation mutateDeleteResponse($responseId: ID!) {
  deleteResponse(responseId: $responseId) {
    _id
  }
}
`