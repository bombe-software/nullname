import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap
} from "react-google-maps";
import { graphql } from 'react-apollo';

//queries
import sedes from '../../queries/sedes';

//components
import LoadingScreen from './../reutilizable/loading_screen';
import Marcador from './marcador';
import Buscador from './buscador';

class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 24,
            lng: -104,
            zoom: 4.8,
            id: ''
        };
        this.ajuste = this.ajuste.bind(this);
    }

    ajuste(lat, lng, zoom, id) {
        this.setState({ lat: parseFloat(lat), lng: parseFloat(lng), zoom, id });
    }


    render() {
        if (this.props.data.loading) return <LoadingScreen />;
        const { sedes } = this.props.data;
        const { lat, lng, zoom } = this.state;
        const ajuste = this.ajuste;
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={zoom}
                defaultCenter={{ lat, lng }}
                defaultMapTypeId='satellite'
            >
                {sedes.map(element => {
                    return <Marcador
                        recuperado={this.state.id === element.id}
                        ajustar={ajuste}
                        key={element.id}
                        element={element} />;
                })}
            </GoogleMap>
        ))

        return (
            <div>
                <section className="hero is-link is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Mapa
                            </h1>
                            <h2 className="subtitle">
                                Localiza las universidades que desee del pais.
                            </h2>
                        </div>
                    </div>
                </section>
                <hr />
                <section className="columns">
                    <div className='column is-one-third'>
                        <Buscador ajustar={ajuste} />
                    </div>

                    <MyMapComponent
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb3kUA8KdYfPy1MqVsfnVU-wxHzNhpm-8"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px`, width: '100%' }} className='column is-two-third' />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </section>
            </div>
        );
    }
}
export default graphql(sedes)(Mapa);
