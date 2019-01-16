import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './../../assets/acerca.css';

class AcercaDe extends Component {
    render() {
        return (
            <div>
                <div>
                    <section className="hero has-background-white">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Acerca de
                            </h1>
                                <h2 className="subtitle">
                                    Conoce un poco mas de esta gran plataforma
                            </h2>
                            </div>
                        </div>
                    </section>
                </div>
                <br /> <br /> <br /> <br /> <br />
                <div>
                    <section className="section startups has-text-centered">
                        <div className="container is-narrow">
                            <div className="columns is-centered is-link has-text-light final">
                                <div className="column">
                                    <h1 className="title is-spaced">¿Tienes alguna duda o sugerencia?</h1>
                                    <h2 className="subtitle is-size-5-desktop">Envíanos un mensaje en dónde expreses lo que desee de la plataforma</h2>

                                    <Link to='reportar_bug'>
                                        <button className="button is-primary buttonGo is-rounded">Enviar mensaje</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
export default AcercaDe;
