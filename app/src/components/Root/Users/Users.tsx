import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import * as React from "react";

import AddSite from "./AddSite";

interface User {
  id: string;
  name: string;
  email: string;
  sites: Site[];
}

interface QueryData {
  users: User[];
}

interface Site {
  id: string;
  name: string;
  url: string;
  username: string;
  sitePassword: string;
  description: string;
}

const query = gql`
  {
    users {
      id
      name
      email
      sites {
        id
        name
        url
        username
        sitePassword
        description
      }
    }
  }
`;

const Users = () => {
  const { data, loading } = useQuery<QueryData>(query);

  if (loading) return "Loading...";

  return (
    <>
      {data && data.users.map(user => (
        <li key={user.id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <ul>
            {user.sites && user.sites.map(site => (
              <li key={site.id}>
                <div>{site.name}</div>
                <div>{site.url}</div>
                <div>{site.username}</div>
                <div>{site.sitePassword}</div>
                <ul>{site.description}</div>
                <hr />
              </li>
            ))}
            <AddSite />
          </ul>
          <hr />
          <hr />
        </li>
      ))}
    </>
  )
};

export default Users;