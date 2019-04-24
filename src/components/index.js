import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Apollo configuration object options
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { api, ws } from './../config/variables';

//Componentes
import LandingPage from './landing_page';
import Comparador from './comparador/comparador';
import TestVocacional from './test_vocacional/test_vocacional';
import Mapa from './mapa/mapa';
import DatosImportantes from './datos_importantes/datos_importantes';
import Ayuda from './mas/ayuda';
import EnviarComentario from './mas/enviar_comentario';
import AcercaDe from './mas/acerca_de';
import NotFound from './reutilizable/not_found';
import Motor from './comparador/motor';
import Footer from './reutilizable/footer';
import PerfilEscuela from './perfil/perfil_escuela/perfil';
import Universidades from './perfil/perfil_universidad/index';
import PerfilUniversidad  from './perfil/perfil_universidad/perfil';
import PerfilCarrera from './perfil/perfil_carrera/perfil';
import ResultadoTest from './test_vocacional/resultado_test';

import Navbar from './reutilizable/navbar';
// Crear el link
const httpLink = createHttpLink({
  uri: `${api}/graphql`,
  credentials: 'include'
});

// Crear el web socket link
const wsLink = new WebSocketLink({
  uri: `${ws}/subscriptions`,
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
  render() {
    return (
      <ApolloProvider client={client} >
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path="/comparador/:id1/:id2" component={Motor} />
              <Route path="/comparador" component={Comparador} />

              <Route path="/test" component={TestVocacional} />
              <Route path="/ayuda" component={Ayuda} />
              <Route path="/reportar_bug" component={EnviarComentario} />
              <Route path="/acerca_de" component={AcercaDe} />
              <Route path="/datos_importantes" component={DatosImportantes} />
              <Route path="/mapa" component={Mapa} />
              <Route path="/universidad/:id1/escuela/:id2/carrera/:id3" component={PerfilCarrera} />
              <Route path="/universidad/:id1/escuela/:id2" component={PerfilEscuela} />
              <Route path="/universidad/:id" component={PerfilUniversidad} />
              <Route path="/universidades" component={Universidades} />
              <Route path="/resultado_test" component={ResultadoTest} />
              <Route exact path="/" component={LandingPage} />

              
              <Route path="/" component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
