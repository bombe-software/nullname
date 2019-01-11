import React, { Component } from 'react';
import laptop from './../../assets/laptop.jpg'

class AcercaDe extends Component {
    render() {
        return (
            <div>
                <section className="hero is-link has-background-link is-medium">
                    <div className="hero-body">
                        <div className="container has-text-centered ">
                            <h1 className="title">
                                ACERCA DE NOSOTROS
      </h1>
                            <hr />
                            <h2 className="subtitle">
                                En Unitips estamos completamente comprometidos con la educación en México y la distribución del conocimiento.
      </h2>
                        </div>
                    </div>
                </section>

                <div className="box">
                    <article className="media">
                        <div className="media-left">
                            <img src={laptop} alt="Laptop" />
                        </div>
                        <div className="media-content">
                            <div className="content">
                            <h1 className="title is-1">Bienvenido</h1>
                       <hr/>
                          <h3 className="subtitle is-3 has-text-weight-light">Hola, Nullname tiene como objetivo hacer que los alumnos tengan una cierta nocion acerca de las diferentes universidades que existe en el pais.</h3>
                        </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}
export default AcercaDe;
