const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const User = require('../models/User');
const Picture = require('../models/Picture');

const UserType = require('./UserType');
const PictureType = require('./PictureType')

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, { email }) {
        return User.findOne({ email });
      },
    },
    picture: {
      type: PictureType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, { _id }) {
        return Picture.findOne({ _id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});