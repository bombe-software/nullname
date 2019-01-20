import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

class ResultadoTest extends Component {

    componentWillMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push("/test")
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
                            <h1 className="title has-text-grey-darker is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">{!this.props.location.state ? "" : this.props.location.state.resultado.areaProfesional}</h1>
                            Falta información uwu
                            <Bar
                                data={data}
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

                </section>
            </div>
        );
    }
}
export default ResultadoTest;