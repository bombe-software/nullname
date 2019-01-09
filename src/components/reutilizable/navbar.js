import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div>
            <nav className="navbar is-transparent  is-fixed-top color-navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png"  alt="Logo" width="112" height="28" />
                    </Link>

                    <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="./comparaCarrera" className="navbar-item">Compara carreras</Link>
                        <Link to="./testVocacional" className="navbar-item">Test vocacional </Link>
                        <Link to="./mapa" className="navbar-item">Mapa </Link>
                        <Link to="./datosInteresantes" className="navbar-item">Datos interesantes </Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <span className="navbar-link">Mas</span>
                            <div className="navbar-dropdown">
                                <Link to="./ayuda" className="navbar-item">Ayuda </Link>
                                <Link to="./acercaDe" className="navbar-item">Acerca de </Link>
                                <hr className="navbar-divider" />
                                <Link to="./reportabug" className="navbar-item">Reporta un problema</Link>
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
            </div>
        );
    }
}
export default Navbar;
