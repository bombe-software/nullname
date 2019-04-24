import React, { Component } from 'react';
import {Radar} from 'react-chartjs-2';
import { graphql } from 'react-apollo';
// import { Link } from "react-router-dom";
import carrera from './../../queries/carrera';

class ResultadoTest extends Component {

    componentWillMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push("/test")
        }
    }
    getData(resultados){
        let labels = resultados.map(o=>{
            return o.nombre;
        });
        let data = resultados.map(o=>{
            return o.contador;
        });
        return {
            labels,
            datasets: [
              {
                label: 'Inserte titulo mamalon porfavor anguiano ;) ',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data
              }
            ]
          }
    }

    render() {
        return (
            <div>
                <section className="hero is-danger is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Resultados</h1>
                        </div>
                    </div>
                </section>
                <section className="hero has-text-centered ">
                    <div className="hero-body">
                        <div className="container">
                            <div className="section">
                            <h2 className="subtitle has-text-weight-light is-size-4-desktop">Con base a las preguntas contestadas, usted esta perfilado para el área de:</h2>
                            <h1 className="title has-text-grey-darker is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">{!this.props.location.state ? "" : this.props.location.state.mayor}</h1>
                            <Radar
                                data={this.getData(!this.props.location.state ? "" : this.props.location.state.resultado)}
                                width={100}
                                height={50}
                                options={{
                                    maintainAspectRatio: true
                                }}
                            />
                            </div>
                        </div>
                    </div>
                    <br />
                    Algunas carreras que te podría interesar conforme a tu perfil:

                </section>
            </div>
        );
    }
}
export default graphql(carrera, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
})(ResultadoTest);