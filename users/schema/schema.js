const graphql = require("graphql");
const axios = require("axios");
const { GraphQLString, GraphQLInt, GraphQLSchema, GraphQLObjectType } = graphql;

const ComapnyType = new GraphQLObjectType({
  name: "company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: { type: ComapnyType },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    company: {
      type: ComapnyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});
module.exports = new GraphQLSchema({ query: RootQuery });
