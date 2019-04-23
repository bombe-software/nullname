import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash'

import LoadingScreen from "../reutilizable/loading_screen";
import carrera2 from '../../queries/carrera2';

import './../../assets/motor.css';

class Comparador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            id_activo: []
        }
    }
    deleteAccent(s) {
        var mapaAcentos = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'Á': 'a', 'É': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u'
        };
        if (!s) { return ''; }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            ret += mapaAcentos[s.charAt(i)] || s.charAt(i);
        }
        return ret;
    };

    prepareString(string) {
        let array = string.toLowerCase().split(" ");
        for (let i = 0; i < array.length; i++) {
            array[i] = this.deleteAccent(array[i]);
            switch (array[i][array[i].length - 1]) {
                case 's':
                    array[i] = array[i].slice(0, array[i].length - 1)
                    break;
                case 'os':
                    array[i] = array[i].slice(0, array[i].length - 2)
                    break;
                case 'as':
                    array[i] = array[i].slice(0, array[i].length - 2)
                    break;
                case 'a':
                    array[i] = array[i].slice(0, array[i].length - 1)
                    break;
                case 'o':
                    array[i] = array[i].slice(0, array[i].length - 1)
                    break;
                case 'es':
                    array[i] = array[i].slice(0, array[i].length - 2)
                    break;
                default:
                    break;
            }
        }
        for (let i = 0; i < array.length; i++) {
            [
                'a', 'ante', 'bajo', 'con',
                'de', 'desde', 'durante', 'en', 'entre', 'hacia',
                'hasta', 'para', 'por', 'sin', 'sobre', 'y', 'e',
                'o', 'u', 'ya', 'pero', 'mas', 'sino', 'luego', 'aun',
                'aunque', 'si', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas'
            ].map((o) => {
                if (o === array[i]) {
                    array.splice(i, 1);
                    i = i - 1;
                }
                return array;
            });
        }
        return array;
    }

    compareArray(array1, array2) {
        let maximum = (array1.length > array2.length) ? array1.length : array2.length;
        let contador = 0;
        array1.forEach(o => {
            array2.forEach((e) => {
                if (e.length < 2 && o.length < 2 && o === e) {
                    contador += 1;
                } else if (e.length > 2 && o.length > 2 && o.search(e) >= 0) {
                    contador += 1;
                }
            });
        });
        if ((contador / maximum) >= 0.5) {
            return true;
        } else {
            return false;
        }
    }

    compareMateria(materia, materia1) {
        let materia_string = this.prepareString(materia.nombre);
        let materia1_string = this.prepareString(materia1.nombre)
        if (this.compareArray(materia_string, materia1_string)) {
            let lista = this.state.lista;
            lista.push([materia.id, materia1.id]);
            this.setState({ lista });
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            nextProps.data.carrera2[0].materias.forEach(materia => {
                nextProps.data.carrera2[1].materias.forEach(materia1 => {
                    this.compareMateria(materia, materia1);
                });
            });
        }
    }

    handleEnter(id, lista_id) {
        let lista = lista_id[0];
        lista.push(id);
        this.setState({ id_activo: lista })
    }

    handleLeave() {
        this.setState({ id_activo: [] })
    }

    renderSemestre(materias, posicion) {
        return materias.map((e) => {
            let bool = false;
            let lista_id = [];
            this.state.lista.forEach(o => {
                if (o[posicion] === e.id) {
                    bool = true;
                    lista_id.push(o);
                }
            });
            let bool_activo = false;
            this.state.id_activo.forEach(o => {
                if (o === e.id) {
                    bool_activo = true;
                }
            });
            if (e.categoria.nombre !== 'Optativa o Electiva') {
                if (bool) {
                    return (
                        <div onMouseEnter={() => this.handleEnter(e.id, lista_id)} onMouseLeave={() => this.handleLeave()} className={`has-text-centered is-size-7 materia materia_compartida ${bool_activo ? "haha" : ""}`} key={e.id}>
                            {e.nombre.length > 30 ? e.nombre.substring(0, 34) + "..." : e.nombre}
                        </div>
                    );
                } else {
                    return (
                        <div className="has-text-centered is-size-7 materia" key={e.id}>
                            {e.nombre.length > 30 ? e.nombre.substring(0, 34) + "..." : e.nombre}
                        </div>
                    );
                }

            } else {
                return <div key={e.id}></div>
            }
        });
    }

    renderCarrera(materias, posicion) {
        materias = Object.values(_.groupBy(materias, o => {
            return o.semestre
        }));
        return materias.map((e) => {
            return (
                <div className='semestre' key={e[0].id}>
                    {this.renderSemestre(e, posicion)}
                </div>
            );
        });
    }

    render() {
        if (this.props.data.loading) return (<LoadingScreen />);
        return (
            <div className="section">
                <div className="carrera-container">
                    <div>
                        <p className="title is-size-4">
                            {this.props.data.carrera2[0].nombre}-{this.props.data.carrera2[0].sede.abreviatura}-{this.props.data.carrera2[0].sede.universidad.abreviatura}
                        </p>
                        <div className='carrera'>
                            {this.renderCarrera(this.props.data.carrera2[0].materias, 0)}
                        </div>
                    </div>
                </div>
                <br />
                <div className="carrera-container">
                    <div>
                        <p className="title is-size-4">
                            {this.props.data.carrera2[1].nombre}-{this.props.data.carrera2[1].sede.abreviatura}-{this.props.data.carrera2[1].sede.universidad.abreviatura}
                        </p>
                        <div className='carrera'>
                            {this.renderCarrera(this.props.data.carrera2[1].materias, 1)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(carrera2, {
    options: (props) => { return { variables: { id1: props.match.params.id1, id2: props.match.params.id2 } } }
})(Comparador);