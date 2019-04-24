import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import sede from './../../../queries/sede';

class Perfil extends Component {
    render() {
        if(this.props.data.loading)return(<div>Loading...</div>)
        let sede = this.props.data.sede;
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
                <img src={`http://localhost:9000/img/${sede.logo}`} className="image is-128x128" alt={sede.logo}/>
                <div>
                Area del conocimiento:
                {sede.categoria.nombre}
                </div>
            </div>
        );
    }
}
export default graphql(sede, {
    options: (props) => { return { variables: { id: props.match.params.id2 } } }
})(Perfil);