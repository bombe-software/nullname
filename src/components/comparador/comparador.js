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
    

    componentWillMount() {
        this.setState({ carrerasProps: this.props.data.carreras });
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
                <div className="hero is-danger is-bold">
                    <div className="hero-body">
                    <div className="container">
                        <h1 className="title has-text-centered">
                            Comparar carreras
                        </h1>
                        <h2 className="subtitle has-text-centered">Compara las carreras que imparten diversas universidades del país y compara sus planes de estudio</h2>
                    </div>
                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="columns">
                    <div className="column">
                        <div className={this.state.carreras[0] ? "is-hidden": "level"}>
                            <div className="level-item"><p className="title has-text-centered is-size-4">Carrera 1</p></div>
                        </div>
                        <div className={this.state.carreras[0] ? "notification is-danger": "is-hidden"}>
                            <span className="is-size-5">{this.state.carreras[0] === undefined || this.state.carreras.length === 0 ? 'Carrera 1' : (this.state.carreras[0].nombre + "-" + this.state.carreras[0].sede.abreviatura + "-" + this.state.carreras[0].sede.universidad.abreviatura)}</span>
                            <button className="delete hidden is-large" onClick={() => this.state.carreras[0] ? this.deleteCarrera(0) : ''}></button>
                        </div>
                        <table className={this.state.carreras[0] ? "is-hidden": "table is-fullwidth"}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={this.state.list1 ? "is-selected disabledDiv" : 'is-selected'} style={{ overflowY: 'auto', cursor:'pointer', height: '400px' }}>
                                            <table className="table is-hoverable">
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

                    <div className="column">
                        <div className={this.state.carreras[1] ? "is-hidden": "level"}>
                            <div className="level-item"><p className="title has-text-centered is-size-4">Carrera 2</p></div>
                        </div>
                        <div className={this.state.carreras[1] ? "notification is-danger": "is-hidden"}>
                            <span className="is-size-5">{this.state.carreras[1] === undefined || this.state.carreras.length === 0 ? 'Carrera 2' : (this.state.carreras[1].nombre + "-" + this.state.carreras[1].sede.abreviatura + "-" + this.state.carreras[1].sede.universidad.abreviatura)}</span>
                            <button className="delete hidden is-large" onClick={() => this.state.carreras[1] ? this.deleteCarrera(1) : ''}></button>
                        </div>
                        <table className={this.state.carreras[1] ? "is-hidden": "table is-fullwidth"}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={this.state.list2 ? "is-selected disabledDiv" : 'is-selected'} style={{ overflowY: 'auto', cursor:'pointer', height: '400px' }}>
                                            <table className="table is-hoverable">
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
                </div>
                <div className="section">
                    <div className="level">
                    <div className={(!this.state.list1 || !this.state.list2) ? "disabledDiv level-item" : 'level-item'}>
                        <Link to={'comparador/' + (this.state.carreras[0] === undefined ? '' : this.state.carreras[0].id) + '/' + (this.state.carreras[1] === undefined ? '' : this.state.carreras[1].id)}>
                            <button className="button is-large is-fullwidth is-danger">
                                <strong>  Comparar</strong>
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