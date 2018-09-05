import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import logo from './logo.svg';
import './App.css';
import ExchangeRates from './components/ExchangeRates';

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <ApolloProvider client={client}>
            <div>
              <h2>My first Apollo app</h2>
              <ExchangeRates />
            </div>
          </ApolloProvider>
        </p>
      </div>
    );
  }
}

export default App;
