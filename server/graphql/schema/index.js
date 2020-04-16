const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Avatar {
  large: String
  medium: String
  thumbnail: String
}

type Name {
  title: String
  first: String
  last: String
}

type User {
  _id: ID!
  email: String!
  password: String
  username: String
  gender: String
  phone: String
  cell: String
  registered: String
  name: Name
  avatar: Avatar
  token: String
}

type AuthData {
  userId: ID!
  email: String!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);