import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    sites: [Site]!
  }
  
  type Site {
    id: ID!
    name: String!
    url: String!
    username: String!
    sitePassword: String!
    description: String!
  }

  type Query {
    users: [User!]!
    sites: [Site!]!
  }
`;

export default typeDefs;