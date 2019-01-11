import React, { Component } from 'react';
import {
    Marker,
    InfoWindow
} from "react-google-maps";

class Marcador extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            isOpen: this.props.recuperado
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(){
        this.props.ajustar(parseFloat(this.props.element.posicion.split(',')[0]), parseFloat(this.props.element.posicion.split(',')[1]), 15, this.props.element.id);
    }

    close(){
        this.props.ajustar(24, -104, 4.8, ''); 
    }

    render() {
        return (
            <Marker
                key={this.props.element.id}
                position={{ lat: parseFloat(this.props.element.posicion.split(',')[0]), lng: parseFloat(this.props.element.posicion.split(',')[1]) }}
                onClick={this.open}
            >
                {this.state.isOpen ? <InfoWindow onCloseClick={this.close}>
                    <div>
                        {this.props.element.nombre}
                    </div>
                </InfoWindow> : ''}
            </Marker>
        )
    }
}

export default Marcador;