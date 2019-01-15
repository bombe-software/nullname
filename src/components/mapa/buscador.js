import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import './../../assets/efecto_a.css';

//queries
import sedes from '../../queries/sedes';

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: ""
        };
        this.handle = this.handle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validadoAcentos(s) {
        var mapaAcentos = {
            'á': 'A', 'é': 'E', 'í': 'I', 'ó': 'O', 'ú': 'U',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
        };
        if (!s) { return ''; }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            ret += mapaAcentos[s.charAt(i)] || s.charAt(i);
        }
        return ret.toLocaleLowerCase();
    }

    onChange(event) {
        this.setState({ busqueda: event.target.value });
    }

    handle(posicion, id) {
        this.setState({ busqueda: '' });
        this.props.ajustar(posicion.split(',')[0], posicion.split(',')[1], 15, id);
    }

    renderResultados() {
        if (this.state.busqueda !== '') {
            const string = this.validadoAcentos(this.state.busqueda.toLowerCase());
            var re = new RegExp(string);
            let list = _.filter(this.props.data.sedes, (o) => {
                return re.test(this.validadoAcentos(o.nombre.toLowerCase()))||re.test(this.validadoAcentos(o.abreviatura.toLowerCase()));
            });

            if (list.length === 0) {
                return (<div>Sin resultados</div>);
            }
            return _.map(list, element => {
                return (
                    <li className='hover_link' onClick={() => this.handle(element.posicion, element.id)} key={element.id}>
                        <span>{element.nombre} - <strong>{element.universidad.abreviatura}</strong></span>
                        <hr class="dropdown-divider " />
                    </li>
                );
            });
        } else {
            return <div></div>
        }

    }

    render() {
        return (
            <div>
                <aside className="menu">
                    <div className="menu-label">
                        <TextField
                            id={"campoBusqueda"}
                            onChange={this.onChange}
                            value={this.state.busqueda}
                            fullWidth
                        />
                    </div>
                    <ul className="menu-list" style={{overflowY:  'auto', height: '250px'}}>
                        {this.renderResultados()}
                    </ul>
                </aside>
            </div>
        );
    }
}
export default graphql(sedes)(Buscador);