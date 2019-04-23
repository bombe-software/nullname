import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { api } from './../../../config/variables';

//queries
import universidades from './../../../queries/universidades';

class PerfilUniversidad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            source: null
        };
        this.renderUniversidades = this.renderUniversidades.bind(this);
    }

    toggle(src){
//this.setState({source: src});
    }

    renderUniversidades() {
        let universidades = this.props.data.universidades;
        return universidades.map(universidad => {
           
            return (
                <div key={universidad.id}>
                    <img className="image is-128x128" src={`${api}/img/${universidad.logo}`} alt={"Loading..."} />
                    <h1>{universidad.nombre}</h1>
                    <h1>{universidad.abreviatura}</h1>
                    <Link to={`/universidad/${universidad.id}`}>
                        <span className="is-6"><i className="fa fa-pencil"></i> Modificar</span>
                    </Link>
                    <br />
                </div>
            );
        });
    }

    render() {
        if (this.props.data.loading) { return (<div>Loading...</div>) }
        // console.log(this.props);
        return (
            <div>
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Universidades</h1>
                        </div>
                    </div>
                </section>
                {this.renderUniversidades()}
            </div>
        );

    }
}
export default graphql(universidades)(PerfilUniversidad);