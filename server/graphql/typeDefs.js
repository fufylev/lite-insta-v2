const { gql } = require('apollo-server-express');

const typeDefs = gql`    
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
        id: ID!
        email: String!
        username: String
        gender: String
        phone: String
        cell: String
        registered: String
        name: Name
        avatar: Avatar
    }

    type Query {
        user: User
    }
`;

module.exports = typeDefs;
