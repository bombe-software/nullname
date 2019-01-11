import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap
} from "react-google-maps";

//components
import LoadingScreen from './../reutilizable/loading_screen';
import Marcador from './marcador';
 
class Mapa extends Component {

    render() {
        const data = [{ id:'lol', nombre: 'nombre', ubicacion: '23,-104' }];
        if (false) return <LoadingScreen />;
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={4.8}
                defaultCenter={{ lat: 24, lng: -104 }}
            >
                {data.map(element => {
                    return  <Marcador
                                id={element.id}
                                key={element.id}
                                nombre={element.nombre}
                                ubicacion={element.ubicacion}/>;
                })}
            </GoogleMap>
        ))

        return <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb3kUA8KdYfPy1MqVsfnVU-wxHzNhpm-8"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />;
    }
}
export default Mapa;
