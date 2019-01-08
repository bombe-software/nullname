import React, { Component } from 'react';
import './../assets/landing_page.css';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <nav className="navbar is-transparent  is-fixed-top color-navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Compara carreras</a>
              <a className="navbar-item">Test vocacional </a>
              <a className="navbar-item">Mapa </a>
              <a className="navbar-item">Datos interesantes </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Mas</a>
                <div className="navbar-dropdown">
                  <a className="navbar-item">Ayuda </a>
                  <a className="navbar-item">Acerca de </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">Reporta un problema</a>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="control has-icons-right">
                  <input className="input" type="email" placeholder="Buscar una carrera" />
                  <span className="icon is-right">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="hero-image">
          <div className="degradado"></div>
          <div className="hero-text">
            <h1 className="is-size-1">Busca informacion acerca de alguna carrera </h1>
          </div>
        </section>

      </div>
    );
  }
}

export default LandingPage;
