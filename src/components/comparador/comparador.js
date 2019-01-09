import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";

import LoadingAnimation from "../reutilizable/loadingAnimation"

import carreras from '../../queries/carreras';

class Comparador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carreras: []
        };
    }

    addCarrera(carrera) {
        let carreras = this.state.carreras;
        if (carreras.length < 2) {
            carreras.push(carrera);
            this.setState({
                carreras
            });
        }else{
            console.log('Solo puedes comparar dos carreras a la vez');
        }
    }

    deleteCarrera(carrera) {
        let carreras = this.state.carreras;
        carreras.splice(carrera, 1);
        this.setState({
            carreras
        });
    }

    renderCarreras(carreras) {
        return carreras.map(o => {
            return (
                <tr key={o.id} onClick={() => { this.addCarrera(o.id) }}>
                    <td>
                        {o.id}
                    </td>
                    <td>
                        {o.nombre}
                    </td>
                </tr>
            );
        });
    }
    render() {
        if (this.props.data.loading) return <LoadingAnimation />;
        return (
            <section>
                <table className="table">
                    <thead>
                        <tr>
                            <th><abbr title="ID">ID</abbr></th>
                            <th><abbr title="Nombre">Nombre</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCarreras(this.props.data.carreras)}
                    </tbody>
                </table>
                <span onClick={() => {this.deleteCarrera(0)} }>{this.state.carreras[0]}</span>
                <span onClick={() => {this.deleteCarrera(1)} }>{this.state.carreras[1]}</span>
                <Link to={'comparador/'+this.state.carreras[0]+'/'+this.state.carreras[1]}>Comparar</Link>
            </section>
        );
    }
}
export default graphql(carreras)(Comparador);