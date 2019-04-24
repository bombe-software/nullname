import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import carrera from './../../../queries/carrera';

class Perfil extends Component {
    render() {
        if(this.props.data.loading)return(<div>Loading...</div>)
        let carrera = this.props.data.carrera;
        console.log(carrera);
        return (
            <div>
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                {carrera.nombre}
                            </h1>
                            <h1 className="subtitle">
                                {carrera.categoria.nombre}
                            </h1>
                        </div>
                    </div>
                </section>
                {/* <img src={`http://localhost:9000/img/${sede.logo}`} className="image is-128x128" alt={sede.logo}/> */}
                Plan de estudios:
                
            </div>
        );
    }
}
export default graphql(carrera, {
    options: (props) => { return { variables: { id: props.match.params.id3 } } }
})(Perfil);