import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { api } from './../../../config/variables';
import { Link } from 'react-router-dom';

import universidad from './../../../queries/universidad';

class Perfil extends Component {

    constructor(props) {
        super(props);
        this.renderSedes = this.renderSedes.bind(this);
    }

    renderSedes() {
        return this.props.data.universidad.sede.map((sede) => {
            return (
                <Link key={sede.id} to={`${this.props.match.url}/escuela/${sede.id}`}>
                <section key={sede.id}>
                    <div>{sede.nombre}</div>
                    <div>{sede.abreviatura}</div>
                </section>
                </Link>
            );
        })
    }

    render() {
        if (this.props.data.loading) return (<div>Loading...</div>);
        let universidad = this.props.data.universidad
        return (
            <div>
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                {this.props.data.universidad.nombre}
                            </h1>
                        </div>
                    </div>
                </section>
                <img className="image is-128x128" src={`${api}/img/${universidad.logo}`} alt={`${universidad.logo}`} />
                <section>
                    <div className="title">Escuelas</div>
                    {this.renderSedes()}
                </section>
            </div>
        );
    }
}
export default graphql(universidad, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
})(Perfil);