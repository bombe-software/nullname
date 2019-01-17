import React, { Component } from 'react';
import { Link } from "react-router-dom";
import empresa from './../../assets/bombe.png';

import './../../assets/acerca.css';

class AcercaDe extends Component {
    render() {
        return (
            <div>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Acerca de
                            </h1>
                            <h2 className="subtitle">
                                Conoce los creadores de la platafora. Anda, no seas tímido...
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="hero is-white has-text-centered ">

                    <div className="columns is-centered">

                        <div className="column">
                            <br /> <br />
                            <h1 className="title has-text-grey-darker is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">Bombe Software</h1>
                            <h2 className="subtitle has-text-weight-light is-size-4-desktop">Desarrollamos proyectos que tengan un impacto social y <strong>nos encanta</strong> lo que hacemos.</h2>
                            <img className="avatar" width="200px" src={empresa} alt="Bombe Software" />
                        </div>
                    </div>
                </section>
                <div>
                    <section className="section has-text-centered has-background-white">
                        <div className="container is-narrow">
                            <div className="columns is-centered is-link has-text-light final">
                                <div className="column">
                                    <h1 className="title is-spaced">¿Tienes alguna duda o sugerencia?</h1>
                                    <h2 className="subtitle is-size-5-desktop">Envíanos un mensaje en dónde expreses lo que desee de la plataforma</h2>

                                    <Link to='reportar_bug'>
                                        <button className="button is-primary is-medium buttonGo is-rounded">Enviar mensaje</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>







            </div >
        );
    }
}
export default AcercaDe;
