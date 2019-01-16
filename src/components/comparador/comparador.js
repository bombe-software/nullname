import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import _ from 'lodash';
import LoadingScreen from "../reutilizable/loading_screen"
import './../../assets/comparador.css';

import carreras from '../../queries/carreras';

class Comparador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carrerasProps: [],
            carreras: [],
            list1: false,
            list2: false
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ carrerasProps: nextProps.data.carreras });
    }

    addCarrera(carrera, numList) {
        let carreras = this.state.carreras;
        if (carreras[0] === undefined || carreras[1] === undefined || carreras.length === 0) {
            if (carreras.length === 0) {
                carreras = [undefined, undefined];
            }
            carreras[numList] = carrera;
            let carrerasProps = this.state.carrerasProps;
            _.remove(carrerasProps, function (carreraO) {
                return carreraO.id === carrera.id;
            });

            this.setState({
                carreras, carrerasProps
            });
            if (numList === 0) {
                this.setState({ list1: true })
            } else {
                this.setState({ list2: true })
            }
        } else {
            console.log('Solo puedes comparar dos carreras a la vez');
        }
    }

    deleteCarrera(carrera) {
        let carreras = this.state.carreras;
        let carrerasProps = this.state.carrerasProps;
        carrerasProps.unshift(this.state.carreras[carrera]);
        carreras[carrera] = undefined;
        this.setState({
            carreras, carrerasProps
        });
        if (carrera === 0) {
            this.setState({ list1: false })
        } else {
            this.setState({ list2: false })
        }
    }

    renderCarreras(carreras, numList) {
        return carreras.map(o => {
            return (
                <tr key={o.id} onClick={() => { this.addCarrera(o, numList) }}>
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
                        <article className="message is-link">
                            <div className="message-header" >
                                {this.state.carreras[0] === undefined || this.state.carreras.length === 0 ? 'Seleccione una carrera' : (this.state.carreras[0].nombre + "-" + this.state.carreras[0].sede.abreviatura + "-" + this.state.carreras[0].sede.universidad.abreviatura)}
                                <button className="delete hidden" onClick={() => this.state.carreras[0] ? this.deleteCarrera(0) : ''}></button>
                            </div>
                        </article>
                        <table className="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th className="is-selected" >Nombre de la primera carrera</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={this.state.list1 ? "is-selected disabledDiv" : 'is-selected'} style={{ overflowY: 'auto', height: '400px' }}>
                                            <table>
                                                <tbody>
                                                    {this.renderCarreras(this.state.carrerasProps, 0)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="column">
                        <article className="message is-info">
                            <div className="message-header" >
                                {this.state.carreras[1] === undefined || this.state.carreras.length === 0 ? 'Seleccione otra carrera' : (this.state.carreras[1].nombre + "-" + this.state.carreras[1].sede.abreviatura + "-" + this.state.carreras[1].sede.universidad.abreviatura)}
                                <button className="delete" onClick={() => this.state.carreras[1] ? this.deleteCarrera(1) : ''}></button>
                            </div>
                        </article>
                        <table className="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th className="is-selected" >Nombre de la segunda carrera</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={this.state.list2 ? "is-selected disabledDiv" : 'is-selected'} style={{ overflowY: 'auto', height: '400px' }}>
                                            <table>
                                                <tbody>
                                                    {this.renderCarreras(this.state.carrerasProps, 1)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                    </div>      
                    <div className={(!this.state.list1 || !this.state.list2) ? "disabledDiv column" : 'column'}>

                        <Link  to={'comparador/' + (this.state.carreras[0] === undefined ? '' : this.state.carreras[0].id) + '/' + (this.state.carreras[1] === undefined ? '' : this.state.carreras[1].id)}>
                            <button className="button is-large is-fullwidth is-danger">
                                <strong>  Comparar</strong>
                            </button>
                        </Link>
                    </div>
                    <div className="column"></div>
                </div>
            </div>
        );
    }
}
export default graphql(carreras)(Comparador);