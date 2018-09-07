import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';

import './App.css';
import UploaderContainer from './components/UploaderContainer';
import { defaults, typeDefs, resolvers } from './clientState';

const cache = new InMemoryCache();


const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
  clientState: {
    defaults,
    typeDefs,
    cache,
    resolvers: {}
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lots To Watch</h1>
        </header>
        <p className="App-intro">
          Start by uploading an exported IMDB list.
          Then, we will scrape where each entry is available.
        </p>
        <ApolloProvider client={client}>
          <div>
            <UploaderContainer />
          </div>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
