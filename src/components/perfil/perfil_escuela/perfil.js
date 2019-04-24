import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import sede from './../../../queries/sede';

class Perfil extends Component {

    renderCarreras() {
        return this.props.data.sede.carreras.map((carrera) => {
            return (
                <Link key={carrera.id} to={`${this.props.match.url}/carrera/${carrera.id}`}>
                    <div>{carrera.nombre}</div>
                </Link>
            );
        });
    }

    render() {
        if (this.props.data.loading) return (<div>Loading...</div>)
        let sede = this.props.data.sede;
        console.log(sede);
        return (
            <div>
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                {sede.abreviatura}
                            </h1>
                            <h1 className="subtitle">
                                {sede.nombre}
                            </h1>
                        </div>
                    </div>
                </section>
                <img src={`http://localhost:9000/img/${sede.logo}`} className="image is-128x128" alt={sede.logo} />
                <div>
                    Area del conocimiento:
                {sede.categoria.nombre}
                    Carreras:
                {this.renderCarreras()}
                </div>
            </div>
        );
    }
}
export default graphql(sede, {
    options: (props) => { return { variables: { id: props.match.params.id2 } } }
})(Perfil);