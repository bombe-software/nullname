import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import carrera from '../../queries/carrera';

class PopUp extends Component {
    render() {
        if (this.props.data.loading) return '';
        return (
            <div class="modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">{this.props.data.carrera.nombre}</p>
                        <button class="delete" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">Contenido</section>
                    <footer class="modal-card-foot">
                        <button class="button is-success">Save changes</button>
                        <button class="button" onClick={this.handleClose}>Cancel</button>
                    </footer>
                </div>
            </div>
        );
    }
}
export default graphql(carrera, {
    options: (props) => { return { variables: { id: props.id } } }
})(PopUp);
