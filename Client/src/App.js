import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Auth from "./utils/auth";

import Home from "./pages/Content";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Login from "./components/Landing/Login";
import Signup from "./components/Landing/Login";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <nav className="navbar bg-dark d-flex w-100">
        <h1 className="p-3 text-light text-center ml">Traveller Mate</h1>
        {Auth.loggedIn() && (
          <button
            className="btn-primary bg-dark  justify-content-center p-2 "
            onClick={Auth.logout}
          >
            Logout
          </button>
        )}
      </nav>
      <Home />
    </ApolloProvider>
  );
}

export default App;
