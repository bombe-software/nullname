import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import './../../assets/motor.css';

import LoadingScreen from "../reutilizable/loading_screen";

import carrera2 from '../../queries/carrera2';

class Comparador extends Component {
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
    compareMateria(materia, materias) {
        let materia1 = this.prepareString(materia);
        let materias1 = []
        for (let i = 0; i < materias.length; i++) {
            materias1.push(this.prepareString(materias[i]));
        }
        let response = [];
        for (let i = 0; i < materias1.length; i++) {
            if (this.compareArray(materia1, materias1[i])) {
                response = [materia, materias[i]];
            }
        }
        return response;
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
    compare(array1, array2, identificador) {
        array1 = _.map(array1, identificador);
        array2 = _.map(array2, identificador);
        let pre_array = [];
        array1.forEach(o => {
            let arrayPush = this.compareMateria(o, array2);
            if (arrayPush.length > 0) {
                pre_array.push(this.compareMateria(o, array2));
            }
        });
        let array = [];
        for (let i = 0; i < pre_array.length; i++) {
            let bool = true;
            for (let j = i + 1; j < pre_array.length; j++) {
                if (_.isEqual(pre_array[i], pre_array[j])) {
                    bool = false;
                }
            }
            if (bool) {
                array.push(pre_array[i]);
            }
        }
        return array;
    }


    renderSemestre(materias, posicion) {
        const carreras_iguales = this.compare(this.props.data.carrera2[0].materias, this.props.data.carrera2[1].materias, 'nombre').map(e =>{
            return e[posicion];
        });

        return materias.map((e) => {
            let bool = false;
            carreras_iguales.forEach(o=>{
                let materia1 = this.prepareString(e.nombre);
                let materia2 = this.prepareString(o);
                if(this.compareArray(materia1, materia2)){
                    bool = true;
                }
            })
            if(bool){
                if (e.categoria.nombre !== 'Optativa o Electiva') {
                    return (
                        <div className="has-text-centered materia materia_compartida" key={e.id}>
                            {e.nombre}
                        </div>
                    );
                } else {
                    return <div key={e.id}></div>
                }
            }else{
                if (e.categoria.nombre !== 'Optativa o Electiva') {
                    return (
                        <div className="has-text-centered materia" key={e.id}>
                            {e.nombre}
                        </div>
                    );
                } else {
                    return <div key={e.id}></div>
                }
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
        if (this.props.data.loading) return (<LoadingScreen />)
        return (
            <div>
                <div>
                {this.props.data.carrera2[0].nombre}-{this.props.data.carrera2[0].sede.abreviatura}-{this.props.data.carrera2[0].sede.universidad.abreviatura}
                    <div className='carrera'>
                        {this.renderCarrera(this.props.data.carrera2[0].materias, 0)}
                    </div>
                </div>
                <div>
                    {this.props.data.carrera2[1].nombre}-{this.props.data.carrera2[1].sede.abreviatura}-{this.props.data.carrera2[1].sede.universidad.abreviatura}
                    <div className='carrera'>
                        {this.renderCarrera(this.props.data.carrera2[1].materias, 1)}
                    </div>
                </div>

            </div>
        );
    }
}

export default graphql(carrera2, {
    options: (props) => { return { variables: { id1: props.match.params.id1, id2: props.match.params.id2 } } }
})(Comparador);