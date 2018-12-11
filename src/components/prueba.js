import { Component } from 'react';
import { graphql } from 'react-apollo';
import carrera from './../queries/carrera';

class Prueba extends Component { 
    render() {
        if (this.props.data.loading) return "Cargando";
        console.log(this.props.data.carreras)
        return "Hola1";
    }
}
 
export default graphql(carrera)(Prueba);
  