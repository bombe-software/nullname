import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';

//queries
import sedes from '../../queries/sedes';

class Buscador extends Component {
    constructor(props){
        super(props);
        this.state = {
            busqueda: ""
        };
        this.handle = this.handle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validadoAcentos (s) {
        var mapaAcentos = {
            'á':'A', 'é':'E', 'í':'I','ó':'O','ú':'U',
            'Á':'A', 'É':'E', 'Í':'I','Ó':'O','Ú':'U'
            };
        if (!s) { return ''; }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            ret += mapaAcentos[s.charAt(i)] || s.charAt(i);
        }
        return ret.toLocaleLowerCase();
    }

    onChange(event){
        this.setState({busqueda: event.target.value});
    }

    handle(posicion, id){
        this.props.ajustar(posicion.split(',')[0],posicion.split(',')[1], 15,  id);
    }

    renderResultados() {
        const string = this.validadoAcentos(this.state.busqueda.toLowerCase());
        var re = new RegExp(`^(.*?(\b${string}\b)[^$]*)$`);
        let list = _.filter(this.props.data.sedes, (o) =>{
            console.log(re,this.validadoAcentos(o.nombre.toLowerCase()));
            return re.test(this.validadoAcentos(o.nombre.toLowerCase()));
        });
       
        if(list.length===0){
            return(<div>Sin resultados</div>);
        }
        return _.map(list, element => {
            return (
                <div onClick={()=>this.handle(element.posicion,element.id)} key={element.id}> 
                    {element.nombre}
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <section className="hero is-link is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Mapa
                            </h1>
                        </div>
                        <TextField 
                            id={"campoBusqueda"}
                            onChange={this.onChange}
                            value={this.state.busqueda}
                        />
                        {this.renderResultados()}
                    </div>
                </section>
            </div>
        );
    }
}
export default graphql(sedes)(Buscador);