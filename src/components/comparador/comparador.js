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
    componentWillReceiveProps(nextProps) {
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
                                    Comparar carreras</h1>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="box is-size-5 has-text-centered">En este apartado, usted podrá comparar las carreras que imparten diversas universidad del país con el fin de visualizar sus planes de estudios y tener un mejor panorama de las diferencias entre ellas.</div>
                    <div className="columns">
                        <div className="column">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="is-selected" >Nombre de la primera carrera</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="is-selected" style={{ overflowY: 'auto', height: '500px' }}>
                                                <table>
                                                    <tbody>
                                                        {this.renderCarreras(this.state.carrerasProps)}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="is-selected" >Nombre de la segunda carrera</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style={{ overflowY: 'auto', height: '500px' }}>
                                                <table>
                                                    <tbody>
                                                        {this.renderCarreras(this.state.carrerasProps)}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="column">
                            <article className="message is-link">
                                <div className="message-header" >
                                    {this.state.carreras.length === 0 ? 'Seleccione una carrera' : (this.state.carreras[0].nombre +"-"+this.state.carreras[0].sede.abreviatura +"-"+this.state.carreras[0].sede.universidad.abreviatura)}
                                    <button className="delete hidden" onClick={() => this.state.carreras[0] ? this.deleteCarrera(0) : ''}></button>
                                </div>
                            </article>
                            <article className="message is-info">
                                <div className="message-header" >
                                    {this.state.carreras.length <= 1 ? 'Seleccione otra carrera' :  (this.state.carreras[1].nombre +"-"+this.state.carreras[1].sede.abreviatura +"-"+this.state.carreras[1].sede.universidad.abreviatura)}
                                    <button className="delete" onClick={() => this.state.carreras[1] ? this.deleteCarrera(1) : ''}></button>
                                </div>
                            </article>
                            <div className="">
                                <Link to={'comparador/' + (this.state.carreras.length <= 1 ? '' : this.state.carreras[1].id) + '/' + (this.state.carreras.length === 0 ? '' : this.state.carreras[0].id)}>
                                    <button className="button is-danger">
                                        Comparar
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
export default graphql(carreras)(Comparador);