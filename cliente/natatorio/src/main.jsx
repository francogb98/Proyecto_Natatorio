import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const getAuth = () => {
  const token = localStorage.getItem("token-user");

  return token ? `bearer ${token}` : null;
};

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: getAuth(),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      uri: "https://proyecto-natatorio-3.onrender.com",
    })
  ),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
