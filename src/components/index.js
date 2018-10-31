import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Apollo configuration object options
import { 
  split, getMainDefinition,
  ApolloClient, createHttpLink,
  InMemoryCache
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { api, web, ws } from './../config/deploy';

//Componentes
import LandingPage from './landing_page';


// Crear el link
const httpLink = createHttpLink({
  uri: `${demos_gql_http}/graphql`,
  credentials: 'include'
});

// Crear el web socket link
const wsLink = new WebSocketLink({
  uri: `${demos_gql_ws}/subscriptions`,
  options: {
    reconnect: true
  }
});

// USar dependencia split para hacer una union de ambos 
// caminos de comunicacion y separa uno del otro
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client} >
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LandingPage} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
