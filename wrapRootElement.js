import React from "react";
import IdentityContextProvider from "./IdentityContextProvider";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import netlifyIdentity from "netlify-identity-widget";
import fetch from "cross-fetch";

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: ".netlify/functions/graphqlapi",
  // add isomorphic-fetch to your dependencies since apollo looks for fetch to make HTTP requests
  // https://github.com/gatsbyjs/gatsby/issues/11225#issuecomment-457211628
  fetch,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export const wrapRootElement = ({ element }) => {
  console.info(`inside wrapRootElement`);
  return (
    <ApolloProvider client={client}>
      <IdentityContextProvider>{element}</IdentityContextProvider>
    </ApolloProvider>
  );
};
