import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import LoadingAnimation from "./../loadingAnimation"

import carrera2 from '../../queries/carrera2';

class Comparador extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: 0,
            categorias: {
                //Matemáticas, Humanistas, etc
            }
        }
    }

    onclick(index) {
        this.setState({selected: index});
    }

    deleteAccent(s) {
        var mapaAcentos = {
            'á': 'A', 'é': 'E', 'í': 'I', 'ó': 'O', 'ú': 'U',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
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
            if (array[i][array[i].length - 1] === 's') {
                array[i] = array[i].slice(0, array[i].length - 1);
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
    compareMaterias(materias1, materias2) {
        let arrayFinal = [];
        materias1.forEach(o => {
            let arrayPush = this.compareMateria(o, materias2);
            if (arrayPush.length > 0) {
                arrayFinal.push(this.compareMateria(o, materias2));
            }
        });
        return arrayFinal;
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
                if (o.search(e) >= 0) {
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
    renderAreaNula(array1) {
        return (
            <div>
                <h3>Carrera {this.props.data.carrera2[0].nombre}:</h3>
                {array1.map((e) => {
                    return (
                        <div key={e.id}>
                            {e.nombre}
                        </div>
                    );
                })}
                <h3>Materias Compartidas:</h3>
                No hay materias para comparar
            </div>
        )
    }

    renderArea(array1, array2) {
        let pre_array = this.compareMaterias(_.map(array1, 'nombre'), _.map(array2, 'nombre'));
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
        _.remove(array1, function (n) {
            let bool = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i][0] === n.nombre) {
                    bool = true;
                    array[i][0] = n;
                }
            }
            return bool;
        });
        _.remove(array2, function (n) {
            let bool = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i][1] === n.nombre) {
                    bool = true;
                    array[i][1] = n;
                }
            }
            return bool;
        });

        return (
            <div>
                {(array1.length === 0) ?
                    <div key='1'>
                        <h3 className="title is-3">Carrera {this.props.data.carrera2[0].nombre}: </h3>
                        No existen materias diferentes
                    </div>
                    :
                    <div key='1'>
                         <h3 className="title is-3">Carrera {this.props.data.carrera2[0].nombre}: </h3>
                        {array1.map((e) => {
                            return (
                                <div key={e.id}>
                                    {e.nombre}
                                </div>
                            );
                        })}
                    </div>
                }
               
                {(array2.length === 0) ?
                    <div key='2'>
                        <h3 className="title is-3">Carrera {this.props.data.carrera2[1].nombre}: </h3>
                        No existen materias diferentes
                    </div>
                    :
                    <div key='2'>
                        <h3 className="title is-3">Carrera {this.props.data.carrera2[1].nombre}: </h3>
                        {array2.map((e) => {
                            return (
                                <div key={e.id}>
                                    {e.nombre}
                                </div>
                            );
                        })}
                    </div>
                }
                {(array.length === 0) ?
                    <div key='3'>
                        <h3 className="subtitle is-3">Materias Compartidas:</h3>
                        No hay materias para comparar
                    </div>
                    :
                    <div key='3'>
                        <h3 className="subtitle is-3">Materias Compartidas:</h3>
                        {array.map((e) => {
                            return (
                                <div key={e[0].id}>
                                    {e[0].nombre}/{e[1].nombre}
                                </div>
                            );
                        })}
                    </div>
                }

            </div>
        )
    }

    render() {
        if (this.props.data.loading) return (<LoadingAnimation />)
            
        let array1 = Object.values(_.groupBy(this.props.data.carrera2[0].materias, o => {
            return o.categoria.id
        }));
        let array2 = _.groupBy(this.props.data.carrera2[1].materias, o => {
            return o.categoria.id
        });
        return (
            <div>

{
    //Cabecera
}

                <section className="hero is-info is-bold">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        Comparador
                    </h1>
                    <h2 className="subtitle">
                        Compara las carreras en distintas escuelas conforme a sus materias
                    </h2>
                    </div>
                </div>
                </section>
{
    //Lista comparativa
}
                <div className="container">
                <div className="columns">

{
    //Menu de categorias
}
                
                <div className="column is-3">
                <div className="section">
                <aside className="menu">
                    <p className="menu-label">
                    Categorías
                    </p>
                    <ul className="menu-list">
                    {
                        array1.map((e, index) => {
                           
                        return (
                            <div key={e[0].categoria.id} id={"menu-categoria"+index} onClick={this.onclick.bind(this, index)}>
                                <li><a>{e[0].categoria.nombre}</a></li>
                            </div>
                        )
                        })
                    }
                    </ul>
                </aside>
                </div>
                </div>

{
    //Lista de materias
}
                <div className="column is-10">
                <div className="section" id="listaComparativa">
                
                {array1.map((e, index) => {
                    if (JSON.stringify(array2[e[0].categoria.id]) !== '{}' && array2[e[0].categoria.id] !== undefined) {
                        return (
                            <div key={e[0].categoria.id} id={"categoria"+index} className={"categoria"+this.state.selected!=="categoria"+index?"is-hidden":""}>
                                <h1 className="title is-2">{e[0].categoria.nombre}</h1>
                                {this.renderArea(e, array2[e[0].categoria.id])}
                            </div>
                        )
                    } else {
                        return (
                            <div key={e[0].categoria.id} id={"categoria"+index} className={"categoria"+this.state.selected!=="categoria"+index?"is-hidden":""}>
                                <h1 className="title is-2">{e[0].categoria.nombre}</h1>
                                {this.renderAreaNula(e)}
                            </div>
                        )
                    }
                })}
                </div>
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
