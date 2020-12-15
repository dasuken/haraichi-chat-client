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
        message
      }
    }
  }
`

// mutation

export const CREATE_COMMENT = gql `
  mutation($radioName: String!, $message: String!, $themeId: ID!) {
    createComment(data: { radioName: $radioName, message: $message, themeId: $themeId}) {
      _id
      message
      radioName
      likes
      createdAt
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
