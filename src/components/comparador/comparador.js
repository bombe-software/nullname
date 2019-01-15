import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import _ from 'lodash';
import LoadingScreen from "../reutilizable/loading_screen"

import carreras from '../../queries/carreras';

class Comparador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carrerasProps: [],
            carreras: []
        };
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.data.carreras !== nextState.carrerasProps)
            this.setState({ carrerasProps: nextProps.data.carreras });
    }

    addCarrera(carrera) {
        let carreras = this.state.carreras;
        if (carreras.length < 2) {
            carreras.push(carrera);

            let carrerasProps = this.state.carrerasProps;
            _.remove(carrerasProps, function (carreraO) {
                return carreraO.id === carrera.id;
            });

            this.setState({
                carreras, carrerasProps
            });

        } else {
            console.log('Solo puedes comparar dos carreras a la vez');
        }
    }

    deleteCarrera(carrera) {
        let carreras = this.state.carreras;
        let carrerasProps = this.state.carrerasProps;
        carrerasProps.unshift(this.state.carreras[carrera]);
        carreras.splice(carrera, 1);

        this.setState({
            carreras, carrerasProps
        });
    }

    renderCarreras(carreras) {
        return carreras.map(o => {
            return (
                <tr key={o.id} onClick={() => { this.addCarrera(o) }}>
                    <td>
                        {o.nombre}-{o.sede.abreviatura}-<strong>{o.sede.universidad.abreviatura}</strong>
                    </td>
                </tr>
            );
        });
    }
    render() {
        if (this.props.data.loading) return <LoadingScreen />;
        return (
            <div>
                <div>
                    <section className="hero is-primary">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Compare carreras</h1>
                            </div>
                        </div>
                    </section>
                </div>
                <hr />
                <section>
                    <div className="columns">
                        <div className="column">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="is-selected" >Nombre</th>
                                    </tr>
                                </thead>
                                <div style={{ overflowY: 'auto', height: '500px' }}>
                                    {this.renderCarreras(this.state.carrerasProps)}
                                </div>
                            </table>
                        </div>
                        <div className="column">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="is-selected" >Nombre</th>
                                    </tr>
                                </thead>
                                <div style={{ overflowY: 'auto', height: '500px' }}>
                                    {this.renderCarreras(this.state.carrerasProps)}
                                </div>
                            </table>
                        </div>
                        <div className="column">
                            <div className="box" onClick={() => { this.deleteCarrera(0) }}>{this.state.carreras.length === 0 ? '' : this.state.carreras[0].nombre}</div>
                            <div className="box" onClick={() => { this.deleteCarrera(1) }}>{this.state.carreras.length <= 1 ? '' : this.state.carreras[1].nombre}</div>

                            <Link to={'comparador/' + (this.state.carreras.length <= 1 ? '' : this.state.carreras[1].id) + '/' + (this.state.carreras.length === 0 ? '' : this.state.carreras[0].id)}>
                                <button className="button is-danger">
                                    Comparar
                        </button>
                            </Link>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default graphql(carreras)(Comparador);