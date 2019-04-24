import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import universidad from './../../../queries/universidad';

class Perfil extends Component {
    render() {
        if(this.props.data.loading) return (<div>Loading...</div>);
        console.log(this.props);
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
            </div>
        );
    }
}
//export default graphql(universidad)(Perfil);
export default graphql(universidad, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
})(Perfil);