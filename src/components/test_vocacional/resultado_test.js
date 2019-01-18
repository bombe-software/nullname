import React, { Component } from 'react';

class ResultadoTest extends Component {

    componentWillMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push("/test")
        }
    }

    render() {
        return (
            <div>
                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Resultados</h1>
                        </div>
                    </div>
                </section>
                <section className="hero is-white has-text-centered ">
                    <div className="columns is-centered">
                        <div className="column">
                            <br /> <br />
                            <h2 className="subtitle has-text-weight-light is-size-4-desktop">Con base a las preguntas contestadas, usted esta perfilado para el área de:</h2>
                            <h1 className="title has-text-grey-darker is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">{!this.props.location.state ? "" : this.props.location.state.resultado.areaProfesional}</h1>
                            <br />
                            Inserte graficas e información :v
                            </div>
                    </div>
                    <br /><br />

                </section>
            </div>
        );
    }
}
export default ResultadoTest;